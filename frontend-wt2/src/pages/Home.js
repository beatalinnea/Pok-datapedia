/** @jsxImportSource @emotion/react */

/**
 * Module for Home page.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React, { useState } from 'react'
import { textPageStyle } from './TextPages.css'
import PokeInfo from '../components/pokeInfo/PokeInfo'
import CentroidGraph from '../components/graphs/CentroidGraph'
import TypeGraph from '../components/graphs/TypeGraph'

/**
 * Home page.
 *
 * This component represents the home page of the application.
 *
 * @returns {JSX.Element} Home component.
 */
const Home = () => {
  const [selectedType, setSelectedType] = useState('all'); // State to hold the selected type

  // Function to handle type selection change
  const handleTypeSelect = (event) => {
    setSelectedType(event.target.value);
  };

  return (
    <div>
      <section css={textPageStyle}>
        <h2>welcome to pokédatapedia</h2>
        <p>See average stats for each type</p>
        <select value={selectedType} onChange={handleTypeSelect}>
          <option value="all">All Types</option>
          <option value="grass">Grass</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="normal">Normal</option>
          <option value="electric">Electric</option>
          <option value="ice">Ice</option>
          <option value="fighting">Fighting</option>
          <option value="poison">Poison</option>
          <option value="ground">Ground</option>
          <option value="flying">Flying</option>
          <option value="psychic">Phsychic</option>
          <option value="bug">Bug</option>
          <option value="rock">Rock</option>
          <option value="ghost">Ghost</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="steel">Steel</option>
          <option value="fairy">Fairy</option>
        </select>
      </section>
      <TypeGraph type={selectedType} />
      <section css={textPageStyle}>
        <h2>Clustering Pokémons</h2>
        <p>The data below represents each Pokémon divided into clusters, along with the clusters average stats.</p>
        <p>Using the KMeans algorithm, Pokémon are grouped based on their individual stats (HP, Attack, Defense, Special Attack, Special Defense, and Speed).<br></br> Two clusters are created: one for the weakest Pokémon and one for the strongest.<br></br> Each Pokémon is assigned to the cluster whose centroid it is closest to based on its stats.</p>
      </section>
      <CentroidGraph />
      <PokeInfo />
    </div>
  )
}

export default Home