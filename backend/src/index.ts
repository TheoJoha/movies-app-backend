import express from 'express'
require('dotenv').config()
import cors from 'cors'
import * as MovieAPI from './movie-api'
import {PrismaClient} from '@prisma/client';


const app = express()
const prismaClient = new PrismaClient();
app.use(express.json())
app.use(cors())

app.get("/api/movies/search", async (req, res) => {
    // GET http://localhost/api/movies/search?searchTerm=Avatar
    const searchTerm = req.query.searchTerm as string;
    const page = parseInt(req.query.page as string);
    const results = await MovieAPI.searchMovies(searchTerm, page)

    return res.json(results)
})

app.get("/api/movies/:movieId/summary", async (req, res) => {
   const imdbID = req.params.movieId;
   const results = await MovieAPI.getMovieSummary(imdbID)
   console.log(results)
   return res.json(results)
})

app.post("/api/movies/favourite", async (req, res) => {
    const movieId = req.body.imdbID; // or movieId?

    try {
        const favouriteMovie = await prismaClient.favouriteMovies.create({
            data: {
                movieId: movieId,
            },
        })
        return res.status(201).json()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Oops, something went wrong!"})
    }
})

app.get("/api/movies/favourite", async (req, res) => {
    try {
        const movies = await prismaClient.favouriteMovies.findMany();
        const movieIds = movies.map((movie) => {
            return movie.movieId.toString()
        })

        const favourites = await MovieAPI.getFavouriteMoviesByIds(movieIds)

        return res.json(favourites)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/api/movies/favourite", async (req, res) => {
    const movieId = req.body.movieId;

    try {
        await prismaClient.favouriteMovies.delete({
            where: {
                movieId: movieId,
            },
        })
        return res.status(204).send()
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Oops, something went wrong!"})
    }
})

app.listen(3000, () => {
    console.log("server running on localhost:3000")
})