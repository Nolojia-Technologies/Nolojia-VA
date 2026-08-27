# Search intent map

One page per intent, and one intent per page. This document exists so that the
next person adding a page can check whether the intent is already covered before
creating a second page that competes with the first.

The rule: **a page earns its place by serving an intent no other page serves.**
If a proposed page's answer already lives somewhere, it is a section or an
internal link, not a URL.

---

## Commercial intent → solution pages

| Topic / query | Intent | Target page | Defines |
|---|---|---|---|
| AI employees, AI assistants for business, AI agents for business | Commercial | `/solutions/ai-employees` | **AI employee** |
| AI automation, business automation, workflow automation, business process automation | Commercial | `/solutions/automation` | **AI automation** |
| Digital business systems, AI business systems, custom business software, internal tools | Commercial | `/solutions/business-systems` | **Business system** |
| AI vs human assistants, human + AI workflows, AI virtual assistant services | Commercial | `/solutions/human-ai` | **Human + AI support** |
| Overview / category browsing | Navigational | `/solutions` | — |

Each of the four carries, in this order: an H1, a one-sentence definition, an
"at a glance" card, question-headed explanation sections, the existing narrative
sections, an FAQ with `FAQPage` schema, and a CTA.

## Informational intent → answered on the commercial page

These are deliberately **not** separate URLs. Each is a question-headed section
on the page that owns the topic, so the informational and commercial intent are
served by one authoritative page rather than two thin ones competing.

| Question | Answered on |
|---|---|
| What is an AI employee? | `/solutions/ai-employees` |
| What can an AI employee do? | `/solutions/ai-employees` |
| Can an AI employee work with the software we already use? | `/solutions/ai-employees` |
| What is the difference between an AI assistant and an AI agent? | `/solutions/ai-employees` |
| What is AI automation? | `/solutions/automation` |
| How does AI automation work? | `/solutions/automation` |
| What business tasks can AI automate? | `/solutions/automation` |
| What should not be automated? | `/solutions/automation` |
| What is a business system? | `/solutions/business-systems` |
| How is a business system different from buying more software? | `/solutions/business-systems` |
| What is the difference between an AI assistant and a human assistant? | `/solutions/human-ai` |
| How does Nolojia combine AI and human support? | `/solutions/human-ai` |
| Does Nolojia provide human virtual assistants? | `/solutions/human-ai` |
| What does Nolojia do? and general questions | `/faq` |

If one of these grows past what a section can carry — real depth, original data,
worked examples — that is when it earns an article at `/blog/<slug>`, and the
section becomes a summary linking to it. Not before.

## Products

| Query | Intent | Page |
|---|---|---|
| PageMarks, browser extension for notes / reading position | Commercial / branded | `/products/pagemarks` |
| AI Architecture, AI architectural design | Informational (in development) | `/products/ai-architecture` |
| What products does Nolojia build? | Navigational | `/products` |

`/products/ai-architecture` is labelled **In development** everywhere it appears,
including `llms.txt` and its schema. It must not read as purchasable.

## Entity and trust

| Query | Page |
|---|---|
| What is Nolojia? Who is Nolojia? | `/about` |
| How is business information protected? | `/security` |
| Contact, book a call | `/contact`, `/book` |
| Results, proof | `/case-studies` |

## Legacy virtual-assistant pages

22 pages under `/services/*`, `/hire-virtual-assistant-for-*` and
`/virtual-assistant-services-*` predate the AI positioning. They are kept
because they hold search equity; removing them would throw that away for nothing.

They target VA intent, which does not compete with the solution pages above.
Do not add more of them: the pattern is a page per keyword variation, which is
what §53/§54 of the brief calls out. Any new geographic page needs a genuine
market behind it, not a keyword.

---

## Guardrails

Two scripts enforce the technical half of this and run against a built server:

```bash
npm run build && npx next start -p 3110
npm run seo:audit  http://localhost:3110   # titles, descriptions, canonicals, H1s,
                                           # OG, schema validity, broken links, orphans
npm run seo:aeo    http://localhost:3110   # every question above is answered in
                                           # server HTML, outside the JSON-LD
```

`seo:audit` fails the build on: a missing or duplicate title or description, a
description over 158 characters, a missing or duplicated H1, a missing canonical
or one off the canonical host, a `noindex` on a sitemap URL, missing Open Graph
or Twitter tags, JSON-LD that does not parse, an `<img>` without `alt`, a broken
internal link, and — the one worth knowing about — **a `FAQPage` answer that is
not present in the page body**.

That last check compares the schema against the HTML with all JSON-LD stripped
out. Comparing against the whole document instead makes the check inert, because
the answer trivially matches its own schema block.
