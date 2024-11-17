/**
 * The routes.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import express from 'express'
import { router as pokemonRouter } from './pokemon-router.js'

export const router = express.Router()

router.get('/', (req, res) => res.json({
  message: 'Welcome to pokedata API v1! ',
  endpoints: [
    { path: '/pokemon', method: 'GET', description: 'Get all pokemon data' },
    { path: '/pokemon/sort/total', method: 'GET', description: 'Get all pokemon data sorted by total' },
    { path: '/pokemon/clusters', method: 'GET', description: 'Get pokemon divided in to clusters' },
    { path: '/pokemon/:number', method: 'GET', description: 'Get a specific pokemon by its pokedex number' },
    { path: '/pokemon/clusters/average', method: 'GET', description: 'Get the centroids of the clusters' },
    { path: '/pokemon/types/:type', method: 'GET', description: 'Get all pokemon and their statistics average of a specific type' }
  ]
}))

router.use('/pokemon', pokemonRouter)
