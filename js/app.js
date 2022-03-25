const fetchPokemon = (url) => {

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
            console.log(data.results);
            // return data.results;
            // this.getDataPokemon(data);
            var typesPokemonList = Object.values(data.results); //Tu array de provincias
            return addOptionsToTypesPokemonSelect(typesPokemonList);
        }
    })
}

const getTypesPokemonList = () => {
    const url = 'https://pokeapi.co/api/v2/type/';
    return fetchPokemon(url);
}

function addOptionsToTypesPokemonSelect(typesPokemonList) {
    var select = document.getElementById("typesPokemon"); //Seleccionamos el select
    console.log(typesPokemonList);

    for(var i=0; i < typesPokemonList.length -2; i++){ 
        var option = document.createElement("option"); //Creamos la opcion
        option.innerHTML = typesPokemonList[i].name; //Metemos el texto en la opción
        option.value = typesPokemonList[i].url.substr(31,2).replace('/','');
        select.appendChild(option); //Metemos la opción en el select
    }
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