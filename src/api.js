// api.js
// Functies voor het ophalen van Pokémon-data via de PokéAPI
// Bron: https://pokeapi.co/docs/v2

// Technische vereiste: data ophalen via externe API (PokéAPI). Haalt eerste 20 uit 
 
export async function haalPokemonLijst() {
  // Fetch van PokéAPI: https://pokeapi.co/api/v2/pokemon?limit=20
  const antwoord = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await antwoord.json();
  return data.results;
}

//Technische vereiste: detaildata ophalen via API

export async function haalPokemonDetails(url) {
  const antwoord = await fetch(url);
  return await antwoord.json();
}



