const pokemonContainer = document.querySelector(".pokemonByTypeList");
const url = 'https://pokeapi.co/api/v2/';
const previus = document.querySelector("#previus");
const next = document.querySelector("#next");
let pokemonList;
let offset = 1;
let limit = 12;

// Obtiene la lista de los tipos de pokémones (fuergo, normal, agua, etc.)
const getTypesPokemonList = () => {
    let urlTypesList = url + 'type';
    var typeSearch = 'types';
    return fetchPokemon(urlTypesList, typeSearch);
}

// Obtiene la lista de pokemones que pertenecen a cierto tipo
const getPokemonListByType = () => {
    var pokeSelect = document.getElementById("typesPokemon");
    var typeSearch = 'byType';
    var pokeValue;

    if(pokeSelect.selectedIndex !== -1){
        pokeValue = pokeSelect.options[pokeSelect.selectedIndex].value;
    }else{
        pokeValue = 1;
    }

    let urlPokemonListByType = url + 'type/' + pokeValue;
    removeChildNodes(pokemonContainer);
    return fetchPokemon(urlPokemonListByType, typeSearch);
}

// Evento para mostrar información de un pokemon
pokemonContainer.addEventListener('click', () => {
    console.log("aqui");
    location.href = './views/pokemon.html';
});

// Evento para botón anterior
previus.addEventListener('click', () =>{
    if(offset !== 1){
        offset -= limit;
        removeChildNodes(pokemonContainer);
        pokemonsPagination(offset, limit);
    }
});

// Evento para botón siguiente
next.addEventListener('click', () =>{
    if(offset + limit <= pokemonList.length){
        offset += limit;
        removeChildNodes(pokemonContainer);
        pokemonsPagination(offset, limit);
    }
});

// Pagina el listado de pokemones de 20 en 20
const pokemonsPagination = (offset, limit) => {
    var urlPokemon = url + 'pokemon/';
    var typeSearch = 'byPokemon';

    for (let index = offset; (index < (offset + limit)) && (index < pokemonList.length) ; index++) {
        console.log(urlPokemon);
        let urlPokemonByName = urlPokemon + pokemonList[index].pokemon.name;
        fetchPokemon(urlPokemonByName, typeSearch);
    }    
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
            return getData(data, typeSearch);
        }
    })
}

// Verifica el tipo de busqueda que se está haciendo y 
// realiza la acción correspondiente con el dato obtenido de la función fecchPokemon
const getData = (data, typeSearch) => {
    switch (typeSearch) {
        case 'types':
            var typesPokemonList = Object.values(data.results); //Tu array de provincias
            addOptionsToTypesPokemonSelect(typesPokemonList);
            break;

        case 'byType':
            console.log(data);
            pokemonList = data.pokemon;
            pokemonsPagination(offset, limit);
            // getDataByType(data.pokemon);
            break;

        case 'byPokemon':
            console.log(data);
            createPokemon(data);
            break;

        default :
            // getDataPokemon(data);
            break;

    }
}

// Agrega las opciones (tipos de pokemon) al select
const addOptionsToTypesPokemonSelect = (typesPokemonList) => {
    var select = document.getElementById("typesPokemon"); //Seleccionamos el select
    console.log(typesPokemonList);

    for(var i=0; i < typesPokemonList.length -2; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = typesPokemonList[i].name; //Metemos el texto en la opción
        option.value = typesPokemonList[i].url.substr(31,2).replace('/','');
        select.appendChild(option); //Metemos la opción en el select
    }
}

// Crea las etiquetas HTML para mostrar la data de un pokémon
const createPokemon = (pokemon) => {

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
  
    card.appendChild(spriteContainer);
    card.appendChild(number);
    card.appendChild(name);
  
    // const cardBack = document.createElement("div");
    // cardBack.classList.add("pokemon-block-back");
  
    // cardBack.appendChild(progressBars(pokemon.stats));
  
    // cardContainer.appendChild(card);
    // cardContainer.appendChild(cardBack);
    pokemonContainer.appendChild(card);
}

const searchPokemon = () => {
    const pokeSearchType = document.getElementById("pokeSearchType");
    const pokeInput = document.getElementById("pokeName");
    let pokeValue = pokeInput.value.toLowerCase();
    let url = "https://pokeapi.co/api/v2/";

    switch(pokeSearchType){
        case 'pokemon':
            url += pokeSearchType + '/' + pokeValue;
            break;
        case 'type':
            url += pokeSearchType + '/' + pokeValue;
            break;

        case 'ability':

            break;

        default:
            
            break;
    }

    return url;
}

const changePokeImage = (url) => {
    const pokeInput = document.getElementById("pokeImage");
    pokeInput.src = url;
}

// Remueve las etiquetas hijas del selector deseado pasado como parametro
const removeChildNodes = (parent) => {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

getTypesPokemonList();
getPokemonListByType();