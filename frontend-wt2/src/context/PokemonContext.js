/**
 * Context for managing fetch requests to backend API.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { createContext, useState, useCallback } from 'react'

export const PokemonContext = createContext({})

/**
 * Context provider component for managing pokemon data.
 *
 * @component
 * @param {Object} children - The child components.
 * @returns {JSX.Element} Rendered component.
 */
const PokemonContextProvider = ({ children }) => {

  const [allPokemon, setAllPokemon] = useState(null)
  const [clusteredPokemon, setClusteredPokemon] = useState(null)
  const [loadPokemonError, setLoadPokemonError] = useState(null)
  const [centroids, setCentroids] = useState(null)
  const [averageTotalCluster1, setAverageTotalCluster1] = useState(null);
  const [averageTotalCluster2, setAverageTotalCluster2] = useState(null);


  /**
   * Retrieves all pokemon from the server.
   *
   * @callback fetchPokemon
   */
  const fetchPokemon = useCallback(async () => {
    setLoadPokemonError(null)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pokemon`)
      if (!response.ok) {
        console.log('error')
        throw new Error('Could not load pokemon')
      }
      const data = await response.json()
      setAllPokemon(data.pokemon)
    } catch (error) {
      setLoadPokemonError(error)
    }
  }, [])


  /**
   * Retrieves clustered pokemon data from the server.
   *
   * @callback fetchClusteredPokemon
   */
  const fetchClusteredPokemon = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pokemon/clusters`)
      if (!response.ok) {
        throw new Error('Could not load clustered pokemon')
      }
      const data = await response.json()
      setClusteredPokemon(data.clusters)
      setCentroids(data.centroids)

      const resAverageTotal = await fetch(`${process.env.REACT_APP_API_URL}/pokemon/clusters/average`)
      if (!resAverageTotal.ok) {
        throw new Error('Could not load total average for clusters')
      }
      const totalData = await resAverageTotal.json()
      setAverageTotalCluster1(totalData.centroids.cluster1.total)
      setAverageTotalCluster2(totalData.centroids.cluster2.total)
    } catch (error) {
      setLoadPokemonError(error)
    }
  }, [])

  /**
   * Retrieves average total for a specific type from the server.
   *
   * @callback fetchAverageForType
   */
  const fetchAverageForType = async (type) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/pokemon/types/${type}`)
      if (!response.ok) {
        throw new Error('Could not load average for type')
      }
      const data = await response.json()
      return data.average
    } catch (error) {
      setLoadPokemonError(error)
    }
  }

  const fetchPokemonImg = async (number) => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-form/${number}/`)
      if (!response.ok) {
          const error = new Error(`Fetch error ${response.status}`)
          error.message = `Fetch error ${response.status}`
      }
      const data = await response.json()
      const imageSrc = data.sprites.front_default
      return imageSrc
    } catch (error) {
      setLoadPokemonError(error)
    }
  }

  /**
   * Resets all pokemon data to null.
   *
   * @callback setToNull
   * @returns {void}
   */
  const setToNull = () => {
    setAllPokemon(null)
  }

  return <PokemonContext.Provider
    value={{
      allPokemon,
      fetchPokemon,
      fetchClusteredPokemon,
      clusteredPokemon,
      setToNull,
      loadPokemonError,
      centroids,
      averageTotalCluster1,
      averageTotalCluster2,
      fetchAverageForType,
      fetchPokemonImg
    }}
  >
    {children}
  </PokemonContext.Provider>
}

export default PokemonContextProvider
