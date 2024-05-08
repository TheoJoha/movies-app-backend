import './App.css';
import { FormEvent, useEffect, useRef, useState } from 'react'
import * as api from './api'
import { Movie } from './types';
import { MovieCard } from './components/MovieCard';
import MovieModal from './components/MovieModal';
import { AiOutlineSearch } from 'react-icons/ai';

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
        console.log(favouriteMovies)
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

  const addFavouriteMovie = async (movie: Movie) => {
    try {
      await api.addFavouriteMovie(movie)
      setFavouriteMovies([...favouriteMovies, movie])
    } catch (error) {
      console.log(error)
    }
  }

  const removeFavouriteMovie = async (movie: Movie) => {
    try {
      await api.removeFavouriteMovie(movie);
      const updatedMovies = favouriteMovies.filter(
        (favMovie) => movie.imdbID != favMovie.imdbID
      );
      setFavouriteMovies(updatedMovies)
    } catch (error) {
      console.log(error)
    }
  }



  return (
    <div className="app-container">
      <div className="header">
        <img alt="cinema-pic" src="/hero-image.jpg"></img>
        <div className="title"></div>
      </div>
      <div className="tabs">
        <h1 
        className={selectedTab === "search" ? "tab-active" : ""}
        onClick={() => setSelectedTab("search")}>Movie Search</h1>
        <h1 
        className={selectedTab === "search" ? "tab-active" : ""}
        onClick={() => setSelectedTab("favourites")}>Favourites</h1>
      </div>
      {selectedTab === "search" && (<>
        <form onSubmit={(e) => handleSearchSubmit(e)}>
          <input type="text"
            placeholder="Enter a search term ..." required
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          ></input>
          <button type="submit">
            <AiOutlineSearch size={35} />
          </button>
        </form>


        <div className="movie-grid">
          {movies && favouriteMovies && movies.map((movie) => {
            const isFavourite = favouriteMovies.some(
              (favMovie) => movie.imdbID === favMovie.imdbID
            );

            return (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onClick={() => setSelectedMovie(movie)}
                onFavouriteButtonClick={isFavourite ? removeFavouriteMovie : addFavouriteMovie
                }
                isFavourite={isFavourite}
              />
            )

          })};
        </div>

        <button className="view-more-button"
          onClick={handleViewMoreClick}
        >
          View More
        </button>
      </>)}

      {selectedTab === "favourites" && (
        <div className="movie-grid">
          {favouriteMovies && favouriteMovies.map((movie) => <MovieCard
            key={movie.imdbID}
            movie={movie}
            onClick={() => setSelectedMovie(movie)}
            onFavouriteButtonClick={() => undefined}
            isFavourite={true}
          />)}
        </div>
      )}


      {selectedMovie ? <MovieModal movieId={selectedMovie.imdbID.toString()} onClose={() => setSelectedMovie(undefined)} /> : null}
    </div>
  )
}

export default App