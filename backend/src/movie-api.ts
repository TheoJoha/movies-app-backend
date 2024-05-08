import { URLSearchParams } from "url"

const apikey = process.env.API_KEY

export const searchMovies = async (searchTerm: string, page: number) => {
    if (!apikey) {
        throw new Error("API Key not found")
    }

    const url = new URL("https://www.omdbapi.com/?")

    const queryParams = {
        apikey,
        s: searchTerm,
        page: "10",
        offset: (page * 10).toString(),
    }
    url.search = new URLSearchParams(queryParams).toString()

    try {
        const searchResonse = await fetch(url)
        const resultsJson = await searchResonse.json()
        return resultsJson
    } catch (error) {
        console.log(error)
    }
}

export const getMovieSummary = async (movieId: string) => {
    if (!apikey) {
        throw new Error("API kei not found!")
    }
    const url = new URL("https://www.omdbapi.com/?");
    const params = {
        apikey: apikey,
        i: movieId,
    }
    url.search = new URLSearchParams(params).toString()

    const response = await fetch(url);
    const json = await response.json()

    return json;
}

export const getFavouriteMoviesByIds = async (ids: string[]) => {
    if (!apikey) {
        throw new Error("API kei not found!")
    }

    let searchResponse = {}
        
    Promise.all(ids.map((imdbID) => {
        const params = {
            apikey: apikey,
            i: imdbID
        }
        const url = new URL("https://www.omdbapi.com/?");
        url.search = new URLSearchParams(params).toString()
        searchResponse = fetch(url)
})).then((values) => {/* DO STUFF */
    console.log(values)
    // const json = searchResponse.json()
    return {};

});
    return {}
    
} 