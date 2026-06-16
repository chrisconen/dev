---
title: "How a Signed Audit Layer Exposed Four Silent Bugs in a Live Workflow"
seoTitle: "Verifiable Agent Logs: Surfacing Silent Failures — Chris Conen"
description: "A first-person narrative on how adding a cryptographic, verifiable audit layer to an n8n booking workflow exposed four active, silent system bugs."
pubDate: 2026-06-13
primaryKeyword: "verifiable agent logs"
keywords:
  - "AI agent audit trail"
  - "n8n workflow monitoring"
  - "cryptographic logs"
tags:
  - AI assurance
  - n8n
  - verifiable logs
draft: false
---

When we run automated workflows or autonomous systems in production, we trust them to execute our business rules. But trust is not a security posture. When I integrated AXR to produce **verifiable agent logs** for a live customer booking system, I wasn't looking for bugs. I wanted cryptographic proof of correct execution — a way to prove to a skeptical partner or client that a specific action was taken by a specific piece of code at a specific time.

Instead, the moment the signatures started flowing, the receipts immediately exposed four silent bugs that had been running undetected in production.

This is the story of how making a system's behaviour verifiable makes its silent failures loud.

---

## The Setup: 20 Nodes of Silent Trust

The target system was the automated booking and pricing engine for **ECO Clean HU**, a cleaning services business that I own and operate. It is a live business with real customers, real money, and real reputational stakes.

The engine runs as a 20-node **n8n** workflow. Its job is to ingest incoming booking requests, validate geographic zones, assess slot availability, calculate pricing, commit the booking, and dispatch emails to the customer and the operations team.

For months, the workflow appeared to work perfectly. Webhooks fired, emails went out, and the database grew. From the outside, the system was a black box that just worked.

But as a builder moving deliberately into security governance and AI assurance, I knew that "it seems to work" is a fragile shield. When a workflow decides whether to accept a booking or charge a card, it is making a governance decision. I wanted an immutable, cryptographically signed ledger of those decisions — one I could verify offline, without relying on the system's own database or mutable server logs.

To achieve this, I integrated **AXR** (Agent eXecution Receipts) into the n8n workflow.

AXR is an open-source, zero-dependency protocol that produces structured, cryptographically signed receipts of execution. It uses standard cryptography (SHA-256, Ed25519, and canonical JSON) to sign each decision-relevant step, accumulating the receipts into an append-only, tamper-evident log. With the audit layer in place, six of the workflow's twenty nodes became receipt-bearing, each receipt signed with a private key pinned in the execution environment.

We weren't just logging text; we were generating cryptographic proof. And that proof immediately shattered our assumptions.

---

## Bug B: The Three-Way Collision

In the original workflow, when a booking request arrived, the system checked whether the customer's address fell within our service zone. If it did not, the workflow was meant to reject the booking, notify the customer with a `ZONE_INCOMPATIBLE` status, and terminate.

The system had been sending rejection emails successfully. But the moment AXR started recording receipts, the workflow receipt's `final_status` screamed a contradiction:

```json
{
  "axr_version": "0.2.1",
  "agent_id": "axr:agent:eco-clean:v5.1",
  "receipt_type": "workflow",
  "outcome": {
    "final_status": "ZONE_INCOMPATIBLE",
    "decision_summary": "booking rejected — outside service zone"
  },
  "signature": "ed25519:K8f…/Qb2Aw=="
}
```

The receipt, signed by the execution node, recorded a rejection as the run's terminal outcome. Yet that same run had *also* sent the customer a success email: all three response branches were firing at once instead of being mutually exclusive.

The n8n workflow had a routing defect. Instead of an exclusive branch, the logic let multiple response paths fire in parallel. A `ZONE_INCOMPATIBLE` run sent the correct rejection, but it silently fired the success path too.

Without **verifiable agent logs**, this was invisible — the customer saw the rejection they expected, and nothing surfaced the contradictory success branch. The signed receipt made it loud because it forced the run to declare one un-fudgeable terminal status, which the success email plainly contradicted.

**The Fix:** I replaced the loose parallel branching with an explicit Switch node governed strictly by the receipt outcome. If the receipt declares a rejection, the success branches are structurally unreachable.

---

## Bug C: The Echo Chamber

Our customer-facing API is designed to return clean, helpful error messages. If a booking fails, the client should receive a structured response explaining why (e.g., "Selected time slot is no longer available").

However, the receipts started flagging a gap between what the system *decided* and what it *told the customer*. When a booking was rejected, the API did not return the structured system error — it caught the exception and echoed the customer's own message field back to them as the error description, appended with `unknown_error`.

To the customer, the system looked broken and confusing. Internally, our error monitoring showed nothing but generic failures.

The AXR step receipts, however, held the truth. Because AXR captures the input and output of each decision point, we could compare the actual execution against what was delivered to the client:

| Source | Message / Status |
| :--- | :--- |
| **Signed Receipt (Evidence)** | The true, structured rejection status — recorded correctly on every run |
| **API Response (Testimony)** | `Error: "Please clean the kitchen extra well" (unknown_error)` |

