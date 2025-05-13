export async function fetchPokemonList() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();
    return data.results;
  }
  
  export async function fetchPokemonDetails(url) {
    const response = await fetch(url);
    return await response.json();}
  