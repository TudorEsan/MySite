import React, { createRef, useEffect, useState } from 'react'
import styled from 'styled-components';
import { cryptoAmount } from '../../Data/cryptoData';
import { BodyIntro, BodyMain, H1, H2, H3, MediumText } from '../../styles/TextStyles';
import { Dialog } from '../../components/Dialog'
import { getCryptoData, addCrypto } from '../../Api/Crypto'
import { theme } from '../../Api/colorScheeme';
import LoadingCrypto from './CryptoLoading';
 
function Crypto() {

    const [isOpen, setIsOpen] = useState(false);
    const [crypto, setCrypto] = useState(false);

    const openDialog = async () => {
        setIsOpen(true);
    }

    const cancel = () => {
        setIsOpen(false);
        document.getElementById("cryptoForm").reset();
    }

    const twoDigits = (n) => {
        return Math.trunc(n * 100) / 100;
    }

    const detectEsc = (e) => {
        if (e.keyCode == 27) {
            setIsOpen(false);
        }
    }

    useEffect(async () => {
        document.addEventListener("keydown", detectEsc, false)
        const data = await getCryptoData();
        setCrypto(data);
        return () => {
            console.log('destroyed')
            document.removeEventListener("keydown", detectEsc, false)
        }
    }, [])

    const submitCrypto = async (e) => {
        e.preventDefault();
        const { date, amount, type, usd } = e.target;
        const data = {
            date: date.value,
            amount: amount.value,
            type: type.value,
            usd: usd.value
        }
        const message = await addCrypto(data);

    }
    
    if (crypto !== false) {
        return (
            <>
                <Dialog isOpen={isOpen}>
                            <DialogTitle>Add Crypto</DialogTitle>
                            <form id="cryptoForm" onSubmit={submitCrypto}>
                                <DialogContainer>
                                    <DialogLabel>Type</DialogLabel>
                                    <Input placeholder='Type' name="type"/>
                                    <DialogLabel>USD</DialogLabel>
                                    <InputContainer>
                                        <Input placeholder='USD' type='number' name="usd"/>
                                    </InputContainer>
                                    <DialogLabel theme={theme} type='number' >Amount</DialogLabel>
                                    <Input placeholder="Amount" name='amount'/>
                                    <DialogLabel theme={theme} >Date</DialogLabel>
                                    <Input placeholder="Date" name='date'/>
                                </DialogContainer>
                                <ButtonContainer2>
                                    <DialogButton theme={theme}>
                                        <DialogButtonLabel theme={theme} type="submit">
                                        Add Crypto
                                        </DialogButtonLabel>
                                    </DialogButton >
                                    <DialogButtonLabel2 theme={theme} onClick={() => { cancel() }}>
                                        Cancel
                                    </DialogButtonLabel2>
                                </ButtonContainer2>
                            </form>
                        </Dialog>
                <SupremeContainer isOpen={isOpen}>
                <Container>
                    <TitleContainer>
                        <Title>My <br/>Cryptocurencies</Title>
                    </TitleContainer>
                    <Ilustration src='CryptoIlustration.svg'/>
                </Container>
                <Container2>
                    <ButtonContainer>
                        <Button theme={theme}>
                            <ButtonLabel onClick={() => {openDialog()}}>Add Crypto</ButtonLabel>
                        </Button>
                        <Button theme={theme}>
                            <ButtonLabel>Reacurring Buy</ButtonLabel> 
                        </Button>
                    </ButtonContainer>
                    <Card theme={theme}>
                        <Heading theme={theme} >Overview</Heading>
                        <Amount theme={theme} >{twoDigits(crypto.actualAmount)} USD</Amount>
                        <Percentage theme={theme} percentage={crypto.actualAmount - crypto.amountInvested}>{twoDigits(crypto.actualAmount - crypto.amountInvested)} USD {twoDigits(crypto.totalGrowth * 100)}%</Percentage>
                        
                        {Object.keys(crypto).map((key, index) => {
                            if (!['amountInvested', 'actualAmount', 'totalGrowth'].includes(key)) {
                                console.log(crypto[key])
                                return (
                                    <CryptoContainer key={index}>
                                        <CryptoImg src={crypto[key].icon} />
                                        <CryptoName theme={theme}>{crypto[key].name}</CryptoName>
                                        <Divider></Divider>
                                        <PriceContainer>
                                            <CryptoPrice theme={theme}>{twoDigits(crypto[key].currentUsd)}$</CryptoPrice>
                                            <SmallPercentage theme={theme} percentage={crypto[key].growth}>{ twoDigits(Math.abs(crypto[key].growth * 100))}%</SmallPercentage>
                                        </PriceContainer>
                                    </CryptoContainer>
                                )
                            }
                        })
                    }
                    </Card>
                    <Card theme={theme}>
                        <Heading theme={theme} >Transactions</Heading>
                        {Object.keys(crypto).map((key, index) => {
                            if (!['amountInvested', 'actualAmount', 'totalGrowth'].includes(key)) {
                                return (crypto[key].transactions.map((elem, index) => (
                                    <CryptoContainer key={index}>
                                            <CryptoImg src={crypto[key].icon} />
                                            <CryptoName theme={theme} >{crypto[key].name}</CryptoName>
                                    <Divider></Divider>
                                    <PriceContainer>
                                        <CryptoPrice theme={theme}>{elem.usd} $</CryptoPrice>
                                        <BuyingDate theme={theme}>{elem.date}</BuyingDate>
                                    </PriceContainer>
                                    </CryptoContainer>
                            )))  
                        }
                    })}
                    </Card>
                </Container2> 
        </SupremeContainer>
        </>
        )
    } else {
        return (
            <LoadingCrypto></LoadingCrypto>
            )
        }
    
}

