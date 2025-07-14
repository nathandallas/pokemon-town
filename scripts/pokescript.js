// Map configuration
const locations = {
  "pallet-town": {
    image: "../assets/images/PalletTownCrop-icon.png",
    title: "PALLET TOWN",
    pokemonIndex: [0, 3, 6, 12, 19, 21],
  },
  "viridian-city": {
    image: "../assets/images/ViridianCityCrop-icon.png",
    title: "VIRIDIAN CITY",
    pokemonIndex: [13, 15, 9, 10, 14, 11],
  },
  "cerulean-city": {
    image: "../assets/images/CeruleanCityCrop-icon.png",
    title: "CERULEAN CITY",
    pokemonIndex: [128, 97, 119, 115, 53, 78],
  },
  "pewter-city": {
    image: "../assets/images/PewterCityCrop-icon.png",
    title: "PEWTER CITY",
    pokemonIndex: [34, 50, 28, 31, 43, 77],
  },
};

// Main render function
function renderLocation(locationId) {
  const location = locations[locationId];
  if (!location) return;

  document.querySelector(".map-crop").src = location.image;
  document.querySelector(".title-text").innerText = location.title;
  document.querySelector("#pokemon-container").innerText = "";

  fetchLocationPokemon(location.pokemonIndex);
}

// Fetch pokemon for a location
function fetchLocationPokemon(index) {
  fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
    .then(response => response.json())
    .then(allpokemon => {
      const pokemonList = index.map(index => allpokemon.results[index]);
      pokemonList.forEach(pokemon => fetchPokemonData(pokemon));
    });
}

// Fetch and render individual pokemon data
function fetchPokemonData(pokemon) {
  fetch(pokemon.url)
    .then(response => response.json())
    .then(renderPokemon);
}

// Render pokemon card
function renderPokemon(pokemonData) {
  const container = document.getElementById("pokemon-container");
  const card = document.createElement("div");
  card.classList.add("ui", "card");

  createpokemonImage(pokemonData.id, card);

  const pokemonName = document.createElement("h4");
  pokemonName.classList.add("card__name");
  pokemonName.textContent = pokemonData.name;

  const pokemonID = document.createElement("p");
  pokemonID.classList.add("card__id");
  pokemonID.textContent = pokemonData.id;

  const pokemonTypes = document.createElement("ul");
  pokemonTypes.classList.add("card__type");
  createTypes(pokemonData.types, pokemonTypes);

  card.append(pokemonName, pokemonID, pokemonTypes);
  container.appendChild(card);
}

// Helper functions
function createTypes(types, ul) {
  types.forEach(type => {
    const typeList = document.createElement("li");
    typeList.classList.add("card__li");
    typeList.textContent = type.type.name;
    ul.append(typeList);
  });
}

function createpokemonImage(pokemonID, containerDiv) {
  const imgContainer = document.createElement("div");
  const img = document.createElement("img");
  img.classList.add("card__image");
  img.srcset = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonID}.png`;

  imgContainer.append(img);
  containerDiv.append(imgContainer);
}

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Get all buttons with class 'location-button'
  const locationButtons = document.querySelectorAll(".location-button");

  // Add click event to each button
  locationButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Get the location class (last class in the list)
      const locationClass = button.classList[button.classList.length - 1];
      renderLocation(locationClass);
    });
  });
});
