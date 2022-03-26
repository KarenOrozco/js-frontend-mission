const pokemonContainer = document.querySelector(".pokemonByTypeList");

const getTypesPokemonList = () => {
    const url = 'https://pokeapi.co/api/v2/type/';
    var typeSearch = 'types';
    return fetchPokemon(url,typeSearch);
}

const getPokemonListByType = () => {
    var pokeSelect = document.getElementById("typesPokemon");
    var typeSearch = 'byType';
    var pokeValue;

    if(pokeSelect.selectedIndex !== -1){
        pokeValue = pokeSelect.options[pokeSelect.selectedIndex].value;
    }else{
        pokeValue = 1;
    }

    const url = 'https://pokeapi.co/api/v2/type/' + pokeValue;

    return fetchPokemon(url,typeSearch);
}

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

const getData = (data, typeSearch) => {

    switch (typeSearch) {
        case 'types':
            var typesPokemonList = Object.values(data.results); //Tu array de provincias
            addOptionsToTypesPokemonSelect(typesPokemonList);
            break;

        case 'byType':
            console.log(data);
            getDataByType(data.pokemon);
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

const getDataByType = (pokemonTypeList) => {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    var typeSearch = 'byPokemon';
    return pokemonTypeList.map(element => {
        let urlPokemon = url + element.pokemon.name;
        fetchPokemon(urlPokemon,typeSearch);
    });
    // return `<img src="${element.pokemon.url}" alt="Pokemon ${element.pokemon.name}" id="${element.pokemon.name}" width="150px">`;
    // return '<img src="">'+element.pokemon.name+' '+element.pokemon.url+'</p>'
    // document.getElementById("pokemonByTypeList").innerHTML = foo;
}

const printPokemonListByType = (pokemon) => {
    let foo = `<img src="${pokemon.sprites.back_default}" alt="Pokemon ${pokemon.name}" id="${pokemon.name}" width="150px">`;
    document.getElementById("pokemonByTypeList").innerHTML = foo;
}

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

getTypesPokemonList();
getPokemonListByType();