---
title: "The \"AI Did It\" Defense Is Not a Defense"
seoTitle: "Are You Liable When Your AI Makes a Mistake? — Chris Conen"
description: "If your AI books, prices or messages on your behalf, \"the AI did it\" won't get you off the hook. Here's what actually protects you when a decision is questioned."
pubDate: 2026-06-26
primaryKeyword: "am I liable if my AI makes a mistake"
keywords:
  - "responsible for AI mistakes in business"
  - "prove what an AI agent did"
  - "AI customer dispute evidence"
tags:
  - AI governance
  - AI assurance
draft: false
---

You handed a few decisions to an AI. It books the appointments, sets some
prices, sends the confirmations, processes the odd refund. It mostly works, it
saves you hours, and on a good week you barely think about it.

Then a customer calls, angry. "Your system told me X." Or a supplier disputes a
price. Or, further down the road, an auditor asks you to show how an automated
decision was made. And the sentence that forms in your head — *but the AI did
that, not me* — is the one sentence that will not help you.

## Using a tool doesn't move the responsibility to the tool

This is the uncomfortable part, and it's worth saying plainly: in almost every
setting that matters, using software to make a decision does not transfer the
responsibility for that decision onto the software. If your business took the
action, your business answers for it. "We used AI" is context, not a defense —
and if anything it raises the obvious follow-up: *then show us what it did.*

That follow-up is the whole problem. Most people who've automated something with
AI cannot answer it cleanly. Not because they did anything wrong — but because
the only record of what happened is a log file on their own system, and a log
file is not the same thing as proof.

## "I don't know" is the expensive answer

When a decision is questioned — by a customer, a partner, or a regulator — there
are really only two outcomes. Either you can show what your system actually did,
on what input, and when; or you can't.

"I can't" is rarely free. It's a refund you give to make a complaint go away
because you can't prove you were right. It's a chargeback you eat. It's a
dispute that drags on because it's your word against theirs and nobody has a
neutral record. The cost isn't usually a dramatic lawsuit — it's the quiet,
repeated tax of *not being able to prove your own case.*

## "But I have logs" — and that's the trap

Most systems do write a log. Here's the problem with leaning on it: **you wrote
that log, it lives on your server, and you (or your developer) can change it.**

That's not an accusation — it's just how ordinary logs work. But it means that
in a dispute, your own log carries about as much weight as your own word. The
other side can reasonably say: *you could have edited that after the fact.* And
they'd be right that nobody outside your systems can rule it out.

So the log that was supposed to protect you doesn't, at the exact moment you
need it most.

## What actually helps: a record someone else can check

The fix isn't a better log. It's a different kind of record — one that carries
its own proof that it hasn't been changed, and that **anyone** can check without
trusting you or getting access to your systems.

Think of the seal on a parcel, or the tamper strip on a medicine bottle. You
don't need to understand how it's made. You just look: seal intact, nobody
opened it; seal broken, someone did. A cryptographic *receipt* does the same for
a decision your software made. Each consequential action gets a sealed record of
what went in, what it decided, and when. Change a single character later and the
seal visibly breaks. That's the entire idea — and it's enough to turn "trust me"
into "check it yourself."

That's what [AXR](/axr/) is: a small, open-source layer that gives your
automation a receipt for each decision that matters. The point is not that the
AI becomes smarter or stops making mistakes. The point is that whatever it did,
you — and the other side — can establish it later, without anyone having to take
your word for it.

If you'd rather see it than read about it, there's a
[30-second demo in plain English](/axr/start/): a real signed receipt you can
try to break, right in your browser. Edit the price, watch the seal turn red.

## Be clear about what this does and doesn't do

In the spirit of not overselling: a receipt proves the record hasn't changed
since it was signed. It does **not** prove the decision was *correct*, or that
the AI was telling the truth in the moment. What it does is make the truth
*recoverable* — and make a quiet edit afterwards impossible to hide. If the AI
got something wrong, the receipt won't pretend otherwise; it will let you show
exactly what happened, which is usually what you need.

It's also not only a big-company concern. A solo webshop owner who can prove a
refund was actually issued is in a far stronger position than one who can only
shrug. And the regulatory direction is the same way: the EU AI Act's higher-risk
rules include automatic, tamper-evident logging, with the main regime applying
from 2 August 2026. The teams who'll find that easy are the ones who started
keeping verifiable records before they had to.

## The short version

- "The AI did it" doesn't move the responsibility off you.
- When a decision is questioned, "I can't prove what happened" is the costly answer.
- Your own logs don't settle it, because you could have changed them.
- A receipt anyone can check does — it makes what happened provable, and edits visible.

You don't have to take my word for any of this. That's the whole point: you can
[check a real receipt yourself](/axr/start/), and decide.
