const apikey = process.env.API_KEY

export const searchMovies = async (searchTerm: string) => {
    if (!apikey) {
        throw new Error("API Key not found")
    }

    const url = new URL("https://www.omdbapi.com/?")

    const queryParams = {
        apikey,
        s: searchTerm,
        page: "10"
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