// Per-locale TEXT for /axr, consumed by src/components/AxrPage.astro. Only
// translatable prose lives here; structural/non-translatable data (stat numbers,
// maturity versions/states, code blocks, pipeline flags, hrefs) lives in the
// component and is zipped with these arrays by index. EN is canonical; HU/DE/ES
// are translations (DE/ES added next). Fields ending "Html" allow inline markup.

export const LOCALES = ['en', 'hu'];

export const AXR: Record<string, any> = {
  en: {
    meta: {
      title: 'Tamper-evident audit trail for AI agents and n8n — AXR',
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
      title: 'Manipuláció-detektáló audit-nyomvonal AI-ágenseknek és n8n-hez — AXR',
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
};
