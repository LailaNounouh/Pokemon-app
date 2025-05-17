// Functies voor het tonen van Pokémon-kaarten, favorieten en modals
// Gebruikt: toonPokemonKaarten, toonFavorieten, toonModal
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Document

import { haalFavorieten } from './favorieten.js';

// Toont alle Pokémon-kaarten op de pagina + Observer API
export function toonPokemonKaarten(lijst) {
    const container = document.getElementById('pokemon-kaarten');
    container.innerHTML = '';
    const favorieten = haalFavorieten();

    lijst.forEach(pokemon => {
        const kaart = document.createElement('div');
        kaart.className = 'pokemon-kaart';
        kaart.dataset.id = pokemon.id;
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

    // Observer API: animatie als kaart in beeld komt
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-beeld');
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('.pokemon-kaart').forEach(kaart => observer.observe(kaart));
}

// Toont de favorietenlijst.
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

// Toont een modal met uitgebreide info van de geselecteerde Pokémon (6 kolommen)
export function toonModal(pokemon) {
    const modal = document.getElementById('modal');
    const details = document.getElementById('modal-details');
    details.innerHTML = `
        <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
        <img src="${pokemon.sprites.front_default}" class="poke-img" alt="${pokemon.name}">
        <table>
          <tr>
            <td><strong>Types:</strong></td>
            <td>${pokemon.types.map(t => t.type.name).join(', ')}</td>
          </tr>
          <tr>
            <td><strong>HP:</strong></td>
            <td>${pokemon.stats[0].base_stat}</td>
          </tr>
          <tr>
            <td><strong>Attack:</strong></td>
            <td>${pokemon.stats[1].base_stat}</td>
          </tr>
          <tr>
            <td><strong>Defense:</strong></td>
            <td>${pokemon.stats[2].base_stat}</td>
          </tr>
          <tr>
            <td><strong>Gewicht:</strong></td>
            <td>${pokemon.weight}</td>
          </tr>
          <tr>
            <td><strong>Lengte:</strong></td>
            <td>${pokemon.height}</td>
          </tr>
        </table>
    `;
    modal.classList.remove('verborgen');
}
