import express from 'express'
require('dotenv').config()
import cors from 'cors'
import * as MovieAPI from './movie-api'

const app = express()

app.use(express.json())
app.use(cors())

app.get("/api/movies/search", async (req, res) => {
    // GET http://localhost/api/movies/search?searchTerm=Avatar
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await MovieAPI.searchMovies(searchTerm, page)

    return res.json(results)
})

app.listen(3000, () => {
    console.log("server running on localhost:3000")
})