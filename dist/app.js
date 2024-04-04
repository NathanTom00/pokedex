
const cardPokemonContainer = document.querySelector('.card-pokemon-container');
const search = document.querySelector('#search-pokemon');
fetch("../pokedex.json")
 .then(
    response => response.json()) //dopo il fetch converto da json a oggetto js
 .then(
    pokemons => {
        
        //In questo esercizio è stato usato il getElementBy, ma possiamo usare anche innerHTML per avere un qualcosa di più facile e intuitivo
        //prima generazione => da 0 a 150

        //slice permette di prendere un sotto array di un array esistente, ATTENZIONE l'ultimo non è incluso (quindi prende da 0 a 150)
        let pokemonsPrimaGen = pokemons.slice(0,151);

        //per ogni pokemon della prima generazione creo una card con dentro l'id, nome e immagine.
        for(let pokemon of pokemonsPrimaGen){
            cardPokemonContainer.appendChild(creaCard(pokemon))
        }

        search.addEventListener('input',
            event => {
                const value = event.target.value
                cardPokemonContainer.innerHTML = ''
                if(value === ''){
                    for(let pokemon of pokemonsPrimaGen){
                        cardPokemonContainer.appendChild(creaCard(pokemon))
                    }
                }
                
                //ho due casi di filtro.

                let pokemonFiltrati;
                let filtro;
                if(value.includes("type:")){
                    //caso: type:
                    let tipoDaCercare = value.split(":")[1]
                    filtro = RegExp('^'+tipoDaCercare, "i")
                    pokemonFiltrati = pokemonsPrimaGen.filter(pokemon => {
                        for(let type of pokemon.type){
                            if(filtro.test(type))
                                return true
                        }
                        return false
                    } )
                    
                }else{
                    //caso: cerco il nome di un pokemon
                    filtro = new RegExp('^'+value,"i") //con ^ indico che la stringa da verificare deve iniziare per value
                    pokemonFiltrati = pokemonsPrimaGen.filter(pokemon => filtro.test(pokemon.name.english) )
                }
               
                

                

                for(let pokemon of pokemonFiltrati){
                    cardPokemonContainer.appendChild(creaCard(pokemon))
                }
            }
        )
    }
)

function idToString(idPokemon){
    return idPokemon.toString().padStart(3,'0')
}

function creaCard(pokemon){
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
        pType.textContent = type.toUpperCase()
        pType.classList.add(type.toLowerCase())
        divTypes.appendChild(pType)
    }

    card.appendChild(idPokemon)
    card.appendChild(namePokemon)
    card.appendChild(imgPokemon)
    card.appendChild(divTypes)

    return card
}