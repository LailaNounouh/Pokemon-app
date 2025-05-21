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