export default Crypto;

const SupremeContainer = styled.div`
    filter: ${props => (props.isOpen === true) ? 'blur(5px)' : 'none'};
`     

const BuyingDate = styled(MediumText)`
    text-align: center;
    font-size: 15px;
    color: gray;
`

const Percentage = styled(MediumText)`
    text-align: center;
    color: ${props => (props.percentage >= 0)? 'green' : 'red'};
`

const SmallPercentage = styled(Percentage)`
    position: relative;
    font-size: 14px;

    :before {
        position: absolute;
        top: 50%;
        left: -7px;
        content: ${props => (props.percentage >= 0)? "url('/green_arrow.svg')" : "url('/red_arrow.svg')"};
        transform: translate(-50%, -50%);
    }

`

const PriceContainer = styled.div`
    display: grid;
    grid-gap: 5px;
    justify-items: center;
`


const DialogButtonLabel = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    color: white;
    text-align: center;
    cursor: pointer;
    width: 250px;

`
const DialogButtonLabel2 = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    color: #868686;
    text-align: center;
    cursor: pointer;
    :hover {
        text-decoration-line: underline;
    }
`

const ButtonContainer2 = styled.div`
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    justify-content: center;
    grid-gap: 10px;
`

const InputContainer = styled.div`
    position: relative;
    width: 100%;
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
    :before {
        position: absolute;
        top: 50%;
        content:"€";
        color: #A3A7AE;
        transform: translate(-50%, -50%);
        right: 0px;
        font-size: 18px;
    }
`

const DialogLabel = styled(H3)`
    text-align: left;
    font-size: 18px;
    padding: 10px;
`

const DialogContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 7fr;
    // justify-items: center;
    grid-gap: 15px;
    align-items: center;
    margin-bottom: 15px;

    @media(max-width: 800px) {
        grid-template-columns: 1fr;
        grid-gap: 0px;
    }
`

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  font-size: 18px;
  padding: 10px;
  margin: 10px 0px 10px 10px;
  background: #DADFE9;
  border: none;
  border-radius: 3px;
  :placeholder {
    color: #A3A7AE;
  }
  @media(max-width: 800px) {
      margin-bottom: 10px;
  }
`;

