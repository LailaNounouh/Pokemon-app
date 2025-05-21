// Tooling & structuur: importeren van modules en CSS, project opgezet met Vite
import './style.css';
import { haalPokemonLijst, haalPokemonDetails } from './api.js';
import { toonPokemonKaarten, toonFavorieten, toonModal } from './DOMmanager.js';
import { haalFavorieten, wisselFavoriet } from './favorieten.js';

// Modern JavaScript: gebruik van let en const
let allePokemon = [];
let gekozenType = '';

// Modern JavaScript: async & await, Promises, fetch, JSON manipuleren en weergeven
async function init() {
    // Data & API: data ophalen via fetch in haalPokemonLijst/haalPokemonDetails
    const lijst = await haalPokemonLijst(); 
    allePokemon = await Promise.all(lijst.map(p => haalPokemonDetails(p.url)));
    // DOM manipulatie: elementen manipuleren (tonen van kaarten en favorieten)
    toonPokemonKaarten(allePokemon);
    toonFavorieten(allePokemon);
    maakTypeKnoppen();
}

// Modern JavaScript: arrow functions, const, iteratie over arrays, array methodes (forEach, map)
function maakTypeKnoppen() {
    const types = new Set();
    allePokemon.forEach(p => p.types.forEach(t => types.add(t.type.name)));
    // DOM manipulatie: elementen selecteren en manipuleren
    const container = document.getElementById('type-knoppen');
    container.innerHTML = '';
    // DOM manipulatie: elementen manipuleren (buttons toevoegen)
    const allesBtn = document.createElement('button');
    allesBtn.textContent = 'Alle types';
    allesBtn.dataset.type = '';
    allesBtn.className = 'type-knop actief';
    container.appendChild(allesBtn);
    types.forEach(type => {
        const btn = document.createElement('button');
        btn.textContent = type.charAt(0).toUpperCase() + type.slice(1);
        btn.dataset.type = type;
        btn.className = 'type-knop';
        container.appendChild(btn);
    });
}

// DOM manipulatie: elementen selecteren
const zoekInput = document.getElementById('zoek');
const minHpInput = document.getElementById('min-hp');
const minAttackInput = document.getElementById('min-attack');

// Modern JavaScript: arrow functions, array methodes (filter, some), template literals
function filterEnToon() {
    const zoekTerm = zoekInput.value.toLowerCase();
    let gefilterd = allePokemon.filter(p => p.name.toLowerCase().includes(zoekTerm));
    if (gekozenType) {
        gefilterd = gefilterd.filter(p => p.types.some(t => t.type.name === gekozenType));
    }
    const minHp = Number(minHpInput.value) || 0;
    const minAttack = Number(minAttackInput.value) || 0;
    gefilterd = gefilterd.filter(p =>
        p.stats[0].base_stat >= minHp &&
        p.stats[1].base_stat >= minAttack
    );
    // DOM manipulatie: elementen manipuleren
    toonPokemonKaarten(gefilterd);
}

// DOM manipulatie & events: events aan elementen koppelen
zoekInput.addEventListener('input', filterEnToon);
minHpInput.addEventListener('input', filterEnToon);
minAttackInput.addEventListener('input', filterEnToon);

document.getElementById('type-knoppen').addEventListener('click', (e) => {
    // Modern JavaScript: arrow function, conditional (if)
    if (e.target.classList.contains('type-knop')) {
        document.querySelectorAll('.type-knop').forEach(btn => btn.classList.remove('actief'));
        e.target.classList.add('actief');
        gekozenType = e.target.dataset.type;
        filterEnToon();
    }
});

// Events aan elementen koppelen, event delegation, callback functions
document.addEventListener('click', (e) => {
    // Gebruiksvriendelijke elementen: favoriet-knop (icoon)
    if (e.target.classList.contains('favoriet-knop')) {
        e.stopPropagation();
        const pokemonId = Number(e.target.dataset.id);
        // Opslag & validatie: gebruik van localStorage (in wisselFavoriet)
        wisselFavoriet(pokemonId);
        toonFavorieten(allePokemon);
        filterEnToon();
        return;
    }
    // Event delegation: klik op kaart of child van kaart
    const kaart = e.target.closest('.pokemon-kaart');
    if (kaart) {
        const pokemonId = Number(kaart.dataset.id);
        const poke = allePokemon.find(p => p.id === pokemonId);
        if (poke) {
            // DOM manipulatie: modale venster tonen
            toonModal(poke);
        }
    }
});

// DOM manipulatie: sluitknop modal
const sluitModalBtn = document.getElementById('sluit-modal');
if (sluitModalBtn) {
    sluitModalBtn.onclick = () => {
        document.getElementById('modal').classList.add('verborgen');
    };
}
// Klik op de modal-achtergrond sluit ook (gebruiksvriendelijkheid)
document.getElementById('modal').addEventListener('click', (e) => {
  if (e.target.id === 'modal') {
      document.getElementById('modal').classList.add('verborgen');
  }
});

// Opslag & validatie: formulier validatie voor favorieten toevoegen
document.getElementById('favoriet-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const naam = document.getElementById('favoriet-naam').value.trim();
  const foutmelding = document.getElementById('foutmelding');
  if (!naam) {
    foutmelding.textContent = 'Voer een naam in!';
    return;
  }
  const poke = allePokemon.find(p => p.name.toLowerCase() === naam.toLowerCase());
  if (!poke) {
    foutmelding.textContent = 'Pokémon niet gevonden!';
    return;
  }
  wisselFavoriet(poke.id);
  toonFavorieten(allePokemon);
  foutmelding.textContent = '';
  document.getElementById('favoriet-naam').value = '';
});

// DOM manipulatie: copyright-jaar automatisch invullen
document.getElementById('jaar').textContent = new Date().getFullYear();


init(); // Modern JavaScript: async & await, Promises
