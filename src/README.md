# Pokémon Explorer

Een moderne webapp waarmee je Pokémon kunt ontdekken, filteren en favorieten kunt opslaan.
---

## 📌 Projectbeschrijving

De Pokémon Explorer is een webapplicatie waarmee gebruikers Pokémon kunnen bekijken, beoordelen en sorteren op verschillende eigenschappen. Je kunt Pokémon groeperen op type, zoeken op naam en filteren op kracht of andere kenmerken. De app haalt Pokémon-informatie op via de PokéAPI en toont deze duidelijk op het scherm, bijvoorbeeld in kaarten of lijsten. Gebruikers kunnen hun favoriete Pokémon opslaan, zodat ze deze later makkelijk terugvinden. Dit wordt opgeslagen in de browser met Local Storage.

---
## 🚀 Belangrijkste functionaliteiten

- **Lijst van Pokémon ophalen en weergeven**
- **Filteren op type, HP en aanvalskracht**
- **Zoeken op naam**
- **Favorieten markeren (en opslaan in localStorage)**
- **Uitgebreide modale weergave met 6+ eigenschappen per Pokémon**
- **Responsieve layout (Flexbox + media queries)**
- **Formulier voor favorieten toevoegen met validatie**

---
## 🛠️ Gebruikte technieken

- **HTML, CSS en JavaScript:** Voor het maken van de webapp.
- **PokéAPI:** Voor het ophalen van de Pokémon-informatie.
- **Local Storage:** Voor het opslaan van favoriete Pokémon in de browser.

---
## 🔗 Gebruikte API

- **[PokéAPI](https://pokeapi.co/)**
  - Gebruikt voor het ophalen van alle Pokémon-data (naam, afbeelding, stats, types, enz.)

---
## ⚙️ Technische vereisten

Hieronder vind je een overzicht van de belangrijkste technische vereisten, met het bestand en de regel waar ze worden toegepast.

### **DOM manipulatie**

| Vereiste                | Bestand         | Regel | Codevoorbeeld |
|-------------------------|-----------------|-------|---------------|
| Elementen selecteren    | DOMmanager.js   | 9     | `const container = document.getElementById('pokemon-kaarten');` |
| Elementen selecteren    | main.js         | 103   | `const zoekInput = document.getElementById('zoek');` |
| Elementen selecteren    | main.js         | 140   | `document.getElementById('type-knoppen').addEventListener(...)` |
| Elementen manipuleren   | DOMmanager.js   | 11    | `container.innerHTML = '';` |
| Elementen manipuleren   | DOMmanager.js   | 23    | `kaart.innerHTML = ...` |
| Elementen manipuleren   | DOMmanager.js   | 32    | `container.appendChild(kaart);` |
| Elementen manipuleren   | DOMmanager.js   | 109   | `modal.classList.remove('verborgen');` |
| Events aan elementen koppelen | main.js | 67-70 | `zoekInput.addEventListener('input', filterEnToon);` |

### **Modern JavaScript**

| Vereiste                | Bestand         | Regel | Codevoorbeeld |
|-------------------------|-----------------|-------|---------------|
| Gebruik van constanten  | DOMmanager.js   | 13    | `const favorieten = haalFavorieten();` |
| Gebruik van constanten  | main.js         | 2     | `let allePokemon = [];` |
| Template literals       | DOMmanager.js   | 23-24 | `kaart.innerHTML = \`...${pokemon.name}...\`` |
| Template literals       | DOMmanager.js   | 78    | `details.innerHTML = \`...${pokemon.name}...\`` |
| Iteratie over arrays    | DOMmanager.js   | 16    | `lijst.forEach(pokemon => { ... })` |
| Iteratie over arrays    | main.js         | 124   | `allePokemon = await Promise.all(lijst.map(...));` |
| Array methodes          | DOMmanager.js   | 26    | `${pokemon.types.map(t => t.type.name).join(', ')}` |
| Array methodes          | main.js         | 15    | `allePokemon.filter(p => ...)` |
| Arrow functions         | DOMmanager.js   | 13    | `lijst.forEach(pokemon => { ... })` |
| Arrow functions         | main.js         | 44    | `.filter(p => ...)` |
| Conditional operator    | DOMmanager.js   | 29    | `${favorieten.includes(pokemon.id) ? ' actief' : ''}` |
| Callback functions      | DOMmanager.js   | 13, 34| `.forEach(pokemon => { ... }), .forEach(entry => { ... })` |
| Promises                | main.js         | 124   | `await Promise.all(lijst.map(...));` |
| Async & Await           | main.js         | 121   | `async function init() { ... }` |
| Observer API            | DOMmanager.js   | 36    | `const observer = new IntersectionObserver((entries) => { ... });` |

### **Data & API**

| Vereiste                | Bestand         | Regel | Codevoorbeeld |
|-------------------------|-----------------|-------|---------------|
| Fetch om data op te halen | api.js         | 8,15  | `const antwoord = await fetch(...);` |
| JSON manipuleren en weergeven | api.js     | 9     | `const data = await antwoord.json();` |

### **Opslag & validatie**

| Vereiste                | Bestand         | Regel | Codevoorbeeld |
|-------------------------|-----------------|-------|---------------|
| Formulier validatie     | main.js         | 124   | `if (!naam) { foutmelding.textContent = 'Voer een naam in!'; ... }` |
| LocalStorage            | favorieten.js   | 23    | `localStorage.setItem('favorieten', JSON.stringify(favorieten));` |

### **Styling & layout**

| Vereiste                | Bestand         | Regel | Codevoorbeeld |
|-------------------------|-----------------|-------|---------------|
| Flexbox                 | style.css       | 23, 79, 87 | `display: flex;` in header, `.kaart-container`, `#pokemon-kaarten` |
| Basis CSS               | style.css       | overal | body, header, knoppen, kaarten, modal |
| Gebruiksvriendelijke elementen | style.css | 125,117 | `.favoriet-knop`, `.sluit-knop`, `.modal-content` |

---

## 🧩 Tooling & structuur

- **Project opgezet met Vite**
- **Correcte folderstructuur:**
-node_modules/
-src/
    api.js
    DOMmanager.js
    favorieten.js
    main.js
    style.css
    README.md
-Root-bestanden (in hoofdmap):
    .gitignore
    index.html
    package-lock.json
    package.json
-Screenshots/


---

## 🚦 Zo gebruik je het Pokémon-project:

1. **Download het project op je computer.**
2. **Open een terminal in de projectmap en typ:**
    "npm install"

3. **Start de lokale server door te typen:**
    "npm run dev"

4. **Open je browser en ga naar:**
http://localhost:5173/

Je ziet nu de Pokémon-app live.

**OF**

**Open direct deze link in je browser:**
https://lailanounouh.github.io/Pokemon-app/

Je ziet nu de Pokémon-app live.

---