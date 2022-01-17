import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const Types = () => {
    const [type, setType] = useState({});

    let { id_or_name } = useParams();

    useEffect(() => {
        fetchTypes();
    }, [id_or_name])

    const fetchTypes = async () => {
        const response = await fetch(`https://pokeapi.co/api/v2/type/${id_or_name}/`);
        const data = await response.json();
        setType(data);
    }

    // Capitalize strings
    const capitalize = (string) => {
        const first_letter = string.charAt(0);
        return first_letter.toUpperCase() + string.slice(1);
    }

    return (
        <>
            {Object.keys(type).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>Type: { capitalize(type.name) }</h2>

                    <p className="type">
                        Is super effective against: {' '}
                        { type.damage_relations.double_damage_to.length === 0 ? 'None' 
                            : type.damage_relations.double_damage_to.map(opponentType => {
                                return (
                                    <Link className="links" to={`/types/${opponentType.name}`}>
                                        {capitalize(opponentType.name)} {' '}
                                    </Link>
                                )
                            })
                        }
                    </p>

                    <p className="type">
                        Receive super effective hits from: {' '} 
                        { type.damage_relations.double_damage_from.length === 0 ? 'None' 
                            : type.damage_relations.double_damage_from.map(opponentType => {
                                return (
                                    <Link className="links" to={`/types/${opponentType.name}`}>
                                        {capitalize(opponentType.name)} {' '}
                                    </Link>
                                )
                            }) 
                        }
                    </p>

                    <p className="type">
                        Does half damage against: {' '}
                        { type.damage_relations.half_damage_to.length === 0 ? 'None' 
                            : type.damage_relations.half_damage_to.map(opponentType => {
                                return (
                                    <Link className="links" to={`/types/${opponentType.name}`}>
                                        {capitalize(opponentType.name)} {' '}
                                    </Link>
                                ) 
                            }) 
                        }
                    </p>

                    <p className="type">
                        Receives half damage from: {' '}
                        { type.damage_relations.half_damage_from.length === 0 ? 'None' 
                            : type.damage_relations.half_damage_from.map(opponentType => {
                                return (
                                    <Link className="links" to={`/types/${opponentType.name}`}>
                                        {capitalize(opponentType.name)} {' '}
                                    </Link>
                                )
                            }) 
                        }
                    </p>

                    <p className="type">
                        Does no damage to: {' '}
                        { type.damage_relations.no_damage_to.length === 0 ? 'None' 
                            : type.damage_relations.no_damage_to.map(opponentType => {
                                return (
                                    <Link className="links" to={`/types/${opponentType.name}`}>
                                        {capitalize(opponentType.name)} {' '}
                                    </Link>
                                )
                            }) 
                        }
                    </p>

                    <p className="type">
                        Receives no damage from: {' '}
                        { type.damage_relations.no_damage_from.length === 0 ? 'None' 
                            : type.damage_relations.no_damage_from.map(opponentType => {
                                return (
                                    <Link className="links" to={`/types/${opponentType.name}`}>
                                        {capitalize(opponentType.name)} {' '}
                                    </Link>
                                )
                            }) 
                        }
                    </p>

                </>
            )}
        </>
    );
}

export default Types;