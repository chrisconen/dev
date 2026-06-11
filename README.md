# chrisconen.dev

Personal professional hub for Chris Conen. Static Astro site with one
distinctive property: every deploy publishes an Ed25519-signed manifest of
every file on the site (`/receipt.json`), and the `/receipt/` page verifies
it live, in the visitor's browser. The site demonstrates the same primitive
AXR applies to AI agent actions.

## Stack

- Astro 5, zero JavaScript on every page except `/receipt/` (the verifier)
- Hand-rolled CSS design system ("Ledger & Stamp"), no framework
- Fonts self-hosted via Fontsource: Libre Caslon Text, Public Sans, IBM Plex Mono
- `@noble/ed25519` + `@noble/hashes` for signing and verification
- Cloudflare Pages for hosting (strict security headers in `public/_headers`)

## Quickstart

```sh
nvm use            # Node 22 (>= 20 required)
npm install
npm run dev        # local dev, no receipt is generated
npm run build      # astro build + signed receipt into dist/
npm run preview
```

## The receipt system

```sh
npm run keygen
```

Prints an Ed25519 keypair. Do this once.

1. `RECEIPT_PRIVATE_KEY` (base64): set it as an encrypted environment
   variable in Cloudflare Pages (and locally in your shell if you want
   signed local builds). Never commit it, never write it to a file.
2. `RECEIPT_PUBLIC_KEY` (base64): paste it into `src/config.ts` as
   `receiptPublicKey`. The verifier page then pins it and reports whether
   the receipt's key matches the one in source.

Builds without the env var still work and produce an honest
`mode: "unsigned"` receipt.

Verify any build or the live site from the command line:

```sh
npm run verify -- ./dist --deep
npm run verify -- https://chrisconen.dev --deep
```

`--deep` re-hashes every file and compares it against the signed manifest.
Exit codes: 0 verified, 1 failed, 2 unsigned.

## Deploying on Cloudflare Pages

1. Push this repository to https://github.com/chrisconen/dev (it is
   referenced from the live /receipt/ page, so keep it public).
2. Cloudflare dashboard: Workers and Pages, Create, Pages, connect the repo.
3. Build settings: framework preset Astro, build command `npm run build`,
   output directory `dist`.
4. Environment variables: add `RECEIPT_PRIVATE_KEY` (encrypt it) and
   `NODE_VERSION` = `22`.
5. Custom domain: add `chrisconen.dev` (the zone is already on Cloudflare,
   so this is one click plus DNS confirmation).

### Cloudflare settings that will break file verification

The receipt signs the exact bytes of every file. Any feature that rewrites
HTML on the edge makes the served bytes differ from the signed bytes: the
signature still verifies, but per-file spot-checks will fail. In the zone
settings (Speed / Scrape Shield), make sure these are OFF for this zone:

- Rocket Loader
- Email Address Obfuscation
- Auto Minify (deprecated, but check)
- Cloudflare Web Analytics injection (do not enable it for this site;
  the footer promise "no third-party scripts" also depends on this)

Brotli/gzip compression is fine: it changes transport encoding, not bytes.

## Before going live: TODOs in `src/config.ts`

| Field | Status |
| --- | --- |
| `email` | defaults to `hello@chrisconen.dev`; create the mailbox via Cloudflare Email Routing, or change it |
| `linkedin` | empty hides the link; add the profile URL |
| `axrRepo` | confirm the exact repository URL |
| `EVIDENCE[].href` | add live URLs for Motyán, Bella Camila and the ECO Clean reviews; empty hides each link |
| `receiptPublicKey` | paste after `npm run keygen` |

Also `public/.well-known/security.txt`: keep the contact in sync with
`email`, and bump `Expires` yearly (currently 2026-12-31).

## Project structure

```
src/config.ts            all personal data, links and TODOs in one place
src/lib/canonical.js     deterministic JSON used by signer and verifier alike
src/styles/global.css    the design system
src/pages/               index, axr, receipt, 404
scripts/build-receipt.mjs  runs after astro build, writes dist/receipt.json
scripts/verify-receipt.mjs CLI verification (local dir or live URL)
scripts/keygen.mjs         one-time keypair generation
scripts/screenshots.mjs    dev helper: OG image + page screenshots (needs: npm i -D playwright)
public/_headers          strict CSP and security headers (Cloudflare Pages)
```

## Verifying the receipt by hand

The signature covers the UTF-8 bytes of the canonical serialisation
(recursively sorted keys, no whitespace) of the `manifest` object inside
`receipt.json`. Algorithm: Ed25519. Hashes: SHA-256, hex. The receipt
excludes itself and the two platform files Cloudflare consumes but never
serves (`_headers`, `_redirects`), and says so in its `excluded` field.
