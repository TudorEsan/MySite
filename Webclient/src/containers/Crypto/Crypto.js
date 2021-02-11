import React from 'react'
import styled from 'styled-components';
import { cryptoAmount } from '../../Data/cryptoData';
import { BodyIntro, BodyMain, H1, H2, H3, MediumText } from '../../styles/TextStyles';

function Crypto() {
    return (
        <>
            <Container>
                <TitleContainer>
                    <Title>My <br/>Cryptocurencies</Title>
                </TitleContainer>
                <Ilustration src='CryptoIlustration.svg'/>
            </Container>
            <Container2>
                <ButtonContainer>
                    <Button>
                        <ButtonLabel>Add Crypto</ButtonLabel>
                    </Button>
                    <Button>
                        <ButtonLabel>Reacurring Buy</ButtonLabel> 
                    </Button>
                </ButtonContainer>
                <Card>
                    <Heading>Overview</Heading>
                    <Amount>239.23 $</Amount>
                    <Percentage percentage={34}>+34%</Percentage>
                    {cryptoAmount.map((elem, index) => (
                        <CryptoContainer key={index}>
                            <CryptoImg src={elem.img} />
                            <CryptoName>{elem.name}</CryptoName>
                            <Divider></Divider>
                            <CryptoPrice>{elem.amount}</CryptoPrice>
                        </CryptoContainer>
                    ))}
                </Card>
            </Container2> 
        </>
    )
}

export default Crypto;

const Divider = styled.div`
`

const Heading = styled(H3)`
    text-align: center;
`

const Amount = styled(BodyMain)`
    text-align: center;
`

const Percentage = styled(MediumText)`
    text-align: center;
    color: ${props => (props.percentage >= 0)? 'green' : 'red'};
`

const CryptoPrice = styled(BodyIntro)`
    font-style: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 140%;
    text-align: right;
    @media(max-width: 444px) {
        font-size: 17px;
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

`

const CryptoImg = styled.img`
    object-fit: cover;
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
    margin: 0 auto;
    @media(max-width: 444px) {
        padding: 30px;
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
` 