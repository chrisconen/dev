---
title: "The visible H1 — written for a human, not a search engine"
seoTitle: "Primary keyword phrase first — short brand suffix — Chris Conen"
description: "One or two sentences, ~150–160 characters, that lead with the searchable problem and read well as a Google result snippet. No hype."
pubDate: 2026-06-13
# updatedDate: 2026-07-01   # optional, only when materially revised
primaryKeyword: "the one phrase this post is trying to rank for"
keywords:
  - "secondary phrase a"
  - "secondary phrase b"
tags:
  - AI assurance
  - n8n
draft: true   # template — keep true so it never ships; copy this file to start a post
---

This is the format reference for the `writing` collection. Copy this file to a
real slug (e.g. `tamper-evident-audit-trail-ai-agents.md`), set `draft: false`,
and write the body in Markdown. The frontmatter above is validated at build
time against `src/content.config.ts` — a missing required field fails the build.

## Use H2s for the scannable structure

Lead each section with the question a reader (and Google) is actually asking.
Prose lines stay within a readable measure automatically.

> Pull quotes render as blockquotes. Keep the site's voice: proof over
> promises, honest about limits, never overclaiming.

Internal links are the SEO point — link naturally to [the AXR design](/axr/),
the [n8n audit log page](/axr/n8n/), and the [live verifier](/axr/devlog/).

```js
// Fenced code blocks are syntax-highlighted by the build.
node axr-verify.js receipts.jsonl public-key.pem
```
