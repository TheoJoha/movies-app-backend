// import { Movie } from "./types";
export const searchMovies = async (searchTerm: string, page: number) => {
  const baseUrl = new URL("http://localhost:3000/api/movies/search");
  baseUrl.searchParams.append("searchTerm", searchTerm)
  baseUrl.searchParams.append("page", String(page));

  const response = await fetch(baseUrl)
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
  }

  return response.json()

}

export const getMovieSummary = async (movieId: string) => {
    const url = new URL(`http://localhost:3000/api/movies/${movieId}/summary`);
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  };

  export const getFavouriteMovies = async () => {
    const url = new URL("http://localhost:3000/api/movies/favourite");
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  };



