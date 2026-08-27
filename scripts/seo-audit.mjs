/**
 * SEO / AEO audit.
 *
 * Crawls every URL in the sitemap against a running server and checks the
 * things that are cheap to get wrong and expensive to notice late: missing or
 * duplicated titles, descriptions outside the length Google renders, missing or
 * multiple H1s, absent canonicals, unreachable internal links, images without
 * alt text, accidental noindex, and structured data that does not parse.
 *
 *   node scripts/seo-audit.mjs [baseUrl]
 *
 * Exits non-zero if any ERROR-level check fails, so it can gate a build.
 * WARN-level findings are reported but do not fail.
 */

const BASE = process.argv[2] ?? 'http://localhost:3000'

const DESC_MIN = 70
const DESC_MAX = 158
const TITLE_MAX = 60

const errors = []
const warnings = []

const err = (url, msg) => errors.push(`${url} — ${msg}`)
const warn = (url, msg) => warnings.push(`${url} — ${msg}`)

// ── Tiny HTML helpers ────────────────────────────────────────────────────────
// Regex, not a parser: this only needs to read a handful of well-formed tags
// that Next emits, and a parser dependency for that is not worth the weight.

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(+d))

const meta = (html, name) => {
  const m = html.match(
    new RegExp(`<meta[^>]+(?:name|property)="${name}"[^>]+content="([^"]*)"`, 'i')
  )
  return m ? decode(m[1]) : null
}

const tagText = (html, tag) =>
  [...html.matchAll(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'gi'))].map((m) =>
    decode(m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
  )

const canonical = (html) => {
  const m = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i)
  return m ? m[1] : null
}

const jsonLdBlocks = (html) =>
  [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1]
  )

const internalLinks = (html) =>
  [...html.matchAll(/<a[^>]+href="(\/[^"#?]*)"/gi)].map((m) => m[1])

const images = (html) => [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0])

// ── Fetch the sitemap ────────────────────────────────────────────────────────

async function sitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap.xml returned ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((m) => m[1])
    .map((u) => u.replace(/^https?:\/\/[^/]+/, ''))
    .map((p) => p || '/')
}

// ── Per-page checks ──────────────────────────────────────────────────────────

const seenTitles = new Map()
const seenDescriptions = new Map()
const allLinks = new Set()

