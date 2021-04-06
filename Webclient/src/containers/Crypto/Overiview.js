import React from "react";
import styled from "styled-components";
import { theme } from "../../Api/colorScheeme";
import { BodyIntro, BodyMain, H3, MediumText } from "../../styles/TextStyles";

export const Overiview = ({ statistics }) => {
	const twoDigits = (n) => {
		return Math.trunc(n * 100) / 100;
	};

	return (
		<Card theme={theme}>
			<Heading theme={theme}>Overview</Heading>
			<Amount theme={theme}>
				{twoDigits(statistics.actualAmount)} USD
			</Amount>
			<Percentage theme={theme} percentage={statistics.growth}>
				USD {twoDigits(statistics.growth)}%
			</Percentage>

			{statistics.coins.map((coin, index) => (
				<CryptoContainer key={index}>
					<CryptoImg src={coin.icon} />
					<CryptoName theme={theme}>{coin.abbreviation}</CryptoName>
					<PriceContainer>
						<CryptoPrice theme={theme}>
							{twoDigits(coin.currentPrice)}$
						</CryptoPrice>
						<SmallPercentage theme={theme} percentage={coin.growth}>
							{twoDigits(coin.growth)}%
						</SmallPercentage>
					</PriceContainer>
				</CryptoContainer>
			))}
		</Card>
	);
};

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

const Heading = styled(H3)`
	text-align: center;
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const CryptoContainer = styled.div`
	display: grid;
	width: 100%;
	grid-template-columns: 52px auto auto;
	grid-auto-flow: column;
	grid-gap: 20px;
	align-items: center;
	margin: 20px 0px;
`;

const CryptoImg = styled.img`
	object-fit: contain;
	max-height: 60px;
	max-width: 60px;
`;

const CryptoName = styled(BodyIntro)`
	font-style: normal;
	font-weight: 500;
	font-size: 20px;
	line-height: 29px;
	text-align: left;
	@media (max-width: 444px) {
		font-size: 17px;
	}
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const Percentage = styled(MediumText)`
	text-align: center;
	color: ${(props) => (props.percentage >= 0 ? "green" : "red")};
`;

const Divider = styled.div``;

const PriceContainer = styled.div`
	display: grid;
	grid-gap: 5px;
	justify-items: center;
	margin: 0 0 0 auto;
`;

const SmallPercentage = styled(Percentage)`
	position: relative;
	font-size: 14px;

	:before {
		position: absolute;
		top: 50%;
		left: -7px;
		content: ${(props) =>
			props.percentage >= 0
				? "url('/green_arrow.svg')"
				: "url('/red_arrow.svg')"};
		transform: translate(-50%, -50%);
	}
`;

const CryptoPrice = styled(BodyIntro)`
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 140%;
	text-align: center;
	@media (max-width: 444px) {
		font-size: 17px;
	}
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;

const Amount = styled(BodyMain)`
	text-align: center;
	@media (prefers-color-scheme: dark) {
		color: ${(props) => props.theme.dark.primaryTextColor};
	}
`;
