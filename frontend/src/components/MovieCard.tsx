import { Movie } from "../types"
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
    movie: Movie
    onClick: ()=>void;
}

export const MovieCard = ({movie, onClick}: Props) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img alt="pic" src={movie.Poster}></img>
            <div className="movie-card-title">
                <span><AiOutlineHeart /></span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}