---
title: "Your AI Made a Mistake. Can You Prove It Wasn't Your Fault?"
seoTitle: "When an AI Workflow Breaks, Whose Fault Is It? — Chris Conen"
description: "When an automated workflow goes wrong, the fight is usually about whose fault it was. Here's how to find out in seconds — and prove it — instead of guessing."
pubDate: 2026-06-26
primaryKeyword: "how to prove what an AI workflow did"
keywords:
  - "AI automation mistake whose fault"
  - "n8n workflow debugging evidence"
  - "prove a refund was issued"
tags:
  - AI governance
  - AI assurance
draft: false
---

Automation fails in a particular, maddening way. Nothing crashes. No alarm goes
off. The customer just doesn't get the thing they were promised, and by the time
you hear about it, you're staring at a chain of systems — your app, the AI step,
an integration, a payment provider, a calendar — and every one of them says
*"wasn't me."*

That's the real problem with an AI mistake. It's rarely "the AI is broken." It's
"something in a chain of five things went wrong, and you can't tell which." And
until you can, you can't fix it, you can't bill the right party, and you can't
honestly answer the customer.

## "The system says it's fine" is not the same as "it's fine"

Here's a true-to-life one. An automation processes a refund. The log says
`refund_processed: true`. The customer says the money never arrived. The bank
says it never received a request. Three systems, three confident answers, and
they can't all be right.

Where did it actually break? Did the AI step decide to refund and record it? Did
it call the payment provider, or just *think* it did? Did the provider get the
request and drop it? With ordinary logs you're reduced to guessing — and to
giving the refund again "to be safe," because you can't prove you already did.

This isn't hypothetical. When a signed audit layer went into a live booking
workflow, it immediately surfaced exactly this shape of bug: a run that returned
an empty response to the customer while the internal record showed a complete,
correct five-step decision. The gap between "what the customer got" and "what the
system did" is invisible until something makes it visible. (Four such
pre-existing bugs turned up in the first week — none of them caused by the audit
layer; it just made them readable.)

## You need a record of each step, not one log at the end

The fix isn't a smarter AI. It's a record that's specific enough to point at the
exact link that broke — and trustworthy enough that the other party can't wave it
away.

That's what a per-step **receipt** gives you. Instead of one log line at the end
("refund processed"), each consequential step leaves its own signed record: what
it received, what it decided, and when. So when something goes wrong you can see
the chain — *the AI decided to refund, issued the instruction at 14:02, here's the
exact request* — and the gap jumps out. Either the receipt for the payment step
exists (so the break is downstream, at the provider) or it doesn't (so the break
is upstream, in your workflow). Minutes, not guesswork.

And because each receipt is signed and tamper-evident, it's not just useful to
you. When the dispute is "your system vs. their system," a record the other side
can check independently — without trusting you — is what ends the argument.
[AXR](/axr/) is a small, open-source layer that produces exactly these receipts
for automated workflows, [including n8n](/axr/n8n/).

## What this does and doesn't get you

Be clear-eyed about it. A receipt won't stop the AI from making a bad call, and
it won't prove the call was *right*. What it does is make the truth
*recoverable*: it shows precisely what happened at each step, and it makes a
later edit impossible to hide. In a "whose fault is it" fight, that's usually the
whole game — you stop arguing about whose word to trust and start looking at a
record nobody can quietly change.

It also scales down. You don't need a compliance department. A solo operator who
can pull up a signed receipt showing the refund instruction went out — with a
timestamp — is in a completely different position from one who can only say "the
system says it's fine."

## Seeing is faster than reading

The quickest way to understand what a tamper-evident receipt actually is: look at
one and try to break it. There's a [30-second demo](/axr/start/) — a real signed
receipt where you edit a field and watch the seal turn red. Once you've seen the
seal break, the whole idea clicks, and "can you prove what your AI did?" stops
being a scary question and becomes a button you can press.

The next time something in your automation goes sideways, you want to be the
person who can say *"here's exactly what happened, and here's the proof"* —
not the one giving a second refund and hoping.
