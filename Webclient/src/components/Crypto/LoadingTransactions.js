import React from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../../Api/colorScheeme";
import { BodyIntro, BodyMain, H3, MediumText } from "../../styles/TextStyles";

export const LoadingTransactions = () => {
	return (
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
	);
};

const BuyingDate = styled(MediumText)`
	width: 100px;
	height: 10px;
	margin: 5px auto;
	border-radius: 50px;
	background: ${(props) => props.theme.light.loading1};
`;

const Divider = styled.div``;

const PriceContainer = styled.div`
	display: grid;
	grid-gap: 5px;
	justify-content: center;
`;

const fadingAnimation = keyframes`

    50% {
        opacity: 0.5;
    }

    100% {
        opacity: 1;
    }

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

const Heading = styled(H3)`
	text-align: center;
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const CryptoPrice = styled(BodyMain)`
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
