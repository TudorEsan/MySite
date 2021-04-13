import React from "react";
import styled from "styled-components";
import { BodyIntro, H2 } from "../../styles/TextStyles";
import { getCryptoData } from "../../Api/Crypto";
import { theme } from "../../Api/colorScheeme";
import LoadingCrypto from "../../components/Crypto/CryptoLoading";
import { AddCryptoDialog } from "../../components/Crypto/AddCryptoDialog";
import { Component } from "react";
import { SellCrypto } from "../../components/Crypto/SellCrypto";
import { Login } from "../../components/Login";
import Auth from "../../Api/Authentification";
import { NormalButton } from "../../styles/ButtonStyles";
import { Overiview } from "../../components/Crypto/Overiview";
import { Transactions } from "../../components/Crypto/Transactions";
import { LoadingOverview } from "../../components/Crypto/LoadingOverview";
import { LoadingTransactions } from "../../components/Crypto/LoadingTransactions";

class Crypto1 extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			crypto: false,
			sellIsOpen: false,
			shouldLogin: false,
		};
		this.setState = this.setState.bind(this);
	}

	closeLoginDialog = () => {
		this.setState((prevState) => ({
			...prevState,
			shouldLogin: false,
		}));
	};

	openAddDialog = () => {
		if (!Auth.isLogedIn()) {
			this.setState((prevState) => ({
				...prevState,
				shouldLogin: true,
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
				shouldLogin: true,
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
	detectEsc = (e) => {
		if (e.keyCode === 27) {
			this.cancel();
		}
	};

	getTransactions = (statistics) => {
		const transactions = [];
		for (let coin of statistics.coins) {
			for (let transaction of coin.transactions) {
				transactions.push({
					...transaction,
					icon: coin.icon,
					abbreviation: coin.abbreviation,
				});
			}
		}
		return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
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
					{this.state.isOpen && (
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
							<Button
								theme={theme}
								onClick={() => {
									this.openAddDialog();
								}}
							>
								<ButtonLabel>Add Crypto</ButtonLabel>
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
					</Container2>
					{this.state.crypto && (
						<>
							<Overiview statistics={this.state.crypto} />
							<Transactions
								transactions={this.getTransactions(
									this.state.crypto
								)}
							/>
						</>
					)}
					{!!this.state.crypto && (
						<>
							<LoadingCrypto />
							<LoadingTransactions />
						</>
					)}
					<Footer></Footer>
				</>
			);
		} else {
			return <LoadingCrypto></LoadingCrypto>;
		}
	}
}

export default Crypto1;

const Footer = styled.div`
	height: 1px;
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
	font-size: 20px;
	line-height: 29px;
	text-align: center;
	cursor: inherit;
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
