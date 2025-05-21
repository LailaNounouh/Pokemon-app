// Globale variabelen
let allePokemon = [];
let gekozenType = '';
let favorieten = JSON.parse(localStorage.getItem('favorieten') || '[]');

// Helper: Haal details van een Pokémon op via de API
async function haalPokemonDetails(url) {
  const res = await fetch(url);
  return await res.json();
}

// Haal de lijst van Pokémon op via de API
async function haalPokemonLijst() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await res.json();
  return data.results;
}

// Toon alle Pokémon-kaarten in de container
function toonPokemonKaarten(pokemonLijst) {
  const container = document.getElementById('pokemon-kaarten');
  container.innerHTML = '';
  pokemonLijst.forEach(p => {
    const kaart = document.createElement('div');
    kaart.className = 'pokemon-kaart';
    kaart.dataset.id = p.id;
    kaart.innerHTML = `
      <h3>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</h3>
      <img src="${p.sprites.front_default}" alt="${p.name}">
      <p>Type: ${p.types.map(t => t.type.name).join(', ')}</p>
      <p>HP: ${p.stats[0].base_stat} | Attack: ${p.stats[1].base_stat}</p>
      <button class="favoriet-knop" data-id="${p.id}">
        ${favorieten.includes(p.id) ? '★' : '☆'}
      </button>
    `;
    container.appendChild(kaart);
  });
}

// Toon de favorietenlijst in een <ul>
function toonFavorieten(pokemonLijst) {
  const favList = document.getElementById('favorieten-lijst');
  favList.innerHTML = '';
  const favorietPokemons = pokemonLijst.filter(p => favorieten.includes(p.id));
  if (favorietPokemons.length === 0) {
    favList.innerHTML = '<li>Geen favorieten gekozen.</li>';
    return;
  }
  favorietPokemons.forEach(p => {
    const li = document.createElement('li');
    li.textContent = p.name.charAt(0).toUpperCase() + p.name.slice(1);
    favList.appendChild(li);
  });
}

// Toon modal met details van een Pokémon
function toonModal(poke) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-details');
  content.innerHTML = `
    <h2>${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h2>
    <img src="${poke.sprites.front_default}" alt="${poke.name}">
    <p>Type: ${poke.types.map(t => t.type.name).join(', ')}</p>
    <p>HP: ${poke.stats[0].base_stat} | Attack: ${poke.stats[1].base_stat}</p>
    <p>Weight: ${poke.weight}</p>
    <p>Height: ${poke.height}</p>
  `;
  modal.classList.remove('verborgen');
}

// Favoriet toevoegen of verwijderen
function wisselFavoriet(pokemonId) {
  if (favorieten.includes(pokemonId)) {
    favorieten = favorieten.filter(id => id !== pokemonId);
  } else {
    favorieten.push(pokemonId);
  }
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
}

// Maak filterknoppen voor types
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

// Filteren op naam, type, HP en Attack
function filterEnToon() {
  const zoekInput = document.getElementById('zoek');
  const minHpInput = document.getElementById('min-hp');
  const minAttackInput = document.getElementById('min-attack');
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
  toonPokemonKaarten(gefilterd);
}

// Init: Haal data op en toon alles
async function init() {
  const lijst = await haalPokemonLijst();
  // Haal details op voor alle Pokémon
  allePokemon = await Promise.all(lijst.map(p => haalPokemonDetails(p.url)));
  toonPokemonKaarten(allePokemon);
  toonFavorieten(allePokemon);
  maakTypeKnoppen();
}

// Event listeners (worden pas toegevoegd als DOM geladen is)
document.addEventListener('DOMContentLoaded', () => {
  init();

  // Live filteren op naam, HP en
