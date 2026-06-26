# chrisconen.dev — első holisztikus oldal-audit + iteráció

> A teljes oldal első holisztikus átvizsgálása (2026-06-26). Három csapattag
> auditja (Meridian = technika/IA/SEO/a11y, Arcus = pozicionálás/konverzió,
> NEXUS = UX/IA/vizuál), Fable szintézisével. Ez a dokumentum rögzíti a
> megállapításokat, az **alkalmazott** változtatásokat és a **backlogot**.

## A kiinduló kérdés (Chris): hogyan hivatkozunk a /axr/start ágra?
**Döntés (hármas konszenzus):** NEM globális top-menü (ne hígítsa a senior
security/GRC pozicionálást). Helyette **AXR sub-nav** minden `/axr/*` oldalon
(`Overview · Plain English · n8n · Verify a log · Dev-log`) + erősített főoldali
belépő. Ez egyszerre oldja meg a `/axr/start` felfedezhetőségét ÉS a testvér-
oldalak közti navigációt (eddig zsákutcák voltak).

---

## ALKALMAZVA ebben az iterációban (P0/P1 konszenzus)

1. **AXR sub-nav** — új `src/components/AxrSubnav.astro`, `Base.astro`-ban az
   `/axr/*` útvonalakon renderelve, aktív-állapot jelzéssel. *(a kérdés válasza)*
2. **Mobil demo-fix (P0, NEXUS)** — a `/axr/start` „Seal & Tamper" pecsétje
   mobilon a mezők FÖLÉ + `sticky` került, így a billentyűzet nem takarja ki a
   zöld→piros váltást gépelés közben.
3. **Nav „Receipt" → „Site Proof"** (Header) — egyértelműsít az AXR-receipttől és
   a `/axr/verify`-től (a route marad `/receipt`).
4. **`aria-live` a dinamikus státuszokon (P1, Meridian)** — `/axr/verify`,
   `/axr/devlog`, `/receipt` (a `/axr/start` már megkapta). Screen-reader-regresszió
   javítva.
5. **Fact-drift (P1, Meridian)** — `/axr`: `41 → 42` suite, `1.5.1 → 1.5.3` (komment
   + chip); „the whole trick" → „the whole principle" (`/axr` + `/axr/n8n`,
   illeszkedik a `/axr/start`-hoz).
6. **Footer** — `Writing` link hozzáadva.
7. **Főoldali (c)-belépő** — a wedge kap egy laikus-horgot + „free & open source
   (MIT)" keretet, a „Plain English" CTA előre.
8. **Doc-igazság (P1, Meridian)** — README: a „csak /receipt-en van JS" állítás
   pontosítva (verifier/demo oldalak); README + HANDOVER: „Bella Camila" → „NEXUS AI".

**Verifikáció:** `astro build` tiszta; agent-browser teszt: sub-nav + aktív
állapotok, „Site Proof", stat 42 / chip 1.5.3, „trick" eltűnt, demó zöld→piros,
aria-live mind a 3 verifier-oldalon — mind zöld.

---

## BACKLOG (jóváhagyásra / következő körök)

### Writing (Chris kérte külön)
- **PostCTA-komponens** a cikkek végére (tag-alapú: laikus → `/axr/start`,
  n8n → `/axr/n8n`). [NEXUS]
- **Új laikus-cikk(ek)**, amik a `/axr/start`-ra terelnek [Arcus 3 ötlete]:
  1. *"Your AI Made a Mistake. Can You Prove It Wasn't Your Fault?"*
  2. *"Three Questions to Ask Before Letting AI Touch Your Customers"*
  3. *"The 'AI Did It' Defense Is Not a Defense"*
- `/writing` index: téma-szűrő chipek (For Business / For Tech). [NEXUS]

### Konverzió / pozicionálás (Arcus)
- **Főoldali hero két-utas szegmentálás** (hiring manager vs laikus) — nagyobb
  döntés, Chris jóváhagyásával.
- **Social proof** őszinte keretben („in production since June 2026, 227+ receipts"
  → testimonial-szerű blokk). NINCS kitalált logófal.
- **Contact kettéosztás** (hiring vs AXR-kérdés/GitHub issue).
- **`/axr/verify` „Try a sample log"** gomb (üres állapotban azonnal kipróbálható).

### UX / vizuál (NEXUS)
- `/axr` „text-wall" oldása margó-jegyzetekkel (`.marginal-note`).
- Delight-ek: pecsét-repedés „ink-bleed", `ReceiptStrip` „print-out" animáció,
  halvány biztonsági vízjel. (Mind zero-dep, CSP-barát.)
- `/receipt` `<select>` Ledger-stílusú nyíl.

### Technika / SEO (Meridian)
- `/axr/start` strukturált adat (JSON-LD) — erős „plain English" keresési célpont.
- Page-specific social meta (`og:image:alt`, `twitter:title/description`).
- `/axr/verify` és `/axr/devlog` kliens-logika nagyrészt duplikált → közös modulba.
- Home hero képek `<img>` → méret/priority/Astro asset (LCP).
- „current vs historical" egységes legenda a verzió/szám-állításokhoz.
- (Üzemeltetés) `config.ts` TODO-k lezárása: email mailbox, axrRepo megerősítés,
  EVIDENCE href-ek, PGP a security.txt mellé.

---

## Megőrzött erősségek (mindhárom audit kiemelte)
- A `/receipt` élő ön-verifikáció — a „Proof over promises" nem állítás, hanem
  architektúra.
- A 4-bug + „behavioral legibility" narratíva — eredeti és erős.
- A „Ledger & Stamp" arculat — a GRC-közönségnek kódolt, nem általános dev-portfólió.

---

*Auditorok: Meridian (Codex), Arcus (DeepSeek R1), NEXUS (Gemini). Szintézis +
implementáció: Fable (Claude Code). Kapcsolódó: `PLAIN-BRANCH-PLAN.md`.*
