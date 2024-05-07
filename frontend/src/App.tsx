import './App.css';
import {FormEvent, useRef, useState} from 'react'
import * as api from '../api'
import { Movie } from './types';
import { MovieCard } from './components/MovieCard';
import MovieModal from './components/MovieModal';

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("dramas");
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined)
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const movies = await api.searchMovies(searchTerm, 1)
      setMovies(movies.Search)
      pageNumber.current = 1
    } catch(e) {
      console.log(e)
    }
  }

  const handleViewMoreClick = async () => {
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
        <MovieCard movie={movie} onClick={()=> setSelectedMovie(movie)}/>
      ))}
      <button className="view-more-button"
      onClick={handleViewMoreClick}
      >View More</button>

      {selectedMovie ? <MovieModal movieId={selectedMovie.imdbID.toString()} onClose={()=> setSelectedMovie(undefined)}/> : null}
    </div>
  )
}

export default App