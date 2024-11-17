/** @jsxImportSource @emotion/react */

// FÖRDEL. bara den css vi använder på denna sidan är det som följer med. sparar prestanda, istället för en hel fil.

import { css } from "@emotion/react";

export const buttonStyle =  (color) => css`
    background-color: ${color};
    border: solid 3px rgb(133, 127, 224);
    border-radius: 10px;
    padding: 8px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    letter-spacing: 2px;
    font-weight: 600;
    margin: 10px;
    cursor: pointer;
    
`

// Kan skriva som funktion:
/*
export const buttonStyle = css`
    background-color: red;
`
*/