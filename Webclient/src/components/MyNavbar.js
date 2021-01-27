import styled from 'styled-components'
import React from 'react'
import { withRouter } from 'react-router'
import { BodyIntro } from '../styles/TextStyles'

function MyNavbar({ history }) {
	return (
		<>
			<MenuWrapper>
				<Logo src="./Logo.svg" />
				<div></div> 
				<LabelWrapper>
					<MenuLabel underline={true}>Home</MenuLabel>
					<MenuLabel>afsadf</MenuLabel>
					<MenuLabel>Contact</MenuLabel>
				</LabelWrapper>
			</MenuWrapper> 
		</>
	)
}

const MenuWrapper = styled.div`
	display: grid;
	position: absolute;
	grid-template-columns: 44px auto auto auto;
	grid-template-rows: none;
	padding: 20px;
	z-index: 1;
	width: 100%;
`

const MenuLabel = styled(BodyIntro)`
	cursor: pointer; 
	color: white;
	font-weight: bold;
	width: auto;
	height: auto;
	text-decoration: ${props => (props.underline? 'underline' : "none")};
`

const LabelWrapper = styled.div`
	position: relative;
	display: grid;
	grid-template-rows: none;
	grid-auto-flow: column;  
	grid-gap: 16px;
	justify-items: center;
	align-content: center;
`

const Logo = styled.img`
  	height:44px;
  	width:44px;
	z-index: 10;
`

export default withRouter(MyNavbar)
