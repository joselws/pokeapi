import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';
import Pokemon from './components/Pokemon';
import Types from './components/Types';
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
        <div className="body">
          <h1 className="title">Pokedex</h1>

          <form onSubmit={handleSubmit}>
            <div class="row search-form">
              <label htmlFor="search" className="col-form-label col-3">Search for your Pokemon:</label>
              
              <div className="col-7">
                <input type="text" 
                  name="search" 
                  placeholder="Search by pokemon name or number" 
                  onChange={handleChange} 
                  value={search} 
                  className='form-control'
                  id="search"
                />
              </div>

              <div className="col-2">
                <input type="submit" value="Search" className="btn btn-danger" />
              </div>

            </div>
          </form>

          <Link className="links" to='/pokemons'>Pokemon list</Link>

          { redirect && <Redirect to={redirect} /> }

          <Switch>
            <Route path='/' exact>
              <Redirect to='/pokemons' />
            </Route>
            
            <Route path='/pokemons' exact>
              {pokemons.map(pokemon => {
                return(
                    <Card url={pokemon.url} />
                )
              })}
              {previous && <button className="btn btn-danger me-4" onClick={() => fetchPokemons(previous)}>Previous</button>}
              {next && <button className="btn btn-danger me-4" onClick={() => fetchPokemons(next)}>Next</button>}
            </Route>

            <Route path='/pokemons/:id_or_name' component={Pokemon} />
            <Route path='/types/:id_or_name' component={Types} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
