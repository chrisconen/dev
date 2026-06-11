// Generates an Ed25519 keypair for signing build receipts.
//
// The private key is printed to stdout ONLY. It is never written to disk
// and must never be committed. Store it as the RECEIPT_PRIVATE_KEY
// environment variable in your deployment platform (Cloudflare Pages:
// Settings, Environment variables, encrypt it).
//
// The public key goes into src/config.ts as receiptPublicKey so the
// verifier page can pin it.
//
// Usage: npm run keygen

import { createHash } from 'node:crypto';
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';

ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

const priv = ed.utils.randomPrivateKey();
const pub = ed.getPublicKey(priv);

const b64 = (bytes) => Buffer.from(bytes).toString('base64');
const fingerprint = createHash('sha256')
  .update(Buffer.from(pub))
  .digest('hex')
  .slice(0, 16)
  .match(/.{4}/g)
  .join(' ');

console.log('Ed25519 receipt signing keypair');
console.log('--------------------------------');
console.log('');
console.log('RECEIPT_PRIVATE_KEY (set as a deployment secret, never commit):');
console.log('');
console.log(`  ${b64(priv)}`);
console.log('');
console.log('RECEIPT_PUBLIC_KEY (paste into src/config.ts as receiptPublicKey):');
console.log('');
console.log(`  ${b64(pub)}`);
console.log('');
console.log(`Key fingerprint (sha256, first 16 hex): ${fingerprint}`);
console.log('');
console.log('Notes:');
console.log('  - Run this once. If you regenerate, update both places.');
console.log('  - Losing the private key only means future builds need a new');
console.log('    key; nothing already published breaks.');
console.log('  - Anyone with the private key can sign receipts as you.');
