---
title: "How to Verify an Agent Log Offline with Only a Public Key"
seoTitle: "Verify Agent Log Offline: Zero-Dependency Walkthrough — Chris Conen"
description: "A complete step-by-step technical guide on how to verify agent log offline using the open-source AXR CLI and standard Ed25519 cryptography."
pubDate: 2026-06-17
primaryKeyword: "verify agent log offline"
keywords:
  - "verifiable agent logs"
  - "offline log verification"
  - "AXR CLI tools"
tags:
  - AI assurance
  - verifiable logs
draft: false
---

When auditing autonomous systems or AI agents, you should never rely on active database connections or remote web APIs to confirm execution integrity. If you have to ask a remote server to validate its own history, you are not performing a true audit—you are just querying a system that has every incentive to report a clean record. Instead, you must be able to **verify agent log offline** using standard cryptographic math and a public key.

This step-by-step technical walkthrough demonstrates how to verify a structured AXR log offline using our zero-dependency CLI, and explains why a dual-implementation model is essential for true cryptographic assurance.

---

## The Principle of Offline Verification

In cryptography, we operate under a simple maxim: **The validator must hold the keys.**

If you verify an execution log by sending it to an online "verification API" hosted by the system operator, you are exposed to several risks:
* **The Custom-View Risk:** The server can detect that you are auditing a specific transaction and serve a perfect, customised history just for you — an equivocation a self-hosted verifier can't catch.
* **The Censorship Risk:** If the server has compromised its integrity or suffered a breach, it can simply refuse to respond to queries about the affected time periods.
* **The Availability Dependency:** If the operator's compliance service goes offline, your entire GRC (Governance, Risk, and Compliance) pipeline halts.

Offline verification solves these vulnerabilities. By downloading a raw log file and using a known public key, you can run all the cryptographic math on your own isolated machine—even in a completely air-gapped environment. The server has no power to alter the result, because the math is executed locally under your control.

---

## What You Need to Begin

To perform an offline audit of an AXR-signed agent log, you need three components:

1. **The Log File (`receipts.jsonl`):** A standard JSON Lines file containing the sequence of step receipts.
2. **The Public Key:** A 32-byte Ed25519 public key (encoded in Base64 or Hex) belonging to the executing agent. This key is usually pinned in your contract, published on a secure DNS record, or committed in the system's public source code.
3. **The Verification Engine:** An open-source, independent CLI tool or library.

---

## Step-by-Step Walkthrough with the AXR CLI

The official AXR CLI is written in pure Node.js, uses zero third-party NPM dependencies, and relies entirely on Node's native `crypto` module.

### Step 1: Get the Verifier
The verifier has zero runtime dependencies. Clone the open-source repository and run the standalone script directly with Node — no install step, no package to trust:

```bash
git clone https://github.com/chrisconen/axr && cd axr
node axr-verify.js receipts.jsonl public-key.pem sth.jsonl anchors.jsonl
```

### Step 2: Understand the Output
When you run the verifier, it processes the log sequentially. For each receipt, it:
1. Canonicalises the receipt according to **RFC 8785** (consistent byte ordering regardless of spacing or key order).
2. Verifies the Ed25519 `signature` against those canonical bytes and the provided public key.
3. Recomputes the RFC 6962 Merkle root from all receipts and compares it to the signed tree head.
4. Checks the `previous_receipt_hash` link so that no receipt has been deleted or re-ordered.

If the log is authentic and complete, the CLI outputs a clean confirmation:

```text
[OK] Processing 227 step receipts...
[OK] Mathematical signatures verified.
[OK] Sequential hash chain is unbroken.
[OK] Verification SUCCESSFUL.
```

The tool then exits with **Exit Code 0**, making it perfectly suited for integration into automated CI/CD pipelines or GRC compliance scripts.

### Step 3: Simulating a Tamper Event
To see how the verifier behaves under adversarial conditions, open the `receipts.jsonl` file in a text editor. Locate a random line, and change a single value—for example, change a `calculated_price` from `185.00` to `185.01`. Save the file and run the verifier again.

The tool will immediately crash, outputting a descriptive error block and exiting with a non-zero code:

```text
[ERROR] Verification FAILED at sequence #42.
[ERROR] Reason: INVALID_SIGNATURE.
[ERROR] The signature over the canonical payload does not match.
[ERROR] Exit Code 1.
```

Because of the sequential hash chain, even if you re-sign step #42 with your own key, the recomputed Merkle root no longer matches the signed tree head, and the `previous_receipt_hash` link to the next receipt breaks. The entire sequence is anchored to the public key.

---

## The Dual-Implementation Defense

In high-stakes security environments, trusting a single software library is a risk. If the verifier codebase contains a subtle bug (or a hidden backdoor), it could report that a corrupted log is "Valid," compromising your entire compliance posture.

To mitigate this, AXR supports the **Dual-Implementation Defense**. The protocol defines the serialization and signing contract so strictly that two completely independent software engines can verify the exact same log file byte-for-byte:

1. **The JavaScript Engine:** Built for Node.js, running in server environments and automated pipelines.
2. **The Pure-Python Engine:** Written with no external dependencies (using standard Python libraries), ideal for data scientists, security researchers, and traditional enterprise server scripts.

Both verifiers must agree on the validity of every single receipt. If an operator tries to exploit a hypothetical bug in the Node.js JSON parser, the Python verifier will instantly catch the discrepancy. 

Here is how you can execute the Python-native verifier offline:

```bash
python3 axr_verify.py receipts.jsonl public-key.pem sth.jsonl anchors.jsonl
```

---

## Live In-Browser Verification

If you would rather not touch the command line, there is a client-side, web-based verifier — and the verification runs **entirely in your local browser sandbox**, not on a server.

* **[Bring your own log](/axr/verify/):** drag your `receipts.jsonl` and public key (plus an optional tree head and witness file) into the page. Once it has loaded, you can disconnect your internet connection and it will still verify — the files never leave your machine or cross the network.
* **[The live AXR dev-log](/axr/devlog/):** the same verification, pre-loaded with AXR's own signed and anchored development journal, so you can watch a real chain (and its witness cosignatures) check out in your browser.

Both use the standard Web Cryptography APIs and the exact same verification code, so the browser's verdict matches the CLI's.

---

### Verify the Truth for Yourself
* Visit the [AXR Devlog](/axr/devlog/) to inspect and verify our live production receipts in real-time.
* See the cryptographic details of the [AXR Core Specification](/axr/).
* Read how we added a signed audit trail to an [n8n workflow](/writing/n8n-audit-log/) with a single Code node.
* Review our case study on how [verifiable agent logs surfaced four active production bugs](/writing/audit-layer-found-four-bugs/).