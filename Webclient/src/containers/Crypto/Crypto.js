import React from "react";
import styled from "styled-components";
import {
	BodyIntro,
	BodyMain,
	H2,
	H3,
	MediumText,
} from "../../styles/TextStyles";
import { getCryptoData } from "../../Api/Crypto";
import { theme } from "../../Api/colorScheeme";
import LoadingCrypto from "./CryptoLoading";
import { AddCryptoDialog } from "./AddCryptoDialog";
import { Component } from "react";
import { SellCrypto } from "./SellCrypto";
import { Login } from "../../components/Login";
import Auth from "../../Api/Authentification";
import { NormalButton } from "../../styles/ButtonStyles";

class Crypto1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			crypto: false,
			sellIsOpen: false,
			shouldLogin: false
		};
		this.setState = this.setState.bind(this);
	}

	closeLoginDialog = () => {
		this.setState((prevState) => ({
			...prevState,
			shouldLogin: false
		}))
	}

	openAddDialog = () => {
		if (!Auth.isLogedIn()) {
			this.setState((prevState) => ({
				...prevState,
				shouldLogin: true
			}));
		} else {
			this.setState((prevState) => ({
				...prevState,
				isOpen: true,
			}));
		}
	};
	openSellDialog = () => {
		if (!Auth.isLogedIn()) {
			this.setState((prevState) => ({
				...prevState,
				shouldLogin: true
			}));
		} else {
			this.setState((prevState) => ({
				...prevState,
				sellIsOpen: true,
			}));
		}
	};
	cancel = () => {
		this.setState((prevState) => ({
			...prevState,
			isOpen: false,
			sellIsOpen: false,
		}));
	};
	twoDigits = (n) => {
		return Math.trunc(n * 100) / 100;
	};
	detectEsc = (e) => {
		if (e.keyCode == 27) {
			this.cancel();
		}
	};

	async componentDidMount() {
		document.addEventListener("keydown", this.detectEsc, false);
		let data = await getCryptoData();
		this.setState((prevState) => ({
			...prevState,
			crypto: data,
		}));
		setInterval(async () => {
			data = await getCryptoData();
			this.setState((prevState) => ({
				...prevState,
				crypto: data,
			}));
		}, 300000);
	}
	componentWillUnmount() {
		document.removeEventListener("keydown", this.detectEsc, false);
	}

	render() {
		if (this.state.crypto) {
			return (
				<>
					{this.state.shouldLogin && (	
						<Login
							isOpen={this.state.shouldLogin}
							onDismiss={this.closeLoginDialog}
						/>
					)}
					{ this.state.isOpen && (
						<AddCryptoDialog
							isOpen={this.state.isOpen}
							setState={this.setState}
						/>
					)}
					{!!this.state.sellIsOpen && (
						<SellCrypto
							isOpen={this.state.sellIsOpen}
							setState={this.setState}
						/>
					)}
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
								<ButtonLabel
									onClick={() => {
										this.openAddDialog();
									}}
								>
									Add Crypto
								</ButtonLabel>
							</Button>
							<Button
								theme={theme}
								onClick={() => {
									this.openSellDialog();
								}}
							>
								<ButtonLabel>Sell</ButtonLabel>
							</Button>
						</ButtonContainer>
						<Card theme={theme}>
							<Heading theme={theme}>Overview</Heading>
							<Amount theme={theme}>
								{this.twoDigits(this.state.crypto.actualAmount)}{" "}
								USD
							</Amount>
							<Percentage
								theme={theme}
								percentage={
									this.state.crypto.actualAmount -
									this.state.crypto.amountInvested
								}
							>
								{this.twoDigits(
									this.state.crypto.actualAmount -
										this.state.crypto.amountInvested
								)}{" "}
								USD{" "}
								{this.twoDigits(
									this.state.crypto.totalGrowth * 100
								)}
								%
							</Percentage>

							{Object.keys(this.state.crypto).map(
								(key, index) => {
									if (
										![
											"amountInvested",
											"actualAmount",
											"totalGrowth",
										].includes(key)
									) {
										return (
											<CryptoContainer key={index}>
												<CryptoImg
													src={
														this.state.crypto[key]
															.icon
													}
												/>
												<CryptoName theme={theme}>
													{
														this.state.crypto[key]
															.name
													}
												</CryptoName>
												<Divider></Divider>
												<PriceContainer>
													<CryptoPrice theme={theme}>
														{this.twoDigits(
															this.state.crypto[
																key
															].currentUsd
														)}
														$
													</CryptoPrice>
													<SmallPercentage
														theme={theme}
														percentage={
															this.state.crypto[
																key
															].growth
														}
													>
														{this.twoDigits(
															Math.abs(
																this.state
																	.crypto[key]
																	.growth *
																	100
															)
														)}
														%
													</SmallPercentage>
												</PriceContainer>
											</CryptoContainer>
										);
									}
									return;
								}
							)}
						</Card>
						<Card theme={theme}>
							<Heading theme={theme}>Transactions</Heading>
							{Object.keys(this.state.crypto).map(
								(key, index) => {
									if (
										![
											"amountInvested",
											"actualAmount",
											"totalGrowth",
										].includes(key)
									) {
										return this.state.crypto[
											key
										].transactions.map((elem, index) => {
											if (elem.type !== "sold") {
												return (
													<CryptoContainer
														key={index}
													>
														<CryptoImg
															src={
																this.state
																	.crypto[key]
																	.icon
															}
														/>
														<CryptoName
															theme={theme}
														>
															{
																this.state
																	.crypto[key]
																	.name
															}
														</CryptoName>
														<Divider></Divider>
														<PriceContainer>
															<CryptoPrice
																theme={theme}
															>
																{elem.usd} $
															</CryptoPrice>
															<BuyingDate
																theme={theme}
															>
																{elem.date}
															</BuyingDate>
														</PriceContainer>
													</CryptoContainer>
												);
											}
											return;
										});
									}
								}
							)}
						</Card>
					</Container2>
				</>
			);
		} else {
			return <LoadingCrypto></LoadingCrypto>;
		}
	}
}

export default Crypto1;

const SupremeContainer = styled.div`
	filter: ${(props) => (props.isOpen === true ? "blur(5px)" : "none")};
`;

const BuyingDate = styled(MediumText)`
	text-align: center;
	font-size: 15px;
	color: gray;
`;

const Percentage = styled(MediumText)`
	text-align: center;
	color: ${(props) => (props.percentage >= 0 ? "green" : "red")};
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

const PriceContainer = styled.div`
	display: grid;
	grid-gap: 5px;
	justify-items: center;
`;

const Divider = styled.div``;

const Heading = styled(H3)`
	text-align: center;
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
	object-fit: contain;
	max-height: 60px;
	max-width: 60px;
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

const Button = styled(NormalButton)`
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
`;

const Container = styled.div`
	height: 80vh;
	display: grid;
	grid-auto-flow: column;
	grid-template-columns: 50% 50%;
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
	@media (max-width: 444px) {
		height: 50vh;
	}
	@media (prefers-color-scheme: dark) {
		background: url("/CryptoBackground_dark.svg") no-repeat center left;
		background-size: contain;
	}
`;
