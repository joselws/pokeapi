import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Pokemon = () => {
    // Identifier is the ID or pokemon name used to fetch the pokemon
    const [pokemon, setPokemon] = useState({});

    // Get the parameter in the URL used to fetch the pokemon
    let { id_or_name } = useParams()
    
    useEffect(() => {
        fetchPokemon();
    }, [id_or_name])

    // Get pokemon data and update the state
    const fetchPokemon = async () => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id_or_name}/`);
        const data = await res.json();
        console.log(data);
        setPokemon(data);
    }

    // Capitalize strings
    const capitalize = (string) => {
        const first_letter = string.charAt(0);
        return first_letter.toUpperCase() + string.slice(1);
    }

    
    return (
        <>
            {Object.keys(pokemon).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>No. {pokemon.id} - {capitalize(pokemon.name)}</h2>

                    <img src={pokemon.sprites.front_default} alt={pokemon.name + ' front view'} />
                    <img src={pokemon.sprites.front_shiny} alt={pokemon.name + ' shiny front view'} />
                    <img src={pokemon.sprites.back_default} alt={pokemon.name + ' back view'} />
                    <img src={pokemon.sprites.back_shiny} alt={pokemon.name + ' shiny back view'} />

                    <h3>
                        Types: {" "}
                        {pokemon.types.map(type => {
                            return (
                                <>
                                    {capitalize(type.type.name)} {" "}  
                                </>
                            )
                        })}
                    </h3>
                    
                    <h3>Stats</h3>
                    {pokemon.stats.map(stat => {
                        return (
                            <>
                                <h4>{capitalize(stat.stat.name)} {" - "} {stat.base_stat}</h4>
                                <br />
                            </>
                        )
                    })}
                </>
            )}
        </>
    );
}

export default Pokemon;