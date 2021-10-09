import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import Pokemon from './components/Pokemon';
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [next, setNext] = useState('');
  const [previous, setPrevious] = useState('');
  const [search, setSearch] = useState('');
  const [redirect, setRedirect] = useState(null);

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

  // Populates the search state with the value of the search bar
  const handleChange = e => {
    let value = e.target.value;
    setSearch(value.toLowerCase());
  }

  // attempts to search for the given pokemon
  const handleSubmit = e => {
    e.preventDefault();

    // pokeapi only accepts the lowercased pokemon name
    let lowerSearch = search.toLowerCase();
    setSearch(lowerSearch);

    // redirect the user to the searched pokemon page
    setRedirect(`/pokemons/${search}`);

    // clear the search bar
    setSearch('');
    console.log(search);
  }


  // Render the 20 Pokemon cards with the next and prev buttons
  return (
    <div className="App">
      <Router>
        <div className="container">
          <h1>Pokemon names</h1>

          <form onSubmit={handleSubmit}>
            <input type="text" name="search" placeholder="Search for pokemon name or number" onChange={handleChange} value={search} />
            <input type="submit" value="Search" />
          </form>

          <Link to='/pokemons'>Pokemon list</Link>

          { redirect && <Redirect to={redirect} /> }

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
    </div>
  );
}

export default App;
