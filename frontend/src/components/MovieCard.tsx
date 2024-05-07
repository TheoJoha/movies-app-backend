import { Movie } from "../types"

interface Props {
    movie: Movie
    onClick: ()=>void;
}

export const MovieCard = ({movie, onClick}: Props) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img alt="pic" src={movie.Poster}></img>
            <div className="movie-card-title">
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}