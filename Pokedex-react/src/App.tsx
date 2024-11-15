import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios';

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprites: {
    front_default: string;
  };
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  abilities: {
    ability: {
      name: string;
    };
  }[];
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerms, setSearchTerms] = useState('');

  const fetchPokemons = async () => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=40`);
      const results = response.data.results;
      
      const pokemonData = await Promise.all(
        results.map(async (pokemon: { url: string }) => {
          const detailResponse = await axios.get(pokemon.url);
          return detailResponse.data;
        })
      );
      console.log(pokemonData);
      setPokemons(pokemonData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pokemon:', error);
    }
    
  }
  const filteredPokemon = () => {
    return pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchTerms.toLowerCase())
    );
  };
  useEffect(() => {
    fetchPokemons();
  }, []);



  return (
<div className="App">
  <div className="title-section mb-4">
    <div className="container">
      <div className="row">
        <div className="col-12 text-center">
          <h1 className="main-title">Pokédex</h1>
          <p className="subtitle">Search for Pokémon by name or using the National Pokédex number</p>
        </div>
      </div>
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search Pokémon..."
            value={searchTerms}
            onChange={(e) => setSearchTerms(e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>

  <div className="container-fluid px-4">
    {loading ? (
      <p className="text-center">Loading...</p>
    ) : (
      <div className="row g-4 justify-content-center">
        {filteredPokemon().map((pokemon) => (
          <div className="col-auto" key={pokemon.id}>
            <div className="card h-100 shadow-sm hover-card" style={{ width: '250px' }}>
              <div className="card-body">
                <h5 className="card-title text-center text-capitalize mb-2">
                  {pokemon.name}
                </h5>
                <div className="d-flex justify-content-center gap-2">
                  {pokemon.types.map((type) => (
                    <span 
                      key={type.type.name}
                      className={`badge rounded-pill bg-${type.type.name}`}
                    >
                      {type.type.name}
                    </span>
                  ))}
                </div>
              </div>
              <img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                className="card-img-bottom p-1"
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>
  )
}

export default App