const DialogTitle = styled(H2)`
    text-align: center;
    margin-bottom: 20px;
`

const Divider = styled.div`
`

const Heading = styled(H3)`
    text-align: center;
    @media(prefers-color-scheme: dark) {
        color: ${props => props.theme.dark.primaryTextColor};
    }
`

const Amount = styled(BodyMain)`
    text-align: center;
    @media(prefers-color-scheme: dark) {
        color: ${props => props.theme.dark.primaryTextColor};
    }
`

const CryptoPrice = styled(BodyIntro)`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 140%;
    text-align: center;
    @media(max-width: 444px) {
        font-size: 17px;
    }
    @media(prefers-color-scheme: dark) {
        color: ${props => props.theme.dark.primaryTextColor};
    }
`

const CryptoName = styled(BodyIntro)`
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    text-align: left;
    @media(max-width: 444px) {
        font-size: 17px;
    }
    @media(prefers-color-scheme: dark) {
        color: ${props => props.theme.dark.primaryTextColor};
    }

`

const CryptoImg = styled.img`
    object-fit: contain;
    max-height: 60px;
    max-width: 60px;
`

const CryptoContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 52px auto auto auto;
    grid-auto-flow: column;
    grid-gap: 20px;
    align-items: center;
    margin: 20px 0px;
    
` 

const Card = styled.div`
    background: #F2F6FF;
    box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.25);
    border-radius: 76px;
    padding: 50px;
    display: grid;
    grid-auto-flow: row;
    align-items: center;
    width: 80%;
    max-width: 900px;
    margin: 0 auto 100px;
    @media(max-width: 444px) {
        padding: 30px;
    }
    @media (prefers-color-scheme: dark) {
        background: ${ props => props.theme.dark.dialogColor  }
    }
`

const ButtonContainer = styled.div`
    display: grid;
    justify-content: center;
    align-items: center;
    grid-auto-flow: column;
    grid-gap: 30px;
    margin-bottom: 15px;
`

const ButtonLabel = styled(BodyIntro)`
    color: white;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
    text-align: center;
    cursor: pointer;
    @media(max-width: 444px) {
        font-size: 17px;
    }
`

const Button = styled.div`
    filter: drop-shadow(0px 10px 20px rgba(0, 0, 0, 0.25));
    background: #229AD2;
    border-radius: 50px;
    padding: 5px 15px;
    transition: 0.3s ease-out;
    :hover {
        transform: scale(1.05);
    }
    @media(prefers-color-scheme: dark) {
        background: ${ props => props.theme.dark.gradient1 }
    }
`

const DialogButton = styled(Button)`
    transition: 0s;
    @media(prefers-color-scheme: dark) {
        background: ${ props => props.theme.dark.gradient1 }
    }
`

const Container2 = styled.div`
    display: grid;
    grid-auto-flow: row;
    width: auto;
    margin-top: 50px;
    @media(max-width:444px) {
        margin: 0;
    }
` 

const Ilustration = styled.img`
    margin: auto;
    max-width: 80%;
    @media(max-width:444px) {
        margin: 0 auto;
    }
    @media (prefers-color-scheme: dark) { 
        content: url("/CryptoIlustration_dark.svg")
    }
`

const Title = styled(H2)`
    max-width: 80%;
    color: white;
`

const Container = styled.div`
    height: 80vh;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 50% 50%;
    @media(max-width: 444px) {
        height: 80vh;
        grid-auto-flow: row;
        grid-template-rows: 50% 50%;
        grid-template-columns: 100%;
        grid-gap: 50px;
    }

`
const TitleContainer = styled.div`
    height: 80vh;
    background: url('/CryptoBackground.svg') no-repeat center left;
    display: flex;
    background-size: contain;
    align-items: center;
    justify-content: center;
    @media(max-width:444px) {
        height: 50vh;
    }
    @media (prefers-color-scheme: dark) {
        background: url('/CryptoBackground_dark.svg') no-repeat center left;
        background-size: contain;
    }
` 