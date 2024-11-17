/** @jsxImportSource @emotion/react */

/**
 * Module for Centroid Graph component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import React, { useEffect, useState } from 'react'
import Button from '../inputButton/Button'
import Plot from 'react-plotly.js'
import { graphStyle } from './Graph.css'
import { usePokemonContext } from '../../hooks/usePokemonContext'


/**
 * Component for displaying graphs representing data of clusters.
 *
 * @component
 * @returns {JSX.Element} Rendered component.
 */
const CentroidGraph = () => {
  const { fetchClusteredPokemon, clusteredPokemon, centroids, averageTotalCluster1, averageTotalCluster2, loadPokemonError } = usePokemonContext()
  const [centroidDetailData, setCentroidDetailData] = useState([])
  const [showDetailGraph, setShowDetailGraph] = useState(true)
  const [showTotalGraph, setShowTotalGraph] = useState(false)
  const [centroidTotalData, setCentroidTotalData] = useState([])
  const [buttonText, setButtonText] = useState('See average total for each cluster')
  const [clusterData, setClusterData] = useState([])

  const getClusters = async () => {
    await fetchClusteredPokemon()
  }

  // when component loads - fetch pokemon clusters
  useEffect(() => {
    getClusters()
  }, []);

  useEffect(() => {
    if (!clusteredPokemon) {
      return
    }
    if (loadPokemonError) {
      return
    }

    const scatterData = []

    // Loop through each cluster
    Object.entries(clusteredPokemon).forEach(([clusterName, clusterPokemons], clusterIndex) => {
      // Group pokemons by type
      const pokemonsByType = clusterPokemons.reduce((acc, pokemon) => {
        acc[pokemon.type] = acc[pokemon.type] || [];
        acc[pokemon.type].push(pokemon);
        return acc;
      }, {});

      // Create a plotly trace for each type within the cluster
      Object.entries(pokemonsByType).forEach(([type, pokemons], typeIndex) => {
        scatterData.push({
          x: pokemons.map((pokemon, pokemonIndex) => `${type} - C${clusterIndex + 1}`),
          y: pokemons.map(pokemon => parseFloat(pokemon.total.toFixed(1))),
          mode: 'markers',
          text: pokemons.map(pokemon => pokemon.name),
          type: 'scatter',
          name: `Cluster ${clusterIndex + 1} - ${type}`,
          marker: { color: determineColor(type) },
          showlegend: false
        });
      });
    });

    setClusterData(scatterData);
  }, [clusteredPokemon]);

  // Function to determine color based on type
  const determineColor = (type) => {
    let displayColor = '';
    switch (type.toLowerCase()) {
      case 'bug':
        displayColor = '#A6D785'; // Light green
        break;
      case 'grass':
        displayColor = '#4CAF50'; // Green
        break;
      case 'dark':
      case 'ghost':
        displayColor = '#333333'; // Black
        break;
      case 'poison':
      case 'psychic':
        displayColor = '#9B30FF'; // Purple
        break;
      case 'fire':
        displayColor = '#FF5722'; // Red
        break;
      case 'water':
      case 'ice':
      case 'flying':
        displayColor = '#2196F3'; // Blue
        break;
      case 'fairy':
        displayColor = '#FF4081'; // Pink
        break;
      case 'electric':
        displayColor = '#FFEB3B'; // Yellow
        break;
      case 'fighting':
      case 'steel':
      case 'normal':
        displayColor = '#9E9E9E'; // Grey
        break;
      case 'ground':
      case 'rock':
        displayColor = '#795548'; // Brown
        break;
      default:
        displayColor = '#9E9E9E'; // Default color
    }
    return displayColor;
  };

  // Extracting centroid details values for each cluster
  useEffect(() => {
    if (!centroids || loadPokemonError) return;

    setCentroidDetailData(centroids.map((centroid, index) => ({
      x: ['HP', 'Attack', 'Defence', 'Special Attack', 'Special Defence', 'Speed'],
      y: centroid.map(value => parseFloat(value.toFixed(1))),
      type: 'bar',
      name: `Cluster ${index + 1}`,
      marker: { color: index % 2 === 0 ? 'green' : 'purple' },
    })))
  }, [centroids]);

  // Extracting centroid values for comparing totals of each cluster
  useEffect(() => {
    if (!averageTotalCluster1 || loadPokemonError) return;
    setCentroidTotalData([{
      x: ['Total'],
      y: [averageTotalCluster1],
      type: 'bar',
      name: `Cluster 1`,
      marker: { color: 'green' },
    }, {
      x: ['Total'],
      y: [averageTotalCluster2],
      type: 'bar',
      name: `Cluster 2`,
      marker: { color: 'purple' },
    }])
  }, [averageTotalCluster1]);

  // Changes button and type of graph to show
  const handleToggleClick = () => {
    if (showDetailGraph) {
      setShowDetailGraph(false)
      setShowTotalGraph(true)
      setButtonText('See average stats for each cluster')
    } else {
      setShowDetailGraph(true)
      setShowTotalGraph(false)
      setButtonText('See average total for each cluster')
    }
  }

  // Changes graph to show all pokemon divided in to clusters in a scatter plot
  const handleViewClusters = () => {
    setShowDetailGraph(false)
    setShowTotalGraph(false)
  }


  return (
    <div style={{ textAlign: 'center', backgroundColor: '#E5E1FF' }}>
      <Button
        buttonText={buttonText}
        buttonColor="#D4C7FF"
        onClick={handleToggleClick}
      />
      <Button
        buttonText={'See Pokémon cluster map'}
        buttonColor="#D4C7FF"
        onClick={handleViewClusters}
      />
      {showDetailGraph ? (
        <div css={graphStyle}>
          <Plot
            data={centroidDetailData}
            config={{ modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'resetScale2d'] }}
            layout={{ width: '100%', height: '50vh', title: 'Stats for each Cluster', xaxis: { type: 'category' } }}
          />
        </div>
      ) : showTotalGraph ? (
        <div css={graphStyle}>
          <Plot
            data={centroidTotalData}
            config={{ modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'resetScale2d'] }}
            layout={{ width: '100%', height: '50vh', title: 'Average Total of Clusters', xaxis: { type: 'category' } }}
          />
        </div>
      ) : (
        <div css={graphStyle}>
          <Plot
            data={clusterData}
            config={{ modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'resetScale2d'] }}
            layout={{ width: '100%', height: '50vh', title: 'Pokémon divided in clusters by their total stats', xaxis: { type: 'category' }, margin: { b: 100 } }}
          />
        </div>
      )}
    </div>
  )
}

export default CentroidGraph