# HANDOVER — chrisconen.dev

Ez a te példányod a döntésnaplóból. A README az üzemeltetési igazság,
ez itt a "miért így" és a "mit kell még tőled".

## Mi készült el

Teljes, deploy-kész Astro oldal négy útvonallal:

- `/` — pozicionálás, nyugta-szalag, AXR-sáv, Evidence kártyák, Approach,
  Now, Contact
- `/axr/` — a wedge mélyoldala: probléma, design-célok, szabványkontextus,
  státusz, dogfood-híd
- `/receipt/` — élő verifier: Ed25519 aláírás-ellenőrzés és fájl-hash
  spot-check a látogató böngészőjében
- `/404` — "No receipt for this route."

Plusz: aláírt build receipt pipeline (keygen, build-receipt, CLI verify),
szigorú biztonsági fejlécek (CSP unsafe-inline nélkül), security.txt,
sitemap, OG-kép, favicon. A teljes pipeline-t lefuttattam teszt-kulccsal:
aláírás VERIFIED, 53/53 fájl hash PASS, a böngészős verify-t Playwright
kattintotta végig — a screenshotokon valódi futás látszik.

## A nagy döntések és a miértjük

1. A pozicionálás a B keret, élesítve. Headline: "Proof over promises."
   A hero-lede a 14 év szállítást és az AXR-t köti össze, a chipek azonnal
   kimondják: cert folyamatban, szponzorált szerepekre nyitott (AU). Az
   Approach szekcióban szó szerint benne van: "I am not selling myself as a
   senior security engineer." Ez szándékos — egy senior olvasónál ez a
   mondat épít legtöbb bizalmat, és pontosan a megbeszélt őszinte keret.

2. A merészség egy helyre ment: az oldal minden deployja Ed25519-aláírt
   manifestet publikál önmagáról, és a /receipt/ oldalon a látogató maga
   ellenőrzi. A wedge így nem állítás, hanem demó. Tudtommal személyes
   oldal ilyet most nem csinál — ez a trendszetter elem, és pont a
   célközönségnek (security/GRC) beszédes.

3. Design: "Ledger & Stamp". Tudatosan NEM sötét dev-portfólió: világos
   főkönyvi papír, könyvelői zöld kizárólag verified/akció jelentéssel,
   pecsétvörös kizárólag hibára. Fontok szemantikusan: Libre Caslon (a
   hivatalos dokumentumok betűcsaládja), Public Sans (a US gov design
   system betűje — GRC-s kikacsintás), IBM Plex Mono (nyugta-nyomtatás).
   A bal margón futó dupla vonal + mono címkék a főkönyvi marginália.

4. Az oldal nyelve angol, mert az olvasó ausztrál hiring manager. Magyarul
   csak mi beszélünk egymással.

5. Életkor nincs kiírva sehol — ausztrál kontextusban kontraproduktív és
   szokatlan is. A magyar-német háttér és Budapest szerepel, mert a
   relokáció-történethez kell.

6. Az australianweb.agency csak a footerben él "Web work" címkével. Valós
   munka, nem rejtjük, de nem hagyjuk, hogy webügynökség-narratívává
   tolja a fókuszt.

7. Zero analytics, zero cookie, zero third-party script — a footer ki is
   mondja. Ez privacy-állítás és terhelésmentes oldal egyszerre, és a
   pozicionálással konzisztens.

## Amit tőled kér a rendszer (src/config.ts, mind TODO-zva)

1. Email: most hello@chrisconen.dev. Cloudflare Email Routing-gal két perc
   beállítani a továbbítást, vagy írd át. A security.txt-ben is frissítsd,
   ha más lesz.
2. LinkedIn URL (üresen a link nem jelenik meg — most üres).
3. AXR repo URL megerősítése (most github.com/chrisconen/axr).
4. Case study linkek: Motyán, NEXUS AI, ECO Clean Google-értékelések.
   Üres href = a kártya link nélkül jelenik meg, ami most az állapot.
5. `npm run keygen` egyszer: a privát kulcs Cloudflare Pages env varba
   (RECEIPT_PRIVATE_KEY, titkosítva), a publikus a config
   receiptPublicKey mezőjébe. A repóban most ÜRES a pin — a
   screenshotokon látott kulcs eldobható tesztkulcs volt, nem szállítom.

