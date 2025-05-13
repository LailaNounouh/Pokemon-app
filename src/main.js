import { haalPokemonLijst, haalPokemonDetails } from './api.js';
import { toonPokemonKaarten } from './DOMmanager.js';

let allePokemon = [];

async function init() {
  const lijst = await haalPokemonLijst();
  allePokemon = await Promise.all(lijst.map(p => haalPokemonDetails(p.url)));
  toonPokemonKaarten(allePokemon);
}

init();
