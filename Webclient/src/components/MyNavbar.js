import styled,{ keyframes } from 'styled-components'
import React, {useState} from 'react'
import { withRouter } from 'react-router'
import { BodyIntro } from '../styles/TextStyles'
import { navbarData } from '../Data/navbarData'
import MenuTooltip from './MenuTooltip'

function MyNavbar({ history }) {
	
	const [isOpen, setIsOpen] = useState(false);

	const shouldUnderline = (link) => {
		const { pathname } = history.location
		console.log(link, pathname);
		return link == pathname;
	}
	
	shouldUnderline();
	const navigate = (e, link) => {
		e.preventDefault();
		history.push(link);
	}

	const getColor = () => {
		const { pathname } = history.location;
		if (pathname == '/crypto')
			return 'black';
		return 'white';
	}

	return (
		<>
			<MenuWrapper>
				<Logo src="./Logo.svg" color={ getColor() }/>
				<LabelWrapper items={navbarData.length}>
					{navbarData.map(elem => (
						<MenuLabel color={ getColor() } underline={shouldUnderline(elem.link)} onClick={(e) => navigate(e, elem.link)}>{ elem.title }</MenuLabel>
					))}
				</LabelWrapper>
				<StyledBurger className="nav" onClick={() => {setIsOpen(!isOpen);} }>
					<Line color={ getColor() }/>
					<Line color={ getColor() }/>
				</StyledBurger>
			</MenuWrapper> 
			<MenuTooltip isOpen={isOpen} />
		</>
	)
}

const Line = styled.div`
	width: 45px;
	height: 6px;
	border-radius: 14px;
	background: ${props => (props.color === 'white') ? 'white' : 'black'};
	transform: ${props => (props.animate===true)? "scale(1.4)": "" };
	transition: 0.3;
`

const StyledBurger = styled.nav`
	display: grid;
	grid-auto-flow: row;
	justify-content: center;
	align-items: center;

	@media(min-width:444px) {
		display: none;
	}
`

const MenuWrapper = styled.div`
	display: grid;
	position: absolute;
	grid-template-columns: 44px auto;
	grid-template-rows: none;
	padding: 20px;
	z-index: 1;
	width: 100%;
	@media(max-width: 444px) { 
		.nav {
			justify-content: right;
		}
	}
`

const MenuLabel = styled(BodyIntro)`
	cursor: pointer; 
	color: ${props => (props.color === 'white') ? 'white' : 'black'};
	font-weight: bold;
	width: auto;
	height: auto;
	text-decoration: ${props => (props.underline ? 'underline' : "none")};
	text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
	transition: 0.3s ease-out;
	:hover {
		transform: scale(1.1);
		text-shadow: 0px 10px 10px rgba(0, 0, 0, 0.25);
	}
`

const LabelWrapper = styled.div`
	position: relative;
	display: grid;
	grid-template-rows: none;
	grid-auto-flow: column;
	grid-template-columns: ${(props) => `repeat(${props.items}, auto)`};  
	grid-gap: 16px;
	justify-items: center;
	align-content: center;
	@media(max-width: 444px) {
		display: none;
		
	}
`

const Logo = styled.img`
  	height:44px;
  	width:44px;
	z-index: 10;
	fill: ${props => (props.color === 'black') ? 'black' : 'white'};
`

export default withRouter(MyNavbar)
