// favorieten.js
// Functies voor het opslaan en wisselen van favorieten in localStorage
// Bron: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

//  Haalt de lijst van favoriete Pokémon op uit localStorage.
//   Technische vereiste: werken met localStorage
 
export function haalFavorieten() {
  return JSON.parse(localStorage.getItem('favorieten') || '[]');
}

//Technische vereiste: toevoegen/verwijderen van favorieten

export function wisselFavoriet(pokemonId) {
  let favorieten = haalFavorieten();
  if (favorieten.includes(pokemonId)) {
      // Verwijderen uit favorieten
      favorieten = favorieten.filter(id => id !== pokemonId);
  } else {
      // Toevoegen aan favorieten
      favorieten.push(pokemonId);
  }
  localStorage.setItem('favorieten', JSON.stringify(favorieten));
}

