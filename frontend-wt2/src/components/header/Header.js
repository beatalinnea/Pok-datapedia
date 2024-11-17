/** @jsxImportSource @emotion/react */

/**
 * Module for Header component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */
import React from 'react'
import { headerStyle } from './Header.css'

/**
 * Header component for displaying a header.
 *
 * @component
 * @param {string} text - The text to display in the header.
 * @returns {JSX.Element} Rendered component.
 */
const Header = ({ text }) => {

  return <h1 css={headerStyle}>{text}</h1>

}

export default Header