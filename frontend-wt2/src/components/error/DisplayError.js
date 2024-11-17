/** @jsxImportSource @emotion/react */


// ErrorDisplay component
import React from 'react';
import { usePokemonContext } from '../../hooks/usePokemonContext';
import { errorStyle } from './DisplayError.css';

const DisplayError = () => {
  const { loadPokemonError } = usePokemonContext();

  return loadPokemonError ? <div css={errorStyle}>Error: {loadPokemonError.message}</div> : null;
};

export default DisplayError;