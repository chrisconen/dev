// Deterministic JSON serialisation: objects with recursively sorted keys.
// The signature in receipt.json is computed over the UTF-8 bytes of
// stableStringify(manifest). The build script (Node) and the in-browser
// verifier import this same module, so the bytes can never drift apart.

export function stableStringify(value) {
  if (value === null || typeof value !== 'object') {
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) {
    return '[' + value.map((v) => stableStringify(v)).join(',') + ']';
  }
  const keys = Object.keys(value)
    .filter((k) => value[k] !== undefined)
    .sort();
  const parts = keys.map((k) => JSON.stringify(k) + ':' + stableStringify(value[k]));
  return '{' + parts.join(',') + '}';
}
