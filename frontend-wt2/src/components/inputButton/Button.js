/** @jsxImportSource @emotion/react */

/**
 * Module for Button component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { buttonStyle } from './Button.css'

/**
 * Button component for rendering a button element.
 *
 * @component
 * @param {string} buttonText - The text to display on the button.
 * @param {function} onClick - The click event handler for the button.
 * @param {string} buttonColor - The color of the button.
 * @returns {JSX.Element} Rendered component.
 */
const Button = ({ buttonText, onClick, buttonColor }) => {

  return <button css={buttonStyle(buttonColor)} onClick={onClick}>{buttonText}</button>

}

export default Button