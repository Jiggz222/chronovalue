# ChronoValue — klockvärdering (första version)

En responsiv Next.js-hemsida på svenska med premiumkänsla och ett interaktivt värderingsflöde.

## Kom igång

1. Installera Node.js (LTS) om det inte redan finns på datorn.
2. Packa upp projektet och öppna mappen `watchvalue` i terminalen.
3. Kör:

```bash
npm install
npm run dev
```

4. Öppna http://localhost:3000

## Vad ingår?

- Startsida med premiuminspirerad klockdesign.
- Sökning bland sex exempelmodeller.
- Val av skick, år, originalbox och originalpapper.
- Interaktiv resultatsida med uppskattat prisintervall.
- Populära modeller, hur-det-funkar-sektion och informationssektion.
- Responsiv layout för mobil och desktop.

## Viktigt om värderingarna

Detta är en frontend-prototyp. Priserna och justeringarna är exempeldata för att demonstrera flödet, inte verifierade marknadsvärderingar. Använd dem inte för att fatta köp- eller säljbeslut. För en publik lansering behöver prislogiken kopplas till tillförlitliga data och metodiken valideras.

## Nästa steg inför lansering

- Välj en tillförlitlig datakälla för faktiska försäljningar och/eller annonser.
- Lägg till backend/API och databas.
- Lägg till riktig identifiering från bild först när en bildmodell/API är vald.
- Lägg till integritetspolicy, villkor, kontaktuppgifter och relevanta juridiska texter.
- Kontrollera licenser och tillåtelse för bilder samt externa datakällor.
- Lägg till tester, analytics med samtycke där det krävs och driftsätt på exempelvis Vercel.

Bilder laddas från Unsplash och Google Fonts hämtas externt, så internetanslutning krävs för dessa tillgångar.
