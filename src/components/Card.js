import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Card = ({url}) => {
    // State and useEffect
    const [pokemon, setPokemon] = useState({});

    // Get each pokemon data on load
    useEffect(() => {
        fetchPokemon();
    }, [url])
    
    // Fetch function api
    const fetchPokemon = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setPokemon(data);
        console.log(data);
    }

    // Capitalize strings
    const capitalize = (string) => {
        const first_letter = string.charAt(0);
        return first_letter.toUpperCase() + string.slice(1);
    }

    // Render each pokemon card when their data has been fetched
    return (
        <div>
            {Object.keys(pokemon).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Link className="links" to={`/pokemons/${pokemon.name}`}>
                        <h3>No. {pokemon.id} - {capitalize(pokemon.name)}</h3>
                    </Link>

                    <Link className="links" to={`/pokemons/${pokemon.name}`}>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    </Link>
                    <h5>
                        Types: {" "}
                        {pokemon.types.map(type => {
                            return (
                                <>
                                    {capitalize(type.type.name)} {" "}  
                                </>
                            )
                        })}
                    </h5>
                    <hr />
                </>
            )}
        </div>
    )
}

export default Card;