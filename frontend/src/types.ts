export interface Movie {
    Title: string;
    Year: number;
    Poster: string;
    PosterType: string;
    Genre: string;
    Director: string;
    Actors: string;
    Plot: string;
    Country: string;
    Awards: string;
    imdbRating: number;
    imdbID: number;
}

export interface MovieSummary {
    id: number;
    title: string;
    summary: string;
}