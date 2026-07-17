# Nieuw Boek

Nieuw Boek is een digitaal schrift voor nieuwsgierigheid, denkexperimenten,
gekke opdrachten en onverwachte denkbochten. Iedere dag is een nieuwe
bladzijde: de app legt een vraag, opdracht of stuurwissel op tafel — wat
daarna gebeurt bepaalt de gebruiker volledig zelf.

Alles draait lokaal: er is geen account, geen backend en geen externe API.
Alle gegevens staan in `localStorage` van de browser.

## Lokaal starten

```bash
npm install
npm run dev
```

De app draait dan op `http://localhost:5173/nieuw-boek/`.

## Builden

```bash
npm run build
```

Het resultaat komt in `dist/`. `npm run preview` serveert die build lokaal
om te controleren of alles klopt.

## Deployen op GitHub Pages

Dit project heeft een kant-en-klare workflow in
`.github/workflows/deploy.yml` die bij elke push naar `main` automatisch
bouwt en publiceert via GitHub Pages.

Om dit te activeren:

1. Push de repository naar GitHub.
2. Ga naar **Settings → Pages** en zet **Source** op **GitHub Actions**.
3. Push naar `main` (of draai de workflow handmatig via **Actions**).

De `base` in `vite.config.ts` staat op `/nieuw-boek/`. Heet de GitHub-repo
anders, pas dit dan aan naar `/<repo-naam>/`.

## Kaartdata

Alle kaarten staan in losse, makkelijk uitbreidbare bestanden:

- `src/data/denkbochten.ts` — de diepe, prikkelende vragen.
- `src/data/gekkeOpdrachten.ts` — de gekke, speelse opdrachten.
- `src/data/stuurkaarten.ts` — de tekst en Daans voor de Stuurkaart.

### Nieuwe kaarten toevoegen

Voeg gewoon een nieuw object toe aan de bijbehorende array, met een uniek
`id`:

```ts
// src/data/denkbochten.ts
{ id: 'db-21', question: 'Jouw nieuwe vraag hier?' }
```

```ts
// src/data/gekkeOpdrachten.ts
{ id: 'go-16', text: 'Jouw nieuwe opdracht hier.' }
```

Er is geen build-stap of registratie nodig — de kaartenselectie en de
Kaartendoos lezen deze bestanden rechtstreeks.

## Architectuur

- `src/types.ts` — het datamodel (`DailyPage`, Daans, geselecteerde kaarten).
- `src/services/storage.ts` — alle localStorage-logica (lezen, opslaan,
  exporteren, importeren, wissen).
- `src/utils/dateUtils.ts` — datumnotatie en datumsleutels (`YYYY-MM-DD`).
- `src/utils/seededRandom.ts` — deterministische "willekeurige" selectie op
  basis van de datum, zodat een bladzijde niet verandert bij herladen.
- `src/utils/dailyCardSelection.ts` — kiest de dagelijkse kaarten en
  vervangt een kaart bewust wanneer de gebruiker op "Andere kaart" klikt.
- `src/hooks/useDailyPage.ts` — laadt/maakt een dagpagina en autosaved
  wijzigingen met een korte debounce.
- `src/components/` — de UI-bouwstenen (`DailyPage`, `FixedPromptCard`,
  `DenkbochtCard`, `DaanAnswerField`, `SillyAssignmentCard`,
  `SteeringCard`, `Timer`, `PageHistory`, `CardLibrary`, `Settings`).

Routing gebruikt `HashRouter` (react-router-dom), zodat de app als
statische site op GitHub Pages werkt zonder server-side routing.

## Belangrijkste ontwerpregel

> Nieuw Boek stuurt nooit de inhoud. Alleen de aanleiding.

De app schrijft nergens voor wat iemand moet voelen, leren of doen. Zie de
oorspronkelijke opdracht voor de volledige inhoudelijke richtlijnen als je
nieuwe teksten of kaarten toevoegt.
