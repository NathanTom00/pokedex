
const cardPokemonContainer = document.querySelector('.card-pokemon-container');
fetch("../pokedex.json")
 .then(
    response => response.json()) //dopo il fetch converto da json a oggetto js
 .then(
    pokemons => {
        //prima generazione => da 0 a 150

        //slice permette di prendere un sotto array di un array esistente, ATTENZIONE l'ultimo non è incluso (quindi prende da 0 a 150)
        let pokemonsPrimaGen = pokemons.slice(0,151);

        //per ogni pokemon della prima generazione creo una card con dentro l'id, nome e immagine.
        for(let pokemon of pokemonsPrimaGen){
            let card = document.createElement('div')
            card.classList.add('pokemon-card')

            let idPokemon = document.createElement('p')
            idPokemon.classList.add('pokemon-id')
            idPokemon.textContent = '#'+pokemon.id

            let namePokemon = document.createElement('p')
            namePokemon.classList.add('pokemon-name')
            namePokemon.textContent = pokemon.name.english

            let imgPokemon = document.createElement('img')
            imgPokemon.classList.add('img-pokemon')
            imgPokemon.src = '../images/' + idToString(pokemon.id) + '.png' //l'id è un numero che convertito in stringa mostra il numero NON in formato ###, per questo usiamo idToString

            //creo il div per i tipi
            let divTypes = document.createElement('div')
            divTypes.classList.add('type-pokemon')
            for(let type of pokemon.type){
                let pType = document.createElement('p')
                pType.textContent = type
                divTypes.appendChild(pType)
            }

            card.appendChild(idPokemon)
            card.appendChild(namePokemon)
            card.appendChild(imgPokemon)
            card.appendChild(divTypes)

            cardPokemonContainer.appendChild(card)

            //alternativa innerHTML.
        }

    }
)

function idToString(idPokemon){
    return idPokemon.toString().padStart(3,'0')
}