import React from 'react'
import { withRouter } from 'react-router'
import styled from 'styled-components'
import { navbarData } from '../Data/navbarData'

function MenuTooltip({ isOpen, setIsOpen, history, onDismiss }) {

    return (
        <>
            <Wrapper isOpen={isOpen}>
                { navbarData.map((elem, index) => (
                    <MenuItem onClick={ () => { history.push(elem.link); setIsOpen(false)}} key={index}>{elem.title} </ MenuItem>
                ))}
            </Wrapper>
            <Div isOpen={isOpen} onClick={onDismiss}>

            </Div>
        </>
    )
}

export default withRouter(MenuTooltip)

const Div = styled.div`
    position: absolute;
    visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
    z-index: -999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`;

const MenuItem = styled.p`
    transition: 0.5s ease-out;
    color: white;
    border-radius: 10px;
    :hover {
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
    }

`

const Wrapper = styled.div`
    position: absolute;
    z-index: 1000;
    display: grid;
    width: 100px;
    transition: 0.3s ease-in-out;
    opacity: ${props => (props.isOpen ? 1 : 0)};
    grid-auto-flow: row;
    grid-gap: 10px;
    right: 20px;
    top: 70px;
    background: rgba(15, 14, 71, 0.3);
    backdrop-filter: blur(40px);
    border-radius: 20px;
    padding: 10px;
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
`

