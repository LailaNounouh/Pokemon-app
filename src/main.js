let allePokemon = [];
let gekozenType = '';
let favorieten = JSON.parse(localStorage.getItem('favorieten') || '[]');
async function haalPokemonDetails(url) {
  const res = await fetch(url);
  return await res.json();
}
async function haalPokemonLijst() {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
  const data = await res.json();
  return data.results;
}
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
function wisselFavoriet(pokemonId) {
  if (favorieten.includes(pokemonId)) {
    favorieten = favorieten.filter(id => id !== pokemonId);
  } else {
    favorieten.push(pokemonId);
  }
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
}


