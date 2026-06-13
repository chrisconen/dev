# Task brief for NEXUS — 4–5 SEO blog posts for chrisconen.dev/writing/

**From:** Chris (via the workbench orchestrator)
**Goal:** Rank for the problem-shaped queries the AXR landing pages can't, and
give the four-bug story a home. Problem-title articles rank; repos don't.
**Audience:** two readers at once — (1) Australian hiring managers in security /
GRC / AI assurance, (2) technical builders running AI agents or n8n.

---

## 1. Where the posts live (delivery contract — read first)

The blog infrastructure already exists. You only write Markdown.

- **One file per post** in `src/content/writing/`, filename = the URL slug,
  e.g. `n8n-audit-log.md` → `https://chrisconen.dev/writing/n8n-audit-log/`.
- Frontmatter **must** match the schema in `src/content.config.ts`. The build
  fails on a missing or mistyped field. See `src/content/writing/_template.md`
  for a working reference (it is `draft: true`, so copy it — don't edit it).
- Required frontmatter: `title`, `description`, `pubDate` (ISO `YYYY-MM-DD`),
  `primaryKeyword`. Recommended: `seoTitle`, `keywords[]`, `tags[]`.
- Set `draft: false` only when the post is finished. Drafts never ship and are
  never indexed.
- `seoTitle` is the `<title>` Google shows — **lead with the keyword phrase,
  not the brand**. `title` is the on-page `<h1>` and may be more human/poetic.
- `description` is the meta description: ~150–160 chars, reads as a result
  snippet, no hype.
- Body is Markdown: `##`/`###` headings, prose, lists, fenced code, blockquotes.
  `Article` JSON-LD is generated automatically from the frontmatter — don't add
  any `<script>` (the site runs a strict CSP; inline scripts are blocked).
- **No external assets / no third-party embeds.** The site ships zero analytics,
  zero cookies, zero third-party scripts, and says so. Keep it that way. Images
  only if essential, placed in `public/images/` and referenced as `/images/...`.

When the posts are ready, they get merged from the `feat/writing-blog` branch
to `main`; pushing `main` auto-deploys to Cloudflare Pages.

---

## 2. Voice and hard guardrails (non-negotiable)

The whole site's thesis is **"proof over promises."** Everything is checkable
on purpose. Marketing that overclaims would destroy the one asset these pages
have — credibility with a skeptical senior reader.

**You MAY state these (they are true and already on the site):**
- AXR is open source, MIT, zero runtime dependencies, standard crypto only
  (SHA-256, Ed25519, canonical JSON / RFC 8785, RFC 6962 Merkle trees).
- It runs in production on a live **n8n** booking workflow for **ECO Clean HU**:
  6 of the workflow's 20 nodes are receipt-bearing; the log is **past 227 signed
  receipts**, anchored **hourly** into one Merkle tree **since June 2026**.
- Standing up the audit layer surfaced **four real pre-existing bugs** (B, C, D,
  E — details in §3 post 1) plus two defects in AXR's own tooling.
- Two independent verifiers (Node + pure-Python) agree byte-for-byte; a 15/15
  adversarial tamper test; CI across Node 18/20/22 and Python 3.10/3.11/3.12.
- Protocol contract is frozen at 1.5.1 for 1.x; live profile is 0.2.1 core.
- AXR maps **toward** EU AI Act Art. 12 (automatic event logging for high-risk
  systems) and Art. 26 (deployer retention), applying **from 2 August 2026**;
  GDPR Art. 17 erasure is handled via salted field-level Merkle commitments.
- NIST launched its AI Agent Standards Initiative in February 2026.

**You MUST NOT:**
- Claim AXR is *certified* or *compliant* with any regulation. The exact claim
  is **"designed to map onto"** those duties — never more.
- Call Chris a senior security engineer. He is "a builder moving deliberately
  into security governance and AI assurance," Google Cybersecurity Certificate
  in progress. Keep that framing.
- Invent numbers, customers, benchmarks, dates, or quotes. If a fact isn't in
  this brief or on the live site, don't assert it.
- Use growth-hack hype, fake urgency, or "revolutionary/game-changing" register.
  Dry, precise, confident. British/Australian spelling (the audience is AU).

---

## 3. The posts (write 5; #1 and #2 are must-haves)

For each: target the **one** primary query in the title and first 100 words,
answer it directly and early, then go deep. End each post linking to `/axr/`
and one other internal page.

### Post 1 — FLAGSHIP: the four-bug story (the "Show HN" hook)
- **Primary keyword:** `verifiable agent logs` (also strong for "AI agent audit trail").
- **Working slug:** `audit-layer-found-four-bugs.md`
- **Angle:** narrative, first-person. We added a signed audit layer to a live
  n8n workflow to *prove* what it did — and the receipts immediately exposed
  four bugs nobody knew were there. An honest receipt makes silent failures loud.
- **Use the real bugs:**
  - **Bug B:** every run fired all three response branches at once — a
    ZONE_INCOMPATIBLE rejection still sent a success email; the receipt's
    `final_status` made the contradiction immediate. Fixed with a Switch on the
    receipt outcome.
  - **Bug C:** rejections returned `unknown_error` echoing the customer's own
    message; the real reason was lost. The receipt held the correct status.
  - **Bug D:** a recheck conflict returned HTTP 200 with an empty body while the
    receipt was a complete signed 5-step SLOT_TAKEN chain.
  - **Bug E:** after a fix bumped logic to v5.1, receipts kept attesting v5.0 —
    valid signatures over a false claim about which code decided. Now code-hash
    fingerprints replace hand-written version labels and CI fails on drift.
    *"Version labels are testimony; code hashes are evidence."*
- **Outline:** the setup (what ECO Clean's n8n flow does) → why we added
  receipts → each bug as a short scene → the meta-point (the gap between a
  correct receipt and a wrong response is exactly what AXR surfaces) → what it
  means for anyone running agents.
- **~1,200–1,600 words.** Links: `/axr/`, `/axr/devlog/`.

### Post 2 — HOW-TO: tamper-evident audit log for n8n
- **Primary keyword:** `n8n audit log` (also "n8n audit trail", "sign n8n workflow output").
- **Working slug:** `n8n-audit-log.md`  *(NOTE: don't duplicate the existing
  `/axr/n8n/` landing page — this is the deeper, step-by-step how-to; link to it.)*
- **Angle:** practical guide. n8n's execution log is a file you can edit and
  nobody outside can verify. Here's how to add a second, independent, signed
  account with one Code node at the end of the workflow.
- **Outline:** what n8n's native logging does and doesn't give you → the one-Code-
  node integration pattern → fail-open behaviour (missing key = loud error, never
  breaks the business process; anchoring/monitoring run out-of-band, no hot-path
  latency) → an illustrative step-receipt JSON → how anyone verifies it offline.
- **~1,000–1,400 words.** Links: `/axr/n8n/`, `/axr/`.

### Post 3 — EXPLAINER: EU AI Act Article 12 and agent logging
- **Primary keyword:** `EU AI Act Article 12 logging` (also "AI Act agent audit trail", "Article 26 deployer logging").
- **Working slug:** `eu-ai-act-article-12-logging.md`
- **Angle:** what Art. 12 (automatic event logging for high-risk systems) and
  Art. 26 (deployer retention, from 2 Aug 2026) actually ask for, in plain
  terms, and why a mutable log doesn't meet the spirit of it. Note the GDPR Art.
  17 tension and how salted field-level Merkle commitments resolve it.
- **Guardrail:** explainer, not legal advice; "designed to map onto", never
  "compliant". Mention NIST's Feb 2026 AI Agent Standards Initiative for the US side.
- **~1,100–1,500 words.** Links: `/axr/`, `/writing/` (post 1).

### Post 4 — CONCEPT: why agent logs aren't evidence
- **Primary keyword:** `tamper-evident audit trail for AI agents`.
- **Working slug:** `agent-logs-arent-evidence.md`
- **Angle:** the conceptual piece. A log you can rewrite is a story; a receipt
  anyone can verify is a record. What "tamper-evident" means precisely (signature
  breaks on edit, chain breaks on deletion, anchoring makes silent rewrites
  detectable — the Certificate Transparency analogy, not self-signed HTTPS).
- **~900–1,300 words.** Links: `/axr/`, `/axr/devlog/`.

### Post 5 — TECHNICAL (optional 5th): verify a log with only a public key
- **Primary keyword:** `verify agent log offline` (also "verifiable agent logs").
- **Working slug:** `verify-agent-log-offline.md`
- **Angle:** walk through verifying a real AXR log offline — the zero-dependency
  CLI, exit 0 = valid, and the two-independent-implementations argument. Point to
  the live in-browser verifier on `/axr/devlog/`.
- **~900–1,200 words.** Links: `/axr/devlog/`, `/axr/`.

---

## 4. Cross-linking and cadence

- Every post links to **`/axr/`** plus one sibling (listed above). Once 2+ posts
  exist, link between related posts — internal links are a big part of the point.
- Publish-date order matters for the listing (newest first). If staggering real
  dates, set `pubDate` accordingly; otherwise group them.
- Suggested `tags`: `AI assurance`, `n8n`, `EU AI Act`, `verifiable logs`. Keep
  the tag vocabulary small and consistent.

## 5. Definition of done (per post)

- [ ] Frontmatter validates (build passes: `npm run build`).
- [ ] `seoTitle` leads with the primary keyword; `description` ~150–160 chars.
- [ ] Primary keyword in the H1 context and the first 100 words.
- [ ] At least two internal links per §4.
- [ ] No claim outside §2's allowed set; no invented facts; "designed to map
      onto", never "compliant"; Chris framed as builder-into-assurance.
- [ ] `draft: false`.
