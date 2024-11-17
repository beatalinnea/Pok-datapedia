/** @jsxImportSource @emotion/react */

/**
 * Module for Heading component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { headingStyle } from './Heading.css'

/**
 * Heading component for displaying a heading.
 *
 * @component
 * @param {string} props.text - The text to display in the heading.
 * @returns {JSX.Element} Rendered component.
 */
const Heading = ({ text }) => {

  return <h1 css={headingStyle}>{text}</h1>

}

export default Heading