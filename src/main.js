let allePokemon = [];
let gekozenType = '';
let favorieten = JSON.parse(localStorage.getItem('favorieten') || '[]');

// Helper om details van een Pokémon op te halen
async function haalPokemonDetails(url) {
  const res = await fetch(url);
  return await res.json();
}

// Haal lijst van Pokémon op
async function haalPokemonLijst() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await res.json();
  return data.results;
}

// Toon Pokémon-kaarten
function toonPokemonKaarten(pokemonLijst) {
  const container = document.getElementById('pokemon-container');
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

// Toon favorieten
function toonFavorieten(pokemonLijst) {
  const favDiv = document.getElementById('favorieten');
  favDiv.innerHTML = '<h2>Favorieten</h2>';
  const favorietPokemons = pokemonLijst.filter(p => favorieten.includes(p.id));
  if (favorietPokemons.length === 0) {
    favDiv.innerHTML += '<p>Geen favorieten gekozen.</p>';
    return;
  }
  favorietPokemons.forEach(p => {
    favDiv.innerHTML += `<span>${p.name.charAt(0).toUpperCase() + p.name.slice(1)}</span> `;
  });
}

// Toon modal met details
function toonModal(poke) {
  const modal = document.getElementById('modal');
  const content = document.getElementById('modal-content');
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

// Favoriet toevoegen/verwijderen
function wisselFavoriet(pokemonId) {
  if (favorieten.includes(pokemonId)) {
    favorieten = favorieten.filter(id => id !== pokemonId);
  } else {
    favorieten.push(pokemonId);
  }
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
}

// Type knoppen maken
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

// Filteren en tonen
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

// Init functie
async function init() {
  const lijst = await haalPokemonLijst();
  allePokemon = await Promise.all(lijst.map(p => haalPokemonDetails(p.url)));
  toonPokemonKaarten(allePokemon);
  toonFavorieten(allePokemon);
  maakTypeKnoppen();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  init();

  document.getElementById('zoek').addEventListener('input', filterEnToon);
  document.getElementById('min-hp').addEventListener('input', filterEnToon);
  document.getElementById('min-attack').addEventListener('input', filterEnToon);

  document.getElementById('type-knoppen').addEventListener('click', (e) => {
    if (e.target.classList.contains('type-knop')) {
      document.querySelectorAll('.type-knop').forEach(btn => btn.classList.remove('actief'));
      e.target.classList.add('actief');
      gekozenType = e.target.dataset.type;
      filterEnToon();
    }
  });

  document.getElementById('pokemon-container').addEventListener('click', (e) => {
    if (e.target.classList.contains('favoriet-knop')) {
      e.stopPropagation();
      const pokemonId = Number(e.target.dataset.id);
      wisselFavoriet(pokemonId);
      toonFavorieten(allePokemon);
      filterEnToon();
      return;
    }
    const kaart = e.target.closest('.pokemon-kaart');
    if (kaart) {
      const pokemonId = Number(kaart.dataset.id);
      const poke = allePokemon.find(p => p.id === pokemonId);
      if (poke) {
        toonModal(poke);
      }
    }
  });

  document.getElementById('sluit-modal').onclick = () => {
    document.getElementById('modal').classList.add('verborgen');
  };
  document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
      document.getElementById('modal').classList.add('verborgen');
    }
  });

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

  document.getElementById('jaar').textContent = new Date().getFullYear();
});
