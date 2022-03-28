var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var anuncioParam = urlParams.get('search');
const url = 'https://pokeapi.co/api/v2/';
const pokeInput = document.getElementById("pokeSearch");
const pokemonData = document.querySelector(".pokemon-data");

console.log(anuncioParam);
console.log('llllll');

let urlPokemon = url + 'pokemon/' + anuncioParam ;
var typeSearch = 'pokemonData';

// buscar pokémon
pokeInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13) {
        searchPokemon();
    }
})

const searchPokemon = () => {
    let pokeValue = pokeInput.value.toLowerCase();
    location.href = '../views/pokemon.html?search='+ pokeValue;
}

// Consume la api de pokemones
const fetchPokemon = (url, typeSearch) => {

    fetch(url).then((result) =>{
        var status = result.status;
        if(result.status !== 200){
            console.log(result.status)
            changePokeImage("./pokemon-sad.gif");
        }else{
            console.log(result.status);
            return result.json();
        }
    }).then((data) =>{
        if(typeof data !== 'undefined'){
            // console.log(data.results);
            console.log(typeSearch);
            return createPokemonData(data);
        }
    })
}

const createPokemonData = (pokemon) => {
    const card = document.createElement("div");
    card.classList.add("pokemon-block");
  
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
  
    spriteContainer.appendChild(sprite);
  
    const number = document.createElement("p");
    number.textContent = `#${pokemon.id.toString().padStart(4, 0)}`;
  
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = pokemon.name;

    const weight = document.createElement("p");
    weight.classList.add("weight");
    weight.textContent = pokemon.weight;
  
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
    card.appendChild(weight);
    pokemonData.appendChild(card);
}

fetchPokemon(urlPokemon, typeSearch);
