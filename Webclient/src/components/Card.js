import React from 'react'
import styled from 'styled-components'
import { theme } from '../Api/colorScheeme'

export const Card = ({children}) => {
    return (
        <MyCard theme={theme}>
            {children}
        </MyCard>
    )
}

const MyCard = styled.div`
    background: rgba(242, 246, 255, 0.97);
    box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.25);
    border-radius: 36px;
    padding: 40px;
    filter: drop-shadow(0px 15px 30px rgba(0, 0, 0, 0.25));
`
