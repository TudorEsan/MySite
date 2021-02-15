import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { cryptoAmount } from '../../Data/cryptoData';
import { BodyIntro, BodyMain, H1, H2, H3, MediumText } from '../../styles/TextStyles';
import { Dialog } from '../../Components/Dialog'
function Crypto() {

    const [isOpen, setIsOpen] = useState(false);

    const addCrypto = () => {
        setIsOpen(true);
    }

    const cancel = () => {
        setIsOpen(false);
    }

    const detectEsc = (e) => {
        if (e.keyCode == 27) {
            setIsOpen(false);
            console.log('afa')
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", detectEsc, false)
        return () => {
            document.removeEventListener("keydown", detectEsc, false)
        }
    }, [])

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
                        <ButtonLabel onClick={() => {addCrypto()}}>Add Crypto</ButtonLabel>
                    </Button>
                    <Button>
                        <ButtonLabel>Reacurring Buy</ButtonLabel> 
                    </Button>
                </ButtonContainer>
                <Card>
                    <Heading>Overview</Heading>
                    <Amount>239.23 $</Amount>
                    <Percentage percentage={34}>+34%</Percentage>
                    <Dialog isOpen={isOpen}>
                        <DialogTitle>Add Crypto</DialogTitle>
                        <DialogContainer>
                            <DialogLabel>Type</DialogLabel>
                            <Input placeholder='Type'/>
                            <DialogLabel>Amount</DialogLabel>
                            <InputContainer>
                                <Input placeholder='Amount' />
                            </InputContainer>
                            <DialogLabel>Date</DialogLabel>
                            <Input placeholder="Date" />
                        </DialogContainer>
                        <ButtonContainer2>
                            <DialogButton>
                                <DialogButtonLabel>
                                Add Crypto
                                </DialogButtonLabel>
                            </DialogButton>
                            <DialogButtonLabel2 onClick={() => { cancel() }}>
                                Cancel
                            </DialogButtonLabel2>
                            </ButtonContainer2> 
                    </Dialog>
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

const DialogButtonLabel = styled.p`
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    color: white;
    text-align: center;
    cursor: pointer;

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
`;

const DialogTitle = styled(H2)`
    text-align: center;
    margin-bottom: 20px;
`

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

const DialogButton = styled(Button)`
    transition: 0s;
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