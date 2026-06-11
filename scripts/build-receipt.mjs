// Generates dist/receipt.json after `astro build`.
//
// What it does:
//   1. Walks the build output and records path, size and SHA-256 for every
//      file (minus a few platform files that are never served, listed below).
//   2. Serialises the manifest canonically (recursively sorted keys, no
//      whitespace) and hashes it.
//   3. Signs the canonical manifest bytes with Ed25519 using the
//      RECEIPT_PRIVATE_KEY environment variable (base64, 32 bytes).
//   4. Writes the receipt next to the site.
//
// Without RECEIPT_PRIVATE_KEY the receipt is still written, marked
// mode: "unsigned", so local builds work with zero setup and the verifier
// page can say so honestly.
//
// Usage: node scripts/build-receipt.mjs [distDir]   (default: ./dist)

import { createHash } from 'node:crypto';
import { readdir, readFile, writeFile, stat } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
import { stableStringify } from '../src/lib/canonical.js';

ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

const DIST = process.argv[2] || 'dist';
const SITE = 'https://chrisconen.dev';

// Files that exist in the build output but are consumed by the hosting
// platform rather than served, plus the receipt itself (it cannot contain
// its own hash). Excluded transparently, with reasons, inside the receipt.
const EXCLUDED = new Map([
  ['/receipt.json', 'the receipt cannot contain its own hash'],
  ['/_headers', 'consumed by Cloudflare Pages, never served'],
  ['/_redirects', 'consumed by Cloudflare Pages, never served'],
]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

const toUrlPath = (full) => '/' + relative(DIST, full).split(sep).join('/');

try {
  await stat(DIST);
} catch {
  console.error(`build-receipt: no "${DIST}" directory. Run "astro build" first.`);
  process.exit(1);
}

const files = [];
let totalBytes = 0;

for (const full of await walk(DIST)) {
  const path = toUrlPath(full);
  if (EXCLUDED.has(path)) continue;
  const data = await readFile(full);
  const sha256 = createHash('sha256').update(data).digest('hex');
  files.push({ path, sha256, bytes: data.length });
  totalBytes += data.length;
}

files.sort((a, b) => (a.path < b.path ? -1 : 1));

const manifest = {
  schema: 'site-build-receipt/1',
  site: SITE,
  commit:
    process.env.CF_PAGES_COMMIT_SHA || process.env.GITHUB_SHA || 'local',
  branch: process.env.CF_PAGES_BRANCH || process.env.GITHUB_REF_NAME || '',
  built_at: new Date().toISOString(),
  generator: 'astro + scripts/build-receipt.mjs',
  file_count: files.length,
  total_bytes: totalBytes,
  files,
  excluded: [...EXCLUDED].map(([path, reason]) => ({ path, reason })),
};

const canonical = Buffer.from(stableStringify(manifest), 'utf8');
const manifestSha256 = createHash('sha256').update(canonical).digest('hex');

const privB64 = process.env.RECEIPT_PRIVATE_KEY || '';
let receipt;

if (privB64) {
  const priv = Buffer.from(privB64, 'base64');
  if (priv.length !== 32) {
    console.error('build-receipt: RECEIPT_PRIVATE_KEY must be 32 bytes, base64.');
    process.exit(1);
  }
  const pub = ed.getPublicKey(priv);
  const signature = ed.sign(canonical, priv);
  receipt = {
    schema: 'site-build-receipt-envelope/1',
    mode: 'signed',
    alg: 'Ed25519',
    manifest,
    manifest_sha256: manifestSha256,
    public_key: Buffer.from(pub).toString('base64'),
    signature: Buffer.from(signature).toString('base64'),
  };
} else {
  receipt = {
    schema: 'site-build-receipt-envelope/1',
    mode: 'unsigned',
    alg: 'Ed25519',
    manifest,
    manifest_sha256: manifestSha256,
    public_key: null,
    signature: null,
  };
}

await writeFile(join(DIST, 'receipt.json'), JSON.stringify(receipt, null, 2) + '\n');

console.log(`build-receipt: ${files.length} files, ${(totalBytes / 1024).toFixed(1)} KB`);
console.log(`build-receipt: manifest sha256 ${manifestSha256}`);
console.log(
  receipt.mode === 'signed'
    ? `build-receipt: signed, public key ${receipt.public_key}`
    : 'build-receipt: UNSIGNED (set RECEIPT_PRIVATE_KEY to sign deploys)'
);
