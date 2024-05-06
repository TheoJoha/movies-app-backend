import { Movie } from "../types"

interface Props {
    movie: Movie
}

const MovieCard = ({movie}: Props) => {
    return (
        <div className="movie-card">
            <img alt="pic" src={movie.Poster}></img>
            <div className="movie-card-title">
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}