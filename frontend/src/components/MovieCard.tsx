import { Movie } from "../types"
import { AiOutlineHeart } from "react-icons/ai";

interface Props {
    movie: Movie;
    isFavourite: boolean;
    onClick: ()=>void;
    onFavouriteButtonClick: (movie: Movie) => void;
}

export const MovieCard = ({movie, 
    onClick, 
    onFavouriteButtonClick,
    isFavourite
}: Props) => {
    return (
        <div className="movie-card" onClick={onClick}>
            <img alt="pic" src={movie.Poster}></img>
            <div className="movie-card-title">
                <span
                onClick={(e)=>{
                    e.stopPropagation()
                    onFavouriteButtonClick(movie)
                }}>
                {isFavourite ? (
                    <AiOutlineHeart size={20} color="red" />
                ) : (
                    <AiOutlineHeart size={20} />
                )}
                
                </span>
                <h3>{movie.Title}</h3>
            </div>
        </div>
    )
}