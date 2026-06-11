// Verifies a site build receipt from the command line.
//
//   npm run verify -- https://chrisconen.dev          signature only
//   npm run verify -- https://chrisconen.dev --deep   plus re-hash every file
//   npm run verify -- ./dist --deep                   same, against local output
//
// Exit codes: 0 verified, 1 verification failed, 2 unsigned receipt.

import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
import { stableStringify } from '../src/lib/canonical.js';

ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

const args = process.argv.slice(2).filter((a) => a !== '--deep');
const deep = process.argv.includes('--deep');
const target = args[0] || './dist';
const isRemote = /^https?:\/\//.test(target);

const loadBytes = async (path) => {
  if (isRemote) {
    const url = new URL(path, target).href;
    const res = await fetch(url, { headers: { 'cache-control': 'no-cache' } });
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return Buffer.from(await res.arrayBuffer());
  }
  return readFile(join(target, path));
};

const receipt = JSON.parse((await loadBytes('/receipt.json')).toString('utf8'));
const manifest = receipt.manifest;
const canonical = Buffer.from(stableStringify(manifest), 'utf8');
const manifestSha256 = createHash('sha256').update(canonical).digest('hex');

console.log(`target:    ${target}`);
console.log(`built at:  ${manifest.built_at}`);
console.log(`commit:    ${manifest.commit}`);
console.log(`files:     ${manifest.file_count}`);
console.log(
  `manifest:  ${manifestSha256} ${
    manifestSha256 === receipt.manifest_sha256 ? '(recomputed: match)' : '(recomputed: MISMATCH)'
  }`
);

if (!receipt.signature) {
  console.log('result:    UNSIGNED receipt, nothing to verify');
  process.exit(2);
}

const ok = ed.verify(
  Buffer.from(receipt.signature, 'base64'),
  canonical,
  Buffer.from(receipt.public_key, 'base64')
);

console.log(`signature: ${ok ? 'VERIFIED (Ed25519)' : 'FAILED'}`);
if (!ok) process.exit(1);

if (deep) {
  let pass = 0;
  let fail = 0;
  for (const f of manifest.files) {
    try {
      const data = await loadBytes(f.path);
      const got = createHash('sha256').update(data).digest('hex');
      if (got === f.sha256) {
        pass++;
      } else {
        fail++;
        console.log(`  FAIL ${f.path}`);
        console.log(`       expected ${f.sha256}`);
        console.log(`       computed ${got}`);
      }
    } catch (err) {
      fail++;
      console.log(`  FAIL ${f.path} (${err.message})`);
    }
  }
  console.log(`deep:      ${pass} pass, ${fail} fail of ${manifest.files.length}`);
  if (fail > 0) process.exit(1);
}

console.log('result:    OK');
