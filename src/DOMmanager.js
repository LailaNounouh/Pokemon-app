export function toonPokemonKaarten(lijst) {
    const container = document.getElementById('pokemon-kaarten');
    container.innerHTML = '';
    lijst.forEach(pokemon => {
      const kaart = document.createElement('div');
      kaart.className = 'pokemon-kaart';
      kaart.dataset.id = pokemon.id;
      kaart.innerHTML = `
        <h3>${pokemon.name}</h3>
      `;
      container.appendChild(kaart);
    });
  }
  