# AXR „Plain English" leágazás — terv (chrisconen.dev)

> **Cél:** egy nem-technikai belépő az AXR-hez azoknak, akiknek *szükségük van rá,
> de még nem tudják*. Megmutatja: mikor hasznos, mit érhetnek el vele, és hogyan
> használják — lépésről lépésre, zsargon nélkül, a jelenlegi „Proof over promises"
> brand hígítása nélkül.
>
> Ez a dokumentum a **csapat közös brainstormjának szintézise**: persona/awareness =
> Arcus (DeepSeek R1), megvalósíthatóság/kódba kötés = Meridian (Codex), IA/kreatív
> koncepció = NEXUS (Gemini), szintézis = Fable (Claude Code). Ez **terv** — nem
> implementáció.

---

## 0. A vezérelv

A célközönség **problem-unaware vagy solution-unaware**: nem keresnek „tamper-evident
audit trail"-t, mert nem tudják, hogy létezik a problémájuk neve. Ezért az oldal
**nem a technológiával, hanem a saját élethelyzetükkel** nyit. A kriptográfia végig
a háttérben marad; a felszínen csak: *bizonylat, pecsét, utólag nem módosítható,
bárki ellenőrzi*.

**A három csapattag egybehangzó következtetése:** a meglévő technológia (a böngészős
verifier, a dev-log demo) már működik — **a hiányzó réteg az onboarding**, nem a
kripto. Tehát ez nagyrészt *content + UX*, nem új protokoll.

---

## 1. Eldöntött kérdések (a brainstorm feszültségeinek feloldása)

| Kérdés | NEXUS | Meridian | **Döntés (Fable)** |
|---|---|---|---|
| Route | `/axr/plain/` | `/axr/start` | **`/axr/start/`** — az „akció" olvasat erősebb; a cím lehet „AXR in plain English" |
| Top-level menüpont? | „Why Receipts?" a navba | NE — ne hígítsa a senior pozicionálást | **Nincs új top-level menü.** Helyette: hangsúlyos CTA a `/axr/` tetején („New to this? **Read it in plain English →**") + a főoldali AXR-sávban. A „nem-szaki, nem is tudja" persona úgyis tartalmon/kereséssel/közösségen át érkezik, nem a navból. |
| Vezető metafora | „Cryptographic Security Seal" (plomba) | — | **A pecsét/plomba a demóhoz, a „receipt/bizonylat" a fő főnév.** A kettő egy: *a bizonylaton egy pecsét van; ha valaki hozzányúl, a pecsét eltörik.* |
| Interaktív demo | „Wax Seal Tamper" élmény | CSP-kompatibilis technikai vázlat | **Egyesítve** (lásd §5): NEXUS élménye + Meridian építési terve. |

### A nyelv — ELDÖNTVE: **angol** (A opció, 2026-06-26, Chris)
A `/axr/start` **angolul** készül (site-konzisztens; egy nem-technikai angol olvasónak
is jó). A magyar/német KKV-elérés a marketing-kampány külön, lokalizált csatornája
(`AXR-KAMPANY.md`). A persona-insight a *megfogalmazást* élesíti, nem a nyelvet.

<details><summary>Az eredeti döntési kontextus</summary>

A site **angol** (HANDOVER 4. pont: az olvasó ausztrál hiring manager). Arcus
personái viszont **magyar/DACH KKV-tulajdonosok**. Két út:
- **(A — ajánlott):** a `/axr/start` **angolul** készül (site-konzisztencia; egy
  nem-technikai angol olvasónak — alapító, ügyvezető, GRC-munkatárs — is pont jó),
  és a magyar/német KKV-elérés a **marketing-kampány külön csatornája** (lokalizált
  landing, lásd `AXR-KAMPANY.md`).
- **(B):** a `/axr/start` kétnyelvű (EN + HU/DE) — nagyobb meló, de közvetlenül a
  KKV-personát célozza a hubon.

→ **Ajánlás: A.** A persona-insight a *megfogalmazást* élesíti; a lokalizáció külön,
a kampányhoz kötött lépés.
</details>

---

## 2. Információarchitektúra

- **Hely:** `/axr/start/` — az `/axr/` **alatt**, nem mellette.
  - `/axr/` marad a „mi ez + threat model" szakmai mélyoldal.
  - `/axr/start/` = „**mit jelent ez nekem, és mit csináljak most**".
  - `/axr/verify/` marad a „hozd a saját fájljaidat" ellenőrző.
  - `/axr/n8n/` marad az integrációs út.
