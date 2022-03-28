var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var anuncioParam = urlParams.get('search');
const url = 'https://pokeapi.co/api/v2/';
const pokeInput = document.getElementById("pokeSearch");
const pokemonData = document.querySelector(".pokemon-data");
const pokeName = document.getElementById("pokeName");

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

    pokeName.innerHTML = pokemon.name.toUpperCase();
    const card = document.createElement("div");
    card.classList.add("pokemon-block-flex");
    card.classList.add("pokemon-block");
  
    // imagen div -------------------------------
    const spriteContainer = document.createElement("div");
    spriteContainer.classList.add("img-container");
  
    const sprite = document.createElement("img");
    sprite.src = pokemon.sprites.front_default;
  
    spriteContainer.appendChild(sprite);
    // -----------------------------

    // data div ------------------------------
    const cardData = document.createElement("div");
    cardData.classList.add("pokemon-data");
  
    const number = document.createElement("p");
    number.textContent = `ID:   #${pokemon.id.toString().padStart(4, 0)}`;
  
    const name = document.createElement("p");
    name.classList.add("name");
    name.textContent = `${pokemon.name}`;



    cardData.appendChild(number);
    cardData.appendChild(name);

    const divisor = document.createElement("hr");
    cardData.appendChild(divisor);

    const cardFlex = document.createElement("div");
    cardFlex.classList.add("pokemon-flex");
    cardFlex.classList.add("pokemon-flex-around");
    createItemType(pokemon, cardFlex);
    createItemWeight(pokemon, cardFlex);
    createItemMovesNumber(pokemon, cardFlex);

    cardData.appendChild(cardFlex);

    // ------------------------------------

    card.appendChild(spriteContainer);
    card.appendChild(cardData);

    pokemonData.appendChild(card);
}

const createItemType = (pokemon, cardData) =>{

    const cardbox = document.createElement("div");
    cardbox.classList.add("data-box");

    const iconType = document.createElement("i");
    iconType.classList.add("fa-solid");
    iconType.classList.add("fa-circle-dot");
    iconType.classList.add("fa-2xl");

    const type = document.createElement("p");
    type.classList.add("type");
    type.textContent = `Tipo: `;
    pokemon.types.forEach(element => {
        type.textContent += ` - ${element.type.name} `;
    });

    cardbox.appendChild(iconType);
    cardbox.appendChild(type);

    cardData.appendChild(cardbox);
}

const createItemWeight = (pokemon, cardData) => {
    const cardbox = document.createElement("div");
    cardbox.classList.add("data-box");

    const iconWeight = document.createElement("i");
    iconWeight.classList.add("fa-solid");
    iconWeight.classList.add("fa-weight-hanging");
    iconWeight.classList.add("fa-2xl");

    const weight = document.createElement("p");
    weight.classList.add("weight");
    weight.textContent = `Peso: ${pokemon.weight} lbs.`;

    cardbox.appendChild(iconWeight);
    cardbox.appendChild(weight);

    cardData.appendChild(cardbox);
}

const createItemMovesNumber = (pokemon, cardData) => {
    const cardbox = document.createElement("div");
    cardbox.classList.add("data-box");

    const iconMovesNumber = document.createElement("i");
    iconMovesNumber.classList.add("fa-solid");
    iconMovesNumber.classList.add("fa-hashtag");
    iconMovesNumber.classList.add("fa-2xl");

    const movesNumber = document.createElement("p");
    movesNumber.classList.add("moves");
    movesNumber.textContent = `Movimientos: ${pokemon.moves.length}`;
   
    cardbox.appendChild(iconMovesNumber);
    cardbox.appendChild(movesNumber);

    cardData.appendChild(cardbox);
}

fetchPokemon(urlPokemon, typeSearch);

