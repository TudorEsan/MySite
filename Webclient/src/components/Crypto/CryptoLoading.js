import React from "react";
import styled, { keyframes } from "styled-components";
import {
	BodyIntro,
	BodyMain,
	H2,
	H3,
	MediumText,
} from "../../styles/TextStyles";
import { theme } from "../../Api/colorScheeme";

function LoadingCrypto() {
	return (
		<>
			<Container>
				<TitleContainer>
					<Title>
						My <br />
						Cryptocurencies
					</Title>
				</TitleContainer>
				<Ilustration src="CryptoIlustration.svg" />
			</Container>
			<Container2>
				<ButtonContainer>
					<Button theme={theme}>
						<ButtonLabel>Add Crypto</ButtonLabel>
					</Button>
					<Button theme={theme}>
						<ButtonLabel>Sell</ButtonLabel>
					</Button>
				</ButtonContainer>
				<Card theme={theme}>
					<Heading theme={theme}>Overview</Heading>
					<Amount theme={theme}></Amount>
					<Percentage theme={theme}></Percentage>
					{[0, 0, 0].map((elem, index) => (
						<CryptoContainer key={index}>
							<CryptoImg />
							<CryptoName theme={theme}></CryptoName>
							<Divider></Divider>
							<PriceContainer>
								<CryptoPrice theme={theme}> </CryptoPrice>
								<SmallPercentage
									theme={theme}
								></SmallPercentage>
							</PriceContainer>
						</CryptoContainer>
					))}
				</Card>
				<Card theme={theme}>
					<Heading theme={theme}>Transactions</Heading>
					{[0, 0, 0].map((elem, index) => (
						<CryptoContainer key={index}>
							<CryptoImg src={elem.icon} />
							<CryptoName theme={theme}>{elem.type}</CryptoName>
							<Divider></Divider>
							<PriceContainer>
								<CryptoPrice theme={theme}></CryptoPrice>
								<BuyingDate theme={theme}></BuyingDate>
							</PriceContainer>
						</CryptoContainer>
					))}
				</Card>
			</Container2>
		</>
	);
}

export default LoadingCrypto;

const fadingAnimation = keyframes`

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }

`;

const BuyingDate = styled(MediumText)`
	width: 100px;
	height: 10px;
	margin: 5px auto;
	border-radius: 50px;
	background: ${(props) => props.theme.light.loading1};
`;

const Percentage = styled(MediumText)`
	text-align: center;
	color: ${(props) => (props.percentage >= 0 ? "green" : "red")};
	width: 60px;
	height: 10px;
	margin: 5px auto;
	border-radius: 50px;
	animation: ${fadingAnimation} 2s ease-in-out infinite;
	background: ${(props) => props.theme.light.loading1};
`;

const SmallPercentage = styled(Percentage)`
	position: relative;
	font-size: 14px;
	width: 50px;
	height: 7px;
	margin: 5px auto;
	animation: ${fadingAnimation} 2s ease-in-out infinite;
	border-radius: 50px;
	background: ${(props) => props.theme.light.loading1};
`;

const PriceContainer = styled.div`
	display: grid;
	grid-gap: 5px;
	justify-content: center;
`;

const Divider = styled.div``;

const Heading = styled(H3)`
	text-align: center;
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const Amount = styled(BodyMain)`
	width: 100px;
	height: 15px;
	margin: 5px auto;
	border-radius: 50px;
	animation: ${fadingAnimation} 2s ease-in-out infinite;
	background: #c4c4c4 center center;
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const CryptoPrice = styled(BodyIntro)`
	width: 80px;
	height: 15px;
	margin: 5px auto;
	border-radius: 50px;
	background: ${(props) => props.theme.light.loading1};
	animation: ${fadingAnimation} 2s ease-in-out infinite;
	@media (max-width: 444px) {
		font-size: 17px;
	}
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const CryptoName = styled(BodyIntro)`
	font-style: normal;
	font-weight: 500;
	font-size: 24px;
	line-height: 29px;
	text-align: left;
	@media (max-width: 444px) {
		font-size: 17px;
	}
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const CryptoImg = styled.img`
	width: 76px;
	height: 76px;
	background: #c4c4c4;
	border-radius: 50%;
	animation: ${fadingAnimation} 2s ease-in-out infinite;
`;

const CryptoContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 52px auto auto auto;
	grid-auto-flow: column;
	grid-gap: 20px;
	align-items: center;
	margin: 20px 0px;
`;

const Card = styled.div`
	background: #f2f6ff;
	box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.25);
	border-radius: 76px;
	padding: 50px;
	display: grid;
	grid-auto-flow: row;
	align-items: center;
	width: 80%;
	max-width: 900px;
	margin: 0 auto 100px;
	@media (max-width: 444px) {
		padding: 30px;
	}
	@media (prefers-color-scheme: dark) {
		background: ${(props) => props.theme.dark.dialogColor};
	}
`;

const ButtonContainer = styled.div`
	display: grid;
	justify-content: center;
	align-items: center;
	grid-auto-flow: column;
	grid-gap: 30px;
	margin-bottom: 15px;
`;

const ButtonLabel = styled(BodyIntro)`
	color: white;
	font-weight: 500;
	font-size: 24px;
	line-height: 29px;
	text-align: center;
	cursor: pointer;
	@media (max-width: 444px) {
		font-size: 17px;
	}
`;

const Button = styled.div`
	filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
	background: #229ad2;
	border-radius: 50px;
	padding: 5px 15px;
	transition: 0.3s ease-out;
	:hover {
		transform: scale(1.05);
	}
	@media (prefers-color-scheme: dark) {
		background: ${(props) => props.theme.dark.gradient1};
	}
`;

const Container2 = styled.div`
	display: grid;
	grid-auto-flow: row;
	width: auto;
	margin-top: 50px;
	@media (max-width: 444px) {
		margin: 0;
	}
`;

const Ilustration = styled.img`
	margin: auto;
	max-width: 80%;
	@media (max-width: 444px) {
		margin: 0 auto;
	}
	@media (prefers-color-scheme: dark) {
		content: url("/CryptoIlustration_dark.svg");
	}
`;

const Title = styled(H2)`
	max-width: 80%;
	color: white;
	@media (max-width: 711px) {
		font-size: 30px;
	}
`;

const Container = styled.div`
	height: 80vh;
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 50% 50%;
	@media (max-width: 711px) {
		height: 60vh;
	}
	@media (max-width: 444px) {
		height: 80vh;
		grid-auto-flow: row;
		grid-template-rows: 50% 50%;
		grid-template-columns: 100%;
		grid-gap: 50px;
	}
`;
const TitleContainer = styled.div`
	height: 80vh;
	background: url("/CryptoBackground.svg") no-repeat center left;
	display: flex;
	background-size: contain;
	align-items: center;
	justify-content: center;
	@media (max-width: 711px) {
		height: 60vh;
	}
	@media (max-width: 444px) {
		height: 50vh;
	}
	@media (prefers-color-scheme: dark) {
		background: url("/CryptoBackground_dark.svg") no-repeat center left;
		background-size: contain;
	}
`;
