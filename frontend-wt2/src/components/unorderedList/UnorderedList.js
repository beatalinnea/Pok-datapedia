/** @jsxImportSource @emotion/react */

/**
 * Module for UnorderedList component.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.0.0
 */

import React from 'react'
import { ulStyle } from './UnorderedList.css'

/**
 * UnorderedList component for rendering an unordered list.
 *
 * @component
 * @param {Object} children - The content to render inside the unordered list.
 * @returns {JSX.Element} Rendered component.
 */
const UnorderedList = ({ children }) => {
    return <ul css={ulStyle}>{children}</ul>
}

export default UnorderedList
