/** @jsxImportSource @emotion/react */

/**
 * Module for Type Graph - to get average total from each pokemon-type.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import React, { useState, useEffect } from 'react'
import Plot from 'react-plotly.js'
import { graphStyle } from './Graph.css'
import { usePokemonContext } from '../../hooks/usePokemonContext'

/**
 * Type Graph component for displaying a graph of pokemon stats by type.
 *
 * @component
 * @returns {JSX.Element} Rendered component.
 */
const TypeGraph = ({type}) => {

  const [averageStats, setAverageStats] = useState(null);
  const { fetchAverageForType, loadPokemonError } = usePokemonContext();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchAverageForType(type);
      if (loadPokemonError) {
        return;
      }
      setAverageStats(data);
    };

    fetchData();
  }, [type]);

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

  return (
<div css={graphStyle}>
      {averageStats !== null && type !== 'all' && !loadPokemonError ? (
        <Plot
          data={[
            {
              y: ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed', 'Total'],
              x: Object.values(averageStats), // Use Object.values to extract the values from the object
              type: 'bar',
              orientation: 'h',
              marker: { color: determineColor(type) }
            }
          ]}
          config={{ modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'resetScale2d'] }}
          layout={{ width: '100%', height: '50vh', title: `Average stats of ${type} type`, yaxis: { type: 'category' }, margin: { l: 100 } }}
        />
        ) : averageStats !== null && type === 'all' && !loadPokemonError ?(
          <Plot
            data={Object.keys(averageStats).map((type) => ({
              y: [type],
              x: [averageStats[type]],
              type: 'bar',
              orientation: 'h',
              marker: { color: determineColor(type) },
              name: 'avg. total',
              showlegend: false
            }))}
            config={{ modeBarButtonsToRemove: ['pan2d', 'select2d', 'lasso2d', 'resetScale2d'] }}
            layout={{ width: '100%', height: '50vh', title: `Average total of ${type} types`, yaxis: { type: 'category' }, margin: { l: 100 } }}
          />
        ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default TypeGraph