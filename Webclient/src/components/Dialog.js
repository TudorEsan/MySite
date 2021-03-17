import React from 'react'
import styled from 'styled-components'
export const Dialog = ({ children, isOpen, onDismiss }) => {
    return (
		<>
			<Container isOpen={isOpen}>{children}</Container>
			<Overlay isOpen={isOpen} onClick={onDismiss}></Overlay>
		</>
	);
}
const Overlay = styled.div`
	position: fixed;
	backdrop-filter: blur(5px);
	z-index: 999;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	visibility: ${(props) => (props.isOpen ? "visible" : "hidden")};
	opacity: ${(props) => (props.isOpen ? "0.95" : "0")};
`;

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
    transition: all 0.1s ease;
    @media(max-width: 800px) {
        padding: 20px 25px;
    }
`
