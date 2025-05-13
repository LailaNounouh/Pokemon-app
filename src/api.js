
export async function haalPokemonLijst() {
  const antwoord = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await antwoord.json();
  return data.results;
}

export async function haalPokemonDetails(url) {
  const antwoord = await fetch(url);
  return await antwoord.json();
}
