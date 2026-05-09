### 🌍 Länderencyklopedi – REST Countries App
En enkel och användarvänlig webbapplikation som hämtar och visar information om länder med hjälp av REST Countries‑API:t. Användaren kan söka efter länder, bläddra mellan världsdelar och se detaljerad information på ett tydligt och strukturerat sätt.

länk till app: https://isaforsberg.github.io/Landencyklopedi/
annars ladda ned mappen och öppna genom index.html

## ✨ Funktioner
Sök efter land via ett sökfält

Visa detaljerad information om landet: flagga, språk, valuta, befolkning, huvudstad, tidszoner m.m.

Navigera mellan världsdelar (Europa, Asien, Afrika, Americas, Oceania)

Visa länder som kort i vald region

Klicka på ett landkort för att se mer information

Sortera länder alfabetiskt

Loading‑indikator vid API‑anrop

Tydlig felhantering vid tom sökning, ogiltigt land eller API‑fel

localStorage sparar senaste sökta land och vald region

## 🧠 Tekniker
fetch

async/await

REST‑API

DOM‑manipulation

Modulär JavaScript (separerad UI‑logik, API‑logik och app‑logik)

localStorage för att spara användarens senaste val

## 🔄 Så fungerar appen
Användaren söker eller väljer en region

API‑anrop görs med fetch + async/await

Loading‑indikator visas

Datan bearbetas och skickas till UI‑modulen

DOM uppdateras med flagga, info och landkort

localStorage sparar senaste val

Felmeddelanden visas tydligt vid behov
