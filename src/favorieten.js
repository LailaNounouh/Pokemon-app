// Favorieten opslaan in localStorage

export function haalFavorieten() {
    return JSON.parse(localStorage.getItem('favorieten') || '[]');
  }
  
  export function wisselFavoriet(pokemonId) {
    let favorieten = haalFavorieten();
    if (favorieten.includes(pokemonId)) {
      favorieten = favorieten.filter(id => id !== pokemonId);
    } else {
      favorieten.push(pokemonId);
    }
    localStorage.setItem('favorieten', JSON.stringify(favorieten));
  }
  