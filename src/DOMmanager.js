import { haalFavorieten } from './favorieten.js';

// Kaarten renderen
export function toonPokemonKaarten(lijst) {
  const container = document.getElementById('pokemon-kaarten');
  container.innerHTML = '';
  const favorieten = haalFavorieten();

  lijst.forEach(pokemon => {
    const kaart = document.createElement('div');
    kaart.className = 'pokemon-kaart';
    kaart.dataset.id = pokemon.id;
    kaart.innerHTML = `
      <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="poke-img">
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p><b>Type:</b> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><b>HP:</b> ${pokemon.stats[0].base_stat}</p>
      <p><b>Defense:</b> ${pokemon.stats[2].base_stat}</p>
      <button class="favoriet-knop${favorieten.includes(pokemon.id) ? ' actief' : ''}" data-id="${pokemon.id}">❤️</button>
    `;
    container.appendChild(kaart);
  });
}

// Favorieten tonen
export function toonFavorieten(allePokemon = []) {
  const favorieten = haalFavorieten();
  const lijst = document.getElementById('favorieten-lijst');
  lijst.innerHTML = '';
  favorieten.forEach(id => {
    const poke = allePokemon.find(p => p.id === id);
    const li = document.createElement('li');
    li.textContent = poke
      ? poke.name.charAt(0).toUpperCase() + poke.name.slice(1)
      : `Pokémon #${id}`;
    lijst.appendChild(li);
  });
}

// Modal
export function toonModal(pokemon) {
  const modal = document.getElementById('modal');
  const details = document.getElementById('modal-details');
  details.innerHTML = `
    <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p><b>Types:</b> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
    <p><b>HP:</b> ${pokemon.stats[0].base_stat}</p>
    <p><b>Attack:</b> ${pokemon.stats[1].base_stat}</p>
    <p><b>Defense:</b> ${pokemon.stats[2].base_stat}</p>
    <p><b>Weight:</b> ${pokemon.weight}</p>
    <p><b>Height:</b> ${pokemon.height}</p>
  `;
  modal.classList.remove('verborgen');
}

