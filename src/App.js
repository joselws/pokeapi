import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState('');
  const [prev, setPrev] = useState('');

  useEffect(() => {
    fetchPokemons();
  }, [])

  const fetchPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await res.json();
    console.log(data);
    console.log(data.results);
    setPokemons(data.results);
  }



  return (
    <div className="App">
      <h1>Pokemon names</h1>
        {pokemons.map(pokemon => {
          return(
              <Card url={pokemon.url} />
          )
        })}
    </div>
  );
}

export default App;
