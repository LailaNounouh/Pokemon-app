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


