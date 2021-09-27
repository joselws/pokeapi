import React from 'react';
import { useState, useEffect } from 'react';

const Card = ({url}) => {
    // State and useEffect
    const [pokemon, setPokemon] = useState({});

    // Get each pokemon data on load
    useEffect(() => {
        fetchPokemon();
    }, [])

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

    // Render each pokemon card data
    return (
        <div>
            {Object.keys(pokemon).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h3>No. {pokemon.id} - {capitalize(pokemon.name)}</h3>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
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