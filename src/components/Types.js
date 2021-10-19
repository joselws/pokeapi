import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
        console.log(data);
    }

    return (
        <>
            {Object.keys(type).length === 0 ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>Type: { type.name }</h2>

                    <h3>Is super effective against: </h3>
                        { type.damage_relations.double_damage_to.length === 0 ? 'None' 
                            : type.damage_relations.double_damage_to.map(opponentType => {
                                return (
                                    <>
                                        {opponentType.name} {' '}
                                    </>
                                )
                            })
                        }

                    <h3>Receive super effective hits from: </h3> 
                        { type.damage_relations.double_damage_from.length === 0 ? 'None' 
                            : type.damage_relations.double_damage_from.map(opponentType => {
                                return (
                                    <>
                                        {opponentType.name} {' '}
                                    </>
                                )
                            }) 
                        }

                    <h3>Do half damage against: </h3>
                        { type.damage_relations.half_damage_to.length === 0 ? 'None' 
                            : type.damage_relations.half_damage_to.map(opponentType => {
                                return (
                                    <>
                                        {opponentType.name} {' '}
                                    </>
                                ) 
                            }) 
                        }

                    <h3>Receives half damage from: </h3>
                        { type.damage_relations.half_damage_from.length === 0 ? 'None' 
                            : type.damage_relations.half_damage_from.map(opponentType => {
                                return (
                                    <>
                                        {opponentType.name} {' '}
                                    </>
                                )
                            }) 
                        }

                    <h3>Do no damage to: </h3>
                        { type.damage_relations.no_damage_to.length === 0 ? 'None' 
                            : type.damage_relations.no_damage_to.map(opponentType => {
                                return (
                                    <>
                                        {opponentType.name} {' '}
                                    </>
                                )
                            }) 
                        }

                    <h3>Receives no damage from: </h3>
                        { type.damage_relations.no_damage_from.length === 0 ? 'None' 
                            : type.damage_relations.no_damage_from.map(opponentType => {
                                return (
                                    <>
                                        {opponentType.name} {' '}
                                    </>
                                )
                            }) 
                        }

                </>
            )}
        </>
    );
}

export default Types;