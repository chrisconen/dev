// Per-locale TEXT for /axr, consumed by src/components/AxrPage.astro. Only
// translatable prose lives here; structural/non-translatable data (stat numbers,
// maturity versions/states, code blocks, pipeline flags, hrefs) lives in the
// component and is zipped with these arrays by index. EN is canonical; HU/DE/ES
// are translations (DE/ES added next). Fields ending "Html" allow inline markup.

export const LOCALES = ['en', 'hu', 'de', 'es'];

export const AXR: Record<string, any> = {
  en: {
    meta: {
      title: 'Agent execution receipts — tamper-evident audit trail for AI agents & n8n (AXR)',
      description:
        'AXR is an open-source accountability layer for AI agents: Ed25519-signed, tamper-evident execution receipts. Live in production with hourly Merkle anchoring, two independent verifiers, and an EU AI Act / GDPR control mapping.',
    },
    hero: {
      kickerMid: 'Agent eXecution Receipts',
      kickerEnd: 'Open source · MIT',
      h1Html: 'Make the agent show its <em>receipts.</em>',
      ledeHtml:
        'AXR is an open-source accountability layer for AI agents and automated workflows: cryptographically signed, tamper-evident execution receipts that turn "trust me" into "verify me". It is live in production today, anchored hourly, and verifiable by anyone holding the public key.',
      btns: ['AXR on GitHub', 'Verify a log yourself', 'Using n8n?', 'Not technical? Start here'],
      chips: [
        { label: 'Protocol contract', strong: '1.5.3 (frozen 1.x)' },
        { label: 'Live profile', strong: '0.2.1 core · hourly anchoring' },
        { label: 'Dependencies', strong: 'Zero' },
      ],
    },
    stats: [
      'Maturity layers, one repo — core to the witness lifecycle + SDK',
      'Test suites green, incl. JS↔Python cross-impl parity (core + governance)',
      'Tamper mutations rejected by the verifier',
      'Independent verifiers (Node + pure-Python) agree byte-for-byte',
      'Security findings caught by multi-agent review before release',
      'Runtime dependencies — standard crypto only',
    ],
    problem: {
      label: 'The problem',
      h2Html: 'Logs can be edited. That used to be <em>fine.</em>',
      p1Html:
        "AI agents now take consequential actions: they call tools, change records, move money, send messages on someone's behalf. The audit trail for all of that is usually a log file owned by whoever ran the agent — mutable, deletable, and unverifiable by anyone outside the operator's own infrastructure.",
      p2Html:
        'After the fact, there is no reliable way to answer the questions that matter: <em>which</em> agent did this, what did it receive as input, what did it decide and on what basis, was the record altered afterwards, and why was a customer told "no"?',
      p3Html:
        "Regulators have noticed. The EU AI Act makes automatic event logging a design requirement for high-risk AI systems (Article 12), obliges deployers to retain those logs (Article 26), and its high-risk obligations apply from 2 August 2026. In the US, NIST's Center for AI Standards and Innovation launched the AI Agent Standards Initiative in February 2026, with agent security and identity as core pillars.",
      pullquoteHtml: 'A log you can rewrite is a story. A receipt you can verify is a <em>record.</em>',
    },
    whatIs: {
      label: 'What it is',
      h2Html: 'One receipt per consequential <em>action.</em>',
      p1Html:
        'For each action that matters, AXR emits a receipt: the action taken, hashes of its inputs and outputs, a timestamp, the identity of the agent, and an Ed25519 signature over the canonicalised record. It proves one thing precisely — that a given workflow, on a given input, made a given decision, and that the record has not changed since.',
      p2Html:
        "That buys two distinct things. <strong>Tamper-evidence</strong> is the cryptographic floor: the signature proves the record has not changed. <strong>Behavioral legibility</strong> is what earns its keep day to day — the receipt makes the workflow's actual behaviour readable enough that an internal contradiction surfaces even when nothing was tampered with and every signature is valid.",
      p3Html:
        'It is deliberately <em>not</em> a workflow builder, an agent framework, or an observability platform. It is the thin accountability layer that sits underneath those tools. Two receipt types carry the load: a <strong>step receipt</strong> records a single decision-relevant node, and a <strong>workflow receipt</strong> ties one run\'s steps into a signed, chained record. Steps chain within a run; runs chain across an agent\'s history — so deleting any receipt breaks the chain, and altering any receipt breaks the signature.',
      sampleCaption: 'Illustrative step receipt — the shape of one signed action',
      verdictStamp: 'Signature valid',
      verdictNoteHtml:
        'Change one byte of any field and the signature no longer verifies. That is the whole principle — and it is enough.',
    },
    whoFor: {
      label: 'Who it is for',
      h2Html: 'Built for the people who have to <em>answer for it.</em>',
      introP: 'AXR earns its keep wherever an automated decision can be questioned later and someone has to stand behind the answer.',
      gainLabel: 'What you get:',
      personas: [
        { who: 'Teams running AI agents', title: 'You ship agents that take real actions', body: 'They book, price, message, move money or change records on someone’s behalf. Today the only account of what happened is a log file you own and could edit.', gain: 'A signed receipt per consequential action — proof, not an editable story.' },
        { who: 'Compliance & GRC', title: 'You answer for the EU AI Act', body: 'Article 12 makes automatic event logging a design requirement for high-risk systems; Article 26 puts retention on deployers, applying from 2 August 2026.', gain: 'Records designed to map onto those duties, with an auditor-ready report.' },
        { who: 'Auditors & investigators', title: 'You need to verify, not to trust', body: 'After the fact you have to establish which agent did what, on which input, and whether the record was altered — without taking the operator’s word for it.', gain: 'Offline verification from nothing but a public key. No operator access needed.' },
        { who: 'Platform & infra builders', title: 'You want an accountability primitive', body: 'AXR is not an agent framework or an observability platform. It is the thin, boring layer those tools can sit on — standard crypto, zero dependencies, MIT.', gain: 'A frozen wire format and two independent verifiers to build against.' },
        { who: 'Privacy officers', title: 'You owe the right to erasure', body: 'GDPR Article 17 erasure appears to fight an append-only log: how do you delete personal data from a record whose whole point is that it cannot change?', gain: 'Field-level salted Merkle commitments — erase the cleartext, signatures still hold.' },
        { who: 'Security operations', title: 'You watch for tampering', body: 'An independent monitor turns latent protection into active detection: equivocation, truncation, history rewrites and unauthorized key swaps.', gain: 'OCSF-shaped Detection Findings and webhook delivery into your SIEM.' },
      ],
    },
    how: {
      label: 'How it works',
      h2Html: 'Mark the steps. Sign the record. Anchor it where you can\'t <em>rewrite it.</em>',
      introHtml:
        'The receipt generator is a single Code node placed at the end of a workflow, before the response. It reads the outputs of the decision-relevant nodes and produces all receipts in one pass. Anchoring and monitoring run <em>outside</em> the workflow, so the live hot path gains no latency and no new dependency.',
      pipeline: ['Mark steps', 'Sign receipts', 'Append to JSONL', 'Anchor (Merkle / STH)', 'Verify offline', 'Monitor over time'],
      steps: [
        { strong: 'Mark the decision nodes.', text: 'Each decision-relevant node attaches the exact input it consumed, so the receipt hashes what the step actually saw — not a uniform proxy.' },
        { strong: 'Generate & sign.', text: 'One pass emits the step and workflow receipts, each signed with Ed25519 over a canonical (RFC 8785) serialisation. Generation is fail-open: a missing key degrades to a loud error, it never breaks the business process it attests.' },
        { strong: 'Append to an immutable log.', text: 'Receipts are written one per line to an append-only JSON Lines file that survives restarts.' },
        { strong: 'Anchor independently.', text: 'A sidecar batches receipt hashes into an RFC 6962 Merkle tree and commits Signed Tree Heads to an external, append-only backend (OpenTimestamps/Bitcoin, Rekor, RFC 3161). This introduces a party the operator does not control — the honest analogy is Certificate Transparency, not self-signed HTTPS.' },
        { strong: 'Verify, by anyone.', text: 'A standalone, zero-dependency script verifies a whole chain offline. Exit code 0 means valid, 1 means a problem was found.' },
        { strong: 'Monitor, over time.', text: 'An independent monitor keeps its own journal of the tree heads it has witnessed and raises an alarm when a new view contradicts the old one — catching equivocation, truncation, history rewrites and unauthorized key swaps.' },
      ],
      verifyHeadingHtml: '<strong>Verify a log yourself — the whole command:</strong>',
      afterCodeHtml: 'No terminal? <a href="/axr/verify/">Drop a log into the in-browser verifier</a> — it runs the same signature, Merkle-root and witness checks locally, with nothing uploaded.',
    },
    design: {
      label: 'The design',
      h2Html: 'Boring primitives, on <em>purpose.</em>',
      introP: 'Assurance work should be auditable by people who did not write it. So AXR uses only standard, well-understood building blocks — and states its goals plainly:',
      rows: [
        { dt: 'Signed', dd: 'Ed25519 over a canonical serialisation of the receipt. Re-signing a tampered record requires the private key; without it, edits are visible.' },
        { dt: 'Self-contained', dd: "A receipt verifies offline with nothing but the public key. No access to the operator's infrastructure, no trust in their database." },
        { dt: 'Tamper-evident', dd: 'Any change to a receipt breaks its signature; deleting one breaks the chain. Anchoring then makes silent rewriting detectable, not just evident.' },
        { dt: 'Boring on purpose', dd: 'SHA-256, Ed25519, canonical JSON, RFC 6962 Merkle trees. No novel cryptography, and zero runtime dependencies.' },
      ],
    },
    maturity: {
      label: 'Maturity',
      h2Html: 'One repository, layered by how far each part has <em>earned trust.</em>',
      introP: 'AXR ships as a single repo spanning several maturity levels. The point of this table is honesty: read a feature\'s level before you depend on it. The 0.2 wire format is frozen — older logs verify byte-for-byte under the current verifier, and all later work is additive.',
      th: ['Layer', 'Version', 'Maturity'],
      layers: [
        { layer: 'Core — signing, chaining, per-step input hashing, canonical JSON, cross-impl parity', note: 'Production-tested, frozen wire format; hardened n8n node.', label: 'Stable' },
        { layer: 'Anchoring — Merkle batching, Signed Tree Heads, monitor, external timestamping', note: 'Hourly anchoring cron live in production; separate STH key.', label: 'Deployed' },
        { layer: 'Redactable receipts, side-effect attestation, trust root, key-role separation', note: 'Tested; frozen in the 1.0 contract.', label: 'Stable' },
        { layer: 'Key succession — root-anchored rotation, distinguishable from compromise', note: 'Cross-impl parity + adversarial review; not yet exercised by the pilot.', label: 'Stable' },
        { layer: 'SIEM export — OCSF Detection Finding mapping + generic webhook', note: 'OCSF-shaped output; best-effort delivery by design.', label: 'Stable' },
        { layer: 'Root-lifecycle hardening — quorum (M-of-N) root, rotation, revocation, ceremony CLI', note: 'Cross-impl parity; quorum policy is part of the threat model.', label: 'Stable' },
        { layer: 'Control log — anchored governance distribution + partial disclosure', note: 'Closes the out-of-band withholding gap; 1.5 adds off-wire inclusion proof for a single record (prove one, reveal none of the rest).', label: 'Stable' },
        { layer: 'Witness lifecycle — cosigning, emergency revocation, temporary auto-expiring suspension', note: 'Preventive equivocation defence; the full slow-revoke → revoke → suspend lifecycle, cross-impl.', label: 'Stable' },
        { layer: "Library SDK — require('axr'): a frozen public API surface + programmatic verify()", note: 'Surface pinned by a test; axr.verify() runs the canonical verifier, so it can never diverge.', label: 'Stable' },
      ],
    },
    proofProd: {
      label: 'Proof in production',
      h2Html: 'An honest receipt makes silent failures <em>loud.</em>',
      p1Html:
        "AXR runs in production on a live booking workflow for ECO Clean HU — six of the workflow's twenty nodes are receipt-bearing, and the log — now past 227 signed receipts — has been anchored hourly into one Merkle tree since June 2026. Standing up that accountability layer did something its operator did not expect: it surfaced four real bugs that pre-dated AXR, and two defects in AXR's own tooling.",
      p2Html:
        "None of these involved tampering or an invalid signature. They are behavioral legibility, not tamper-evidence: the receipt made the run readable enough that a contradiction between intended and executed branch surfaced on its own. Bug B was exactly that — a rejection that still fired the success branch, caught the moment the receipt's outcome was read.",
      findings: [
        { tag: 'Pilot — Bug B', text: 'Every run was firing all three response branches at once: a ZONE_INCOMPATIBLE rejection still sent a success email. The receipt’s final_status made the contradiction immediate. Fixed with a Switch routing on the receipt outcome.' },
        { tag: 'Pilot — Bug C', text: 'Rejections returned "unknown_error" with the customer’s own message echoed back — the real reason was lost. The receipt recorded the correct status on every run, contradicting what customers received.' },
        { tag: 'Pilot — Bug D', text: 'A recheck conflict produced an HTTP 200 with an empty body, while the receipt was a complete, signed 5-step SLOT_TAKEN chain. The gap between a correct receipt and an empty response is exactly what AXR is built to surface.' },
        { tag: 'Pilot — Bug E', text: 'After a bugfix bumped the logic to v5.1, every receipt kept attesting v5.0 — valid signatures over a false claim about which code decided. Now code-hash fingerprints replace hand-written labels, and CI fails on drift. Version labels are testimony; code hashes are evidence.' },
        { tag: 'In AXR itself', text: "A sandbox dry-run of the anchoring rollout caught two of AXR's own defects before they touched the live log: cross-version anchoring would have invalidated every legacy signature, and the Python verifier silently ignored the separate-key flag. Both fixed before the first production anchor was cut. A dry-run that breaks in a sandbox is a feature." },
      ],
    },
    adversarial: {
      label: 'Adversarial proof',
      h2Html: 'The "tamper-evident" claim, tested like an <em>attacker would.</em>',
      introP: 'A claim of integrity is worth only as much as the attempts to break it. AXR proves its central claim systematically rather than rhetorically:',
      rows: [
        { dt: '15 / 15 rejected', dd: 'A single valid, anchored, generative receipt log is subjected to 15 distinct mutations — body tampering, step deletion, signature swaps, dropped tree heads, tampered inclusion proofs, wrong-key re-signing, and more. The verifier rejects all fifteen; the untouched control passes.' },
        { dt: 'Two implementations', dd: 'Credibility, the way Certificate Transparency earned it: a second, fully independent verifier in pure Python — its own canonicalizer, a pure-Python Ed25519 validated against the RFC 8032 test vectors, and the RFC 6962 Merkle logic. It must agree with the Node verifier on every accept and every reject.' },
        { dt: 'Byte-identical', dd: 'The "anyone can verify, in any language" promise rests on deterministic canonicalization. The serializer follows RFC 8785 and throws on NaN / Infinity / undefined rather than silently corrupting them. Cross-language byte vectors are pinned as the conformance contract.' },
        { dt: 'CI on every push', dd: 'The full suite — including JS↔Python parity — runs across Node 18 / 20 / 22 and Python 3.10 / 3.11 / 3.12 on every change.' },
      ],
    },
    standards: {
      label: 'Standards & compliance',
      h2Html: 'Built toward where the rules are <em>going.</em>',
      p1Html:
        "AXR is designed to map onto the record-keeping duties that are arriving — not to claim certified compliance with any of them. The EU AI Act's Article 12 requires high-risk systems to automatically record events for traceability, and Article 26 puts retention on deployers. GDPR Article 17 pulls the other way, toward erasure. NIST's AI Agent Standards Initiative is shaping the US side around identity and auditability. Signed, independently verifiable receipts are a primitive every one of those directions can build on.",
      p2Html:
        'Two pieces make that concrete. <strong>Redactable receipts</strong> resolve the GDPR-versus-append-only tension: sensitive fields are committed through a salted field-level Merkle tree, so the cleartext can be erased later while the signature, the chain, and the already-anchored proof all still hold. And the <strong>Compliance Report Generator</strong> turns a raw log into an auditor-ready HTML report — integrity, the key-governance timeline, anchoring status, and an EU AI Act Art. 12 / GDPR control mapping.',
      smallHtml:
        'Precision matters here: "designed to map onto" is the claim. The report is a view over the verifier\'s verdict, not a replacement for it, and it asserts nothing it did not check.',
    },
    dogfooding: {
      label: 'Dogfooding',
      h2Html: 'AXR proves its own <em>construction.</em>',
      p1Html:
        'AXR was built by a three-AI workbench — Fable, Meridian and NEXUS — over a shared, append-only journal. That journal is itself a verifiable AXR log: every entry is an Ed25519-signed receipt, the whole set is Merkle-anchored into one signed tree head, and that tree head was cosigned by the two reviewer agents — each in its own process, with a key it generated and held itself, so the orchestrator never saw a private key. The committed snapshot re-verifies under the full 1.0 stack, in your browser.',
      smallHtml:
        'Honest framing: this proves the journal is unaltered since signing, not that any entry was true when written. The cosignatures are genuinely process-independent; the one remaining gap to full zero-trust is that custody is still same-machine — production runs the witnesses in separate security zones.',
      cta: 'Verify the dev-log live',
    },
    statusLimits: {
      label: 'Status & limits',
      h2Html: 'Live, open, and honest about <em>both.</em>',
      introHtml:
        'AXR is open source, MIT-licensed, and developed in public. Since 1.0 the wire format and the CLI/verifier contract are frozen for 1.x; 1.1–1.4 added only backward-compatible records and a frozen library SDK. The core and anchoring layers run in production; the higher layers — key succession, quorum roots, the control log, and the full witness lifecycle (cosigning, emergency revocation, temporary suspension) — are tested, cross-impl verified, and additive, but not yet exercised by the live pilot. The project stays honest about its own gaps:',
      items: [
        { tag: 'Next', text: 'Switch the production anchor backend from local to OpenTimestamps (Bitcoin) — a single flag, once the cadence has run stably.' },
        { tag: 'Next', text: 'Run the independent monitor at a party outside the operator, turning split-view / equivocation detection from latent into active.' },
        { tag: 'Next', text: 'Exercise generative (LLM) step receipts on a live workflow — supported and tested end-to-end, not yet in production.' },
        { tag: 'Next', text: "Error-path receipts — sign failed runs too, via a mark node on the workflow's error path. A failure is often the most important thing to have evidence of; this extends generator coverage and leaves the frozen 1.x wire format untouched." },
        { tag: 'Open', text: 'Self-declared agent identity, and PEM-file (not hardware-grade) key storage — both deliberately out of the current scope.' },
      ],
      cta: 'Follow the repository',
    },
    proof: {
      label: 'Proof',
      h2Html: 'This site runs on the same <em>primitive.</em>',
      pHtml:
        "Every deploy of chrisconen.dev publishes a manifest of every file on the site, hashed with SHA-256 and signed with Ed25519. Your browser can verify the signature and re-hash any file against the manifest. It is AXR's core idea applied to a build pipeline instead of an agent — same receipt, different actor.",
      cta: 'Verify this site',
    },
  },

  hu: {
    meta: {
      title: 'Agent execution receipts — manipuláció-detektáló audit-nyomvonal AI-ágenseknek és n8n-hez (AXR)',
      description:
        'Az AXR nyílt forrású elszámoltathatósági réteg AI-ágenseknek: Ed25519-aláírt, manipuláció-detektáló végrehajtási bizonylatok. Élesben fut óránkénti Merkle-lehorgonyzással, két független ellenőrzővel és EU AI Act / GDPR kontroll-térképpel.',
    },
    hero: {
      kickerMid: 'Agent eXecution Receipts',
      kickerEnd: 'Nyílt forrású · MIT',
      h1Html: 'Mutassa meg az ágens a <em>bizonylatait.</em>',
      ledeHtml:
        'Az AXR nyílt forrású elszámoltathatósági réteg AI-ágenseknek és automatizált folyamatoknak: kriptográfiailag aláírt, manipuláció-detektáló végrehajtási bizonylatok, amelyek a „bízz bennem"-et „ellenőrizd"-re cserélik. Ma is élesben fut, óránként lehorgonyozva, és bárki ellenőrizheti, akinél ott a nyilvános kulcs.',
      btns: ['AXR a GitHubon', 'Ellenőrizz egy logot', 'n8n-t használsz?', 'Nem vagy technikai? Kezdd itt'],
      chips: [
        { label: 'Protokoll-szerződés', strong: '1.5.3 (fagyasztott 1.x)' },
        { label: 'Éles profil', strong: '0.2.1 mag · óránkénti horgonyzás' },
        { label: 'Függőségek', strong: 'Nulla' },
      ],
    },
    stats: [
      'Érettségi réteg, egy repó — a magtól a witness-életcikluson át az SDK-ig',
      'Zöld teszt-suite, a JS↔Python kereszt-impl paritással együtt (mag + governance)',
      'A verifier által elutasított manipulációs mutáció',
      'Független ellenőrző (Node + tiszta Python) byte-azonosan egyetért',
      'Multi-agent review által kiadás előtt fogott biztonsági találat',
      'Futásidejű függőség — csak szabványos kriptográfia',
    ],
    problem: {
      label: 'A probléma',
      h2Html: 'A logokat át lehet írni. Ez régen <em>rendben volt.</em>',
      p1Html:
        'Az AI-ágensek ma érdemi műveleteket végeznek: eszközöket hívnak, rekordokat módosítanak, pénzt mozgatnak, üzeneteket küldenek valaki nevében. Mindennek az audit-nyomvonala általában egy logfájl, amely azé, aki az ágenst futtatta — módosítható, törölhető, és az üzemeltető saját infrastruktúráján kívülről senki sem tudja ellenőrizni.',
      p2Html:
        'Utólag nincs megbízható mód a fontos kérdések megválaszolására: <em>melyik</em> ágens csinálta ezt, mit kapott bemenetnek, mit döntött és mi alapján, módosították-e a rekordot utólag, és miért mondtak az ügyfélnek „nem"-et?',
      p3Html:
        'A szabályozók felfigyeltek. Az EU AI Act az automatikus eseménynaplózást tervezési követelménnyé teszi a magas kockázatú AI-rendszereknél (12. cikk), megőrzésre kötelezi a felhasználókat (26. cikk), és a magas kockázatú kötelezettségek 2026. augusztus 2-tól alkalmazandók. Az USA-ban a NIST AI-szabványügyi központja 2026 februárjában indította az AI Agent Standards Initiative-ot, középpontban az ágens-biztonsággal és -identitással.',
      pullquoteHtml: 'A napló, amit átírhatsz, egy történet. A bizonylat, amit ellenőrizhetsz, egy <em>rekord.</em>',
    },
    whatIs: {
      label: 'Mi ez',
      h2Html: 'Egy bizonylat minden érdemi <em>műveletre.</em>',
      p1Html:
        'Minden számító műveletről az AXR kibocsát egy bizonylatot: a végrehajtott művelet, a bemenetei és kimenetei hash-ei, egy időbélyeg, az ágens identitása, és egy Ed25519-aláírás a kanonizált rekord felett. Pontosan egy dolgot bizonyít — hogy egy adott folyamat egy adott bemeneten egy adott döntést hozott, és a rekord azóta nem változott.',
      p2Html:
        'Ez két különböző dolgot ad. A <strong>manipuláció-detektálás</strong> a kriptográfiai padló: az aláírás bizonyítja, hogy a rekord nem változott. A <strong>viselkedés-olvashatóság</strong> az, ami napról napra megtérül — a bizonylat annyira olvashatóvá teszi a folyamat tényleges viselkedését, hogy egy belső ellentmondás akkor is felszínre kerül, ha semmit sem manipuláltak és minden aláírás érvényes.',
      p3Html:
        'Szándékosan <em>nem</em> workflow-építő, nem ágens-keretrendszer, nem megfigyelő-platform. Ez a vékony elszámoltathatósági réteg, amely ezek alatt ül. Két bizonylattípus viszi a terhet: egy <strong>lépés-bizonylat</strong> egyetlen döntés-releváns node-ot rögzít, egy <strong>folyamat-bizonylat</strong> pedig egy futás lépéseit fűzi aláírt, láncolt rekordba. A lépések egy futáson belül láncolódnak; a futások az ágens előzményein át — így bármely bizonylat törlése elszakítja a láncot, bármely módosítása pedig eltöri az aláírást.',
      sampleCaption: 'Szemléltető lépés-bizonylat — egy aláírt művelet alakja',
      verdictStamp: 'Aláírás érvényes',
      verdictNoteHtml:
        'Változtass meg egyetlen bájtot bármelyik mezőben, és az aláírás már nem verifikál. Ez az egész elv — és ennyi elég.',
    },
    whoFor: {
      label: 'Kinek szól',
      h2Html: 'Azoknak, akiknek <em>felelniük kell érte.</em>',
      introP: 'Az AXR ott térül meg, ahol egy automatikus döntést később megkérdőjelezhetnek, és valakinek ki kell állnia a válasz mögött.',
      gainLabel: 'Amit kapsz:',
      personas: [
        { who: 'AI-ágenseket futtató csapatok', title: 'Olyan ágenseket adsz ki, amik valódi műveleteket végeznek', body: 'Foglalnak, áraznak, üzennek, pénzt mozgatnak vagy rekordokat módosítanak valaki nevében. Ma az egyetlen feljegyzés a történtekről egy logfájl, ami a tiéd, és átírhatnád.', gain: 'Aláírt bizonylat minden érdemi műveletről — bizonyíték, nem szerkeszthető történet.' },
        { who: 'Compliance & GRC', title: 'Te felelsz az EU AI Act-ért', body: 'A 12. cikk tervezési követelménnyé teszi az automatikus eseménynaplózást a magas kockázatú rendszereknél; a 26. cikk megőrzésre kötelezi a felhasználókat, 2026. augusztus 2-tól.', gain: 'E kötelezettségekre tervezett rekordok, auditor-kész riporttal.' },
        { who: 'Auditorok & vizsgálók', title: 'Ellenőrizni kell, nem bízni', body: 'Utólag meg kell állapítanod, melyik ágens mit csinált, milyen bemeneten, és módosították-e a rekordot — anélkül, hogy az üzemeltető szavát kéne elfogadnod.', gain: 'Offline ellenőrzés pusztán egy nyilvános kulcsból. Nem kell üzemeltetői hozzáférés.' },
        { who: 'Platform- és infra-építők', title: 'Elszámoltathatósági primitív kell', body: 'Az AXR nem ágens-keretrendszer és nem megfigyelő-platform. Ez a vékony, unalmas réteg, amelyre ezek az eszközök ráülhetnek — szabványos kriptó, nulla függőség, MIT.', gain: 'Fagyasztott wire-formátum és két független ellenőrző, amire építhetsz.' },
        { who: 'Adatvédelmi felelősök', title: 'A törléshez való jog rajtad van', body: 'A GDPR 17. cikk szerinti törlés látszólag szemben áll egy csak-hozzáfűzhető naplóval: hogyan törölsz személyes adatot egy olyan rekordból, amelynek pont az a lényege, hogy nem változhat?', gain: 'Mezőszintű, sózott Merkle-elköteleződések — töröld a tiszta szöveget, az aláírások állnak.' },
        { who: 'Biztonsági üzemeltetés', title: 'A manipulációt figyeled', body: 'Egy független monitor a lappangó védelmet aktív detektálássá alakítja: equivocation, csonkítás, történet-átírás és jogosulatlan kulcscsere.', gain: 'OCSF-formájú Detection Finding-ek és webhook-kézbesítés a SIEM-edbe.' },
      ],
    },
    how: {
      label: 'Hogyan működik',
      h2Html: 'Jelöld a lépéseket. Írd alá a rekordot. Horgonyozd le oda, ahol nem <em>írhatod át.</em>',
      introHtml:
        'A bizonylat-generátor egyetlen Code node a workflow végén, a válasz előtt. Beolvassa a döntés-releváns node-ok kimeneteit, és egy menetben előállítja az összes bizonylatot. A horgonyzás és a monitorozás a folyamaton <em>kívül</em> fut, így az éles hot-path nem lassul és nem kap új függőséget.',
      pipeline: ['Lépések jelölése', 'Bizonylatok aláírása', 'JSONL-be fűzés', 'Horgonyzás (Merkle / STH)', 'Offline ellenőrzés', 'Monitorozás időben'],
      steps: [
        { strong: 'Jelöld a döntési node-okat.', text: 'Minden döntés-releváns node csatolja a pontos bemenetet, amit feldolgozott, így a bizonylat azt hash-eli, amit a lépés valóban látott — nem egy egységes helyettesítőt.' },
        { strong: 'Generálj & írj alá.', text: 'Egy menet kibocsátja a lépés- és folyamat-bizonylatokat, mindegyiket Ed25519-cel aláírva egy kanonikus (RFC 8785) szerializálás felett. A generálás fail-open: hiányzó kulcs hangos hibára degradál, de sosem töri el az üzleti folyamatot, amit tanúsít.' },
        { strong: 'Fűzd egy megváltoztathatatlan logba.', text: 'A bizonylatok soronként egy csak-hozzáfűzhető JSON Lines fájlba kerülnek, amely túléli az újraindításokat.' },
        { strong: 'Horgonyozd le függetlenül.', text: 'Egy sidecar a bizonylat-hash-eket RFC 6962 Merkle-fába gyűjti, és aláírt fa-fejeket (STH) köt egy külső, csak-hozzáfűzhető backendhez (OpenTimestamps/Bitcoin, Rekor, RFC 3161). Ez behoz egy felet, amelyet az üzemeltető nem irányít — a becsületes hasonlat a Certificate Transparency, nem az önaláírt HTTPS.' },
        { strong: 'Ellenőrizze bárki.', text: 'Egy önálló, nulla-függőségű szkript egy teljes láncot offline ellenőriz. A 0-s kilépési kód érvényeset, az 1-es talált hibát jelent.' },
        { strong: 'Monitorozz időben.', text: 'Egy független monitor saját journalban őrzi a látott fa-fejeket, és riaszt, ha egy új nézet ellentmond a réginek — elkapva az equivocationt, a csonkítást, a történet-átírást és a jogosulatlan kulcscserét.' },
      ],
      verifyHeadingHtml: '<strong>Ellenőrizz egy logot magad — a teljes parancs:</strong>',
      afterCodeHtml: 'Nincs terminál? <a href="/axr/verify/">Húzz be egy logot a böngészős ellenőrzőbe</a> — ugyanazokat az aláírás-, Merkle-gyökér- és witness-ellenőrzéseket futtatja helyben, feltöltés nélkül.',
    },
    design: {
      label: 'A felépítés',
      h2Html: 'Unalmas primitívek, <em>szándékosan.</em>',
      introP: 'A biztosítási munkát olyanoknak is auditálhatónak kell lennie, akik nem írták. Ezért az AXR csak szabványos, jól értett építőelemeket használ — és nyíltan kimondja a céljait:',
      rows: [
        { dt: 'Aláírt', dd: 'Ed25519 a bizonylat kanonikus szerializálása felett. Egy manipulált rekord újra-aláírásához kell a privát kulcs; nélküle a módosítások láthatók.' },
        { dt: 'Önálló', dd: 'Egy bizonylat offline verifikál pusztán a nyilvános kulccsal. Nem kell hozzáférés az üzemeltető infrastruktúrájához, nem kell bízni az adatbázisában.' },
        { dt: 'Manipuláció-detektáló', dd: 'Bármely változtatás a bizonylatban eltöri az aláírását; egy törlés eltöri a láncot. A horgonyzás ezután a csendes átírást is detektálhatóvá teszi, nem csak nyilvánvalóvá.' },
        { dt: 'Szándékosan unalmas', dd: 'SHA-256, Ed25519, kanonikus JSON, RFC 6962 Merkle-fák. Semmi újszerű kriptográfia, és nulla futásidejű függőség.' },
      ],
    },
    maturity: {
      label: 'Érettség',
      h2Html: 'Egy repó, rétegezve aszerint, ki mennyire <em>érdemelte ki a bizalmat.</em>',
      introP: 'Az AXR egyetlen repóként szállít, több érettségi szintet átfogva. E tábla lényege az őszinteség: olvasd el egy funkció szintjét, mielőtt rá építesz. A 0.2 wire-formátum fagyasztott — a régebbi logok byte-ra verifikálnak a jelenlegi verifierrel, és minden későbbi munka additív.',
      th: ['Réteg', 'Verzió', 'Érettség'],
      layers: [
        { layer: 'Mag — aláírás, láncolás, lépésenkénti bemenet-hash, kanonikus JSON, kereszt-impl paritás', note: 'Élesben tesztelt, fagyasztott wire-formátum; hardened n8n node.', label: 'Stabil' },
        { layer: 'Horgonyzás — Merkle-kötegelés, aláírt fa-fejek, monitor, külső időbélyegzés', note: 'Óránkénti horgonyzó cron élesben; külön STH-kulcs.', label: 'Telepítve' },
        { layer: 'Törölhető bizonylatok, mellékhatás-tanúsítás, trust-root, kulcs-szerep szeparáció', note: 'Tesztelt; fagyasztva az 1.0 szerződésben.', label: 'Stabil' },
        { layer: 'Kulcsöröklés — root-horgonyzott rotáció, megkülönböztethető a kompromittálódástól', note: 'Kereszt-impl paritás + adversarial review; a pilot még nem használja.', label: 'Stabil' },
        { layer: 'SIEM-export — OCSF Detection Finding mapping + általános webhook', note: 'OCSF-formájú kimenet; szándékosan best-effort kézbesítés.', label: 'Stabil' },
        { layer: 'Root-életciklus hardening — kvórum (M-az-N-ből) root, rotáció, revokáció, ceremónia-CLI', note: 'Kereszt-impl paritás; a kvórum-policy a fenyegetésmodell része.', label: 'Stabil' },
        { layer: 'Control log — horgonyzott governance-terjesztés + részleges felfedés', note: 'Bezárja a sávon kívüli visszatartási rést; az 1.5 off-wire inclusion proofot ad egyetlen rekordra (egyet bizonyíts, a többit ne fedd fel).', label: 'Stabil' },
        { layer: 'Witness-életciklus — cosigning, vészhelyzeti revokáció, ideiglenes, auto-lejáró felfüggesztés', note: 'Megelőző equivocation-védelem; a teljes lassú-revoke → revoke → suspend életciklus, kereszt-impl.', label: 'Stabil' },
        { layer: "Könyvtár-SDK — require('axr'): fagyasztott publikus API-felület + programozott verify()", note: 'A felületet teszt rögzíti; az axr.verify() a kanonikus verifiert futtatja, így sosem térhet el.', label: 'Stabil' },
      ],
    },
    proofProd: {
      label: 'Bizonyíték élesben',
      h2Html: 'Egy őszinte bizonylat <em>hangossá</em> teszi a néma hibákat.',
      p1Html:
        'Az AXR élesben fut egy valódi foglalási folyamaton az ECO Clean HU-nál — a folyamat húsz node-jából hat bizonylatot hordoz, és a log — immár 227 aláírt bizonylaton túl — 2026 júniusa óta óránként egyetlen Merkle-fába horgonyzódik. Ennek az elszámoltathatósági rétegnek a felállítása olyat tett, amire az üzemeltetője nem számított: felszínre hozott négy valódi, az AXR-t megelőző hibát, és két defektet az AXR saját eszköztárában.',
      p2Html:
        'Egyik sem járt manipulációval vagy érvénytelen aláírással. Ezek viselkedés-olvashatóság, nem manipuláció-detektálás: a bizonylat annyira olvashatóvá tette a futást, hogy a szándékolt és a végrehajtott ág közti ellentmondás magától felszínre került. A B-bug pont ilyen volt — egy elutasítás, ami mégis elsütötte a sikeres ágat, abban a pillanatban elkapva, ahogy a bizonylat kimenetét elolvasták.',
      findings: [
        { tag: 'Pilot — B-bug', text: 'Minden futás egyszerre sütötte el mind a három válaszágat: egy ZONE_INCOMPATIBLE elutasítás mégis sikeres e-mailt küldött. A bizonylat final_status-a azonnal kiütötte az ellentmondást. Javítva egy Switch node-dal, ami a bizonylat kimenetére routol.' },
        { tag: 'Pilot — C-bug', text: 'Az elutasítások „unknown_error"-t adtak vissza, az ügyfél saját üzenetét visszhangozva — a valódi indok elveszett. A bizonylat minden futáson a helyes státuszt rögzítette, ellentmondva annak, amit az ügyfelek kaptak.' },
        { tag: 'Pilot — D-bug', text: 'Egy újraellenőrzéses konfliktus HTTP 200-at adott üres testtel, miközben a bizonylat egy teljes, aláírt 5-lépéses SLOT_TAKEN lánc volt. A helyes bizonylat és az üres válasz közti rés pontosan az, amire az AXR való.' },
        { tag: 'Pilot — E-bug', text: 'Egy javítás után a logika v5.1-re lépett, de minden bizonylat továbbra is v5.0-t tanúsított — érvényes aláírás egy hamis állítás felett arról, melyik kód döntött. Most kód-hash ujjlenyomatok váltják a kézzel írt címkéket, és a CI elbukik driftnél. A verziócímke tanúvallomás; a kód-hash bizonyíték.' },
        { tag: 'Magában az AXR-ben', text: 'A horgonyzás-bevezetés sandbox-próbafutása az AXR két saját defektjét fogta el, mielőtt elérhették volna az éles logot: a kereszt-verziós horgonyzás minden legacy aláírást érvénytelenített volna, a Python-verifier pedig csendben figyelmen kívül hagyta a külön-kulcs flaget. Mindkettő javítva az első éles horgony előtt. Egy próbafutás, ami a sandboxban eltörik, az egy funkció.' },
      ],
    },
    adversarial: {
      label: 'Támadói bizonyíték',
      h2Html: 'A „manipuláció-detektáló" állítás, úgy tesztelve, <em>ahogy egy támadó tenné.</em>',
      introP: 'Egy integritás-állítás annyit ér, amennyit a megtörésére tett kísérletek. Az AXR szisztematikusan bizonyítja a központi állítását, nem retorikailag:',
      rows: [
        { dt: '15 / 15 elutasítva', dd: 'Egyetlen érvényes, horgonyzott, generatív bizonylat-logot 15 különböző mutációnak vetnek alá — törzs-manipuláció, lépés-törlés, aláírás-csere, elejtett fa-fejek, manipulált inclusion proofok, rossz kulccsal újra-aláírás, és így tovább. A verifier mind a tizenötöt elutasítja; az érintetlen kontroll átmegy.' },
        { dt: 'Két megvalósítás', dd: 'Hitelesség, ahogy a Certificate Transparency kiérdemelte: egy második, teljesen független ellenőrző tiszta Pythonban — saját kanonizálóval, egy tiszta-Python Ed25519-cel az RFC 8032 tesztvektorokon validálva, és az RFC 6962 Merkle-logikával. Minden elfogadásban és elutasításban egyet kell értenie a Node-verifierrel.' },
        { dt: 'Byte-azonos', dd: 'Az „bárki, bármilyen nyelven ellenőrizheti" ígéret a determinisztikus kanonizáláson áll. A szerializáló az RFC 8785-öt követi, és NaN / Infinity / undefined esetén hibát dob, nem rontja el csendben őket. A nyelvközi byte-vektorok rögzítve, mint megfelelőségi szerződés.' },
        { dt: 'CI minden pushnál', dd: 'A teljes suite — a JS↔Python paritással együtt — minden változtatáskor lefut Node 18 / 20 / 22 és Python 3.10 / 3.11 / 3.12 alatt.' },
      ],
    },
    standards: {
      label: 'Szabványok & megfelelőség',
      h2Html: 'Oda építve, <em>amerre a szabályok tartanak.</em>',
      p1Html:
        'Az AXR úgy van tervezve, hogy ráilleszkedjen az érkező nyilvántartási kötelezettségekre — nem azt állítja, hogy bármelyikkel tanúsítottan megfelel. Az EU AI Act 12. cikke előírja, hogy a magas kockázatú rendszerek automatikusan rögzítsék az eseményeket a nyomonkövethetőséghez, a 26. cikk pedig megőrzésre kötelezi a felhasználókat. A GDPR 17. cikke a másik irányba húz, a törlés felé. A NIST AI Agent Standards Initiative az amerikai oldalt az identitás és az auditálhatóság köré rendezi. Az aláírt, függetlenül ellenőrizhető bizonylat olyan primitív, amelyre mindegyik irány építhet.',
      p2Html:
        'Két dolog teszi ezt kézzelfoghatóvá. A <strong>törölhető bizonylatok</strong> feloldják a GDPR-kontra-csak-hozzáfűzhető feszültséget: az érzékeny mezők egy sózott, mezőszintű Merkle-fán keresztül kötődnek, így a tiszta szöveg utólag törölhető, miközben az aláírás, a lánc és a már lehorgonyzott bizonyíték is áll. A <strong>Compliance Report Generator</strong> pedig egy nyers logból auditor-kész HTML-riportot készít — integritás, kulcs-governance idővonal, horgonyzási státusz, és egy EU AI Act 12. cikk / GDPR kontroll-térkép.',
      smallHtml:
        'A pontosság itt számít: „úgy tervezve, hogy ráilleszkedjen" — ez az állítás. A riport a verifier verdiktjének nézete, nem helyettesítője, és semmit nem állít, amit nem ellenőrzött.',
    },
    dogfooding: {
      label: 'Dogfooding',
      h2Html: 'Az AXR bizonyítja a saját <em>felépítését.</em>',
      p1Html:
        'Az AXR-t egy három-AI munkapad építette — Fable, Meridian és NEXUS — egy közös, csak-hozzáfűzhető journal felett. Ez a journal maga egy ellenőrizhető AXR-log: minden bejegyzés Ed25519-aláírt bizonylat, az egész készlet egyetlen aláírt fa-fejbe horgonyzódik Merkle-fával, és azt a fa-fejet a két review-ágens cosignolta — mindegyik a saját processzében, saját maga által generált és tartott kulccsal, így az orchestrator sosem látott privát kulcsot. A commitolt pillanatkép a teljes 1.0 stack alatt újraverifikál, a böngésződben.',
      smallHtml:
        'Őszinte keret: ez azt bizonyítja, hogy a journal az aláírás óta változatlan, nem azt, hogy bármely bejegyzés igaz volt íráskor. A cosignature-ök valóban processz-függetlenek; a teljes zero-trustig az egyetlen hátralévő rés, hogy a custody még azonos gépen van — élesben a witnessek külön biztonsági zónákban futnak.',
      cta: 'Ellenőrizd a dev-logot élőben',
    },
    statusLimits: {
      label: 'Státusz & határok',
      h2Html: 'Élő, nyílt, és <em>mindkettőről</em> őszinte.',
      introHtml:
        'Az AXR nyílt forrású, MIT-licencű, és nyilvánosan fejlesztett. Az 1.0 óta a wire-formátum és a CLI/verifier-szerződés fagyasztott az 1.x-re; az 1.1–1.4 csak backward-kompatibilis rekordokat és egy fagyasztott könyvtár-SDK-t adott. A mag és a horgonyzási réteg élesben fut; a magasabb rétegek — kulcsöröklés, kvórum-root-ok, a control log és a teljes witness-életciklus (cosigning, vészhelyzeti revokáció, ideiglenes felfüggesztés) — teszteltek, kereszt-impl ellenőrzöttek és additívak, de a live pilot még nem használja őket. A projekt őszinte marad a saját hiányosságairól:',
      items: [
        { tag: 'Következő', text: 'Az éles horgony-backend váltása localról OpenTimestamps-re (Bitcoin) — egyetlen flag, amint a kadencia stabilan futott.' },
        { tag: 'Következő', text: 'A független monitor futtatása az üzemeltetőn kívüli félnél, a split-view / equivocation detektálást lappangóból aktívvá téve.' },
        { tag: 'Következő', text: 'Generatív (LLM) lépés-bizonylatok kipróbálása egy éles folyamaton — végpontól végpontig támogatott és tesztelt, de még nincs élesben.' },
        { tag: 'Következő', text: 'Hiba-útvonal bizonylatok — a sikertelen futások aláírása is, a workflow hiba-ágára tett mark node-dal. Egy hibáról gyakran a legfontosabb bizonyítékot bírni; ez a generátor lefedettségét bővíti, és a fagyasztott 1.x wire-formátumot érintetlenül hagyja.' },
        { tag: 'Nyitott', text: 'Önbevallott ágens-identitás, és PEM-fájl (nem hardver-szintű) kulcstárolás — mindkettő szándékosan a jelenlegi scope-on kívül.' },
      ],
      cta: 'Kövesd a repót',
    },
    proof: {
      label: 'Bizonyíték',
      h2Html: 'Ez az oldal ugyanazon a <em>primitíven</em> fut.',
      pHtml:
        'A chrisconen.dev minden deployja közzétesz egy manifestet az oldal minden fájljáról, SHA-256-tal hash-elve és Ed25519-cel aláírva. A böngésződ ellenőrizheti az aláírást, és bármely fájlt újrahash-elhet a manifest ellenében. Ez az AXR alapötlete egy build-pipeline-ra alkalmazva ágens helyett — ugyanaz a bizonylat, más szereplő.',
      cta: 'Ellenőrizd ezt az oldalt',
    },
  },

  de: {
    meta: {
      title: 'Agent execution receipts — manipulationsnachweisbarer Audit-Trail für KI-Agenten & n8n (AXR)',
      description:
        'AXR ist eine quelloffene Rechenschaftsschicht für KI-Agenten: Ed25519-signierte, manipulationsnachweisbare Ausführungsbelege. Produktiv im Einsatz mit stündlicher Merkle-Verankerung, zwei unabhängigen Verifizierern und einer EU-AI-Act-/DSGVO-Kontrollzuordnung.',
    },
    hero: {
      kickerMid: 'Agent eXecution Receipts',
      kickerEnd: 'Quelloffen · MIT',
      h1Html: 'Lassen Sie den Agenten seine <em>Belege vorlegen.</em>',
      ledeHtml:
        'AXR ist eine quelloffene Rechenschaftsschicht für KI-Agenten und automatisierte Workflows: kryptografisch signierte, manipulationsnachweisbare Ausführungsbelege, die „Vertrau mir" in „Prüf es nach" verwandeln. Heute produktiv im Einsatz, stündlich verankert, und von jedem prüfbar, der den öffentlichen Schlüssel hat.',
      btns: ['AXR auf GitHub', 'Ein Log selbst prüfen', 'Sie nutzen n8n?', 'Keine Technik? Hier starten'],
      chips: [
        { label: 'Protokoll-Vertrag', strong: '1.5.3 (eingefroren 1.x)' },
        { label: 'Live-Profil', strong: '0.2.1 Kern · stündliche Verankerung' },
        { label: 'Abhängigkeiten', strong: 'Null' },
      ],
    },
    stats: [
      'Reifestufen, ein Repo — vom Kern über den Witness-Lebenszyklus bis zum SDK',
      'Tests grün, inkl. JS↔Python-Cross-Impl-Parität (Kern + Governance)',
      'Vom Verifizierer abgewiesene Manipulationsmutationen',
      'Unabhängige Verifizierer (Node + reines Python) stimmen Byte für Byte überein',
      'Vor dem Release durch Multi-Agent-Review gefundene Sicherheitsbefunde',
      'Laufzeitabhängigkeiten — nur Standard-Kryptografie',
    ],
    problem: {
      label: 'Das Problem',
      h2Html: 'Logs lassen sich ändern. Früher war das <em>akzeptabel.</em>',
      p1Html:
        'KI-Agenten treffen heute folgenreiche Entscheidungen: Sie rufen Tools auf, ändern Datensätze, bewegen Geld, senden Nachrichten im Namen anderer. Der Audit-Trail dafür ist meist eine Log-Datei, die demjenigen gehört, der den Agenten betreibt — veränderbar, löschbar und außerhalb der Infrastruktur des Betreibers für niemanden prüfbar.',
      p2Html:
        'Im Nachhinein lassen sich die entscheidenden Fragen nicht verlässlich beantworten: <em>welcher</em> Agent hat gehandelt, was bekam er als Eingabe, was hat er auf welcher Grundlage entschieden, wurde der Datensatz nachträglich verändert, und warum wurde einem Kunden „nein" gesagt?',
      p3Html:
        'Die Regulierung hat es bemerkt. Der EU AI Act macht automatische Ereignisprotokollierung zur Designanforderung für Hochrisiko-KI-Systeme (Artikel 12), verpflichtet Betreiber zur Aufbewahrung (Artikel 26), und seine Hochrisiko-Pflichten gelten ab dem 2. August 2026. In den USA hat das NIST Center for AI Standards and Innovation im Februar 2026 die AI Agent Standards Initiative gestartet, mit Agentensicherheit und -identität als Kernsäulen.',
      pullquoteHtml: 'Ein Log, das Sie umschreiben können, ist eine Erzählung. Ein Beleg, den Sie prüfen können, ist ein <em>Nachweis.</em>',
    },
    whatIs: {
      label: 'Was es ist',
      h2Html: 'Ein Beleg pro folgenreicher <em>Aktion.</em>',
      p1Html:
        'Für jede Aktion, die zählt, gibt AXR einen Beleg aus: die durchgeführte Aktion, Hashes ihrer Ein- und Ausgaben, einen Zeitstempel, die Identität des Agenten und eine Ed25519-Signatur über den kanonisierten Datensatz. Er beweist genau eine Sache — dass ein bestimmter Workflow bei einer bestimmten Eingabe eine bestimmte Entscheidung getroffen hat und dass sich der Datensatz seither nicht geändert hat.',
      p2Html:
        'Das bringt zwei verschiedene Dinge. <strong>Manipulationsnachweisbarkeit</strong> ist die kryptografische Grundlinie: die Signatur beweist, dass der Datensatz unverändert ist. <strong>Verhaltensnachvollziehbarkeit</strong> ist das, was sich Tag für Tag auszahlt — der Beleg macht das tatsächliche Verhalten des Workflows so nachvollziehbar, dass ein interner Widerspruch selbst dann auffällt, wenn nichts manipuliert wurde und jede Signatur gültig ist.',
      p3Html:
        'Es ist bewusst <em>kein</em> Workflow-Builder, kein Agenten-Framework und keine Observability-Plattform. Es ist die schmale Rechenschaftsschicht, die unter diesen Werkzeugen liegt. Zwei Belegtypen tragen die Last: ein <strong>Schrittbeleg</strong> erfasst einen einzelnen entscheidungsrelevanten Knoten, und ein <strong>Workflow-Beleg</strong> bindet die Schritte eines Laufs zu einem signierten, verketteten Datensatz. Schritte verketten sich innerhalb eines Laufs; Läufe verketten sich über die Historie eines Agenten — das Löschen eines Belegs bricht die Kette, das Ändern bricht die Signatur.',
      sampleCaption: 'Beispielhafter Schrittbeleg — die Form einer signierten Aktion',
      verdictStamp: 'Signatur gültig',
      verdictNoteHtml:
        'Ändern Sie ein einziges Byte in einem beliebigen Feld, und die Signatur verifiziert nicht mehr. Das ist das ganze Prinzip — und es genügt.',
    },
    whoFor: {
      label: 'Für wen es ist',
      h2Html: 'Gebaut für alle, die am Ende <em>dafür einstehen müssen.</em>',
      introP: 'AXR bewährt sich überall dort, wo eine automatisierte Entscheidung später infrage gestellt werden kann und jemand für die Antwort einstehen muss.',
      gainLabel: 'Was Sie bekommen:',
      personas: [
        { who: 'Teams, die KI-Agenten betreiben', title: 'Sie bringen Agenten in Produktion, die echte Aktionen ausführen', body: 'Sie buchen, bepreisen, schreiben Nachrichten, bewegen Geld oder ändern Datensätze im Namen anderer. Heute ist die einzige Aufzeichnung des Geschehenen eine Log-Datei, die Ihnen gehört und die Sie ändern könnten.', gain: 'Ein signierter Beleg pro folgenreicher Aktion — Nachweis, keine änderbare Erzählung.' },
        { who: 'Compliance & GRC', title: 'Sie verantworten den EU AI Act', body: 'Artikel 12 macht automatische Ereignisprotokollierung zur Designanforderung für Hochrisiko-Systeme; Artikel 26 verpflichtet Betreiber zur Aufbewahrung, ab dem 2. August 2026.', gain: 'Datensätze, die auf diese Pflichten zugeschnitten sind, mit einem auditbereiten Bericht.' },
        { who: 'Prüfer & Ermittler', title: 'Sie müssen verifizieren, nicht vertrauen', body: 'Im Nachhinein müssen Sie feststellen, welcher Agent was bei welcher Eingabe tat und ob der Datensatz verändert wurde — ohne dem Betreiber sein Wort zu glauben.', gain: 'Offline-Verifizierung aus nichts als einem öffentlichen Schlüssel. Kein Betreiberzugriff nötig.' },
        { who: 'Plattform- & Infra-Entwickler', title: 'Sie wollen einen Rechenschaftsbaustein', body: 'AXR ist kein Agenten-Framework und keine Observability-Plattform. Es ist die schmale, unspektakuläre Schicht, auf der diese Werkzeuge aufsetzen können — Standard-Krypto, null Abhängigkeiten, MIT.', gain: 'Ein eingefrorenes Wire-Format und zwei unabhängige Verifizierer, gegen die Sie bauen.' },
        { who: 'Datenschutzbeauftragte', title: 'Sie müssen das Recht auf Löschung gewährleisten', body: 'Die Löschung nach DSGVO Art. 17 scheint einem Append-only-Log zu widersprechen: Wie löscht man personenbezogene Daten aus einem Datensatz, dessen ganzer Sinn darin besteht, dass er sich nicht ändern kann?', gain: 'Feldweise gesalzene Merkle-Commitments — löschen Sie den Klartext, die Signaturen halten.' },
        { who: 'Security Operations', title: 'Sie überwachen Manipulationsversuche', body: 'Ein unabhängiger Monitor macht aus latentem Schutz aktive Erkennung: Equivocation, Trunkierung, Historien-Umschreibungen und unautorisierte Schlüsselwechsel.', gain: 'OCSF-förmige Detection Findings und Webhook-Zustellung in Ihr SIEM.' },
      ],
    },
    how: {
      label: 'Wie es funktioniert',
      h2Html: 'Schritte markieren. Beleg signieren. Dort verankern, wo Sie ihn nicht <em>umschreiben können.</em>',
      introHtml:
        'Der Beleg-Generator ist ein einzelner Code-Knoten am Ende eines Workflows, vor der Antwort. Er liest die Ausgaben der entscheidungsrelevanten Knoten und erzeugt alle Belege in einem Durchgang. Verankerung und Monitoring laufen <em>außerhalb</em> des Workflows, sodass der Produktionspfad keine zusätzliche Latenz und keine neue Abhängigkeit erhält.',
      pipeline: ['Schritte markieren', 'Belege signieren', 'An JSONL anhängen', 'Verankern (Merkle / STH)', 'Offline verifizieren', 'Über die Zeit monitoren'],
      steps: [
        { strong: 'Entscheidungsknoten markieren.', text: 'Jeder entscheidungsrelevante Knoten hängt die exakte Eingabe an, die er verarbeitet hat, sodass der Beleg hasht, was der Schritt wirklich gesehen hat — keinen einheitlichen Platzhalter.' },
        { strong: 'Generieren & signieren.', text: 'Ein Durchgang gibt die Schritt- und Workflow-Belege aus, jeden mit Ed25519 über eine kanonische (RFC 8785) Serialisierung signiert. Die Generierung ist fail-open (im Fehlerfall offen): ein fehlender Schlüssel führt zu einem lauten Fehler, bricht aber nie den Geschäftsprozess, den er bezeugt.' },
        { strong: 'An ein unveränderliches Log anhängen.', text: 'Belege werden zeilenweise in eine append-only JSON-Lines-Datei geschrieben, die Neustarts übersteht.' },
        { strong: 'Unabhängig verankern.', text: 'Ein Sidecar bündelt Beleg-Hashes in einen RFC-6962-Merkle-Baum und committet Signed Tree Heads an ein externes, append-only Backend (OpenTimestamps/Bitcoin, Rekor, RFC 3161). Das bringt eine Partei ins Spiel, die der Betreiber nicht kontrolliert — die ehrliche Analogie ist Certificate Transparency, nicht selbstsigniertes HTTPS.' },
        { strong: 'Verifizierbar für jeden.', text: 'Ein eigenständiges, abhängigkeitsfreies Skript verifiziert eine ganze Kette offline. Exit-Code 0 bedeutet gültig, 1 bedeutet, ein Problem wurde gefunden.' },
        { strong: 'Über die Zeit monitoren.', text: 'Ein unabhängiger Monitor führt sein eigenes Journal der gesehenen Tree Heads und schlägt Alarm, wenn eine neue Sicht der alten widerspricht — und fängt so Equivocation, Trunkierung, Historien-Umschreibungen und unautorisierte Schlüsselwechsel ab.' },
      ],
      verifyHeadingHtml: '<strong>Ein Log selbst verifizieren — der ganze Befehl:</strong>',
      afterCodeHtml: 'Kein Terminal? <a href="/axr/verify/">Ziehen Sie ein Log in den In-Browser-Verifizierer</a> — er führt dieselben Signatur-, Merkle-Root- und Witness-Prüfungen lokal aus, ohne dass etwas hochgeladen wird.',
    },
    design: {
      label: 'Das Design',
      h2Html: 'Bewusst unspektakuläre <em>Bausteine.</em>',
      introP: 'Assurance-Arbeit sollte auch von Menschen prüfbar sein, die sie nicht geschrieben haben. Deshalb nutzt AXR nur standardisierte, gut verstandene Bausteine — und benennt seine Ziele klar:',
      rows: [
        { dt: 'Signiert', dd: 'Ed25519 über eine kanonische Serialisierung des Belegs. Das Neusignieren eines manipulierten Datensatzes erfordert den privaten Schlüssel; ohne ihn sind Änderungen sichtbar.' },
        { dt: 'Autark', dd: 'Ein Beleg verifiziert offline mit nichts als dem öffentlichen Schlüssel. Kein Zugriff auf die Infrastruktur des Betreibers, kein Vertrauen in seine Datenbank.' },
        { dt: 'Manipulationsnachweisbar', dd: 'Jede Änderung an einem Beleg bricht seine Signatur; das Löschen eines Belegs bricht die Kette. Die Verankerung macht stilles Umschreiben dann erkennbar, nicht nur evident.' },
        { dt: 'Bewusst unspektakulär', dd: 'SHA-256, Ed25519, kanonisches JSON, RFC-6962-Merkle-Bäume. Keine neuartige Kryptografie und null Laufzeitabhängigkeiten.' },
      ],
    },
    maturity: {
      label: 'Reifegrad',
      h2Html: 'Ein Repository, geschichtet danach, wie weit jeder Teil <em>Vertrauen verdient.</em>',
      introP: 'AXR wird als ein einziges Repo ausgeliefert, das mehrere Reifestufen umfasst. Der Sinn dieser Tabelle ist Ehrlichkeit: Lesen Sie die Stufe eines Features, bevor Sie sich darauf verlassen. Das 0.2-Wire-Format ist eingefroren — ältere Logs verifizieren Byte für Byte unter dem aktuellen Verifizierer, und alle späteren Arbeiten sind additiv.',
      th: ['Schicht', 'Version', 'Reifegrad'],
      layers: [
        { layer: 'Kern — Signierung, Verkettung, schrittweises Eingabe-Hashing, kanonisches JSON, Cross-Impl-Parität', note: 'Produktiv getestet, eingefrorenes Wire-Format; gehärteter n8n-Knoten.', label: 'Stabil' },
        { layer: 'Verankerung — Merkle-Bündelung, Signed Tree Heads, Monitor, externe Zeitstempelung', note: 'Stündlicher Verankerungs-Cron produktiv; separater STH-Schlüssel.', label: 'Im Einsatz' },
        { layer: 'Schwärzbare Belege, Seiteneffekt-Attestierung, Trust-Root, Schlüssel-Rollentrennung', note: 'Getestet; eingefroren im 1.0-Vertrag.', label: 'Stabil' },
        { layer: 'Schlüsselnachfolge — root-verankerte Rotation, unterscheidbar von Kompromittierung', note: 'Cross-Impl-Parität + adversariales Review; vom Piloten noch nicht genutzt.', label: 'Stabil' },
        { layer: 'SIEM-Export — OCSF-Detection-Finding-Mapping + generischer Webhook', note: 'OCSF-förmige Ausgabe; bewusst Best-Effort-Zustellung.', label: 'Stabil' },
        { layer: 'Root-Lebenszyklus-Härtung — Quorum-(M-aus-N)-Root, Rotation, Widerruf, Zeremonie-CLI', note: 'Cross-Impl-Parität; die Quorum-Policy ist Teil des Bedrohungsmodells.', label: 'Stabil' },
        { layer: 'Control-Log — verankerte Governance-Verteilung + partielle Offenlegung', note: 'Schließt die Out-of-Band-Zurückhaltungslücke; 1.5 ergänzt einen Off-Wire-Inclusion-Proof für einen einzelnen Datensatz (einen beweisen, keinen anderen offenlegen).', label: 'Stabil' },
        { layer: 'Witness-Lebenszyklus — Cosigning, Notfall-Widerruf, temporäre, automatisch ablaufende Aussetzung', note: 'Präventive Equivocation-Abwehr; der vollständige Slow-Revoke → Revoke → Suspend-Lebenszyklus, cross-impl.', label: 'Stabil' },
        { layer: "Bibliotheks-SDK — require('axr'): eine eingefrorene öffentliche API-Fläche + programmatisches verify()", note: 'Die Fläche ist durch einen Test fixiert; axr.verify() führt den kanonischen Verifizierer aus, kann also nie abweichen.', label: 'Stabil' },
      ],
    },
    proofProd: {
      label: 'Nachweis in Produktion',
      h2Html: 'Ein ehrlicher Beleg macht stille Fehler <em>laut.</em>',
      p1Html:
        'AXR läuft produktiv auf einem echten Buchungs-Workflow für ECO Clean HU — sechs der zwanzig Knoten des Workflows tragen Belege, und das Log — inzwischen über 227 signierte Belege — wird seit Juni 2026 stündlich in einem Merkle-Baum verankert. Der Aufbau dieser Rechenschaftsschicht bewirkte etwas, womit der Betreiber nicht gerechnet hatte: Er brachte vier echte Fehler ans Licht, die AXR vorausgingen, und zwei Defekte in AXRs eigenem Werkzeug.',
      p2Html:
        'Keiner davon betraf Manipulation oder eine ungültige Signatur. Es geht um Verhaltensnachvollziehbarkeit, nicht um Manipulationsnachweisbarkeit: der Beleg machte den Lauf so nachvollziehbar, dass ein Widerspruch zwischen beabsichtigtem und ausgeführtem Zweig von selbst auffiel. Bug B war genau das — eine Ablehnung, die dennoch den Erfolgszweig auslöste, entdeckt in dem Moment, als das Ergebnis des Belegs gelesen wurde.',
      findings: [
        { tag: 'Pilot — Bug B', text: 'Jeder Lauf feuerte alle drei Antwortzweige gleichzeitig: eine ZONE_INCOMPATIBLE-Ablehnung sendete trotzdem eine Erfolgs-E-Mail. Der final_status des Belegs machte den Widerspruch sofort sichtbar. Behoben mit einem Switch-Knoten, der auf das Beleg-Ergebnis routet.' },
        { tag: 'Pilot — Bug C', text: 'Ablehnungen gaben „unknown_error" zurück und spiegelten die eigene Nachricht des Kunden — der wahre Grund ging verloren. Der Beleg erfasste bei jedem Lauf den korrekten Status, im Widerspruch zu dem, was Kunden erhielten.' },
        { tag: 'Pilot — Bug D', text: 'Ein Recheck-Konflikt erzeugte einen HTTP 200 mit leerem Body, während der Beleg eine vollständige, signierte 5-Schritt-SLOT_TAKEN-Kette war. Die Lücke zwischen einem korrekten Beleg und einer leeren Antwort ist genau das, wofür AXR gebaut ist.' },
        { tag: 'Pilot — Bug E', text: 'Nachdem ein Bugfix die Logik auf v5.1 hob, bezeugte jeder Beleg weiterhin v5.0 — gültige Signaturen über eine falsche Behauptung darüber, welcher Code entschied. Jetzt ersetzen Code-Hash-Fingerabdrücke handgeschriebene Etiketten, und die CI scheitert bei Drift. Versionsetiketten sind Aussage; Code-Hashes sind Nachweis.' },
        { tag: 'In AXR selbst', text: 'Ein Sandbox-Probelauf der Verankerungs-Einführung fing zwei von AXRs eigenen Defekten ab, bevor sie das Live-Log berührten: die versionsübergreifende Verankerung hätte jede Legacy-Signatur ungültig gemacht, und der Python-Verifizierer ignorierte still das Separate-Key-Flag. Beide behoben, bevor der erste Produktiv-Anker gesetzt wurde. Ein Probelauf, der in einer Sandbox bricht, ist ein Feature.' },
      ],
    },
    adversarial: {
      label: 'Angreifertest',
      h2Html: 'Die Behauptung „manipulationsnachweisbar", getestet, <em>wie ein Angreifer es täte.</em>',
      introP: 'Eine Integritätsbehauptung ist nur so viel wert wie die Versuche, sie zu brechen. AXR beweist seine zentrale Behauptung systematisch statt rhetorisch:',
      rows: [
        { dt: '15 / 15 abgewiesen', dd: 'Ein einzelnes gültiges, verankertes, generatives Beleg-Log wird 15 verschiedenen Mutationen unterzogen — Body-Manipulation, Schritt-Löschung, Signatur-Tausch, weggelassene Tree Heads, manipulierte Inclusion-Proofs, Neusignieren mit falschem Schlüssel und mehr. Der Verifizierer weist alle fünfzehn ab; die unberührte Kontrolle besteht.' },
        { dt: 'Zwei Implementierungen', dd: 'Glaubwürdigkeit, so wie Certificate Transparency sie sich verdiente: ein zweiter, vollständig unabhängiger Verifizierer in reinem Python — eigener Kanonisierer, ein reines-Python-Ed25519, validiert gegen die RFC-8032-Testvektoren, und die RFC-6962-Merkle-Logik. Er muss bei jedem Akzeptieren und jedem Abweisen mit dem Node-Verifizierer übereinstimmen.' },
        { dt: 'Byte-identisch', dd: 'Das Versprechen „jeder kann verifizieren, in jeder Sprache" beruht auf deterministischer Kanonisierung. Der Serialisierer folgt RFC 8785 und wirft bei NaN / Infinity / undefined, statt sie still zu beschädigen. Sprachübergreifende Byte-Vektoren sind als Konformitätsvertrag fixiert.' },
        { dt: 'CI bei jedem Push', dd: 'Die volle Suite — inkl. JS↔Python-Parität — läuft bei jeder Änderung über Node 18 / 20 / 22 und Python 3.10 / 3.11 / 3.12.' },
      ],
    },
    standards: {
      label: 'Standards & Compliance',
      h2Html: 'Gebaut in Richtung dessen, wohin die Regeln <em>gehen.</em>',
      p1Html:
        'AXR ist darauf ausgelegt, auf kommende Aufzeichnungspflichten abzubilden — nicht darauf, zertifizierte Konformität mit irgendeiner davon zu behaupten. Artikel 12 des EU AI Act verlangt, dass Hochrisiko-Systeme Ereignisse automatisch zur Rückverfolgbarkeit aufzeichnen, und Artikel 26 verpflichtet Betreiber zur Aufbewahrung. DSGVO Artikel 17 zieht in die andere Richtung, zur Löschung. Die AI Agent Standards Initiative des NIST formt die US-Seite rund um Identität und Auditierbarkeit. Signierte, unabhängig prüfbare Belege sind ein Grundbaustein, auf dem jede dieser Richtungen aufbauen kann.',
      p2Html:
        'Zwei Bausteine machen das konkret. <strong>Schwärzbare Belege</strong> lösen die DSGVO-gegen-Append-only-Spannung: sensible Felder werden über einen gesalzenen, feldweisen Merkle-Baum committet, sodass der Klartext später gelöscht werden kann, während die Signatur, die Kette und der bereits verankerte Proof weiterhin halten. Und der <strong>Compliance-Report-Generator</strong> verwandelt ein rohes Log in einen auditbereiten HTML-Bericht — Integrität, die Schlüssel-Governance-Zeitachse, Verankerungsstatus und ein EU-AI-Act-Art.-12-/DSGVO-Kontroll-Mapping.',
      smallHtml:
        'Präzision zählt hier: „darauf ausgelegt, abzubilden" ist die Behauptung. Der Bericht ist eine Sicht auf das Urteil des Verifizierers, kein Ersatz dafür, und er behauptet nichts, was er nicht geprüft hat.',
    },
    dogfooding: {
      label: 'Dogfooding',
      h2Html: 'AXR beweist seine eigene <em>Konstruktion.</em>',
      p1Html:
        'AXR wurde von einem Drei-KI-Setup gebaut — Fable, Meridian und NEXUS — über ein gemeinsames, append-only Journal. Dieses Journal ist selbst ein prüfbares AXR-Log: jeder Eintrag ist ein Ed25519-signierter Beleg, das gesamte Set ist in einen signierten Tree Head Merkle-verankert, und dieser Tree Head wurde von den zwei Reviewer-Agenten cosigniert — jeder in seinem eigenen Prozess, mit einem Schlüssel, den er selbst erzeugte und hielt, sodass der Orchestrator nie einen privaten Schlüssel sah. Der committete Snapshot verifiziert erneut unter dem vollen 1.0-Stack, in Ihrem Browser.',
      smallHtml:
        'Ehrliche Einordnung: das beweist, dass das Journal seit der Signierung unverändert ist, nicht dass irgendein Eintrag beim Schreiben wahr war. Die Cosignaturen sind echt prozessunabhängig; die einzige verbleibende Lücke zum vollen Zero-Trust ist, dass die Verwahrung noch auf derselben Maschine liegt — produktiv laufen die Witnesses in getrennten Sicherheitszonen.',
      cta: 'Das Dev-Log live verifizieren',
    },
    statusLimits: {
      label: 'Status & Grenzen',
      h2Html: 'Live, offen und über <em>beides</em> ehrlich.',
      introHtml:
        'AXR ist quelloffen, MIT-lizenziert und wird öffentlich entwickelt. Seit 1.0 sind das Wire-Format und der CLI-/Verifizierer-Vertrag für 1.x eingefroren; 1.1–1.4 fügten nur rückwärtskompatible Datensätze und ein eingefrorenes Bibliotheks-SDK hinzu. Der Kern und die Verankerungsschicht laufen produktiv; die höheren Schichten — Schlüsselnachfolge, Quorum-Roots, das Control-Log und der vollständige Witness-Lebenszyklus (Cosigning, Notfall-Widerruf, temporäre Aussetzung) — sind getestet, cross-impl verifiziert und additiv, aber vom Live-Piloten noch nicht genutzt. Das Projekt bleibt ehrlich über seine eigenen Lücken:',
      items: [
        { tag: 'Nächstes', text: 'Das Produktiv-Anker-Backend von local auf OpenTimestamps (Bitcoin) umstellen — ein einziges Flag, sobald die Kadenz stabil lief.' },
        { tag: 'Nächstes', text: 'Den unabhängigen Monitor bei einer Partei außerhalb des Betreibers laufen lassen und so die Split-View-/Equivocation-Erkennung von latent auf aktiv heben.' },
        { tag: 'Nächstes', text: 'Generative (LLM-)Schritt-Belege auf einem Live-Workflow erproben — durchgängig unterstützt und getestet, aber noch nicht produktiv.' },
        { tag: 'Nächstes', text: 'Fehlerpfad-Belege — auch fehlgeschlagene Läufe signieren, über einen Mark-Knoten auf dem Fehlerpfad des Workflows. Ein Fehlschlag ist oft das, wofür man am dringendsten einen Nachweis braucht; das erweitert die Generator-Abdeckung und lässt das eingefrorene 1.x-Wire-Format unberührt.' },
        { tag: 'Offen', text: 'Selbstdeklarierte Agenten-Identität und PEM-Datei- (nicht hardwarebasierte) Schlüsselspeicherung — beides bewusst außerhalb des aktuellen Scopes.' },
      ],
      cta: 'Dem Repository folgen',
    },
    proof: {
      label: 'Nachweis',
      h2Html: 'Diese Website läuft auf demselben <em>Grundbaustein.</em>',
      pHtml:
        'Jeder Deploy von chrisconen.dev veröffentlicht ein Manifest jeder Datei der Website, mit SHA-256 gehasht und mit Ed25519 signiert. Ihr Browser kann die Signatur prüfen und jede Datei gegen das Manifest neu hashen. Es ist AXRs Kernidee, auf eine Build-Pipeline statt auf einen Agenten angewandt — derselbe Beleg, anderer Akteur.',
      cta: 'Diese Website verifizieren',
    },
  },

  es: {
    meta: {
      title: 'Agent execution receipts — auditoría a prueba de manipulaciones para agentes de IA y n8n (AXR)',
      description:
        'AXR es una capa de rendición de cuentas de código abierto para agentes de IA: recibos de ejecución firmados con Ed25519 y a prueba de manipulaciones. En producción con anclaje Merkle por hora, dos verificadores independientes y un mapeo de controles para el Reglamento de IA de la UE / RGPD.',
    },
    hero: {
      kickerMid: 'Agent eXecution Receipts',
      kickerEnd: 'Código abierto · MIT',
      h1Html: 'Haz que el agente muestre sus <em>recibos.</em>',
      ledeHtml:
        'AXR es una capa de rendición de cuentas de código abierto para agentes de IA y flujos automatizados: recibos de ejecución firmados criptográficamente y a prueba de manipulaciones que convierten el «confía en mí» en «verifícalo». Está hoy en producción, anclado cada hora, y verificable por cualquiera que tenga la clave pública.',
      btns: ['AXR en GitHub', 'Verifica un registro tú mismo', '¿Usas n8n?', '¿No eres técnico? Empieza aquí'],
      chips: [
        { label: 'Contrato del protocolo', strong: '1.5.3 (congelado 1.x)' },
        { label: 'Perfil en producción', strong: 'núcleo 0.2.1 · anclaje por hora' },
        { label: 'Dependencias', strong: 'Cero' },
      ],
    },
    stats: [
      'Capas de madurez, un repo — del núcleo al ciclo de vida del witness + SDK',
      'Suites de test en verde, incl. paridad cross-impl JS↔Python (núcleo + gobernanza)',
      'Mutaciones de manipulación rechazadas por el verificador',
      'Verificadores independientes (Node + Python puro) coinciden byte a byte',
      'Hallazgos de seguridad detectados por revisión multiagente antes del lanzamiento',
      'Dependencias en tiempo de ejecución — solo criptografía estándar',
    ],
    problem: {
      label: 'El problema',
      h2Html: 'Los registros se pueden editar. Antes eso <em>estaba bien.</em>',
      p1Html:
        'Los agentes de IA ahora toman acciones de peso: llaman herramientas, cambian registros, mueven dinero, envían mensajes en nombre de alguien. El rastro de auditoría de todo eso suele ser un archivo de registro propiedad de quien ejecutó el agente — mutable, borrable, e inverificable por cualquiera fuera de la propia infraestructura del operador.',
      p2Html:
        'Después de los hechos, no hay forma fiable de responder a las preguntas que importan: <em>qué</em> agente hizo esto, qué recibió como entrada, qué decidió y sobre qué base, ¿se alteró el registro después?, y ¿por qué se le dijo «no» a un cliente?',
      p3Html:
        'Los reguladores se han dado cuenta. El Reglamento de IA de la UE convierte el registro automático de eventos en un requisito de diseño para sistemas de IA de alto riesgo (Artículo 12), obliga a los responsables del despliegue a conservar esos registros (Artículo 26), y sus obligaciones de alto riesgo se aplican desde el 2 de agosto de 2026. En EE. UU., el Center for AI Standards and Innovation del NIST lanzó la AI Agent Standards Initiative en febrero de 2026, con la seguridad y la identidad de los agentes como pilares centrales.',
      pullquoteHtml: 'Un registro que puedes reescribir es un relato. Un recibo que puedes verificar es un <em>registro.</em>',
    },
    whatIs: {
      label: 'Qué es',
      h2Html: 'Un recibo por cada <em>acción</em> de peso.',
      p1Html:
        'Por cada acción que importa, AXR emite un recibo: la acción realizada, hashes de sus entradas y salidas, una marca de tiempo, la identidad del agente, y una firma Ed25519 sobre el registro canonicalizado. Prueba una cosa con precisión — que un flujo dado, sobre una entrada dada, tomó una decisión dada, y que el registro no ha cambiado desde entonces.',
      p2Html:
        'Eso compra dos cosas distintas. La <strong>resistencia a manipulaciones</strong> es el suelo criptográfico: la firma prueba que el registro no ha cambiado. La <strong>legibilidad del comportamiento</strong> es lo que se gana el pan a diario — el recibo hace el comportamiento real del flujo lo bastante legible como para que una contradicción interna salga a la luz incluso cuando nada fue manipulado y cada firma es válida.',
      p3Html:
        'Deliberadamente <em>no</em> es un constructor de flujos, ni un framework de agentes, ni una plataforma de observabilidad. Es la fina capa de rendición de cuentas que se sitúa por debajo de esas herramientas. Dos tipos de recibo cargan el peso: un <strong>recibo de paso</strong> registra un único nodo relevante para la decisión, y un <strong>recibo de flujo</strong> encadena los pasos de una ejecución en un registro firmado y encadenado. Los pasos se encadenan dentro de una ejecución; las ejecuciones se encadenan a lo largo del historial del agente — así, borrar cualquier recibo rompe la cadena, y alterar cualquier recibo rompe la firma.',
      sampleCaption: 'Recibo de paso ilustrativo — la forma de una acción firmada',
      verdictStamp: 'Firma válida',
      verdictNoteHtml:
        'Cambia un byte de cualquier campo y la firma ya no verifica. Ese es todo el principio — y basta.',
    },
    whoFor: {
      label: 'Para quién es',
      h2Html: 'Hecho para quienes tienen que <em>responder por ello.</em>',
      introP: 'AXR se gana el pan allí donde una decisión automatizada puede cuestionarse después y alguien tiene que respaldar la respuesta.',
      gainLabel: 'Lo que obtienes:',
      personas: [
        { who: 'Equipos que ejecutan agentes de IA', title: 'Lanzas agentes que toman acciones reales', body: 'Reservan, fijan precios, envían mensajes, mueven dinero o cambian registros en nombre de alguien. Hoy el único relato de lo ocurrido es un archivo de registro que es tuyo y que podrías editar.', gain: 'Un recibo firmado por cada acción de peso — prueba, no un relato editable.' },
        { who: 'Compliance y GRC', title: 'Respondes por el Reglamento de IA de la UE', body: 'El Artículo 12 convierte el registro automático de eventos en requisito de diseño para sistemas de alto riesgo; el Artículo 26 impone la conservación a los responsables del despliegue, desde el 2 de agosto de 2026.', gain: 'Registros diseñados para encajar en esos deberes, con un informe listo para auditoría.' },
        { who: 'Auditores e investigadores', title: 'Necesitas verificar, no confiar', body: 'Después de los hechos tienes que establecer qué agente hizo qué, sobre qué entrada, y si el registro fue alterado — sin tener que creer la palabra del operador.', gain: 'Verificación sin conexión a partir de nada más que una clave pública. Sin acceso del operador.' },
        { who: 'Constructores de plataforma e infra', title: 'Quieres un primitivo de rendición de cuentas', body: 'AXR no es un framework de agentes ni una plataforma de observabilidad. Es la capa ligera y deliberadamente sobria sobre la que esas herramientas pueden asentarse — cripto estándar, cero dependencias, MIT.', gain: 'Un wire format congelado y dos verificadores independientes contra los que construir.' },
        { who: 'Responsables de privacidad', title: 'Te corresponde garantizar el derecho al borrado', body: 'El borrado del Artículo 17 del RGPD parece pelearse con un registro de solo anexar: ¿cómo borras datos personales de un registro cuyo sentido es que no puede cambiar?', gain: 'Compromisos Merkle salados por campo — borra el texto claro, las firmas siguen en pie.' },
        { who: 'Operaciones de seguridad', title: 'Vigilas la manipulación', body: 'Un monitor independiente convierte la protección latente en detección activa: equivocación, truncamiento, reescrituras del historial y cambios de clave no autorizados.', gain: 'Detection Findings con forma OCSF y entrega por webhook a tu SIEM.' },
      ],
    },
    how: {
      label: 'Cómo funciona',
      h2Html: 'Marca los pasos. Firma el registro. Áncralo donde no puedas <em>reescribirlo.</em>',
      introHtml:
        'El generador de recibos es un único nodo Code al final de un flujo, antes de la respuesta. Lee las salidas de los nodos relevantes para la decisión y produce todos los recibos en una sola pasada. El anclaje y la monitorización corren <em>fuera</em> del flujo, así que la ruta caliente en producción no gana latencia ni una nueva dependencia.',
      pipeline: ['Marcar pasos', 'Firmar recibos', 'Anexar a JSONL', 'Anclar (Merkle / STH)', 'Verificar sin conexión', 'Monitorizar en el tiempo'],
      steps: [
        { strong: 'Marca los nodos de decisión.', text: 'Cada nodo relevante para la decisión adjunta la entrada exacta que consumió, así el recibo calcula el hash de lo que el paso vio de verdad — no un sustituto uniforme.' },
        { strong: 'Genera y firma.', text: 'Una pasada emite los recibos de paso y de flujo, cada uno firmado con Ed25519 sobre una serialización canónica (RFC 8785). La generación es fail-open: una clave ausente se convierte en un error visible, pero nunca rompe el proceso de negocio que atestigua.' },
        { strong: 'Anexa a un registro inmutable.', text: 'Los recibos se escriben uno por línea en un archivo JSON Lines de solo anexar que sobrevive a los reinicios.' },
        { strong: 'Ancla de forma independiente.', text: 'Un sidecar agrupa los hashes de recibo en un árbol Merkle RFC 6962 y compromete Signed Tree Heads a un backend externo de solo anexar (OpenTimestamps/Bitcoin, Rekor, RFC 3161). Esto introduce una parte que el operador no controla — la analogía honesta es Certificate Transparency, no HTTPS con certificado autofirmado.' },
        { strong: 'Verificable por cualquiera.', text: 'Un script independiente y sin dependencias verifica una cadena entera sin conexión. El código de salida 0 significa válido, 1 significa que se encontró un problema.' },
        { strong: 'Monitoriza en el tiempo.', text: 'Un monitor independiente mantiene su propio diario de los tree heads que ha presenciado y da la alarma cuando una nueva vista contradice la anterior — atrapando equivocación, truncamiento, reescrituras del historial y cambios de clave no autorizados.' },
      ],
      verifyHeadingHtml: '<strong>Verifica un registro tú mismo — el comando completo:</strong>',
      afterCodeHtml: '¿Sin terminal? <a href="/axr/verify/">Arrastra un registro al verificador en el navegador</a> — ejecuta las mismas comprobaciones de firma, raíz Merkle y witness localmente, sin subir nada.',
    },
    design: {
      label: 'El diseño',
      h2Html: 'Primitivos sobrios, a <em>propósito.</em>',
      introP: 'El trabajo de aseguramiento debería ser auditable por personas que no lo escribieron. Por eso AXR usa solo bloques estándar y bien entendidos — y declara sus objetivos con claridad:',
      rows: [
        { dt: 'Firmado', dd: 'Ed25519 sobre una serialización canónica del recibo. Volver a firmar un registro manipulado requiere la clave privada; sin ella, las ediciones son visibles.' },
        { dt: 'Autónomo', dd: 'Un recibo verifica sin conexión con nada más que la clave pública. Sin acceso a la infraestructura del operador, sin confiar en su base de datos.' },
        { dt: 'A prueba de manipulaciones', dd: 'Cualquier cambio en un recibo rompe su firma; borrar uno rompe la cadena. El anclaje hace entonces la reescritura silenciosa detectable, no solo evidente.' },
        { dt: 'Sobrio a propósito', dd: 'SHA-256, Ed25519, JSON canónico, árboles Merkle RFC 6962. Sin criptografía novedosa, y cero dependencias en tiempo de ejecución.' },
      ],
    },
    maturity: {
      label: 'Madurez',
      h2Html: 'Un repositorio, por capas según cuánto se ha <em>ganado la confianza</em> cada parte.',
      introP: 'AXR se entrega como un único repo que abarca varios niveles de madurez. El sentido de esta tabla es la honestidad: lee el nivel de una función antes de depender de ella. El wire format 0.2 está congelado — los registros antiguos verifican byte a byte con el verificador actual, y todo el trabajo posterior es aditivo.',
      th: ['Capa', 'Versión', 'Madurez'],
      layers: [
        { layer: 'Núcleo — firma, encadenado, hash de entrada por paso, JSON canónico, paridad cross-impl', note: 'Probado en producción, wire format congelado; nodo n8n endurecido.', label: 'Estable' },
        { layer: 'Anclaje — agrupado Merkle, Signed Tree Heads, monitor, sellado de tiempo externo', note: 'Cron de anclaje por hora en producción; clave STH separada.', label: 'Desplegado' },
        { layer: 'Recibos redactables, atestación de efectos secundarios, trust root, separación de roles de clave', note: 'Probado; congelado en el contrato 1.0.', label: 'Estable' },
        { layer: 'Sucesión de claves — rotación anclada a root, distinguible de un compromiso', note: 'Paridad cross-impl + revisión adversaria; el piloto aún no la usa.', label: 'Estable' },
        { layer: 'Exportación SIEM — mapeo OCSF Detection Finding + webhook genérico', note: 'Salida con forma OCSF; entrega best-effort por diseño.', label: 'Estable' },
        { layer: 'Endurecimiento del ciclo de vida del root — root por quórum (M-de-N), rotación, revocación, CLI de ceremonia', note: 'Paridad cross-impl; la política de quórum es parte del modelo de amenazas.', label: 'Estable' },
        { layer: 'Control log — distribución de gobernanza anclada + divulgación parcial', note: 'Cierra la brecha de retención fuera de banda; 1.5 añade prueba de inclusión off-wire para un único registro (prueba uno, no reveles los demás).', label: 'Estable' },
        { layer: 'Ciclo de vida del witness — cosigning, revocación de emergencia, suspensión temporal con caducidad automática', note: 'Defensa preventiva de equivocación; el ciclo completo lento-revoca → revoca → suspende, cross-impl.', label: 'Estable' },
        { layer: "SDK de biblioteca — require('axr'): una superficie de API pública congelada + verify() programático", note: 'La superficie la fija un test; axr.verify() ejecuta el verificador canónico, así que nunca puede divergir.', label: 'Estable' },
      ],
    },
    proofProd: {
      label: 'Prueba en producción',
      h2Html: 'Un recibo honesto hace los fallos silenciosos <em>ruidosos.</em>',
      p1Html:
        'AXR corre en producción sobre un flujo de reservas real para ECO Clean HU — seis de los veinte nodos del flujo llevan recibo, y el registro — ya por encima de 227 recibos firmados — se ancla cada hora en un único árbol Merkle desde junio de 2026. Levantar esa capa de rendición de cuentas hizo algo que su operador no esperaba: sacó a la luz cuatro fallos reales anteriores a AXR, y dos defectos en las propias herramientas de AXR.',
      p2Html:
        'Ninguno implicó manipulación ni una firma inválida. Son legibilidad del comportamiento, no resistencia a manipulaciones: el recibo hizo la ejecución lo bastante legible como para que una contradicción entre la rama prevista y la ejecutada saliera sola a la luz. El Bug B fue justo eso — un rechazo que aun así disparó la rama de éxito, detectado en el momento en que se leyó el resultado del recibo.',
      findings: [
        { tag: 'Piloto — Bug B', text: 'Cada ejecución disparaba las tres ramas de respuesta a la vez: un rechazo ZONE_INCOMPATIBLE aun así enviaba un correo de éxito. El final_status del recibo hizo la contradicción inmediata. Resuelto con un nodo Switch que enruta según el resultado del recibo.' },
        { tag: 'Piloto — Bug C', text: 'Los rechazos devolvían «unknown_error» reflejando el propio mensaje del cliente — la razón real se perdía. El recibo registraba el estado correcto en cada ejecución, contradiciendo lo que recibían los clientes.' },
        { tag: 'Piloto — Bug D', text: 'Un conflicto de reverificación producía un HTTP 200 con cuerpo vacío, mientras el recibo era una cadena SLOT_TAKEN de 5 pasos completa y firmada. La brecha entre un recibo correcto y una respuesta vacía es exactamente lo que AXR está hecho para sacar a la luz.' },
        { tag: 'Piloto — Bug E', text: 'Tras un parche que subió la lógica a v5.1, cada recibo seguía atestiguando v5.0 — firmas válidas sobre una afirmación falsa de qué código decidió. Ahora las huellas hash de código sustituyen a las etiquetas escritas a mano, y la CI falla ante la deriva. Las etiquetas de versión son testimonio; los hashes de código son prueba.' },
        { tag: 'En el propio AXR', text: 'Una ejecución de prueba en sandbox del despliegue de anclaje atrapó dos defectos del propio AXR antes de que tocaran el registro en vivo: el anclaje entre versiones habría invalidado cada firma heredada, y el verificador de Python ignoraba en silencio el flag de clave separada. Ambos resueltos antes de emitir el primer ancla en producción. Una ejecución de prueba que se rompe en un sandbox es una función.' },
      ],
    },
    adversarial: {
      label: 'Prueba adversaria',
      h2Html: 'La afirmación «a prueba de manipulaciones», puesta a prueba <em>como lo haría un atacante.</em>',
      introP: 'Una afirmación de integridad vale solo lo que valen los intentos de romperla. AXR prueba su afirmación central de forma sistemática, no retórica:',
      rows: [
        { dt: '15 / 15 rechazadas', dd: 'Un único registro de recibos válido, anclado y generativo se somete a 15 mutaciones distintas — manipulación del cuerpo, borrado de pasos, intercambio de firmas, tree heads omitidos, pruebas de inclusión manipuladas, refirma con clave incorrecta, y más. El verificador rechaza las quince; el control intacto pasa.' },
        { dt: 'Dos implementaciones', dd: 'Credibilidad, como se la ganó Certificate Transparency: un segundo verificador totalmente independiente en Python puro — su propio canonicalizador, un Ed25519 en Python puro validado contra los vectores de prueba del RFC 8032, y la lógica Merkle del RFC 6962. Debe coincidir con el verificador Node en cada aceptación y cada rechazo.' },
        { dt: 'Byte-idéntico', dd: 'La promesa de «cualquiera puede verificar, en cualquier lenguaje» se apoya en una canonicalización determinista. El serializador sigue el RFC 8785 y lanza ante NaN / Infinity / undefined en vez de corromperlos en silencio. Los vectores de bytes entre lenguajes se fijan como contrato de conformidad.' },
        { dt: 'CI en cada push', dd: 'La suite completa — incl. paridad JS↔Python — corre en Node 18 / 20 / 22 y Python 3.10 / 3.11 / 3.12 en cada cambio.' },
      ],
    },
    standards: {
      label: 'Estándares y cumplimiento',
      h2Html: 'Construido hacia donde <em>van</em> las reglas.',
      p1Html:
        'AXR está diseñado para encajar en los deberes de registro que están llegando — no para afirmar cumplimiento certificado con ninguno. El Artículo 12 del Reglamento de IA de la UE exige que los sistemas de alto riesgo registren eventos automáticamente para la trazabilidad, y el Artículo 26 impone la conservación a los responsables del despliegue. El Artículo 17 del RGPD tira en sentido contrario, hacia el borrado. La AI Agent Standards Initiative del NIST está moldeando el lado de EE. UU. en torno a la identidad y la auditabilidad. Los recibos firmados y verificables de forma independiente son un primitivo sobre el que cada una de esas direcciones puede construir.',
      p2Html:
        'Dos piezas lo hacen concreto. Los <strong>recibos redactables</strong> resuelven la tensión RGPD-contra-solo-anexar: los campos sensibles se comprometen a través de un árbol Merkle salado por campo, así el texto claro puede borrarse después mientras la firma, la cadena y la prueba ya anclada siguen en pie. Y el <strong>Compliance Report Generator</strong> convierte un registro en bruto en un informe HTML listo para auditoría — integridad, la línea de tiempo de gobernanza de claves, el estado de anclaje, y un mapeo de controles para el Artículo 12 del Reglamento de IA de la UE / RGPD.',
      smallHtml:
        'La precisión importa aquí: «diseñado para encajar» es la afirmación. El informe es una vista sobre el veredicto del verificador, no un sustituto, y no afirma nada que no haya comprobado.',
    },
    dogfooding: {
      label: 'Dogfooding',
      h2Html: 'AXR prueba su propia <em>construcción.</em>',
      p1Html:
        'AXR fue construido por un banco de trabajo de tres IA — Fable, Meridian y NEXUS — sobre un diario compartido de solo anexar. Ese diario es en sí un registro AXR verificable: cada entrada es un recibo firmado con Ed25519, todo el conjunto se ancla con Merkle en un único tree head firmado, y ese tree head fue cosignado por los dos agentes revisores — cada uno en su propio proceso, con una clave que generó y custodió él mismo, de modo que el orquestador nunca vio una clave privada. La instantánea comprometida se reverifica bajo el stack 1.0 completo, en tu navegador.',
      smallHtml:
        'Encuadre honesto: esto prueba que el diario no se ha alterado desde la firma, no que cada entrada fuera cierta al escribirse. Las cosignaturas son genuinamente independientes del proceso; la única brecha que queda hacia el zero-trust pleno es que la custodia sigue en la misma máquina — en producción los witnesses corren en zonas de seguridad separadas.',
      cta: 'Verifica el dev-log en vivo',
    },
    statusLimits: {
      label: 'Estado y límites',
      h2Html: 'En vivo, abierto y honesto sobre <em>ambas cosas.</em>',
      introHtml:
        'AXR es de código abierto, con licencia MIT, y se desarrolla en público. Desde 1.0 el wire format y el contrato CLI/verificador están congelados para 1.x; 1.1–1.4 solo añadieron registros retrocompatibles y un SDK de biblioteca congelado. El núcleo y la capa de anclaje corren en producción; las capas superiores — sucesión de claves, roots por quórum, el control log y el ciclo de vida completo del witness (cosigning, revocación de emergencia, suspensión temporal) — están probadas, verificadas cross-impl y son aditivas, pero el piloto en vivo aún no las usa. El proyecto es honesto sobre sus propias carencias:',
      items: [
        { tag: 'Siguiente', text: 'Cambiar el backend de anclaje en producción de local a OpenTimestamps (Bitcoin) — un solo flag, una vez que la cadencia haya corrido de forma estable.' },
        { tag: 'Siguiente', text: 'Ejecutar el monitor independiente en una parte fuera del operador, llevando la detección de vista dividida / equivocación de pasiva a activa.' },
        { tag: 'Siguiente', text: 'Ejercitar recibos de paso generativos (LLM) en un flujo en vivo — soportado y probado de extremo a extremo, aún no en producción.' },
        { tag: 'Siguiente', text: 'Recibos de ruta de error — firmar también las ejecuciones fallidas, mediante un nodo de marca en la ruta de error del flujo. Un fallo es a menudo de lo que más necesitas prueba; esto amplía la cobertura del generador y deja intacto el wire format 1.x congelado.' },
        { tag: 'Abierto', text: 'Identidad de agente autodeclarada, y almacenamiento de claves en archivo PEM (no de grado hardware) — ambos deliberadamente fuera del alcance actual.' },
      ],
      cta: 'Sigue el repositorio',
    },
    proof: {
      label: 'Prueba',
      h2Html: 'Este sitio corre sobre el mismo <em>primitivo.</em>',
      pHtml:
        'Cada despliegue de chrisconen.dev publica un manifiesto de cada archivo del sitio, con su hash SHA-256 y firmado con Ed25519. Tu navegador puede verificar la firma y recalcular el hash de cualquier archivo contra el manifiesto. Es la idea central de AXR aplicada a un pipeline de build en vez de a un agente — el mismo recibo, distinto actor.',
      cta: 'Verifica este sitio',
    },
  },
};
