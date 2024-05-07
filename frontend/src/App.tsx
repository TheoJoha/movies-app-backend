import './App.css';
import { FormEvent, useEffect, useRef, useState } from 'react'
import * as api from './api'
import { Movie } from './types';
import { MovieCard } from './components/MovieCard';
import MovieModal from './components/MovieModal';

type Tabs = "search" | "favourites";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("dramas");
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined)
  const [selectedTab, setSelectedTab] = useState<Tabs>();
  const [favouriteMovies, setFavouriteMovies] = useState<Movie[]>([])
  const pageNumber = useRef(1);

  useEffect(() => {
    const fetchFavouriteMovies = async () => {
      try {
        const favouriteMovies = await api.getFavouriteMovies();
        setFavouriteMovies(favouriteMovies)
      } catch (error) {
        console.log(error)
      }
  }

    fetchFavouriteMovies();

  }, [])

  const handleSearchSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const movies = await api.searchMovies(searchTerm, 1)
      setMovies(movies.Search)
      pageNumber.current = 1
    } catch (e) {
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
      <div className="tabs">
        <h1 onClick={() => setSelectedTab("search")}>Movie Search</h1>
        <h1 onClick={() => setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {selectedTab === "search" && (<>
        <form onSubmit={(e) => handleSearchSubmit(e)}>
          <input type="text"
            placeholder="Enter a search term ..." required
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button type="submit">Submit</button>
        </form>

        {movies.map((movie) => (
          <MovieCard movie={movie} onClick={() => setSelectedMovie(movie)} />
        ))}
        <button className="view-more-button"
          onClick={handleViewMoreClick}
        >View More</button>
      </>)}

      {selectedTab === "favourites" && <div>
          {favouriteMovies.map((movie)=><MovieCard movie={movie} onClick={()=> setSelectedMovie(movie)} />)} 
        </div>
      }


      {selectedMovie ? <MovieModal movieId={selectedMovie.imdbID.toString()} onClose={() => setSelectedMovie(undefined)} /> : null}
    </div>
  )
}

export default App