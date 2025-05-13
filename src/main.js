import './style.css';
import { haalPokemonLijst, haalPokemonDetails } from './api.js';
import { toonPokemonKaarten, toonFavorieten, toonModal } from './DOMmanager.js';
import { haalFavorieten, wisselFavoriet } from './favorieten.js';

let allePokemon = [];
let gekozenType = '';

async function init() {
  const lijst = await haalPokemonLijst();
  allePokemon = await Promise.all(lijst.map(p => haalPokemonDetails(p.url)));
  toonPokemonKaarten(allePokemon);
  toonFavorieten(allePokemon);
  maakTypeKnoppen();
}

function maakTypeKnoppen() {
  const types = new Set();
  allePokemon.forEach(p => p.types.forEach(t => types.add(t.type.name)));
  const container = document.getElementById('type-knoppen');
  container.innerHTML = '';

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