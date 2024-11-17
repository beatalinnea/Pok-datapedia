/** @jsxImportSource @emotion/react */

/**
 * Module for Poke Info component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import React, { useEffect, useState } from 'react'
import { usePokemonContext } from '../../hooks/usePokemonContext'
import { pokeInfoStyle } from './PokeInfo.css'
import Button from '../inputButton/Button'

/**
 * Poke Info component for displaying a information about pokemon.
 *
 * @component
 * @returns {JSX.Element} Rendered component.
 */
const PokeInfo = () => {
  const { fetchPokemon, allPokemon, fetchPokemonImg } = usePokemonContext()
  const [pokemonList, setPokemonList] = useState([])
  const [showPokemonList, setShowPokemonList] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState()
  const [selectedImg, setSelectedImg] = useState()

  const getPokeInfo = async () => {
    try {
      await fetchPokemon()
    } catch (e) {
      console.log(e)
    }
  }

  // when component loads - fetch pokemon
  useEffect(() => {
    getPokeInfo()
  }, []);

  // when pokemon fetched - log all pokemon
  useEffect(() => {
    setPokemonList(allPokemon)
  }, [allPokemon]);

  const handleCloseInfoBox = () => {
    setSelectedPokemon(null);
    setSelectedImg(null);
    setShowPokemonList(false);
  }

  const handleViewPokemonList = () => {
    if (showPokemonList) {
      setShowPokemonList(false)
      return
    }
    setShowPokemonList(true)
    setSelectedPokemon(allPokemon[0])
    fetchPokemonImg(allPokemon[0].number)
      .then((img) => {
        setSelectedImg(img)
      })
  }

  // Function to handle type selection change
  const handlePokemonSelect = (event) => {
    const selectedPokemonName = event.target.value;
    const selectedPokemon = pokemonList.find(pokemon => pokemon.name === selectedPokemonName);
    setSelectedPokemon(selectedPokemon);
    fetchPokemonImg(selectedPokemon.number)
      .then((img) => {
        setSelectedImg(img)
      })
  };

  return (
    <div style={{ textAlign: 'center' }} css={pokeInfoStyle} >
      <Button
        buttonText="View Pokémon info"
        buttonColor="#D4C7FF"
        onClick={handleViewPokemonList}
      />
      {showPokemonList && (
        <div>
          <select value={selectedPokemon ? selectedPokemon.name : ''} onChange={handlePokemonSelect}>
            {pokemonList.map((pokemon, i) => (
              <option key={i} value={pokemon.name}>{pokemon.number}. {pokemon.name}</option>
            ))}
          </select>
        </div>
      )}
      {showPokemonList && pokemonList.length === 0 && <p>No Pokémons yet...</p>}
      {/* Info Box */}
      {selectedPokemon && (
          <div className="infoBox" >
            <div>
              <h3>{selectedPokemon.name}</h3>
              <p>Number: {selectedPokemon.number}</p>
              <p>Type: {selectedPokemon.type1}</p>
              <p>Secondary type: {selectedPokemon.type2 && selectedPokemon.type2}</p>
              <p>HP: {selectedPokemon.hp}</p>
              <p>Attack: {selectedPokemon.attack}</p>
              <p>Defense: {selectedPokemon.defense}</p>
              <p>Special Attack: {selectedPokemon.specialAttack}</p>
              <p>Special Defense: {selectedPokemon.specialDefense}</p>
              <p>Speed: {selectedPokemon.speed}</p>
              <p>Total: {selectedPokemon.total}</p>
              <button onClick={handleCloseInfoBox}>Close</button>
            </div>
            <img src={selectedImg} alt={selectedPokemon.name} style={{ marginRight: '20px' }} />
          </div>
      )}
    </div>
  )

}

export default PokeInfo
