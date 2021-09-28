import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  // Get the first 20 pokemons on load
  useEffect(() => {
    fetchPokemons();
  }, [])

  // Loads the first 20 pokemon
  const fetchPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon/');
    const data = await res.json();
    console.log(data);
    console.log(data.results);
    setPokemons(data.results);
    setNext(data.next);
    setPrevious(data.previous);
  }

  // Loads the next 20 pokemons and updates the next and prev state
  const handleNext = async () => {
    const res = await fetch(next);
    const data = await res.json();
    console.log(data);
    setPokemons(data.results);
    setNext(data.next);
    setPrevious(data.previous);
  }

  // Loads the previous 20 pokemons and updates the next and prev state
  const handlePrevious = async () => {
    const res = await fetch(previous);
    const data = await res.json();
    console.log(data);
    setPokemons(data.results);
    setNext(data.next);
    setPrevious(data.previous);
  }

  return (
    <div className="App">
      <h1>Pokemon names</h1>
        {pokemons.map(pokemon => {
          return(
              <Card url={pokemon.url} />
          )
        })}
      {previous && <button onClick={handlePrevious}>Previous</button>}
      {next && <button onClick={handleNext}>Next</button>}
    </div>
  );
}

export default App;
