document.getElementById('pokemonForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();
    const pokemonInfo = document.getElementById('pokemonInfo');

    if (pokemonName === '') {
        pokemonInfo.insertAdjacentHTML('beforeend', '<p>Ingresa un nombre o ID de Pokemon válido.</p>');
        return;
    }

    // llama a la API de Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No encontrado');
            }
            return response.json();
        })
        .then(pokemon => {
            const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ');
            const pokemonHtml = `
                <div class="pokemon-card">
                    <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                    <p><strong>ID:</strong> ${pokemon.id}</p>
                    <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                    <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                    <p><strong>Habilidades: </strong>${abilities}</p>
                </div>
            `;
            pokemonInfo.insertAdjacentHTML('beforeend', pokemonHtml);
        })
        .catch(error => {
            pokemonInfo.insertAdjacentHTML('beforeend', '<p>Pokémon no encontrado, intenta con otro nombre o ID.</p>');
            console.error(error);  
        });
});
