// Per-locale content for /axr/start, consumed by src/components/StartPage.astro.
// EN is the canonical source; HU/DE/ES are translations (DE/ES added next).
// Signed sample values (A. Nagy, 38000, BOOKING_CONFIRMED) are NOT here — they
// are the bytes the demo verifies and live in the component. Fields ending in
// "Html" may contain inline <em>/<strong>/<a> and are rendered with set:html.

export const LOCALES = ['en', 'hu', 'de', 'es'];

export const START: Record<string, any> = {
  en: {
    meta: {
      title: 'AXR in plain English — proof of what your AI actually did',
      description:
        'A plain-English guide to AXR for people who run AI but aren’t cryptographers. When your automation is questioned, an AXR receipt proves what it did — a tamper-evident record anyone can check, without taking your word for it. Break the seal live, then learn how to use it.',
    },
    hero: {
      kickerMid: 'Plain English',
      kickerEnd: 'For people who run AI, not cryptography',
      h1Html: 'Your AI runs your business. Can you <em>prove what it did?</em>',
      lede1Html:
        'Your AI books appointments, sets prices, sends messages, processes refunds — real money, real decisions, real risk of a dispute. The day a customer says it did something it shouldn’t have, your log says everything’s fine. But <em>you</em> wrote that log. Who’s going to believe you?',
      lede2Html:
        'AXR gives every decision a <strong>receipt</strong> — like the seal on a parcel, but for your automation. It can’t be changed afterwards, and anyone can check it without taking your word for it. Don’t take ours either: break one yourself, just below.',
      chips: [
        { label: 'Free & open source', strong: 'MIT' },
        { label: 'Set up in', strong: '~10 minutes' },
        { label: 'In your browser', strong: 'nothing uploaded' },
      ],
      btns: ['See it work ↓', 'How to use it', 'The technical version'],
    },
    demo: {
      label: 'See it',
      h2Html: 'A receipt with a <em>seal.</em> Try to break it.',
      intro:
        'Below is a real, signed AXR receipt — the kind your automation would produce for one booking. The seal is green because every character matches the signature. <strong>Edit any field</strong> and watch the seal break, live, on your machine. Nothing is uploaded.',
      cardHead: 'AI booking receipt',
      fields: { customer: 'Customer', service: 'Service', date: 'Date', price: 'Price (HUF)', decision: 'Decision' },
      changedTag: 'changed',
      reset: 'Reset the receipt',
      whHead: 'What just happened?',
      whP1Html:
        'Your browser recomputed the receipt’s Ed25519 signature over the exact text shown — the same check a verifier runs. Match → green. One byte off → red. No server, no upload.',
      whP2Html:
        'This proves the record wasn’t changed since signing. It does <em>not</em> prove the decision was right — it makes a wrong one <em>undeniable.</em>',
      tryOwn: 'Try it with your own data →',
      js: {
        statusDefault: 'Edit any field above. The seal breaks the instant one character no longer matches what was signed.',
        statusRestored: 'Back to the original — every character matches what was signed, so the seal re-forms.',
        statusTampered: 'The record no longer matches its signature. This is exactly the moment a verifier rejects an altered receipt — the change cannot hide.',
        sealIntact: ['VERIFIED', 'INTACT'],
        sealTampered: ['TAMPERED', 'INVALID'],
        stampValid: 'Signature valid',
        stampBroken: 'Signature broken',
      },
    },
    whatItIs: {
      label: 'What it actually is',
      h2Html: 'Like the seal on a parcel — but for your <em>automation.</em>',
      p1: 'When a courier hands over a parcel, they get a signature. You don’t write it; you can’t change it later; and if there’s a dispute, you both look at it. AXR is that, done automatically for your AI — and the stamp can’t be swapped out afterwards.',
      contrast: [
        { label: 'Editable story', h3: 'Your server log', p: 'Written by you, on your server, at any time. In a dispute it’s your word about your own systems.' },
        { label: 'Verifiable record', h3: 'An AXR receipt', p: 'Sealed when the decision happened, checkable offline by anyone — no access to you or your systems needed.' },
      ],
      pullquoteHtml: 'A log you alone can rewrite is a story. A receipt anyone can check is a <em>record.</em>',
      smallHtml:
        'Under the hood it’s standard, proven cryptography — a digital signature and a tamper-evident chain, nothing experimental. You never have to see any of it to use it. (If you want to check, the code is open source.)',
    },
    isThisYou: {
      label: 'Is this you?',
      h2Html: 'You might need this and not <em>know it yet.</em>',
      introHtml: 'Nobody searches for "tamper-evident audit trail." They hit a moment like one of these — and suddenly the question is <em>can you prove it?</em>',
      personas: [
        { who: 'You run a webshop', trigger: '"I returned the parcel two weeks ago — your system says the refund went out. It didn’t."' },
        { who: 'You handle the books', trigger: '"Your system dunned an invoice I already paid. Three times. Fix it or I call a lawyer."' },
        { who: 'You screen applicants', trigger: '"Your AI rejected me because I’m 52." Now prove age was never an input.' },
        { who: 'You answer to a regulator', trigger: '"Show that last year’s automated decision followed the policy in force at the time."' },
        { who: 'You just use ChatGPT for everything', trigger: '"The contract says something else than we agreed." — "But the AI wrote it…" is not a defence.' },
      ],
    },
    stories: {
      label: 'Four stories',
      h2Html: 'What it looks like when it <em>saves you.</em>',
      items: [
        { tag: 'Webshop', title: 'The refund that never left', body: 'Your automation says refund_processed: true. The customer never got the money; the bank says it never received a request. Whose fault is it? With a receipt for that step, you can show whether the bot actually issued the instruction — so you know in seconds where the chain broke, instead of eating a chargeback to keep the peace.' },
        { tag: 'Finance / bookkeeping', title: 'The invoice that was already paid', body: 'An AI kept sending payment demands on a settled invoice, and the customer is threatening to sue. Your internal log says everything was correct — but you wrote that log. A signed receipt for each billing decision is something the other side (or a court) can check without phoning your developer.' },
        { tag: 'Hiring / HR', title: 'The rejected candidate', body: 'A rejected applicant suspects the AI screened them out for a forbidden reason. You need to show what the decision actually saw. A signed decision record lets an authority check that the banned data was never an input — they don’t have to take your word for it. (And personal data can still be erased later without breaking the signature.)' },
        { tag: 'Regulated', title: 'The audit, a year later', body: 'A supervisor asks you to prove a past automated decision followed the rules in force at the time. The model has changed since. An anchored, signed trail lets them verify the record was not edited after the fact — and you can hand them an auditor-ready report instead of raw files.' },
      ],
      footnoteHtml: 'Not a thought experiment: AXR runs in production today on a live booking workflow — 200+ signed receipts, anchored hourly since June 2026. <a href="/axr/">See the technical account</a>.',
    },
    moment: {
      label: 'The moment it matters',
      h2Html: 'Now picture yourself in front of a <em>judge.</em>',
      introHtml: 'You hold up a screenshot of your log. The judge asks: <em>"You wrote this yourself, correct?"</em> With a receipt, the answer changes — because the other side can check it without trusting you. These moments are already arriving:',
      items: [
        { tag: 'Dispute', text: 'A customer’s screenshot against your log — and no neutral record to settle it.' },
        { tag: 'Audit', text: '"Prove the automated decision followed the rules in force at the time."' },
        { tag: 'Law', text: 'The EU AI Act’s high-risk rules include automatic, retainable logging, with the main regime applying from 2 August 2026 — and it has to be auditable.' },
      ],
    },
    how: {
      label: 'How to use it',
      h2Html: 'Three steps. No <em>cryptography degree.</em>',
      steps: [
        { strong: 'Record.', text: 'Every decision your automation makes gets a receipt — what went in, what it decided, when, and which version of the logic ran.' },
        { strong: 'Seal.', text: 'The receipt is signed and chained to the one before it. Change a single character and the seal breaks; remove one and the chain breaks.' },
        { strong: 'Check.', text: 'Anyone can verify a receipt — in a browser, with nothing uploaded — without trusting you or your systems.' },
      ],
      paths: [
        { h3: 'If you use n8n', p: 'Drop one Code node at the end of your workflow. That’s it — about ten minutes, no server, no dependencies. From then on every run leaves a signed receipt.', cta: 'The n8n walkthrough' },
        { h3: 'If you don’t (yet)', p: 'Start by checking a receipt yourself — one click, nothing uploaded — so you can see exactly what the green seal means before you produce one.', cta: 'Check a receipt in your browser' },
      ],
    },
    faq: {
      label: 'Straight answers',
      h2Html: 'The honest <em>small print.</em>',
      items: [
        { q: '"My log already shows this. Why do I need more?"', a: 'You wrote that log, on your own server. In a dispute it counts for about as much as your own word. Your logs are still your first line of defence — an AXR receipt just makes them independently checkable, by the customer, an auditor or a court, without your help.' },
        { q: '"Isn’t this too complicated for us?"', a: 'One click in your browser to check a receipt. Or one node at the end of your n8n workflow. No install, no server, no new account. It’s free and open source. If it doesn’t click in ten minutes, you’ve lost ten minutes.' },
        { q: '"What if I set it up wrong?"', a: 'The receipt step never blocks your workflow. If signing fails, your business process still completes — you get an honest "unsigned" gap in the record, never a forged one. There’s no silent failure to clean up after.' },
        { q: '"AI is new — why worry about this now?"', a: 'The EU AI Act’s high-risk rules include automatic logging, and the main regime applies from 2 August 2026. And the first dispute where you can’t prove what your AI did will cost more than setting this up ever will.' },
        { q: '"Does it slow my system down?"', a: 'No. Writing the receipt runs alongside your workflow; anchoring runs outside it. If the receipt step ever fails, your business process still completes — it just leaves a visible, honest gap.' },
      ],
      notClaimH3Html: 'What it does <em>not</em> claim',
      limits: [
        { tag: 'Honest', textHtml: 'A green seal proves the record hasn’t changed since it was signed. It does <em>not</em> prove the decision was correct, or that the AI told the truth. AXR makes mistakes <em>visible and undeniable</em> — it doesn’t prevent them.' },
        { tag: 'Honest', textHtml: '"Verified" means the record checks out locally. It is not, by itself, a certificate of legal compliance.' },
        { tag: 'Open', textHtml: 'It’s open source (MIT). The point of being open is that you don’t have to trust us — anyone can read exactly how it works.' },
      ],
    },
    tryIt: {
      label: 'Try it',
      h2Html: 'Don’t take our word for <em>any of this.</em>',
      pHtml: 'That’s the whole idea. Check a real receipt in your browser right now — nothing uploaded, nothing installed. Green seal, genuine record; red seal, it was changed. That’s the whole test.',
      ctas: ['Check a real receipt', 'Set it up in n8n', 'Ask a question'],
      smallHtml: 'Prefer the deep end? The <a href="/axr/">full technical account</a> covers the threat model, the two independent verifiers, and the limits.',
    },
  },

  hu: {
    meta: {
      title: 'AXR köznyelven — bizonyíték arról, mit csinált valójában az AI-d',
      description:
        'Köznyelvi útmutató az AXR-hez azoknak, akik AI-t használnak, de nem kriptográfusok. Amikor megkérdőjelezik az automatizmusodat, az AXR-bizonylat bizonyítja, mit csinált — manipuláció-detektáló rekord, amit bárki ellenőrizhet, a szavad nélkül. Törd el a pecsétet élőben, aztán tanuld meg, hogyan használd.',
    },
    hero: {
      kickerMid: 'Köznyelven',
      kickerEnd: 'Azoknak, akik AI-t üzemeltetnek, nem kriptográfiát',
      h1Html: 'Az AI-d viszi az üzleted. Tudod <em>bizonyítani, mit csinált?</em>',
      lede1Html:
        'Az AI-d időpontokat foglal, árakat állít, üzeneteket küld, visszatérítéseket intéz — valódi pénz, valódi döntések, valódi vitakockázat. Aznap, amikor egy ügyfél azt mondja, valami olyat tett, amit nem kellett volna, a naplód szerint minden rendben. De azt a naplót <em>te</em> írtad. Ki fog hinni neked?',
      lede2Html:
        'Az AXR minden döntésről <strong>bizonylatot</strong> ad — mint a pecsét egy csomagon, csak az automatizmusodnak. Utólag nem módosítható, és bárki ellenőrizheti anélkül, hogy a szavadat kéne adnod. Ne hidd el a miénket sem: törj el egyet te magad, rögtön lentebb.',
      chips: [
        { label: 'Ingyenes & nyílt forrású', strong: 'MIT' },
        { label: 'Beüzemelés', strong: '~10 perc' },
        { label: 'A böngésződben', strong: 'semmi feltöltés' },
      ],
      btns: ['Nézd meg működés közben ↓', 'Hogyan használd', 'A technikai változat'],
    },
    demo: {
      label: 'Nézd meg',
      h2Html: 'Bizonylat <em>pecséttel.</em> Próbáld eltörni.',
      intro:
        'Lent egy valódi, aláírt AXR-bizonylat — amilyet az automatizmusod készítene egy foglalásról. A pecsét zöld, mert minden karakter egyezik az aláírással. <strong>Írj át bármelyik mezőt</strong>, és nézd, ahogy a pecsét eltörik, élőben, a saját gépeden. Semmi nem töltődik fel.',
      cardHead: 'AI foglalási bizonylat',
      fields: { customer: 'Ügyfél', service: 'Szolgáltatás', date: 'Dátum', price: 'Ár (HUF)', decision: 'Döntés' },
      changedTag: 'módosítva',
      reset: 'Bizonylat visszaállítása',
      whHead: 'Mi történt az imént?',
      whP1Html:
        'A böngésződ újraszámolta a bizonylat Ed25519-aláírását a megjelenített pontos szöveg felett — ugyanaz az ellenőrzés, amit egy verifier futtat. Egyezik → zöld. Egy bájt eltérés → piros. Nincs szerver, nincs feltöltés.',
      whP2Html:
        'Ez azt bizonyítja, hogy a rekord nem változott az aláírás óta. Azt <em>nem</em> bizonyítja, hogy a döntés helyes volt — a rossz döntést viszont <em>letagadhatatlanná</em> teszi.',
      tryOwn: 'Próbáld a saját adataiddal →',
      js: {
        statusDefault: 'Írj át bármelyik mezőt fent. A pecsét abban a pillanatban eltörik, amint egyetlen karakter sem egyezik már az aláírttal.',
        statusRestored: 'Vissza az eredetihez — minden karakter egyezik az aláírttal, így a pecsét újraáll.',
        statusTampered: 'A rekord már nem egyezik az aláírásával. Pontosan ez az a pillanat, amikor egy ellenőrző elutasít egy módosított bizonylatot — a változás nem rejthető el.',
        sealIntact: ['HITELES', 'SÉRTETLEN'],
        sealTampered: ['MEGHAMISÍTVA', 'ÉRVÉNYTELEN'],
        stampValid: 'Aláírás érvényes',
        stampBroken: 'Aláírás megtört',
      },
    },
    whatItIs: {
      label: 'Mi is ez valójában',
      h2Html: 'Mint a pecsét egy csomagon — csak az <em>automatizmusodnak.</em>',
      p1: 'Amikor a futár átad egy csomagot, aláírást kér. Nem te írod; utólag nem módosíthatod; és ha vita van, mindketten azt nézitek. Az AXR ugyanez, automatikusan az AI-dnak — és a pecsétet utólag nem lehet kicserélni.',
      contrast: [
        { label: 'Szerkeszthető történet', h3: 'A te szervernaplód', p: 'Te írod, a saját szervereden, bármikor. Vitában a saját szavad a saját rendszeredről.' },
        { label: 'Ellenőrizhető rekord', h3: 'Egy AXR-bizonylat', p: 'A döntés pillanatában lepecsételve, offline bárki által ellenőrizhető — nem kell hozzáférés hozzád vagy a rendszeredhez.' },
      ],
      pullquoteHtml: 'A napló, amit egyedül te írhatsz át, egy történet. A bizonylat, amit bárki ellenőrizhet, egy <em>rekord.</em>',
      smallHtml:
        'A motorháztető alatt szabványos, bevált kriptográfia — digitális aláírás és manipuláció-detektáló lánc, semmi kísérleti. Soha nem kell látnod belőle semmit a használathoz. (Ha ellenőriznéd, a kód nyílt forrású.)',
    },
    isThisYou: {
      label: 'Ez te vagy?',
      h2Html: 'Lehet, hogy szükséged van rá, és <em>még nem is tudod.</em>',
      introHtml: 'Senki nem keres „manipuláció-detektáló audit-nyomvonalra". Egyszer csak beüt egy ilyen pillanat — és hirtelen az a kérdés: <em>tudod bizonyítani?</em>',
      personas: [
        { who: 'Webshopod van', trigger: '„Két hete visszaküldtem a csomagot — a rendszeretek szerint a visszatérítés elment. Nem ment el."' },
        { who: 'Te viszed a könyvelést', trigger: '„A rendszeretek háromszor küldött fizetési felszólítást egy már kifizetett számlára. Javítsátok, vagy ügyvédet hívok."' },
        { who: 'Önéletrajzokat szűrsz', trigger: '„Az AI-tok azért utasított el, mert 52 vagyok." Most bizonyítsd, hogy a kor sosem volt bemenet.' },
        { who: 'Felügyeletnek felelsz', trigger: '„Bizonyítsa, hogy a tavalyi automatikus döntés az akkor hatályos szabályzatot követte."' },
        { who: 'Mindenre a ChatGPT-t használod', trigger: '„A szerződésben más áll, mint amiben megegyeztünk." — A „de az AI írta…" nem védekezés.' },
      ],
    },
    stories: {
      label: 'Négy történet',
      h2Html: 'Így néz ki, amikor <em>megment.</em>',
      items: [
        { tag: 'Webshop', title: 'A visszatérítés, ami sosem indult el', body: 'Az automatizmusod azt írja: refund_processed: true. Az ügyfél sosem kapta meg a pénzt; a bank szerint sosem érkezett kérelem. Kinek a hibája? Ha van bizonylat arról a lépésről, megmutathatod, tényleg kiadta-e a robot az utasítást — így másodpercek alatt tudod, hol szakadt el a lánc, ahelyett hogy chargebacket nyelnél a békesség kedvéért.' },
        { tag: 'Pénzügy / könyvelés', title: 'A számla, ami már ki volt fizetve', body: 'Egy AI folyamatosan fizetési felszólításokat küldött egy rendezett számlára, és az ügyfél perrel fenyeget. A belső naplód szerint minden rendben volt — de azt a naplót te írtad. Egy aláírt bizonylat minden számlázási döntésről olyasmi, amit a másik fél (vagy egy bíróság) a fejlesztőd felhívása nélkül ellenőrizhet.' },
        { tag: 'Toborzás / HR', title: 'Az elutasított jelölt', body: 'Egy elutasított jelölt azt gyanítja, hogy az AI tiltott okból szűrte ki. Meg kell mutatnod, mit látott valójában a döntés. Egy aláírt döntési rekord lehetővé teszi, hogy egy hatóság ellenőrizze: a tiltott adat sosem volt bemenet — nem kell a szavadat adnod. (És a személyes adat utólag törölhető az aláírás megtörése nélkül.)' },
        { tag: 'Szabályozott', title: 'Az audit, egy évvel később', body: 'Egy felügyelő azt kéri, bizonyítsd, hogy egy múltbeli automatikus döntés az akkor hatályos szabályokat követte. A modell azóta változott. Egy lehorgonyzott, aláírt nyomvonal lehetővé teszi, hogy ellenőrizzék: a rekordot utólag nem szerkesztették — és nyers fájlok helyett auditor-kész riportot adhatsz át.' },
      ],
      footnoteHtml: 'Nem gondolatkísérlet: az AXR ma is élesben fut egy valódi foglalási folyamaton — 200+ aláírt bizonylat, óránként lehorgonyozva 2026 júniusa óta. <a href="/axr/">Lásd a technikai leírást</a>.',
    },
    moment: {
      label: 'A pillanat, amikor számít',
      h2Html: 'Most képzeld magad egy <em>bíró elé.</em>',
      introHtml: 'Felmutatod a naplód képernyőképét. A bíró kérdi: <em>„Ezt ön írta, igaz?"</em> Bizonylattal a válasz megváltozik — mert a másik fél a bizalmad nélkül is ellenőrizheti. Ezek a pillanatok már jönnek:',
      items: [
        { tag: 'Vita', text: 'Az ügyfél képernyőképe a naplóddal szemben — és nincs semleges rekord, ami eldöntené.' },
        { tag: 'Audit', text: '„Bizonyítsa, hogy az automatikus döntés az akkor hatályos szabályokat követte."' },
        { tag: 'Jog', text: 'Az EU AI Act magas kockázatú szabályai automatikus, megőrzendő naplózást írnak elő, a fő rezsim 2026. augusztus 2-tól alkalmazandó — és auditálhatónak kell lennie.' },
      ],
    },
    how: {
      label: 'Hogyan használd',
      h2Html: 'Három lépés. Nem kell <em>kriptográfia-diploma.</em>',
      steps: [
        { strong: 'Rögzítés.', text: 'Az automatizmusod minden döntéséről bizonylat készül — mi ment be, mit döntött, mikor, és melyik logikai verzió futott.' },
        { strong: 'Pecsételés.', text: 'A bizonylatot aláírja és az előzőhöz láncolja. Egyetlen karakter változás eltöri a pecsétet; egy törlése eltöri a láncot.' },
        { strong: 'Ellenőrzés.', text: 'Bárki ellenőrizhet egy bizonylatot — böngészőben, feltöltés nélkül — anélkül, hogy benned vagy a rendszeredben kéne megbíznia.' },
      ],
      paths: [
        { h3: 'Ha n8n-t használsz', p: 'Tegyél egy Code node-ot a workflow végére. Ennyi — kb. tíz perc, nincs szerver, nincs függőség. Onnantól minden lefutás aláírt bizonylatot hagy.', cta: 'Az n8n-útmutató' },
        { h3: 'Ha (még) nem', p: 'Kezdd azzal, hogy magad ellenőrzöl egy bizonylatot — egy kattintás, semmi feltöltés —, hogy pontosan lásd, mit jelent a zöld pecsét, mielőtt sajátot készítenél.', cta: 'Ellenőrizz egy bizonylatot a böngésződben' },
      ],
    },
    faq: {
      label: 'Őszinte válaszok',
      h2Html: 'A becsületes <em>apró betű.</em>',
      items: [
        { q: '„A naplóm már mutatja ezt. Minek több?"', a: 'A naplót te írtad, a saját szervereden. Vitában nagyjából annyit ér, mint a saját szavad. A naplóid továbbra is az első védvonalad — egy AXR-bizonylat csak függetlenül ellenőrizhetővé teszi őket: az ügyfél, egy auditor vagy egy bíróság által, a segítséged nélkül.' },
        { q: '„Nem túl bonyolult ez nekünk?"', a: 'Egy kattintás a böngésződben egy bizonylat ellenőrzéséhez. Vagy egy node az n8n-workflow-d végén. Nincs telepítés, nincs szerver, nincs új fiók. Ingyenes és nyílt forrású. Ha tíz perc alatt nem áll össze, tíz percet vesztettél.' },
        { q: '„Mi van, ha rosszul állítom be?"', a: 'A bizonylat-lépés sosem blokkolja a workflow-t. Ha az aláírás hibázik, az üzleti folyamatod akkor is lefut — őszinte „aláíratlan" rés keletkezik a rekordban, sosem hamis. Nincs néma hiba, amit utólag takarítani kéne.' },
        { q: '„Az AI új — minek aggódni emiatt most?"', a: 'Az EU AI Act magas kockázatú szabályai automatikus naplózást írnak elő, a fő rezsim 2026. augusztus 2-tól alkalmazandó. És az első vita, amelyben nem tudod bizonyítani, mit csinált az AI-d, többe fog kerülni, mint amennyibe ennek a beállítása valaha is.' },
        { q: '„Lassítja a rendszeremet?"', a: 'Nem. A bizonylat írása a workflow mellett fut; a lehorgonyzás azon kívül. Ha a bizonylat-lépés valaha hibázik, az üzleti folyamatod akkor is lefut — csak egy látható, őszinte rés marad.' },
      ],
      notClaimH3Html: 'Amit <em>nem</em> állít',
      limits: [
        { tag: 'Őszinte', textHtml: 'A zöld pecsét azt bizonyítja, hogy a rekord nem változott az aláírás óta. Azt <em>nem</em> bizonyítja, hogy a döntés helyes volt, vagy hogy az AI igazat mondott. Az AXR <em>láthatóvá és letagadhatatlanná</em> teszi a hibákat — nem előzi meg őket.' },
        { tag: 'Őszinte', textHtml: 'A „hiteles" azt jelenti, hogy a rekord helyben ellenőrizve. Önmagában nem jogi megfelelőségi tanúsítvány.' },
        { tag: 'Nyílt', textHtml: 'Nyílt forrású (MIT). A nyíltság lényege, hogy nem kell megbíznod bennünk — bárki elolvashatja, pontosan hogyan működik.' },
      ],
    },
    tryIt: {
      label: 'Próbáld ki',
      h2Html: 'Ne hidd el a szavunkat <em>egyikről sem.</em>',
      pHtml: 'Pont ez a lényeg. Ellenőrizz egy valódi bizonylatot a böngésződben most azonnal — semmi feltöltés, semmi telepítés. Zöld pecsét: valódi rekord; piros pecsét: megváltoztatták. Ennyi az egész teszt.',
      ctas: ['Ellenőrizz egy valódi bizonylatot', 'Állítsd be n8n-ben', 'Tegyél fel egy kérdést'],
      smallHtml: 'Inkább a mélyvíz? A <a href="/axr/">teljes technikai leírás</a> kitér a fenyegetésmodellre, a két független ellenőrzőre és a határokra.',
    },
  },

  de: {
    meta: {
      title: 'AXR auf Deutsch erklärt — Beweis dafür, was Ihre KI wirklich getan hat',
      description:
        'Eine verständliche Einführung in AXR für Menschen, die KI einsetzen, aber keine Kryptografen sind. Wird Ihre Automatisierung infrage gestellt, beweist ein AXR-Beleg, was sie getan hat — ein manipulationssicherer Nachweis, den jeder prüfen kann, ohne Ihnen glauben zu müssen. Brechen Sie das Siegel live, dann lernen Sie, wie man es nutzt.',
    },
    hero: {
      kickerMid: 'Verständlich erklärt',
      kickerEnd: 'Für Menschen, die KI betreiben, nicht Kryptografie',
      h1Html: 'Ihre KI führt Ihr Geschäft. Können Sie <em>beweisen, was sie getan hat?</em>',
      lede1Html:
        'Ihre KI bucht Termine, setzt Preise, sendet Nachrichten, bearbeitet Rückerstattungen — echtes Geld, echte Entscheidungen, echtes Streitrisiko. An dem Tag, an dem ein Kunde sagt, sie habe etwas getan, was sie nicht durfte, sagt Ihr Protokoll, alles sei in Ordnung. Aber dieses Protokoll haben <em>Sie</em> geschrieben. Wer wird Ihnen glauben?',
      lede2Html:
        'AXR gibt jeder Entscheidung einen <strong>Beleg</strong> — wie das Siegel auf einem Paket, nur für Ihre Automatisierung. Er lässt sich nachträglich nicht ändern, und jeder kann ihn prüfen, ohne Ihnen glauben zu müssen. Glauben Sie auch uns nicht: brechen Sie selbst einen, gleich unten.',
      chips: [
        { label: 'Kostenlos & quelloffen', strong: 'MIT' },
        { label: 'Eingerichtet in', strong: '~10 Minuten' },
        { label: 'In Ihrem Browser', strong: 'nichts hochgeladen' },
      ],
      btns: ['Live ansehen ↓', 'So nutzen Sie es', 'Die technische Version'],
    },
    demo: {
      label: 'Ansehen',
      h2Html: 'Ein Beleg mit <em>Siegel.</em> Versuchen Sie, es zu brechen.',
      intro:
        'Unten sehen Sie einen echten, signierten AXR-Beleg — wie ihn Ihre Automatisierung für eine Buchung erzeugen würde. Das Siegel ist grün, weil jedes Zeichen zur Signatur passt. <strong>Ändern Sie ein beliebiges Feld</strong> und sehen Sie, wie das Siegel bricht — live, auf Ihrem Gerät. Nichts wird hochgeladen.',
      cardHead: 'KI-Buchungsbeleg',
      fields: { customer: 'Kunde', service: 'Leistung', date: 'Datum', price: 'Preis (HUF)', decision: 'Entscheidung' },
      changedTag: 'geändert',
      reset: 'Beleg zurücksetzen',
      whHead: 'Was ist gerade passiert?',
      whP1Html:
        'Ihr Browser hat die Ed25519-Signatur des Belegs über den exakt angezeigten Text neu berechnet — dieselbe Prüfung, die ein Verifizierer durchführt. Passt → grün. Ein Byte daneben → rot. Kein Server, kein Upload.',
      whP2Html:
        'Das beweist, dass der Datensatz seit der Signierung nicht verändert wurde. Es beweist <em>nicht</em>, dass die Entscheidung richtig war — es macht eine falsche <em>unbestreitbar.</em>',
      tryOwn: 'Mit eigenen Daten ausprobieren →',
      js: {
        statusDefault: 'Ändern Sie oben ein beliebiges Feld. Das Siegel bricht in dem Moment, in dem ein Zeichen nicht mehr zum Signierten passt.',
        statusRestored: 'Zurück zum Original — jedes Zeichen passt zum Signierten, also bildet sich das Siegel neu.',
        statusTampered: 'Der Datensatz passt nicht mehr zu seiner Signatur. Genau in diesem Moment weist ein Verifizierer einen veränderten Beleg ab — die Änderung kann sich nicht verstecken.',
        sealIntact: ['VERIFIZIERT', 'INTAKT'],
        sealTampered: ['MANIPULIERT', 'UNGÜLTIG'],
        stampValid: 'Signatur gültig',
        stampBroken: 'Signatur gebrochen',
      },
    },
    whatItIs: {
      label: 'Was es eigentlich ist',
      h2Html: 'Wie das Siegel auf einem Paket — nur für Ihre <em>Automatisierung.</em>',
      p1: 'Wenn ein Kurier ein Paket übergibt, lässt er sich unterschreiben. Sie schreiben die Unterschrift nicht; Sie können sie später nicht ändern; und bei einem Streit schauen beide darauf. AXR ist genau das, automatisch für Ihre KI — und der Stempel kann nachträglich nicht ausgetauscht werden.',
      contrast: [
        { label: 'Veränderbare Erzählung', h3: 'Ihr Server-Protokoll', p: 'Von Ihnen geschrieben, auf Ihrem Server, jederzeit. Im Streit ist es Ihr Wort über Ihre eigenen Systeme.' },
        { label: 'Prüfbarer Nachweis', h3: 'Ein AXR-Beleg', p: 'Versiegelt im Moment der Entscheidung, offline von jedem prüfbar — kein Zugriff auf Sie oder Ihre Systeme nötig.' },
      ],
      pullquoteHtml: 'Ein Protokoll, das nur Sie umschreiben können, ist eine Erzählung. Ein Beleg, den jeder prüfen kann, ist ein <em>Nachweis.</em>',
      smallHtml:
        'Darunter steckt standardisierte, bewährte Kryptografie — eine digitale Signatur und eine manipulationssichere Kette, nichts Experimentelles. Sie müssen davon nie etwas sehen, um es zu nutzen. (Wer prüfen möchte: der Code ist quelloffen.)',
    },
    isThisYou: {
      label: 'Sind Sie das?',
      h2Html: 'Vielleicht brauchen Sie das und <em>wissen es noch nicht.</em>',
      introHtml: 'Niemand sucht nach „manipulationssicherem Audit-Trail". Man gerät in einen dieser Momente — und plötzlich lautet die Frage: <em>können Sie es beweisen?</em>',
      personas: [
        { who: 'Sie betreiben einen Webshop', trigger: '„Ich habe das Paket vor zwei Wochen zurückgeschickt — Ihr System sagt, die Rückerstattung sei raus. War sie nicht."' },
        { who: 'Sie führen die Bücher', trigger: '„Ihr System hat eine bereits bezahlte Rechnung dreimal angemahnt. Beheben Sie das, oder ich rufe einen Anwalt."' },
        { who: 'Sie sichten Bewerbungen', trigger: '„Ihre KI hat mich abgelehnt, weil ich 52 bin." Beweisen Sie nun, dass das Alter nie eine Eingabe war.' },
        { who: 'Sie sind einer Aufsicht rechenschaftspflichtig', trigger: '„Belegen Sie, dass die automatisierte Entscheidung von letztem Jahr der damals geltenden Richtlinie folgte."' },
        { who: 'Sie nutzen einfach ChatGPT für alles', trigger: '„Im Vertrag steht etwas anderes als vereinbart." — „Aber die KI hat es geschrieben…" ist keine Verteidigung.' },
      ],
    },
    stories: {
      label: 'Vier Geschichten',
      h2Html: 'So sieht es aus, wenn es Sie <em>rettet.</em>',
      items: [
        { tag: 'Webshop', title: 'Die Rückerstattung, die nie losging', body: 'Ihre Automatisierung sagt refund_processed: true. Der Kunde hat das Geld nie erhalten; die Bank sagt, sie habe nie eine Anfrage bekommen. Wessen Schuld ist das? Mit einem Beleg für diesen Schritt können Sie zeigen, ob der Bot die Anweisung tatsächlich erteilt hat — so wissen Sie in Sekunden, wo die Kette riss, statt eine Rückbuchung zu schlucken, um Ruhe zu haben.' },
        { tag: 'Finanzen / Buchhaltung', title: 'Die Rechnung, die längst bezahlt war', body: 'Eine KI mahnte fortlaufend eine beglichene Rechnung an, und der Kunde droht mit Klage. Ihr internes Protokoll sagt, alles sei korrekt gewesen — aber dieses Protokoll haben Sie geschrieben. Ein signierter Beleg für jede Abrechnungsentscheidung ist etwas, das die Gegenseite (oder ein Gericht) prüfen kann, ohne Ihren Entwickler anzurufen.' },
        { tag: 'Recruiting / HR', title: 'Die abgelehnte Bewerberin', body: 'Eine abgelehnte Bewerberin vermutet, die KI habe sie aus einem verbotenen Grund aussortiert. Sie müssen zeigen, was die Entscheidung tatsächlich gesehen hat. Ein signierter Entscheidungsdatensatz lässt eine Behörde prüfen, dass die verbotenen Daten nie eine Eingabe waren — man muss Ihnen nicht glauben. (Und personenbezogene Daten lassen sich später löschen, ohne die Signatur zu brechen.)' },
        { tag: 'Reguliert', title: 'Das Audit, ein Jahr später', body: 'Eine Aufsicht bittet Sie zu beweisen, dass eine vergangene automatisierte Entscheidung den damals geltenden Regeln folgte. Das Modell hat sich seither geändert. Ein verankerter, signierter Verlauf lässt sie prüfen, dass der Datensatz nachträglich nicht bearbeitet wurde — und Sie übergeben einen auditbereiten Bericht statt Rohdateien.' },
      ],
      footnoteHtml: 'Kein Gedankenexperiment: AXR läuft heute produktiv auf einem echten Buchungs-Workflow — 200+ signierte Belege, seit Juni 2026 stündlich verankert. <a href="/axr/">Den technischen Bericht ansehen</a>.',
    },
    moment: {
      label: 'Der Moment, in dem es zählt',
      h2Html: 'Stellen Sie sich nun vor einem <em>Richter</em> vor.',
      introHtml: 'Sie halten einen Screenshot Ihres Protokolls hoch. Der Richter fragt: <em>„Das haben Sie selbst geschrieben, korrekt?"</em> Mit einem Beleg ändert sich die Antwort — denn die Gegenseite kann ihn prüfen, ohne Ihnen zu vertrauen. Diese Momente kommen bereits:',
      items: [
        { tag: 'Streit', text: 'Der Screenshot eines Kunden gegen Ihr Protokoll — und kein neutraler Nachweis, der es klärt.' },
        { tag: 'Audit', text: '„Belegen Sie, dass die automatisierte Entscheidung den damals geltenden Regeln folgte."' },
        { tag: 'Gesetz', text: 'Die Hochrisiko-Regeln des EU AI Act umfassen automatische, aufbewahrungspflichtige Protokollierung; das Hauptregime gilt ab dem 2. August 2026 — und es muss auditierbar sein.' },
      ],
    },
    how: {
      label: 'So nutzen Sie es',
      h2Html: 'Drei Schritte. Kein <em>Kryptografie-Studium.</em>',
      steps: [
        { strong: 'Erfassen.', text: 'Jede Entscheidung Ihrer Automatisierung erhält einen Beleg — was hineinging, was sie entschied, wann, und welche Logikversion lief.' },
        { strong: 'Versiegeln.', text: 'Der Beleg wird signiert und an den vorherigen gekettet. Ändern Sie ein einziges Zeichen, bricht das Siegel; entfernen Sie einen, bricht die Kette.' },
        { strong: 'Prüfen.', text: 'Jeder kann einen Beleg verifizieren — im Browser, ohne Upload — ohne Ihnen oder Ihren Systemen zu vertrauen.' },
      ],
      paths: [
        { h3: 'Wenn Sie n8n nutzen', p: 'Setzen Sie einen Code-Node ans Ende Ihres Workflows. Das war’s — etwa zehn Minuten, kein Server, keine Abhängigkeiten. Ab dann hinterlässt jeder Lauf einen signierten Beleg.', cta: 'Die n8n-Anleitung' },
        { h3: 'Wenn (noch) nicht', p: 'Prüfen Sie zuerst selbst einen Beleg — ein Klick, kein Upload — damit Sie genau sehen, was das grüne Siegel bedeutet, bevor Sie einen erzeugen.', cta: 'Einen Beleg im Browser prüfen' },
      ],
    },
    faq: {
      label: 'Klare Antworten',
      h2Html: 'Das ehrliche <em>Kleingedruckte.</em>',
      items: [
        { q: '„Mein Protokoll zeigt das doch schon. Wozu mehr?"', a: 'Dieses Protokoll haben Sie geschrieben, auf Ihrem eigenen Server. In einem Streit zählt es etwa so viel wie Ihr eigenes Wort. Ihre Protokolle bleiben Ihre erste Verteidigungslinie — ein AXR-Beleg macht sie nur unabhängig prüfbar: durch den Kunden, einen Prüfer oder ein Gericht, ohne Ihre Hilfe.' },
        { q: '„Ist das nicht zu kompliziert für uns?"', a: 'Ein Klick im Browser, um einen Beleg zu prüfen. Oder ein Node am Ende Ihres n8n-Workflows. Keine Installation, kein Server, kein neues Konto. Es ist kostenlos und quelloffen. Wenn es in zehn Minuten nicht klickt, haben Sie zehn Minuten verloren.' },
        { q: '„Was, wenn ich es falsch einrichte?"', a: 'Der Beleg-Schritt blockiert Ihren Workflow nie. Schlägt das Signieren fehl, läuft Ihr Geschäftsprozess trotzdem durch — Sie erhalten eine ehrliche „unsignierte" Lücke im Datensatz, nie eine gefälschte. Es gibt kein stilles Versagen, das man hinterher aufräumen müsste.' },
        { q: '„KI ist neu — warum jetzt darüber nachdenken?"', a: 'Die Hochrisiko-Regeln des EU AI Act umfassen automatische Protokollierung; das Hauptregime gilt ab dem 2. August 2026. Und der erste Streit, in dem Sie nicht beweisen können, was Ihre KI getan hat, kostet mehr, als diese Einrichtung je kosten wird.' },
        { q: '„Verlangsamt es mein System?"', a: 'Nein. Das Schreiben des Belegs läuft neben Ihrem Workflow; die Verankerung läuft außerhalb. Sollte der Beleg-Schritt je fehlschlagen, läuft Ihr Geschäftsprozess trotzdem durch — es bleibt nur eine sichtbare, ehrliche Lücke.' },
      ],
      notClaimH3Html: 'Was es <em>nicht</em> behauptet',
      limits: [
        { tag: 'Ehrlich', textHtml: 'Ein grünes Siegel beweist, dass der Datensatz seit der Signierung unverändert ist. Es beweist <em>nicht</em>, dass die Entscheidung korrekt war oder dass die KI die Wahrheit sagte. AXR macht Fehler <em>sichtbar und unbestreitbar</em> — es verhindert sie nicht.' },
        { tag: 'Ehrlich', textHtml: '„Verifiziert" bedeutet, der Datensatz ist lokal stimmig. Es ist für sich genommen kein Nachweis rechtlicher Konformität.' },
        { tag: 'Offen', textHtml: 'Es ist quelloffen (MIT). Der Sinn der Offenheit ist, dass Sie uns nicht vertrauen müssen — jeder kann genau nachlesen, wie es funktioniert.' },
      ],
    },
    tryIt: {
      label: 'Ausprobieren',
      h2Html: 'Glauben Sie uns <em>nichts davon.</em>',
      pHtml: 'Genau das ist der Punkt. Prüfen Sie jetzt sofort einen echten Beleg im Browser — nichts hochgeladen, nichts installiert. Grünes Siegel: echter Datensatz; rotes Siegel: er wurde geändert. Das ist der ganze Test.',
      ctas: ['Einen echten Beleg prüfen', 'In n8n einrichten', 'Eine Frage stellen'],
      smallHtml: 'Lieber ins Detail? Der <a href="/axr/">vollständige technische Bericht</a> behandelt das Bedrohungsmodell, die zwei unabhängigen Verifizierer und die Grenzen.',
    },
  },

  es: {
    meta: {
      title: 'AXR en lenguaje claro — prueba de lo que tu IA hizo realmente',
      description:
        'Una guía en lenguaje claro sobre AXR para quienes usan IA pero no son criptógrafos. Cuando se cuestiona tu automatización, un recibo AXR prueba lo que hizo — un registro a prueba de manipulaciones que cualquiera puede verificar, sin tener que creerte. Rompe el sello en vivo y luego aprende a usarlo.',
    },
    hero: {
      kickerMid: 'En lenguaje claro',
      kickerEnd: 'Para quienes usan IA, no criptografía',
      h1Html: 'Tu IA lleva tu negocio. ¿Puedes <em>probar lo que hizo?</em>',
      lede1Html:
        'Tu IA reserva citas, fija precios, envía mensajes, procesa reembolsos — dinero real, decisiones reales, riesgo real de disputa. El día que un cliente diga que hizo algo que no debía, tu registro dice que todo está bien. Pero ese registro lo escribiste <em>tú</em>. ¿Quién te va a creer?',
      lede2Html:
        'AXR le da a cada decisión un <strong>recibo</strong> — como el sello de un paquete, pero para tu automatización. No se puede cambiar después, y cualquiera puede verificarlo sin tener que creerte. No nos creas a nosotros tampoco: rompe uno tú mismo, justo aquí abajo.',
      chips: [
        { label: 'Gratis y de código abierto', strong: 'MIT' },
        { label: 'Listo en', strong: '~10 minutos' },
        { label: 'En tu navegador', strong: 'nada se sube' },
      ],
      btns: ['Verlo funcionar ↓', 'Cómo usarlo', 'La versión técnica'],
    },
    demo: {
      label: 'Verlo',
      h2Html: 'Un recibo con <em>sello.</em> Intenta romperlo.',
      intro:
        'Abajo hay un recibo AXR real y firmado — del tipo que tu automatización generaría para una reserva. El sello está verde porque cada carácter coincide con la firma. <strong>Edita cualquier campo</strong> y mira cómo el sello se rompe, en vivo, en tu equipo. Nada se sube.',
      cardHead: 'Recibo de reserva de IA',
      fields: { customer: 'Cliente', service: 'Servicio', date: 'Fecha', price: 'Precio (HUF)', decision: 'Decisión' },
      changedTag: 'modificado',
      reset: 'Restablecer el recibo',
      whHead: '¿Qué acaba de pasar?',
      whP1Html:
        'Tu navegador recalculó la firma Ed25519 del recibo sobre el texto exacto mostrado — la misma comprobación que hace un verificador. Coincide → verde. Un byte distinto → rojo. Sin servidor, sin subir nada.',
      whP2Html:
        'Esto prueba que el registro no cambió desde que se firmó. <em>No</em> prueba que la decisión fuera correcta — hace que una equivocada sea <em>innegable.</em>',
      tryOwn: 'Pruébalo con tus propios datos →',
      js: {
        statusDefault: 'Edita cualquier campo arriba. El sello se rompe en el instante en que un carácter deja de coincidir con lo firmado.',
        statusRestored: 'De vuelta al original — cada carácter coincide con lo firmado, así que el sello se reconstituye.',
        statusTampered: 'El registro ya no coincide con su firma. Este es exactamente el momento en que un verificador rechaza un recibo alterado — el cambio no puede esconderse.',
        sealIntact: ['VERIFICADO', 'ÍNTEGRO'],
        sealTampered: ['ALTERADO', 'NO VÁLIDO'],
        stampValid: 'Firma válida',
        stampBroken: 'Firma rota',
      },
    },
    whatItIs: {
      label: 'Qué es en realidad',
      h2Html: 'Como el sello de un paquete — pero para tu <em>automatización.</em>',
      p1: 'Cuando un mensajero entrega un paquete, obtiene una firma. Tú no la escribes; no puedes cambiarla después; y si hay una disputa, ambos la miran. AXR es eso, hecho automáticamente para tu IA — y el sello no puede sustituirse a posteriori.',
      contrast: [
        { label: 'Relato editable', h3: 'Tu registro de servidor', p: 'Escrito por ti, en tu servidor, en cualquier momento. En una disputa es tu palabra sobre tus propios sistemas.' },
        { label: 'Registro verificable', h3: 'Un recibo AXR', p: 'Sellado en el momento de la decisión, verificable sin conexión por cualquiera — sin necesidad de acceso a ti ni a tus sistemas.' },
      ],
      pullquoteHtml: 'Un registro que solo tú puedes reescribir es un relato. Un recibo que cualquiera puede verificar es un <em>registro.</em>',
      smallHtml:
        'Por debajo es criptografía estándar y probada — una firma digital y una cadena a prueba de manipulaciones, nada experimental. Nunca tienes que ver nada de eso para usarlo. (Si quieres comprobarlo, el código es abierto.)',
    },
    isThisYou: {
      label: '¿Eres tú?',
      h2Html: 'Puede que lo necesites y <em>aún no lo sepas.</em>',
      introHtml: 'Nadie busca «registro de auditoría a prueba de manipulaciones». Llega uno de estos momentos — y de repente la pregunta es <em>¿puedes probarlo?</em>',
      personas: [
        { who: 'Tienes una tienda online', trigger: '«Devolví el paquete hace dos semanas — tu sistema dice que el reembolso salió. No salió.»' },
        { who: 'Llevas la contabilidad', trigger: '«Tu sistema reclamó tres veces una factura que ya pagué. Arréglalo o llamo a un abogado.»' },
        { who: 'Filtras candidatos', trigger: '«Tu IA me rechazó porque tengo 52 años.» Ahora prueba que la edad nunca fue una entrada.' },
        { who: 'Respondes ante un regulador', trigger: '«Demuestre que la decisión automatizada del año pasado siguió la política vigente entonces.»' },
        { who: 'Simplemente usas ChatGPT para todo', trigger: '«El contrato dice algo distinto de lo acordado.» — «Pero lo escribió la IA…» no es una defensa.' },
      ],
    },
    stories: {
      label: 'Cuatro historias',
      h2Html: 'Cómo se ve cuando te <em>salva.</em>',
      items: [
        { tag: 'Tienda online', title: 'El reembolso que nunca salió', body: 'Tu automatización dice refund_processed: true. El cliente nunca recibió el dinero; el banco dice que nunca recibió una solicitud. ¿De quién es la culpa? Con un recibo de ese paso, puedes mostrar si el bot realmente emitió la instrucción — así sabes en segundos dónde se rompió la cadena, en vez de tragarte un contracargo para tener paz.' },
        { tag: 'Finanzas / contabilidad', title: 'La factura que ya estaba pagada', body: 'Una IA siguió enviando reclamaciones de pago de una factura ya saldada, y el cliente amenaza con demandar. Tu registro interno dice que todo era correcto — pero ese registro lo escribiste tú. Un recibo firmado de cada decisión de facturación es algo que la otra parte (o un tribunal) puede verificar sin llamar a tu desarrollador.' },
        { tag: 'Selección / RR. HH.', title: 'La candidata rechazada', body: 'Una candidata rechazada sospecha que la IA la descartó por un motivo prohibido. Tienes que mostrar qué vio realmente la decisión. Un registro de decisión firmado permite que una autoridad verifique que el dato prohibido nunca fue una entrada — no tienen que creerte. (Y los datos personales pueden borrarse después sin romper la firma.)' },
        { tag: 'Regulado', title: 'La auditoría, un año después', body: 'Un supervisor te pide probar que una decisión automatizada pasada siguió las reglas vigentes entonces. El modelo ha cambiado desde entonces. Un rastro firmado y anclado les permite verificar que el registro no se editó a posteriori — y entregas un informe listo para auditoría en vez de archivos en bruto.' },
      ],
      footnoteHtml: 'No es un experimento mental: AXR funciona hoy en producción sobre un flujo de reservas real — más de 200 recibos firmados, anclados cada hora desde junio de 2026. <a href="/axr/">Ver el informe técnico</a>.',
    },
    moment: {
      label: 'El momento en que importa',
      h2Html: 'Ahora imagínate ante un <em>juez.</em>',
      introHtml: 'Levantas una captura de pantalla de tu registro. El juez pregunta: <em>«Esto lo escribió usted mismo, ¿correcto?»</em> Con un recibo, la respuesta cambia — porque la otra parte puede verificarlo sin confiar en ti. Estos momentos ya están llegando:',
      items: [
        { tag: 'Disputa', text: 'La captura de un cliente frente a tu registro — y ningún registro neutral que lo resuelva.' },
        { tag: 'Auditoría', text: '«Demuestre que la decisión automatizada siguió las reglas vigentes entonces.»' },
        { tag: 'Ley', text: 'Las reglas de alto riesgo del Reglamento de IA de la UE incluyen registro automático y conservable; el régimen principal se aplica desde el 2 de agosto de 2026 — y debe ser auditable.' },
      ],
    },
    how: {
      label: 'Cómo usarlo',
      h2Html: 'Tres pasos. Sin <em>doctorado en criptografía.</em>',
      steps: [
        { strong: 'Registrar.', text: 'Cada decisión de tu automatización obtiene un recibo — qué entró, qué decidió, cuándo y qué versión de la lógica se ejecutó.' },
        { strong: 'Sellar.', text: 'El recibo se firma y se encadena al anterior. Cambia un solo carácter y el sello se rompe; elimina uno y la cadena se rompe.' },
        { strong: 'Verificar.', text: 'Cualquiera puede verificar un recibo — en un navegador, sin subir nada — sin confiar en ti ni en tus sistemas.' },
      ],
      paths: [
        { h3: 'Si usas n8n', p: 'Coloca un nodo Code al final de tu flujo. Eso es todo — unos diez minutos, sin servidor, sin dependencias. A partir de ahí cada ejecución deja un recibo firmado.', cta: 'La guía de n8n' },
        { h3: 'Si (todavía) no', p: 'Empieza verificando un recibo tú mismo — un clic, sin subir nada — para ver exactamente qué significa el sello verde antes de generar uno.', cta: 'Verificar un recibo en tu navegador' },
      ],
    },
    faq: {
      label: 'Respuestas claras',
      h2Html: 'La <em>letra pequeña</em> honesta.',
      items: [
        { q: '«Mi registro ya muestra esto. ¿Para qué más?»', a: 'Ese registro lo escribiste tú, en tu propio servidor. En una disputa vale más o menos como tu propia palabra. Tus registros siguen siendo tu primera línea de defensa — un recibo AXR solo los hace verificables de forma independiente: por el cliente, un auditor o un tribunal, sin tu ayuda.' },
        { q: '«¿No es esto demasiado complicado para nosotros?»', a: 'Un clic en tu navegador para verificar un recibo. O un nodo al final de tu flujo de n8n. Sin instalación, sin servidor, sin cuenta nueva. Es gratis y de código abierto. Si no encaja en diez minutos, has perdido diez minutos.' },
        { q: '«¿Y si lo configuro mal?»', a: 'El paso del recibo nunca bloquea tu flujo. Si la firma falla, tu proceso de negocio se completa igualmente — obtienes un hueco honesto «sin firmar» en el registro, nunca uno falsificado. No hay fallo silencioso que limpiar después.' },
        { q: '«La IA es nueva — ¿por qué preocuparse ahora?»', a: 'Las reglas de alto riesgo del Reglamento de IA de la UE incluyen registro automático; el régimen principal se aplica desde el 2 de agosto de 2026. Y la primera disputa en la que no puedas probar qué hizo tu IA costará más de lo que jamás costará configurarlo.' },
        { q: '«¿Ralentiza mi sistema?»', a: 'No. Escribir el recibo se ejecuta junto a tu flujo; el anclaje, fuera de él. Si el paso del recibo llegara a fallar, tu proceso de negocio se completa igualmente — solo queda un hueco visible y honesto.' },
      ],
      notClaimH3Html: 'Lo que <em>no</em> afirma',
      limits: [
        { tag: 'Honesto', textHtml: 'Un sello verde prueba que el registro no ha cambiado desde que se firmó. <em>No</em> prueba que la decisión fuera correcta, ni que la IA dijera la verdad. AXR hace los errores <em>visibles e innegables</em> — no los evita.' },
        { tag: 'Honesto', textHtml: '«Verificado» significa que el registro cuadra localmente. No es, por sí solo, un certificado de cumplimiento legal.' },
        { tag: 'Abierto', textHtml: 'Es de código abierto (MIT). El sentido de ser abierto es que no tienes que confiar en nosotros — cualquiera puede leer exactamente cómo funciona.' },
      ],
    },
    tryIt: {
      label: 'Pruébalo',
      h2Html: 'No nos creas <em>nada de esto.</em>',
      pHtml: 'Esa es justo la idea. Verifica un recibo real en tu navegador ahora mismo — nada que subir, nada que instalar. Sello verde: registro auténtico; sello rojo: fue cambiado. Ese es todo el test.',
      ctas: ['Verificar un recibo real', 'Configurarlo en n8n', 'Hacer una pregunta'],
      smallHtml: '¿Prefieres lo profundo? El <a href="/axr/">informe técnico completo</a> cubre el modelo de amenazas, los dos verificadores independientes y los límites.',
    },
  },
};
