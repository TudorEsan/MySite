import styled from 'styled-components'
import React, {useState} from 'react'
import { withRouter } from 'react-router'
import { BodyIntro } from '../styles/TextStyles'
import { navbarData } from '../Data/navbarData'
import MenuTooltip from './MenuTooltip'

function MyNavbar({ history }) {
	
	const [isOpen, setIsOpen] = useState(false);

	const onDismiss = () => {
		setIsOpen(false);
	}

	const shouldUnderline = (link) => {
		const { pathname } = history.location
		return link === pathname;
	}
	
	shouldUnderline();
	const navigate = (e, link) => {
		e.preventDefault();
		history.push(link);
	}

	const getColor = () => {
		const { pathname } = history.location;
		const elem = navbarData.find(elem => elem.link === pathname)
		return elem.navbarColor;
	}
	const isDark = () => {
		return getColor() === 'black';
	}
	const override = () => {
		const { pathname } = history.location;
		return pathname === '/'
	}

	return (
		<>
			<MenuWrapper>
				<Logo src={isDark()?'/Logo_dark.svg' : 'Logo.svg'} color={ getColor() }/>
				<LabelWrapper items={navbarData.length}>
					{navbarData.map((elem, index) => (
						<MenuLabel key={index} color={getColor()} override={ override() } underline={shouldUnderline(elem.link)} onClick={(e) => navigate(e, elem.link)}>{ elem.title }</MenuLabel>
					))}
				</LabelWrapper>
				<StyledBurger className="nav" onClick={() => {setIsOpen(!isOpen);} }>
					<Line color={ getColor() } override={ override() }/>
					<Line color={ getColor() } override={ override() }/>
				</StyledBurger>
			</MenuWrapper> 
			<MenuTooltip isOpen={isOpen} onDismiss={onDismiss} setIsOpen={setIsOpen}/>
		</>
	)
}

const Line = styled.div`
	width: 45px;
	height: 6px;
	border-radius: 14px;
	background: ${props => (props.color === 'white') ? 'white' : 'black'};
	@media(prefers-color-scheme: dark) { 
		background: white;
		opacity: 0.9;
	}
	transform: ${props => (props.animate===true)? "scale(1.4)": "" };
	transition: 0.3;
`

const StyledBurger = styled.nav`
	display: grid;
	grid-auto-flow: row;
	justify-content: center;
	align-items: center;

	@media(min-width:600px) {
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
	@media(max-width: 600px) { 
		.nav {
			justify-content: right;
		}
	}
`

const MenuLabel = styled(BodyIntro)`
	cursor: pointer; 
	color: ${props => (props.color === 'white') ? 'white' : '#1D3557'};
	font-weight: bold;
	width: auto;
	height: auto;
	text-decoration: ${props => (props.underline ? 'underline' : "none")};
	text-shadow: ${props => (props.color === 'white') ? '0px 5px 5px rgba(0, 0, 0, 0.25)' : '#1D3557'};
	transition: 0.3s ease-out;
	:hover {
		transform: scale(1.1);
	}
	@media(prefers-color-scheme: dark) {
		color: ${props => (props.color === 'white') ? '#1D3557' : "rgba(255, 255, 255, 0.85)"};
		color: ${props => (props.override) ? "rgba(255, 255, 255, 0.85)" : ''};
		
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
	@media(max-width: 600px) {
		display: none;
		
	}
`

const Logo = styled.img`
  	height:44px;
  	width:44px;
	z-index: 10;
	fill: ${props => (props.color === 'black') ? 'black' : 'white'};
	@media(prefers-color-scheme: dark) {
		content: url('/Logo.svg');
	}
`

export default withRouter(MyNavbar)