## Keygen funkció

A projekt egy Ed25519 aláíró kulcspárt használ a build receipt aláírásához.
A kulcs generálása a következő parancs segítségével történik:

```
npm run keygen
```

Ez a következőket teszi:
- Létrehoz egy új Ed25519 kulcspárt
- Kinyomtatja a privát kulcsot (ezt csak egyszer kell, és soha ne commitoljuk)
- Kinyomtatja a publikus kulcsot (ezt be kell illeszteni a src/config.ts fájlba)

A privát kulcsot a következőképp kell beállítani:
1. A Cloudflare Pages környezeti változóban (Settings → Environment variables)
   hozz létre egy RECEIPT_PRIVATE_KEY nevű titkosított változót
2. A publikus kulcsot illeszd be a src/config.ts fájlba a receiptPublicKey mezőbe

Fontos tudnivalók:
- A kulcsot csak egyszer kell generálni, ha újra generálod, akkor
  mindkét helyet frissíteni kell
- A privát kulcs elvesztése csak azt jelenti, hogy új kulcsra van szükség a
  jövőbeli build-ekhez, de a már közzétett build-ek nem romlanak el
- Bárki aki rendelkezik a privát kulccsal, aláírhatja a receipteket helyetted

A keygen script a scripts/keygen.mjs fájlban található.

## Repo és első push

A github.com/chrisconen/dev be van kötve a kódba: a /receipt/ oldal
clone-snippetje és a README is erre mutat. A repó publikus és üres —
tartsd publikusan, mert a "verify from source" sztori erre épül. Az első
push a kicsomagolt projektmappából:

    git init -b main
    git add .
    git commit -m "Initial build: site + signed receipt pipeline"
    git remote add origin https://github.com/chrisconen/dev.git
    git push -u origin main

A .gitignore-t úgy állítottam, hogy a `git add .` biztonságos: node_modules,
dist, .astro, .env és *.key kimarad. A playwright-ot kivettem a
package.json-ból (csak a screenshot-segédhez kellett; a script fejléce
leírja, hogyan telepítsd, ha kell).

## Deploy (részletesen a README-ben)

GitHub repo, Cloudflare Pages connect, build: `npm run build`, output:
`dist`, env: RECEIPT_PRIVATE_KEY + NODE_VERSION=22, custom domain rákötés.

Kritikus Cloudflare-beállítások, különben a fájl-ellenőrzés hibázik
(a kiszolgált HTML eltérne az aláírt bájtoktól): Rocket Loader KI, Email
Address Obfuscation KI, Auto Minify KI, CF Web Analytics injektálást NE
kapcsold be.

## Amit átdumálnék, mielőtt élesíted

1. A szponzoráció-mondat. Most explicit ("Open to sponsored roles...",
   "Employer sponsorship on the table"). Mellette szól: őszinte, szűr,
   időt spórol mindenkinek — és az oldal teljes hitelesség-érvelése erre
   épül. Ellene: egyes recruiterek auto-rejectje. Ha MARA-ügynök mást
   tanácsol, a hero-chip és a Contact egy-egy mondata kivehető öt perc
   alatt, a szerkezet nem sérül.
2. Az AXR oldal "design goals"-ként fogalmaz (signed, self-contained,
   tamper-evident, boring on purpose), státusza "early, open, honest".
   Olvasd össze a repo tényleges README-jével, hogy egyetlen állítás se
   fusson a kód előtt. A cikkszámokat ellenőriztem: EU AI Act Art. 12
   (record-keeping), Art. 26 (deployer log-megőrzés, min. 6 hónap),
   magas kockázatú kötelezettségek 2026. aug. 2-től; NIST AI Agent
   Standards Initiative, CAISI, 2026. február.
3. PageSpeed számok: futtasd le frissen mindkét oldalra publikálás előtt.
   A footnote ("scores drift a few points run to run") véd, de a számok
   legyenek reprodukálhatók.
4. security.txt Expires: 2026-12-31 — évente told ki.

## Ötletek későbbre (szándékosan nem építettem meg)

Writing/notes szekció az AXR-ről és a tanulásról (a cert-út publikus
naplója erős jel lenne); PGP kulcs a security.txt mellé; receipt-archívum
(korábbi deployok aláírt manifestjei láncban). Egy wedge volt, nem
aranyoztam túl.
