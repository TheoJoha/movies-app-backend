import { useEffect, useState } from "react"
import { MovieSummary } from "../types"
import * as MovieAPI from '../api'

interface Props {
    movieId: string;
    onClose: ()=> void;
}

const MovieModal = ({movieId, onClose}: Props) => {

    const [movieSummary, setMovieSummary] = useState<MovieSummary>()

    useEffect(() => {
        const fetchMovieSummary = async () => {
            try {
                const summaryMovie = await MovieAPI.
                getMovieSummary(movieId)
                setMovieSummary(summaryMovie)
            } catch (error) {
                console.log(error)
            }
        }

        fetchMovieSummary()
    })

    if (!movieSummary) {
        return <></>
    }

    return (
        <>
            <div className="overlay"></div>
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2>{movieSummary.title}</h2>
                        <span className="close-btn" onClick={onClose}>
                            &times;
                        </span>
                    </div>
                    <p dangerouslySetInnerHTML={{__html: movieSummary.summary}}></p>
                </div>
            </div>
        </>
    )
}

export default MovieModal