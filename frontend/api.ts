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