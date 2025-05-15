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
  container.innerHTML = '';

  const allesBtn = document.createElement('button');
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


const zoekInput = document.getElementById('zoek');
const minHpInput = document.getElementById('min-hp');
const minAttackInput = document.getElementById('min-attack');

function filterEnToon() {
  const zoekTerm = zoekInput.value.toLowerCase();
  let gefilterd = allePokemon.filter(p => p.name.toLowerCase().includes(zoekTerm));
  if (gekozenType) {
    gefilterd = gefilterd.filter
  const minHp = Number(minHpInput.value) || 0;
  const minAttack = Number(minAttackInput.value) 
  gefilterd = gefilterd.filter(p => 
    p.stats[0].base_stat >= minHp &&
    p.stats[1].base_stat >= minAttack
  );
  toonPokemonKaarten(gefilterd);
}}

zoekInput.addEventListener('input', filterEnToon);
minHpInput.addEventListener('input', filterEnToon);
minAttackInput.addEventListener('input', filterEnToon);

document.getElementById('type-knoppen').addEventListener('click', (e) => {
  if (e.target.classList.contains('type-knop')) {
    document.querySelectorAll('.type-knop').forEach(btn => btn.classList.remove('actief'));
    e.target.classList.add('actief');
    gekozenType = e.target.dataset.type;
    filterEnToon();
  }
});

