function renderEverything(){
    let allPokemonContainer = document.querySelector('#pokemon-container')
    allPokemonContainer.innerText = "";
    fetchPokemon();
}

function fetchPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
    .then(response => response.json())
    .then(function(allpokemon){
        allpokemon.results.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}

function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
                                //Example: https://pokeapi.co/api/v2/pokemon/1/"
    fetch(url)
    .then(response => response.json())
    .then(function(pokemonData){
        renderPokemon(pokemonData)
    })
}

function renderPokemon(pokemonData){
    let allPokemonContainer = document.getElementById('pokemon-container');
    let pokemonContainer = document.createElement("div")
    pokemonContainer.classList.add('ui', 'card');

    createpokemonImage(pokemonData.id, pokemonContainer);

    // name of pokemon
    let pokemonName = document.createElement('h3') 
    pokemonName.innerText = pokemonData.name
    
    // pokemon ID
    let pokemonID = document.createElement('p')
    pokemonID.innerText = `#${pokemonData.id}` 
   
    // ul to hold pokemon types
    let pokemonTypes = document.createElement('ul')
  
    // go through the types array and create li tags for each one
    createTypes(pokemonData.types, pokemonTypes)

    pokemonContainer.append(pokemonName, pokemonID, pokemonTypes);
    allPokemonContainer.appendChild(pokemonContainer);  
}

// Creates a list for the pokemon types w 2 items

function createTypes(types, ul){
    types.forEach(function(type){
        let typeList = document.createElement('li');
        typeList.innerText = type['type']['name'];
        ul.append(typeList)
    })
}

// This appends the relevant image to the card

function createpokemonImage(pokemonID, containerDiv){
    let pokemonImageContainer = document.createElement('div')
    pokemonImageContainer.classList.add('image')

    let pokemonImage = document.createElement('img')
    pokemonImage.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`

    pokemonImageContainer.append(pokemonImage);
    containerDiv.append(pokemonImageContainer);
}

renderEverything();