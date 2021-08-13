function render(){
    let allPokemonContainer = document.querySelector('#pokedex-container')
    allPokemonContainer.innerText = "";
    fetchPokemon();
}


function fetchPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`) // change to 151 to get more once you figure out how to array
    .then(response => response.json())
    .then(function(allpokemon){
        console.log(allpokemon)
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}

function fetchPokemonData(pokemon){
    console.log(fetchPokemon);
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 

    fetch(url)
    .then(response => response.json())
    .then(function(pokemonData){
        renderPokemon(pokemonData)
    })
}

function renderPokemon(pokemonData){


    let allPokemonContainer = document.getElementById('pokedex-container');
    let pokemonContainer = document.createElement("div")
    pokemonContainer.classList.add('ui', 'card');

    createpokemonImage(pokemonData.id, pokemonContainer);

    // name of pokemon
    let pokemonName = document.createElement('h4')
    pokemonName.classList.add('card__name')
    pokemonName.innerText = pokemonData.name
    
    // pokemon ID
    let pokemonID = document.createElement('p')
    pokemonID.classList.add('card__id')
    pokemonID.innerText = `${pokemonData.id}` 
   
    // ul to hold pokemon types
    let pokemonTypes = document.createElement('ul')
    pokemonTypes.classList.add('card__type')
  
    // go through the types array and create li tags for each one
    createTypes(pokemonData.types, pokemonTypes)

    pokemonContainer.append(pokemonName, pokemonID, pokemonTypes);
    allPokemonContainer.appendChild(pokemonContainer);  
}

// Creates a list for the pokemon types w 2 items

function createTypes(types, ul){
    types.forEach(function(type){
        let typeList = document.createElement('li');
        typeList.classList.add('card__li');
        typeList.innerText = type['type']['name'];
        ul.append(typeList)
    })
}

// This appends the relevant image to the card

function createpokemonImage(pokemonID, containerDiv){
    let pokemonImageContainer = document.createElement('div')

    let pokemonImage = document.createElement('img')
    pokemonImage.classList.add('card__image')
    pokemonImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`

    pokemonImageContainer.append(pokemonImage);
    containerDiv.append(pokemonImageContainer);
}


render();



