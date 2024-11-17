/**
 * Will use Pokemon Context.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import { PokemonContext } from '../context/PokemonContext'
import { useContext } from 'react'


/**
 * Custom hook for accessing the pokemon context.
 *
 * @function usePokemonContext
 * @returns {object} The pokemon context object
 */
export const usePokemonContext = () => {
  const context = useContext(PokemonContext)

  if (!context) {
    throw Error('usePokemonContext must be used inside an PokemonContextProvider')
  }

  return context
}