The response node was using the wrong variable — passing the raw trigger input instead of the caught error object. The correct failure reason was preserved perfectly inside the signed receipt, while the external behaviour was corrupted.

**The Fix:** Using the receipt's structured schema as the reference, I corrected the response node to read from the verified execution context rather than the raw trigger input.

---

## Bug D: The Empty Handshake

This was perhaps the most insidious bug of all. A small number of users reported that after submitting their booking form, the page went blank or spun indefinitely.

Looking at the web server logs, these requests returned a standard `HTTP 200 OK` with an empty body. There were no uncaught errors in the application logs.

Yet, when we inspected the corresponding AXR log, we found a complete, signed 5-step `SLOT_TAKEN` chain for those exact timestamps:

```json
{
  "axr_version": "0.2.1",
  "agent_id": "axr:agent:eco-clean:v5.1",
  "receipt_type": "workflow",
  "outcome": { "final_status": "SLOT_TAKEN" },
  "signature": "ed25519:5c10…d9f3"
}
```

A recheck conflict — a slot that was taken between the first check and the commit — had been handled *correctly* by the workflow: it ran the full `SLOT_TAKEN` path and produced a complete, signed chain. But the HTTP layer returned a `200` with an empty body, so the frontend had nothing to render.

The server logs lied — they said everything was fine (`200 OK`). The database was silent — it had no booking to show. Only the **verifiable agent logs** captured the truth: a complete, signed execution chain proving the run reached a terminal `SLOT_TAKEN` state that never made it back to the user.

**The Fix:** I aligned the HTTP response with the receipt's terminal status, so a recheck conflict can no longer surface as an empty `200`. The gap between a correct receipt and an empty response is exactly what AXR is built to surface.

---

## Bug E: The Ghost of Version 5.0

This bug taught us the most fundamental rule of workflow assurance: *Version labels are testimony; code hashes are evidence.*

We had just upgraded the pricing engine to a new surcharge rule, bumping our internal logic from `v5.0` to `v5.1`. I deployed it, ran a few tests, and checked the receipts. The signatures were valid, the chain was intact, the verifier returned a clean green light.

But the signed claim *inside* the receipts still read:

```json
{
  "axr_version": "0.2.1",
  "agent_id": "axr:agent:eco-clean:v5.1",
  "logic_version": "5.0",
  "io": { "decision": "PRICE_CALCULATED" },
  "signature": "ed25519:a3b9…77e2"
}
```

The signature was perfectly genuine — but it was a valid signature over a *false claim*. The new v5.1 logic was the code that ran, yet every receipt still attested `logic_version: "5.0"`, because that version string was a hand-written label nobody had updated. A cryptographically sound receipt was testifying to the wrong code.

This is the subtle governance trap. If an agent commits an error and its log says it ran "v5.0-safe," but a different version actually decided, your audit trail is worse than useless — it is confidently wrong.

**The Fix:** We stopped trusting hand-written version labels. AXR receipts now embed a `logic_hash` — the SHA-256 fingerprint of the exact code (or n8n workflow JSON) that made the decision. If the running logic drifts by a single byte from the pinned production build, the hash changes and CI fails on the mismatch. The label is testimony; the hash is evidence.

---

## The Meta-Point: The Gap is Where Bugs Die

Every software system has two narratives:
1. **The External Narrative:** what the system tells the user, the database, or the web server logs (e.g., "Success," "HTTP 200," or a blank screen).
2. **The Execution Reality:** what the code actually did, step by step.

In a traditional setup, we only monitor the external narrative. We write tests that assert `response.status === 200`. But as Bug D showed, a system can return a `200 OK` while completely failing its business logic.

When you introduce **verifiable agent logs**, you pin the execution reality to a cryptographic anchor. AXR forces each decision-relevant step to output a signed receipt. Because these receipts are signed with a private key only the execution node holds, they cannot be backdated, modified, or forged after the fact — not even by the database administrator.

The gap between what the system *says* happened and what the signed receipts *prove* happened is exactly where silent bugs and governance failures are exposed. This is the deeper reason [agent logs aren't evidence](/writing/agent-logs-arent-evidence/) — a log you can edit is testimony, not proof.

Today, the ECO Clean HU booking engine has anchored **past 227 signed receipts** into an append-only Merkle tree, anchored **hourly since June 2026**. The log's integrity is checked by two independent verifiers — one in Node.js, one in pure Python — that agree byte-for-byte. You can [verify an AXR log offline yourself](/writing/verify-agent-log-offline/) with nothing but a public key.

If you are running n8n workflows, LLM agents, or automated decision engines, you are currently trusting a mutable, unverified narrative. It is time to start demanding proof.

---

### Ready to secure your workflows?
* Learn how the [AXR cryptographic protocol](/axr/) provides tamper-evident receipts for automated systems.
* Inspect our live, verifiable audit log on the [AXR Devlog](/axr/devlog/), or [verify a log yourself](/axr/verify/) in the browser.
* Read the step-by-step guide to [integrating AXR with n8n](/writing/n8n-audit-trail-tutorial/) to secure your own workflows.
