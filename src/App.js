import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import Pokemon from './components/Pokemon';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');

  // Get the first 20 pokemons by default on load
  useEffect(() => {
    fetchPokemons();
  }, [])

  // Loads the respective 20 pokemons on load, next or previous actions
  const fetchPokemons = async (url = 'https://pokeapi.co/api/v2/pokemon/') => {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(data.results);
    setPokemons(data.results);
    setNext(data.next);
    setPrevious(data.previous);
  }

  // Render the 20 Pokemon cards with the next and prev buttons
  return (
    <Router>
      <div className="App">
        <h1>Pokemon names</h1>
        <Switch>
          <Route path='/pokemons' exact>
            {pokemons.map(pokemon => {
              return(
                  <Card url={pokemon.url} />
              )
            })}
            {previous && <button onClick={() => fetchPokemons(previous)}>Previous</button>}
            {next && <button onClick={() => fetchPokemons(next)}>Next</button>}
          </Route>

          <Route path='/pokemons/:id_or_name' component={Pokemon} />
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
