import React from 'react'
import styled from 'styled-components'
import { navbarData } from '../Data/navbarData'

function MenuTooltip({ isOpen }) {
    return (
        <Wrapper isOpen={isOpen}>
            { navbarData.map((elem, index) => (
                <MenuItem key={index}>{elem.title} </ MenuItem>
            ))}
        </Wrapper>
    )
}

export default MenuTooltip

const MenuItem = styled.p`
    font: white;
`

const Wrapper = styled.div`
    position: absolute;
    display: grid;
    grid-auto-flow: row;
    grid-gap: 10px;
    right: 20px;
    top: 70px;
    background: rgba(15, 14, 71, 0.3);
    backdrop-filter: blur(40px);
    border-radius: 20px;
    padding: 20px;
    opacity: ${props => (props.isOpen ? 1 : 0)};
`

