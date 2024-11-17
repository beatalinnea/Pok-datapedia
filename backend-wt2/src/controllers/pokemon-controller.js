/**
 * Module for Pokemon controller.
 *
 * @author Beata Eriksson
 * @version 1.0.0
 */

import createError from 'http-errors'
import { Pokemon } from '../models/pokemon.js'
import { DataHandler } from '../services/kmeans-service.js'

/**
 * Encapsulates a controller.
 */
export class PokemonController {
  /**
   * Sends a JSON response containing all existing pokemon details.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findAll (req, res, next) {
    try {
      const pokemon = await Pokemon.find()

      if (!pokemon) {
        next(createError(404, 'No pokemon found'))
        return
      }

      res.json({
        msg: 'Pokemon found',
        pokemon
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing all existing pokemon details sorted by total.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async sortAllByTotal (req, res, next) {
    try {
      const pokemon = await Pokemon.find().sort({ total: -1 })

      if (!pokemon) {
        next(createError(404, 'No pokemon found'))
        return
      }

      res.json({
        msg: 'Pokemon found',
        pokemon
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing the details of a specific pokemon.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async findByNumber (req, res, next) {
    try {
      if (!req.params.number || isNaN(req.params.number) || req.params.number < 1) {
        next(createError(400, 'Number must be provided'))
        return
      }

      const number = req.params.number
      const pokemon = await Pokemon.findOne({ number })

      if (!pokemon) {
        next(createError(404, 'No pokemon found'))
        return
      }

      res.json({
        msg: 'Pokemon found',
        pokemon
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing pokemons divided in to clusters using the KMeans algorithm.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   */
  async getClusters (req, res, next) {
    try {
      const pokemon = await Pokemon.find()

      if (!pokemon) {
        next(createError(404, 'No pokemon found'))
        return
      }

      const pokedef = pokemon.map(p => ({
        category: p.category,
        type: p.type1,
        generation: p.generation,
        number: p.number,
        name: p.name,
        stats: [p.hp, p.attack, p.defense, p.specialAttack, p.specialDefense, p.speed],
        total: p.total
      }))

      const dataHandler = new DataHandler()
      const clusters = dataHandler.clusterData(pokedef, 2)

      res.json({
        msg: 'Data clustered successfully',
        clusters: clusters.clusters,
        centroids: clusters.centroids
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing the average total of the clusters.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   */
  async getCentroidsOfClusters (req, res, next) {
    try {
      const pokemon = await Pokemon.find()

      if (!pokemon) {
        next(createError(404, 'No pokemon found'))
        return
      }

      const pokedef = pokemon.map(p => ({
        stats: [p.hp,
          p.attack,
          p.defense,
          p.specialAttack,
          p.specialDefense,
          p.speed]
      }))

      const dataHandler = new DataHandler()
      const centroids = dataHandler.calcCentroidsOfClusters(pokedef, 2)

      res.json({
        msg: 'Centroids of the clusters',
        centroids
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing the pokemon and average stats of a specific type.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   */
  async getPokemonByType (req, res, next) {
    try {
      if (!req.params.type) {
        next(createError(400, 'Type must be provided'))
        return
      }

      let type = req.params.type

      if (type === 'all') {
        this.getAverageTotalOfAllTypes(req, res, next)
        return
      }
      // set first letter in type to upper case
      type = type.charAt(0).toUpperCase() + type.slice(1)

      const pokemon = await Pokemon.find({ type1: type })

      if (!pokemon || pokemon.length === 0) {
        next(createError(400, 'Invalid type provided'))
        return
      }

      const average = new DataHandler().calcAverage(pokemon)

      res.json({
        msg: 'Pokemon by their main type and the types average stats',
        pokemon,
        average
      })
    } catch (error) {
      next(error)
    }
  }

  /**
   * Sends a JSON response containing the total of all types.
   *
   * @param {*} req - Express request object.
   * @param {*} res - Express response object.
   * @param {*} next - Express next middleware function.
   */
  async getAverageTotalOfAllTypes (req, res, next) {
    try {
      const pokemon = await Pokemon.find()

      if (!pokemon) {
        next(createError(404, 'No pokemon found'))
        return
      }

      const types = [...new Set(pokemon.map(p => p.type1))]

      const average = {}
      types.forEach(type => {
        const pokemonsOfType = pokemon.filter(p => p.type1 === type)
        const total = pokemonsOfType.reduce((acc, curr) => acc + curr.total, 0)
        const averageTotal = total / pokemonsOfType.length // Calculate the average
        average[type.toLowerCase()] = averageTotal // Save the average total for the type
      })

      res.json({
        msg: 'Average total of all types',
        average
      })
    } catch (error) {
      next(error)
    }
  }
}