async function auditPage(path) {
  const res = await fetch(`${BASE}${path}`)
  if (res.status !== 200) {
    err(path, `status ${res.status}`)
    return
  }
  const html = await res.text()

  // Title
  const title = tagText(html, 'title')[0]
  if (!title) err(path, 'no <title>')
  else {
    if (title.length > TITLE_MAX) warn(path, `title ${title.length} chars (>${TITLE_MAX}): "${title}"`)
    const prev = seenTitles.get(title)
    if (prev) err(path, `duplicate title with ${prev}: "${title}"`)
    else seenTitles.set(title, path)
  }

  // Description
  const desc = meta(html, 'description')
  if (!desc) err(path, 'no meta description')
  else {
    if (desc.length > DESC_MAX) err(path, `description ${desc.length} chars (>${DESC_MAX})`)
    if (desc.length < DESC_MIN) warn(path, `description ${desc.length} chars (<${DESC_MIN})`)
    const prev = seenDescriptions.get(desc)
    if (prev) err(path, `duplicate description with ${prev}`)
    else seenDescriptions.set(desc, path)
  }

  // Canonical
  const canon = canonical(html)
  if (!canon) err(path, 'no canonical link')
  else if (!canon.startsWith('https://www.nolojia.com'))
    err(path, `canonical not on canonical host: ${canon}`)

  // Robots — an indexable page must not be noindex
  const robots = meta(html, 'robots')
  if (robots && /noindex/i.test(robots)) err(path, `noindex on a sitemap URL: "${robots}"`)

  // Headings
  const h1s = tagText(html, 'h1')
  if (h1s.length === 0) err(path, 'no H1')
  else if (h1s.length > 1) err(path, `${h1s.length} H1s: ${h1s.map((h) => `"${h}"`).join(', ')}`)
  else if (/^(solutions|services|products|welcome|home)$/i.test(h1s[0]))
    warn(path, `generic H1: "${h1s[0]}"`)

  // Open Graph + Twitter
  for (const p of ['og:title', 'og:description', 'og:url', 'og:image', 'og:type', 'og:site_name']) {
    if (!meta(html, p)) err(path, `missing ${p}`)
  }
  if (!meta(html, 'twitter:card')) err(path, 'missing twitter:card')

  // The document minus its JSON-LD, i.e. what a reader can actually see.
  const body = html.replace(
    /<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
    ''
  )

  // Structured data parses
  const blocks = jsonLdBlocks(html)
  if (blocks.length === 0) warn(path, 'no JSON-LD structured data')
  blocks.forEach((raw, i) => {
    try {
      const parsed = JSON.parse(raw)
      const nodes = Array.isArray(parsed) ? parsed : [parsed]
      for (const n of nodes) {
        if (!n['@context']) err(path, `JSON-LD block ${i} has no @context`)
        if (!n['@type']) err(path, `JSON-LD block ${i} has no @type`)
      }

      // Structured data must describe content that is actually on the page.
      // FAQPage is where this goes wrong: an accordion that mounts its answers
      // on click leaves the schema promising text the HTML does not contain.
      //
      // Compared against `body` — the document with every JSON-LD block
      // removed. Checking against the whole document instead makes the test
      // inert, because the answer trivially matches its own schema block.
      for (const n of nodes) {
        if (n['@type'] !== 'FAQPage') continue
        for (const q of n.mainEntity ?? []) {
          const answer = q?.acceptedAnswer?.text
          if (!answer) continue
          const escaped = answer
            .replace(/&/g, '&amp;')
            .replace(/'/g, '&#x27;')
            .replace(/</g, '&lt;')
          if (!body.includes(answer) && !body.includes(escaped)) {
            err(path, `FAQPage answer not present in the HTML: "${q.name}"`)
          }
        }
      }
    } catch (e) {
      err(path, `JSON-LD block ${i} does not parse: ${e.message}`)
    }
  })

  // Images
  for (const img of images(html)) {
    if (!/\balt=/.test(img)) err(path, `<img> without alt: ${img.slice(0, 110)}`)
  }

  // Collect internal links for the reachability pass
  for (const href of internalLinks(html)) allLinks.add(href)
}

// ── Run ──────────────────────────────────────────────────────────────────────

const urls = await sitemapUrls()
console.log(`Auditing ${urls.length} sitemap URLs against ${BASE}\n`)

for (const u of urls) await auditPage(u)

// Internal links must resolve
console.log(`Checking ${allLinks.size} distinct internal link targets…`)
const linkFailures = []
for (const href of allLinks) {
  const res = await fetch(`${BASE}${href}`, { method: 'HEAD', redirect: 'manual' })
  // 2xx fine; 3xx fine (redirects are deliberate); 4xx/5xx are broken links.
  if (res.status >= 400) linkFailures.push(`${href} → ${res.status}`)
}
for (const f of linkFailures) err('internal link', f)

// Orphan check: every sitemap URL should be linked from somewhere on the site.
const linked = new Set([...allLinks].map((l) => l.replace(/\/$/, '') || '/'))
for (const u of urls) {
  const norm = u.replace(/\/$/, '') || '/'
  if (!linked.has(norm)) warn(norm, 'orphan — in sitemap but not linked from any crawled page')
}

// ── Report ───────────────────────────────────────────────────────────────────

console.log('')
if (warnings.length) {
  console.log(`WARNINGS (${warnings.length})`)
  for (const w of warnings) console.log(`  ! ${w}`)
  console.log('')
}
if (errors.length) {
  console.log(`ERRORS (${errors.length})`)
  for (const e of errors) console.log(`  ✗ ${e}`)
  console.log('')
  console.log('>>> SEO AUDIT FAILED <<<')
  process.exit(1)
}
console.log('>>> SEO AUDIT PASSED <<<')