- **Felfedezhetőség (nav hígítása nélkül):**
  1. `/axr/` hero tetejére egy sor: *„New to this? Read it in plain English →"*.
  2. Főoldali AXR-sávba egy másodlagos CTA ugyanide.
  3. SEO: a `/axr/start` célozza a *laikus* keresőkifejezéseket (lásd §8) — ez hozza
     az „unaware" forgalmat, nem a menü.

---

## 3. Oldalszerkezet (`/axr/start/` wireframe)

A NEXUS 8-blokkos váza + Arcus awareness-létrája + Meridian onboarding-folyama egyben:

1. **Hero — a pattern-interrupt.** (Arcus „A" verzió, angolra hangolva.)
   > *You've got an AI doing things in your business. Now imagine a customer sues,
   > claiming the bot promised something it didn't deliver. Your log says everything's
   > fine. But you wrote that log. Who's going to believe you?*
   Alatta egy halk alcím + egyetlen CTA: **„See it in 30 seconds ↓"**.
2. **„Te melyik vagy?" — persona-kártyák.** 4-5 kártya (webshop / könyvelő-pénzügy /
   HR / ingatlan / fintech-compliance). Kattintásra a megfelelő mini-sztorihoz ugrik.
   *Nem* technológia — élethelyzet és tét.
3. **A „shit, tényleg" pillanat.** Gondolatkísérlet: *„Állj a bíró elé a logod
   screenshotjával. A bíró: »ezt te írtad, igaz?« — Mit mondasz?"* 3 mini-scenario
   (ügyfélper / hatósági ellenőrzés / EU AI Act 2026).
4. **Interaktív „Seal & Tamper" demó** (§5). Az aha-élmény *szöveg előtt*.
5. **A megoldás 1 mondatban + a metafora.**
   > *Every decision your bot makes gets a digital receipt. It can't be changed
   > afterwards — and anyone can check it without taking your word for it.*
   A futár-analógia (Arcus) + a pecsét/plomba (NEXUS) egy blokkban.
6. **Use-case sztorik** (§4) — 4 mini-dráma: helyzet → baj → hogyan segít → mit nyer.
7. **Step-by-step „hogyan használd"** (§6) — 3 fázis, kód nélkül; két út (n8n / böngésző).
8. **Szkepszis-GYIK + őszinte határok** (§7) — a kifogások és a *mit NEM ígérünk*.
9. **Híd + CTA:** „Verify a real one in your browser" (`/axr/verify` v. a demó) ·
   „Using n8n?" (`/axr/n8n`) · „The technical deep-dive" (`/axr`) · kapcsolat.

---

## 4. Use-case sztorik (a végleges 4 — Arcus personái + NEXUS sztorikeretei)

Mind ugyanazt a sablont követi: **helyzet → a baj („szavam a szavad ellen") →
hogyan segít az AXR → mit nyer.** (Konkrét, nevesített, élethű — Arcus 5. pont:
a konkrét példa a meggyőző.)

1. **A webshopos (István).** „A rendszer szerint a visszatérítés kiment, de az ügyfél
   2 hete nem kapta meg; a bank szerint nem kaptak kérelmet." → a bizonylat megmondja,
   tényleg kiadta-e a robot az utasítást → tisztázható, hol szakadt a lánc (Stripe
   chargeback elkerülve). *(= AXR D-bug mintázat élesben.)*
2. **A könyvelő/pénzügyi vezető (Katalin).** „Az AI háromszor küldött inkasszót egy
   már befizetett számlára; az ügyfél perrel fenyeget." → aláírt bizonylat minden
   számlázási döntésről, amit a bíróságon is ellenőrizhetnek a fejlesztő nélkül.
3. **A HR/compliance (Bernadett).** Elutasított jelölt diszkriminációt gyanít. → a
   döntési napló kriptográfiailag aláírt, a hatóság maga ellenőrzi, hogy a tiltott
   adat nem volt input — „nem kell hinniük nekünk". *(+ GDPR-törölhető: a személyes
   adat törölhető, az aláírás ép marad.)*
4. **A fintech-compliance (Mónika) / EU AI Act.** Felügyelet: „bizonyítsák, hogy a
   2025-ös automatikus döntés az akkori szabályzat szerint történt." → auditor-kész,
   kriptográfiailag zárt riport, amit a felügyelet a szerver-hozzáférés nélkül ellenőriz.

*(Tartalék personák a kampányhoz: ingatlanos Zoltán, családi vállalkozás Tibor.)*

---

## 5. Az interaktív demó — „Seal & Tamper" (NEXUS élmény + Meridian build)

