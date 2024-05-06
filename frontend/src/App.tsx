import './App.css';
import {FormEvent, useRef, useState} from 'react'
import * as api from '../api'
import { Movie } from './types';
import { MovieCard } from './components/MovieCard';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("dramas");
  const [movies, setMovies] = useState<Movie[]>([])
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const movies = await api.searchMovies(searchTerm, 1)
      setMovies(movies.Search)
    } catch(e) {
      console.log(e)
    }
  }

  const handleViewMoreClick = await () => {
    const nextPage = pageNumber.current + 1
    try {
      const nextMovies = await api.searchMovies(searchTerm, nextPage)
      setMovies([...movies, nextMovies.Search])
      pageNumber.current = nextPage
    } catch (e) {
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
        <MovieCard movie={movie} />
      ))}
      <button className="view-more-button"
      onClick={handleView}
      >View More</button>
    </div>
  )
}

export default App