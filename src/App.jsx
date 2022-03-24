import { useState, useEffect } from 'react';
import './App.css';
import SearchIcon from './search.svg';  
import MovieCard from './MovieCard';
// 1c6e7212

const API_URL = 'http://www.omdbapi.com?apikey=1c6e7212';
const movie1 = {
  "Title": "Amazing Spiderman Syndrome",
  "Year": "2012",
  "imdbID": "tt2586634",
  "Type": "movie",
  "Poster": "N/A"
}

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovies(data.Search);
  }

  useEffect(() => {
    searchMovies('Spiderman')
  }, [])

  return (
    <div className="app">
      <h1>Movie Land</h1>
      <div className='search'>
        <input 
          placeholder='Search For Movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img 
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {
        movies?.length > 0 ?
        (
          <div className='container'>
            {
              movies.map((movie, index) => (
                  <MovieCard movie={movie} key={index} />
              ))
            }
          </div>
        ) : (
          <div className='empty'>
            <h2>No movies found</h2>
          </div>
        )
      }
    </div>
  );
}

export default App;
