document.getElementById('pokemonForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const pokemonName = document.getElementById('pokemonName').value.toLowerCase().trim();
    const pokemonInfo = document.getElementById('pokemonInfo');

    pokemonInfo.innerHTML = '';

    if (pokemonName === '') {
        pokemonInfo.innerHTML = '<p>Ingresa un nombre o ID de Pokemon valido.</p>';
        return;
    }

    // llama a pokeapi
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => {
            // si la respuesta no es valida lanza error
            if (!response.ok) {
                throw new Error('No encontrado');
            }
            return response.json();
        })
        .then(pokemon => {
            //guarda la informacion en el div de html
            const abilities = pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', '); //guarda el nombre de las habilidades
            const pokemonHtml = `
                <h2>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
                <p><strong>ID:</strong> ${pokemon.id}</p>
                <p><strong>Altura:</strong> ${pokemon.height / 10} m</p>
                <p><strong>Peso:</strong> ${pokemon.weight / 10} kg</p>
                <p><strong>Habilidad: </strong>${abilities}</p>
            `;
            // muestra la informacion guardada
            pokemonInfo.innerHTML= pokemonHtml;
        })
        .catch(error => {
            // muestra mensaje de error si encuenatra al pokemon
            pokemonInfo.innerHTML = '<p>Pokemon no encontrado, intenta con otro nombre o ID.</p>';
            console.error(error);  
        });
});
