import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Card } from '../../components/Card'
import { BodyMain, H3,H2 } from '../../styles/TextStyles'

export const ProfitCalculator = () => {
    const [profit, setProfit] = useState(0);
    const [form, setForm] = useState({
        buy: '',
        sell: '',
        fee: ''
    })
    const onChange = (e) => {
        const key = e.target.name;
        setForm((prevState) => ({
            ...prevState,
            [key]: e.target.value
        }))
    }
    const twoDecimals = (n) => {
        return Math.floor(n*100) / 100
    }

    const calcProfit = () => {
        try {
            return twoDecimals(form.sell * 100 / form.buy - (form.sell * 100 / form.buy) * form.fee / 100 - 100)
        } catch (e) {
            return 'NaN';
        }
    }

    useEffect(() => {
        setProfit(calcProfit())
    }, [form])

    return (
        <Container>
            <Card>
                <Title>Calculate Profit</Title>
                <InputContainer>
                    <form onChange={(e) => {onChange(e)}}>
                        <Input name="buy" placeholder="Buying Price" value={ form.buy }/>
                        <Input name="sell" placeholder="Selling Price" value={ form.sell }/>
                        <Input name="fee" placeholder="fee" value={ form.fee }/>    
                    </form>
                </InputContainer>
                <Heading>Growth: {profit} %</Heading>
            </Card>
        </Container>
    )
}

const Title = styled(H2)``
const Heading = styled(H3)``

const InputContainer = styled.div`
    display: grid;
    grid-gap: 10px;
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
  margin: 5px;
  :placeholder {
    color: #A3A7AE;
  }
  @media(max-width: 800px) {
      margin-bottom: 10px;
  }
  margin-top: 20px;
`;

const Container = styled.div`
    max-width: 1234px;
    display: grid; 
    justify-items: center;
    align-items: center;
    grid-gap: 25px;
    height: 100vh;
    margin: auto;
`
