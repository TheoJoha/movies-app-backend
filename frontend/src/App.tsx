import './App.css';
import {FormEvent, useState} from 'react'
import * as api from '../api'
import { Movie } from './types';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("dramas");
  const [movies, setMovies] = useState<Movie[]>([])

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const movies = await api.searchMovies(searchTerm, 1)
      setMovies(movies.Search)
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div>
      <form onSubmit={(e)=> handleSearchSubmit(e)}>
        <input type="text" 
        placeholder="Enter a search term ..." required
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      
      {movies.map((movie) => (
        <div>
          Movie image location: {movie.Poster}
          Movie title: {movie.Title}
        </div>
      ))}
    </div>
  )
}

export default App