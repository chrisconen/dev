---
title: "Three Questions to Ask Before Letting AI Touch Your Customers"
seoTitle: "A Plain-English Checklist Before You Automate Customer Decisions — Chris Conen"
description: "Before you let AI book, price or message your customers, three plain-English questions decide whether you'll be able to stand behind what it does."
pubDate: 2026-06-26
primaryKeyword: "questions before using AI in my business"
keywords:
  - "is it safe to use AI for customer service"
  - "AI accountability checklist small business"
  - "what to check before automating with AI"
tags:
  - AI governance
  - AI assurance
draft: false
---

Handing customer decisions to an AI is one of those moves that feels great right
up until the first time it doesn't. The upside is obvious — speed, hours back,
fewer dull tasks. The downside only shows up later, usually as a question you
can't answer: *what exactly did it do, and can you stand behind it?*

You don't need to be technical to get ahead of this. Three plain questions, asked
before you flip the switch, tell you whether you're set up to stand behind your
automation — or just hoping nothing goes wrong.

## 1. If it makes a mistake, how would you even know?

Automation rarely fails loudly. It quietly sends the wrong email, books the wrong
slot, or tells a customer "no" for the wrong reason — and keeps running. If your
only signal is a customer complaining, you're finding out late, from the worst
possible source, with no idea how many others it happened to silently.

So: what would actually tell you? If the honest answer is "nothing, until someone
calls," that's the gap to close first. The goal isn't a perfect AI — it's a
system where a wrong decision becomes *visible* instead of slipping through. A
record that captures what each step decided makes mistakes legible; a system that
only logs "success" at the end hides them.

## 2. Who can check what it did — only you, or anyone?

This is the question most people skip, and it's the one that bites hardest.
Almost every automation keeps some kind of log. But ask: *who can verify it?* If
the answer is "me, on my own server," then in any dispute your record is worth
about as much as your own word — because you (or your developer) could have
changed it after the fact, and no one outside can rule that out.

The stronger setup produces a record **anyone** can check — a customer, an
auditor, a regulator — without access to your systems and without trusting you.
Think of the tamper strip on a medicine bottle: you don't inspect the factory,
you just look at the seal. A cryptographic **receipt** does that for a decision —
intact means untouched, broken means someone changed it. That independence is the
whole difference between a story and a record.

## 3. What would you show if a customer — or a regulator — asked?

Play it forward. A customer insists your AI promised something it didn't deliver.
Or, down the line, an auditor asks you to show how an automated decision was made
and that the record wasn't tidied up afterwards. What do you actually put on the
table?

"We used AI" won't cover it — using a tool doesn't move the responsibility onto
the tool. ("[The 'AI did it' defense is not a defense](/writing/ai-did-it-defense/)"
goes deeper on that.) And this isn't only a big-company worry: the EU AI Act's
higher-risk rules include automatic, tamper-evident logging, with the main regime
applying from 2 August 2026. The businesses that find that easy will be the ones
that started keeping verifiable records before they had to.

## Turning the three questions into a yes

Notice the three answers point at the same thing: a record of what your
automation did that is **specific** (you can see each decision), **independent**
(anyone can check it), and **tamper-evident** (a later edit shows). That's exactly
what [AXR](/axr/) is — a small, open-source layer that gives an automated
workflow a signed receipt for each decision that matters, [including in
n8n](/axr/n8n/) with a single step.

To be honest about the limit: none of this makes the AI smarter or stops it
making a bad call. It makes whatever happened *provable* — and a quiet edit
afterwards impossible to hide. For the three questions above, that's enough to
turn every "I'm not sure" into "here, check it yourself."

The fastest way to see what "check it yourself" means is to do it: a
[30-second demo](/axr/start/) with a real signed receipt you can try to break,
right in your browser. Ask the three questions before you automate — and make
sure the answer to each one is something you can show, not something you hope.
