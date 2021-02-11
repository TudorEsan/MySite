import React, { useState } from 'react'
import { withRouter } from 'react-router';
import styled from 'styled-components'
import { BodyIntro, H1, H2 } from '../../styles/TextStyles';

class Contact extends React.Component {


    constructor() {
        super();
        this.state = {
            name: "",
            email:""
        }
    }

    onSubmit = async (e) => {
        // e.preventDefault();
        // const { name, email, subject, body } = e.target;
        // const message = {
        //     name: name.value,
        //     body: body.value,
        //     ...(!!subject.value && {subject: subject.value}),
        //     ...(!!email.value && {email: email.value})
        // }; 
        console.log("adsasdasd")
        // sendMessage(message);
    }

    onChange = (e) => {
        const {value, name} = e.target;
        this.setState({
            ...this.state,
            [name]: value
        });
    }
    render(){
        return (
            <>
            </>
        )
    }
}

const ComputerWork = styled.img`
    max-width: 60%;
`

const TextContainer = styled.div`
    width: 721px;
    padding-left: 150px;
`


const RectContainer = styled.div`
    width: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    

    :before {
        content: "";
        width: 721px;
        height: 663px;
        position: absolute;
        background: linear-gradient(180deg, #2242D2 43.75%, #5A22D2 65.62%);
        left: -100px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        border-radius: 90px;
        transform: rotate(-40deg);
        z-index: -2;
    }
    :after {
        left: -100px;
        box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
        content: "";
        width: 721px;
        height: 663px;
        position: absolute;
        background: linear-gradient(317.89deg, #229AD2 5.14%, #22D2B2 88.9%);
        border-radius: 90px;
        transform: rotate(-20deg);
        z-index: -1;
    }
`   
const RectContainer2 = styled.div`
    width: 50%;
`

const Container = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('/Vector.svg') top center no-repeat;
    background-size: cover;

    @media(max-width: 920px) {
        flex-direction: column;
    }
`

const Container2 = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    position: relative;
    @media(max-width: 920px) {
        flex-direction: column;
    }
`

const Title = styled(H1)`
    margin-top: 40px;
    color: white;
    text-align: center;
`

const CustomH2 = styled(H2)`
    //transform: rotate(+20deg);
    height: 100%;
`
const BodyIntroMedium = styled(BodyIntro)`
    //transform: rotate(+20deg);
    width: 285px;

`
export default withRouter(Contact)
