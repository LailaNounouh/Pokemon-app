const container = document.createElement('div');
document.body.appendChild(container);

let allePokemon = [];
let gekozenType = null;

function toonPokemon(pokemonLijst) {
  container.innerHTML = '';
  pokemonLijst.forEach(pokemon => {
    const card = document.createElement('div');
    card.textContent = pokemon.name;
    container.appendChild(card);
  });
}

fetch('https://pokeapi.co/api/v2/pokemon?limit=20')
  .then(response => response.json())
  .then(data => {
    allePokemon = data.results;
    toonPokemon(allePokemon);
  });

const zoekInput = document.getElementById('zoekInput');
zoekInput.addEventListener('input', filterEnToon);

document.getElementById('type-knoppen').addEventListener('click', (e) => {
  if (e.target.classList.contains('type-knop')) {
    document.querySelectorAll('.type-knop').forEach(btn => btn.classList.remove('actief'));
    e.target.classList.add('actief');
    gekozenType = e.target.dataset.type;
    filterEnToon();
  }
})


