// Shared AXR verification primitives. Extracted verbatim from the proven
// in-browser dev-log verifier so the two pages (/axr/devlog/ and /axr/verify/)
// can never drift apart on what "verified" means. Pure functions over standard
// crypto — SHA-256, Ed25519, canonical JSON (RFC 8785-style), RFC 6962 Merkle.
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha512';
import { stableStringify } from './canonical.js';

// @noble/ed25519 v2 verify() is synchronous once sha512Sync is provided.
ed.etc.sha512Sync = (...m) => sha512(ed.etc.concatBytes(...m));

const enc = new TextEncoder();

export const b64ToBytes = (b64: string) =>
  Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));

export const bytesToHex = (b: ArrayBuffer | Uint8Array) =>
  [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');

export const sha256Raw = async (data: BufferSource) =>
  new Uint8Array(await crypto.subtle.digest('SHA-256', data));

// SPKI PEM -> raw 32-byte Ed25519 public key (the key is the trailing 32 bytes).
export const pemToRaw = (pem: string) => {
  const body = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const der = b64ToBytes(body);
  return der.slice(der.length - 32);
};

// Key fingerprint, byte-identical to axr-succession.keyFingerprint:
// sha256 of the PEM body with headers and whitespace stripped.
export const fingerprint = async (pem: string) => {
  const body = pem.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  return 'sha256:' + bytesToHex(await sha256Raw(enc.encode(body)));
};

// Volatile fields are written after signing and are never covered by the
// signature or the chain/leaf hash (mirrors axr-core.signablePart).
const VOLATILE = ['signature', 'anchor_ref', 'redactable', 'witness_cosignatures'];
export const signablePart = (rec: any) => {
  const c = { ...rec };
  for (const k of VOLATILE) delete c[k];
  return c;
};

export const verifySig = (body: any, sigB64: string, rawPub: Uint8Array) =>
  ed.verify(b64ToBytes(sigB64), enc.encode(stableStringify(body)), rawPub);

// RFC 6962 leaf: sha256(0x00 || canonical(receipt without anchor_ref/redactable)).
export const leafHash = async (rec: any) => {
  const c = { ...rec };
  delete c.anchor_ref;
  delete c.redactable;
  const body = enc.encode(stableStringify(c));
  const pre = new Uint8Array(1 + body.length);
  pre[0] = 0x00;
  pre.set(body, 1);
  return sha256Raw(pre);
};

export const nodeHash = async (l: Uint8Array, r: Uint8Array) => {
  const pre = new Uint8Array(1 + l.length + r.length);
  pre[0] = 0x01;
  pre.set(l, 1);
  pre.set(r, 1 + l.length);
  return sha256Raw(pre);
};

// RFC 6962 Merkle Tree Hash over [lo, hi); split at the largest power of two < n.
export const mth = async (
  leaves: Uint8Array[],
  lo: number,
  hi: number
): Promise<Uint8Array> => {
  const n = hi - lo;
  if (n === 1) return leaves[lo];
  let k = 1;
  while (k * 2 < n) k *= 2;
  const left = await mth(leaves, lo, lo + k);
  const right = await mth(leaves, lo + k, hi);
  return nodeHash(left, right);
};

export const parseJsonl = (t: string) =>
  t.trim().split('\n').filter(Boolean).map((l) => JSON.parse(l));
