// Functies voor het tonen van Pokémon-kaarten, favorieten en modals
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Document

import { haalFavorieten } from './favorieten.js';

// Toont alle Pokémon-kaarten op de pagina + Observer API
export function toonPokemonKaarten(lijst) {
    // DOM-manipulatie: selecteren van een element
    const container = document.getElementById('pokemon-kaarten');
    // DOM-manipulatie: elementen manipuleren (inhoud legen)
    container.innerHTML = '';
    // Modern JavaScript: gebruik van const
    const favorieten = haalFavorieten();

    // Modern JavaScript: iteratie over arrays met forEach
    lijst.forEach(pokemon => {
        // DOM-manipulatie: dynamisch element aanmaken
        const kaart = document.createElement('div');
        kaart.className = 'pokemon-kaart';
        kaart.dataset.id = pokemon.id;
        // Modern JavaScript: template literals voor dynamische HTML
        // Modern JavaScript: array methodes (.map), ternary operator, includes
        kaart.innerHTML = `
            <img src="${pokemon.sprites.front_default}" class="poke-img" alt="${pokemon.name}">
            <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
            <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
            <p><strong>HP:</strong> ${pokemon.stats[0].base_stat}</p>
            <p><strong>Attack:</strong> ${pokemon.stats[1].base_stat}</p>
            <button class="favoriet-knop${favorieten.includes(pokemon.id) ? ' actief' : ''}" data-id="${pokemon.id}" title="Markeer als favoriet">★</button>
        `;
        // DOM-manipulatie: element toevoegen aan de DOM
        container.appendChild(kaart);
    });

    // Observer API: IntersectionObserver voor animatie als kaart in beeld komt
    const observer = new IntersectionObserver((entries) => {
        // Modern JavaScript: arrow function, forEach als callback
        entries.forEach(entry => {
            // Modern JavaScript: conditional (if)
            if (entry.isIntersecting) {
                entry.target.classList.add('in-beeld');
            }
        });
    }, { threshold: 0.2 });

    // DOM-manipulatie: selecteren van meerdere elementen
    document.querySelectorAll('.pokemon-kaart').forEach(kaart => observer.observe(kaart));
}

// Toont de favorietenlijst.
export function toonFavorieten(allePokemon = []) {
    // DOM-manipulatie: selecteren van een element
    const favorieten = haalFavorieten();
    const lijst = document.getElementById('favorieten-lijst');
    // DOM-manipulatie: elementen manipuleren (inhoud legen)
    lijst.innerHTML = '';
    // Modern JavaScript: iteratie over arrays met forEach
    favorieten.forEach(id => {
        // Modern JavaScript: array methodes (.find)
        const poke = allePokemon.find(p => p.id === id);
        // DOM-manipulatie: dynamisch element aanmaken
        const li = document.createElement('li');
        // Modern JavaScript: ternary operator
        li.textContent = poke
            ? poke.name.charAt(0).toUpperCase() + poke.name.slice(1)
            : `Pokémon #${id}`;
        // DOM-manipulatie: element toevoegen aan de DOM
        lijst.appendChild(li);
    });
}

// Toont een modal met uitgebreide info van de geselecteerde Pokémon (6 kolommen)
export function toonModal(pokemon) {
    // DOM-manipulatie: selecteren van elementen
    const modal = document.getElementById('modal');
    const details = document.getElementById('modal-details');
    // Modern JavaScript: template literals, array methodes (.map)
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
    // DOM-manipulatie: element manipuleren (class verwijderen)
    modal.classList.remove('verborgen');
}
