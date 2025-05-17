// DOMmanager.js
// Functies voor het tonen van Pokémon-kaarten, favorieten en modals
// Gebruikt: toonPokemonKaarten, toonFavorieten, toonModal

import { haalFavorieten } from './favorieten.js';


 //Technische vereiste: dynamisch genereren van DOM-elementen voor de kaarten
export function toonPokemonKaarten(lijst) {
    const container = document.getElementById('pokemon-kaarten');
    container.innerHTML = '';
    const favorieten = haalFavorieten();

    lijst.forEach(pokemon => {
        const kaart = document.createElement('div');
        kaart.className = 'pokemon-kaart';
        kaart.dataset.id = pokemon.id;
        // Dynamisch invullen van kaartinfo
        kaart.innerHTML = `
            <img src="${pokemon.sprites.front_default}" class="poke-img" alt="${pokemon.name}">
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
            <p><strong>Attack:</strong> ${pokemon.stats[1].base_stat}</p>
            <button class="favoriet-knop${favorieten.includes(pokemon.id) ? ' actief' : ''}" data-id="${pokemon.id}" title="Markeer als favoriet">★</button>
        `;
        container.appendChild(kaart);
    });
}

// Technische vereiste: werken met localStorage en dynamische lijst. Het toont lijst van favoriete
 
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

// Technische vereiste: modale vensters tonen met extra info

export function toonModal(pokemon) {
    const modal = document.getElementById('modal');
    const details = document.getElementById('modal-details');
    details.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" class="poke-img" alt="${pokemon.name}">
        <p><strong>Types:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
        <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
        <p><strong>Attack:</strong> ${pokemon.stats[1].base_stat}</p>
        <p><strong>Defense:</strong> ${pokemon.stats[2].base_stat}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
        <p><strong>Height:</strong> ${pokemon.height}</p>
    `;
    modal.classList.remove('verborgen');
}
