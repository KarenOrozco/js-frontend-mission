const fetchPokemon = () => {
    const pokeInput = document.getElementById("pokeName");
    let pokeName = pokeInput.value.toLowerCase();

    const url = "https://pokeapi.co/api/v2/pokemon/"+pokeName;
    
    fetch(url).then((res) => {
        if (res.status != "200"){
            console.log(res);
            changePokeImage("./pokemon-sad.gif");
        }else{
            return res.json();
        }
    }).then((data) =>{
        console.log(data);
        let pokeImg = data.sprites.front_default;
        console.log(pokeImg);
        changePokeImage(pokeImg);
    })
}

const changePokeImage = (url) => {
    const pokeInput = document.getElementById("pokeImage");
    pokeInput.src = url;
}

// changePokeImage("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/7.png");

const imprimir = () => {
    const pokeInput = document.getElementById("pokeName");
    let pokeName = pokeInput.value;
    console.log("hola " + pokeName);
}