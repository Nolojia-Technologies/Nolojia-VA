/**
 * AEO acceptance test (spec §100 / §102).
 *
 * For each question a prospect or an answer engine would actually ask, checks
 * that some page answers it in text a machine can extract — in the served HTML,
 * outside the JSON-LD, so a schema block cannot vouch for itself.
 *
 *   node scripts/aeo-check.mjs [baseUrl]
 *
 * This is a coverage check, not a quality one: it proves the answer exists and
 * is reachable, not that it is the best possible wording.
 */

const BASE = process.argv[2] ?? 'http://localhost:3000'

/** question → the page that should answer it → phrases that must appear there */
const EXPECTATIONS = [
  {
    question: 'What is Nolojia?',
    path: '/about',
    must: ['AI'],
    mustMatch: /Nolojia (is|builds)/i,
  },
  {
    question: 'What does Nolojia do?',
    path: '/faq',
    mustMatch: /What does Nolojia do\?/i,
  },
  {
    question: 'What services does Nolojia offer?',
    path: '/services',
    mustMatch: /assistant|automation/i,
  },
  {
    question: 'What is an AI employee?',
    path: '/solutions/ai-employees',
    mustMatch: /What is an AI employee\?/i,
    answerMatch: /An AI employee is an AI-powered system configured to perform/i,
  },
  {
    question: 'What is AI automation?',
    path: '/solutions/automation',
    mustMatch: /What is AI automation\?/i,
    answerMatch: /AI automation is the use of software and AI models/i,
  },
  {
    question: 'How does AI automation work?',
    path: '/solutions/automation',
    mustMatch: /How does AI automation work\?/i,
    answerMatch: /trigger/i,
  },
  {
    question: 'What business tasks can AI automate?',
    path: '/solutions/automation',
    mustMatch: /What business tasks can AI automate\?/i,
  },
  {
    question: 'What is a business system?',
    path: '/solutions/business-systems',
    mustMatch: /What is a business system\?/i,
    answerMatch: /A business system is a connected set of tools/i,
  },
  {
    question: 'What is the difference between an AI assistant and an AI agent?',
    path: '/solutions/ai-employees',
    mustMatch: /difference between an AI assistant and an AI agent/i,
  },
  {
    question: 'Does Nolojia provide human virtual assistants?',
    path: '/solutions/human-ai',
    mustMatch: /Does Nolojia provide human virtual assistants\?/i,
  },
  {
    question: 'How does Nolojia combine AI and human support?',
    path: '/solutions/human-ai',
    mustMatch: /How does Nolojia combine AI and human support\?/i,
  },
  {
    question: 'What products does Nolojia build?',
    path: '/products',
    must: ['PageMarks', 'AI Architecture'],
  },
  {
    question: 'Can Nolojia build a custom AI system?',
    path: '/solutions/business-systems',
    mustMatch: /custom|built|build/i,
  },
  {
    question: 'How is business information protected?',
    path: '/security',
    mustMatch: /access|data|security/i,
  },
  {
    question: 'Who is Nolojia for?',
    path: '/solutions',
    mustMatch: /business|team|operation/i,
  },
]

const strip = (html) =>
  html
    // Remove JSON-LD first: schema must not be able to satisfy a check about
    // what is visible on the page.
    .replace(/<script[^>]+type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&#x27;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&rsquo;/g, '’')
    .replace(/\s+/g, ' ')

const failures = []
const cache = new Map()

async function textOf(path) {
  if (cache.has(path)) return cache.get(path)
  const res = await fetch(`${BASE}${path}`)
  if (res.status !== 200) {
    failures.push(`${path} returned ${res.status}`)
    cache.set(path, '')
    return ''
  }
  const text = strip(await res.text())
  cache.set(path, text)
  return text
}

console.log(`AEO acceptance test against ${BASE}\n`)

for (const e of EXPECTATIONS) {
  const text = await textOf(e.path)
  const problems = []

  for (const phrase of e.must ?? []) {
    if (!text.includes(phrase)) problems.push(`missing "${phrase}"`)
  }
  if (e.mustMatch && !e.mustMatch.test(text)) problems.push(`no match for ${e.mustMatch}`)
  if (e.answerMatch && !e.answerMatch.test(text))
    problems.push(`answer text missing: ${e.answerMatch}`)

  const mark = problems.length ? '✗' : '✓'
  console.log(`${mark} ${e.question}`)
  console.log(`    ${e.path}`)
  if (problems.length) {
    for (const p of problems) console.log(`    → ${p}`)
    failures.push(`${e.question} (${e.path}): ${problems.join('; ')}`)
  }
}

console.log('')
if (failures.length) {
  console.log(`>>> ${failures.length} QUESTION(S) UNANSWERED <<<`)
  process.exit(1)
}
console.log(`>>> ALL ${EXPECTATIONS.length} QUESTIONS ANSWERED IN SERVER HTML <<<`)