**Az élmény (NEXUS):** a képernyő közepén egy főkönyvi-papír „AI bizonylat" kártya
(Workflow / Timestamp / Decision / Service / Price), jobb alul **könyvelői zöld
pecsét: `VERIFIED — INTACT`**. Felirat: *„Try to edit the price."* Amint a látogató
átírja az árat, a kártya megremeg, a pecséten **repedés** fut végig, **pecsétvörösre**
vált: `TAMPERED — INVALID`, alatta IBM Plex Mono magyarázat. Visszaírásra a pecsét
„összeforr" → újra zöld. *Aha: a kripto nem absztrakt matek, hanem egy digitális
plomba, ami elpattan, ha hozzányúlsz.*

**A build (Meridian, CSP-kompatibilis):**
- Új oldal: `src/pages/axr/start.astro` (a demó lehet külön komponens is).
- **Nincs inline script** (`script-src 'self'`, `inlineStylesheets:'never'`). A logika
  külső modulból: `import { verifySig, leafHash, mth, pemToRaw, parseJsonl } from
  '../../lib/axr-verify.ts'` — ugyanúgy, ahogy a meglévő verifier-oldalak.
- A minta-bizonylat: beágyazott JS objektum a modulban *vagy* `public/axr-demo/*.jsonl`.
- A „Tamper" kapcsoló: `structuredClone(sample)` → egy mező módosítása → **újraszámolt**
  aláírás-/root-ellenőrzés (valódi kripto, nem fake animáció).
- Három állapot: `Loaded` → `Verified` → `Tampered`. A laikus olvasat külön stringek.
- `@noble/ed25519` már a site függősége (a `/receipt/` oldalon) → nincs új trust-surface,
  nincs harmadik fél.
- **Referencia, hogy reális:** a meglévő `/axr/devlog/` (van benne `Tamper test`) és az
  AXR-repó `axr-verifier.html` (Load example + „No account, no upload, no internet" keret)
  bizonyítja, hogy a guided, sample-first, plain-language UX működik.

---

## 6. Step-by-step „hogyan használd" (Meridian: a legegyszerűbb valós út)

Három fázis, kód és képletek nélkül:

1. **Rögzítés.** „A robotod minden fontos döntéséről készül egy bizonylat." *(n8n:
   1 Code node a workflow végén. Más rendszer: az `axr-generator` hívása.)*
2. **Lepecsételés.** „A bizonylat aláírva és láncba fűzve — egy karakter változás is
   eltöri a pecsétet."
3. **Ellenőrzés.** „Bárki ellenőrizheti — a böngészőben, feltöltés nélkül." → CTA a
   demóra / `/axr/verify`-re.

**A két belépő út a látogató szerint:**
- **n8n-felhasználó:** „1 node a workflow végén → kész, ~10 perc." (link a node-ra/repóra)
- **Nem-n8n / csak kíváncsi:** „Ellenőrizz egy bizonylatot a böngésződben, 1 kattintás."
  (a demó / `/axr/verify`)

**Fontos UX-tanulság (Meridian):** a *mai* legjobb laikus út **nem** a fájlfeltöltős
`/axr/verify` (túl sok fájltípus: receipts.jsonl, .pem, sth.jsonl, control.jsonl),
hanem egy **beépített mintával + Tamper-kapcsolóval** induló demó. A saját fájl
ellenőrzése csak a *következő* lépés.

---

## 7. Kifogások + ŐSZINTE HATÁROK (a hitelesség védelme)

**Kifogás-kezelés (Arcus):**
- *„A logom is ezt mutatja, minek ez?"* → „A logot te írod, a te szervereden. A
  bíróságon annyit ér, mint a saját szavad. Az AXR-bizonylatot **bárki** ellenőrzi a
  segítséged nélkül."
- *„Túl bonyolult / nincs rá emberünk."* → „Egy kattintás a böngészőben, vagy egy
  node az n8n-ben. Ingyen. Ha 10 perc alatt nem megy, írj. Ha nem kell, törlöd."
- *„Az AI új, minek előre parázni?"* → „Az EU AI Act 2026 augusztusától kötelező
  naplózást ír elő — és az első per, ahol nem tudod bizonyítani, drágább, mint ez."

**Amit SOHA nem állítunk (Meridian túlígérés-lista — kötelező):**
| Ne | Helyette |
|---|---|
| „Bizonyítja, hogy a robot igazat mondott." | „Bizonyítja, hogy a rekord nem változott az aláírás óta." (N1) |
| „PASS = megfelelőség." | „PASS = a megadott bizonyíték lokálisan ellenőrzött." |
| „Offline mindent megoldottunk." | „A böngészős ellenőrzés a helyi aláírást/láncot nézi; a külső horgony külön." |
| „A witness független." (ha egy gépen fut) | „A valódi függetlenség külön custody — ez az enterprise-irány." |
| AXR execution receipt = a site build-receiptje | Külön primitív, külön trust-boundary. |

