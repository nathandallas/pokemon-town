// function render(){
//     let allPokemonContainer = document.querySelector('#pokemon-container')
//     allPokemonContainer.innerText = "";
//     fetchPokemon();
// }

function palletTownRender(){
    let title = document.querySelector('.title-text')
    title.innerText="PALLET TOWN"
    let allPokemonContainer = document.querySelector('#pokemon-container')
    allPokemonContainer.innerText = "";

    fetchPalletPokemon();
}
function viridianCityRender(){
    let title = document.querySelector('.title-text')
    title.innerText="VIRIDIAN CITY"
    let allPokemonContainer = document.querySelector('#pokemon-container')
    allPokemonContainer.innerText = "";

    fetchViridianPokemon();
}
function ceruleanCityRender(){
    let title = document.querySelector('.title-text')
    title.innerText="CERULEAN CITY"
    let allPokemonContainer = document.querySelector('#pokemon-container')
    allPokemonContainer.innerText = "";

    fetchCeruleanPokemon();
}
function pewterCityRender(){
    let title = document.querySelector('.title-text')
    title.innerText="PEWTER CITY"
    let allPokemonContainer = document.querySelector('#pokemon-container')
    allPokemonContainer.innerText = "";

    fetchPewterPokemon();
}
 
// ${identifier.value}
//https://pokeapi.co/api/v2/pokemon/${pokemonID}/
//https://pokeapi.co/api/v2/pokemon?limit=151


function fetchPalletPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(response => response.json())
    .then(function(allpokemon){

        let palletArr = [allpokemon.results[0],allpokemon.results[3], allpokemon.results[6],allpokemon.results[12], allpokemon.results[19],allpokemon.results[21]];

        palletArr.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}
function fetchViridianPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(response => response.json())
    .then(function(allpokemon){

        let viridianArr = [allpokemon.results[13],allpokemon.results[15], allpokemon.results[9],allpokemon.results[10], allpokemon.results[14],allpokemon.results[11]];

        viridianArr.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}
function fetchCeruleanPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(response => response.json())
    .then(function(allpokemon){

        let ceruleanArr = [allpokemon.results[128],allpokemon.results[97], allpokemon.results[119],allpokemon.results[115], allpokemon.results[53],allpokemon.results[78]];

        ceruleanArr.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}
function fetchPewterPokemon(){
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(response => response.json())
    .then(function(allpokemon){

        let pewterArr = [allpokemon.results[34],allpokemon.results[50], allpokemon.results[28],allpokemon.results[31], allpokemon.results[43],allpokemon.results[77]];

        pewterArr.forEach(function(pokemon){
            fetchPokemonData(pokemon);
        })
    })
}




function fetchPokemonData(pokemon){
    let url = pokemon.url // <--- this is saving the pokemon url to a variable to use in the fetch. 
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






document.addEventListener("DOMContentLoaded", () =>{
     const locationNav = document.querySelector('.pallet-town');
     locationNav.addEventListener('click', palletTownRender)
 })
document.addEventListener("DOMContentLoaded", () =>{
     const locationNav = document.querySelector('.viridian-city');
     locationNav.addEventListener('click', viridianCityRender)
 })
document.addEventListener("DOMContentLoaded", () =>{
     const locationNav = document.querySelector('.pewter-city');
     locationNav.addEventListener('click', pewterCityRender)
 })
document.addEventListener("DOMContentLoaded", () =>{
     const locationNav = document.querySelector('.cerulean-city');
     locationNav.addEventListener('click', ceruleanCityRender)
 })



