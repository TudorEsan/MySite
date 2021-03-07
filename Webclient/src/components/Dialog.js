import React from 'react'
import styled from 'styled-components'
export const Dialog = ({ children, isOpen }) => {
    return (
        <>
            <Container isOpen={isOpen}>
                { children }
            </Container>
        </>
    )
}
const Container = styled.div`
    position: fixed;
    backdrop-filter: blur(2px);
    z-index: 1000;
    padding: 20px 50px;
    background-color: #F2F6FF;
    z-index: 1000;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 50px 100px rgba(0, 0, 0, 0.25);
    border-radius: 58px;
    visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
    opacity: ${props => (props.isOpen ? '0.95' : '0')};
    transition: 0.3s ease;
    @media(max-width: 800px) {
        padding: 20px 25px;
    }
`