**Ajánlott mondatok (Meridian):** *„This log is unchanged since signing." · „The
receipts check out locally." · „The record is intact. That does not prove the claims
were true." · „External anchoring and witness independence are separate checks."*

**Veszélyek, amiket kerülünk (Arcus):** túl sok kripto-szakszó; FUD/félelemkeltés
(„mindenki perelni fog"); „túl szép, hogy igaz"; túl kevés konkrét példa; „ehhez PhD
kell" érzés. A laikus oldal **álljon meg a saját lábán** — a technikai oldal linkelt,
de nem kötelező.

---

## 8. Hangnem (NEXUS) — 3 elv

1. **The Honest Craftsman** — mesterember-nyelv, fizikai analógiák (plomba, pecsét,
   bizonylat), nulla „forradalmi/szinergia".
2. **Uncompromising Truth** — „Az AXR nem teszi okosabbá az AI-t. De ha hibázik, nem
   engedi letagadni." A határok kimondása építi a legnagyobb bizalmat.
3. **Quiet Confidence** — nincs mesterséges sürgetés. „Ne is higgy nekünk — töltsd le
   a kulcsot, ellenőrizd magad." (Ez a „Proof over promises" brand laikus változata.)

---

## 9. SEO / a felfedezhetőség az „unaware" persona felé

A `/axr/start` célozza a *laikus* mondatokat (Arcus „Google-mondatai"), nem a szakszót:
- „AI made a mistake, customer wants proof" / „robot csinált hibát, hogyan bizonyítsam"
- „am I liable if ChatGPT makes a mistake" / „felelős vagyok-e ha a ChatGPT hibázik"
- „n8n log doesn't match reality" / „n8n napló nem egyezik a valósággal"
- „EU AI Act logging 2026 small business"
*(A részletes kampány-csatorna: `AXR-KAMPANY.md`.)*

---

## 10. Építési terv (scope, Meridian prioritásai)

| Prio | Tétel | Méret | Megjegyzés |
|---|---|---|---|
| **P1** | `/axr/start` oldal váza + hero + persona-kártyák + use-case sztorik (statikus tartalom) | M | Tartalom-nehéz; a copy nagyrészt kész ebből a tervből |
| **P1** | „Seal & Tamper" demó (mintabizonylat + Tamper-kapcsoló, valódi aláírás-újraszámolás) | S–M | `axr-verify.ts`-ből; referencia `axr-verifier.html` |
| **P1** | Plain-language verdict („This log is unchanged since signing" / „…failed") | S | a nyers JSON helyett |
| **P2** | „What just happened?" magyarázó blokk (3-4 mondat: aláírás/root/witness) | S | mit bizonyít a zöld pecsét — és mit nem |
| **P2** | CTA-k bekötése: `/axr/` hero + főoldali AXR-sáv → `/axr/start` | S | felfedezhetőség nav-hígítás nélkül |
| **P3** | Több mintás „rontsd el" (signature flip / root mismatch / witness fail) | M | mélyebb aha |
| **P3** | Ember-olvasható „summary" nézet (a verifier verdiktje prózában) | M/L | `axr-report.js` irányba |

**Definition of done (oldal-szinten):** a strict CSP nem törik (nincs inline script),
a demó valódi kriptót futtat (nem fake), minden állítás átmegy a §7 túlígérés-szűrőn,
és a senior `/axr/` oldal pozicionálása változatlan.

---

## 11. Következő lépés (javaslat)

1. **Chris jóváhagyja** a §1 nyelv-döntést (A vs B) és a `/axr/start` route-ot.
2. Fable megírja a `/axr/start.astro` **statikus vázát** a végleges angol copyval
   (hero + personák + sztorik + step-by-step + GYIK), CTA-bekötéssel.
3. A „Seal & Tamper" demó-komponens (külső modul, `axr-verify.ts`-ből).
4. Review-kör: Meridian (CSP/kripto-helyesség) + Arcus (a copy nem csúszik-e FUD-ba
   vagy túlígérésbe).

---

*Csapat: Arcus (DeepSeek R1) — persona & awareness · Meridian (Codex) — megvalósíthatóság,
kódba kötve · NEXUS (Gemini) — IA & kreatív koncepció & nagyvilág-példák · Fable
(Claude Code) — szintézis. Kapcsolódó: `AXR-KAMPANY.md`, `AXR-TERMEKLEIRAS.md`,
`AXR-ELEMZES.md` (az AXR-repóban).*
