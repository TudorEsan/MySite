import React, { useEffect } from 'react'
import { H1, BodyMain, MediumText, SmallText, H2, BodyIntro } from '../../styles/TextStyles';
import { Card } from '../../styles/CardStyles';
import styled from 'styled-components'
import { theme } from '../../Api/colorScheeme';

function Home() {


    return (
        <>
            <Container>
                <ComputerWork src="/computer-work.svg" />
                <Title theme={theme}>Hi.<br/>Welcome to<br/>My Website!</Title>
            </Container>
            <ContentWrapper>
                    <InfoCard theme={theme}>
                        <DescriptionWrapper>
                            <ShortDescription>
                                <Avatar />
                                <MediumText>
                                    Tudor Esan 
                                </MediumText>
                                <SmallText> 
                                    Sibiu, Romania
                                </SmallText>
                            </ShortDescription>
                            <MyDescription>
                                Passionate about programming and ways in which technology can improve 
                                our everyday lives. I find Computer Science and Artificial Intelligence 
                                interesting, since abstracting real world problems into code is very 
                                fascinating.
                            </MyDescription>
                        </DescriptionWrapper>
                    </InfoCard>
            </ContentWrapper>
            <Container2>
                <RectContainer>
                    <TextContainer>
                        <CustomH2>What I work with:</CustomH2>
                        <BodyIntroMedium>
                            I’ve mostly done Web Development, however I 
                            have have in mind to learn SwiftUI so i can create IOS apps.
                        </BodyIntroMedium>
                    </TextContainer>
                </RectContainer>
                <RectContainer2>
                    <Icon >
                        <Img src='./javascript.svg'/>
                    </Icon>
                    <Icon >
                        <Img src='./Express.svg'/>
                    </Icon>
                    <Icon >
                        <Img src='./nodejs.svg'/>
                    </Icon>
                    <Icon >
                        <Img src='./react.svg'/>
                    </Icon>
                </RectContainer2>
            </Container2>
            
        </>
    )
}

export default Home;

const Img = styled.img`
    height: 30px;
    max-width: 30px;
`

const Icon = styled.div`
    width: 72px;
    height: 72px;
    display: grid;
    justify-content: center;
    align-items: center;
    filter: drop-shadow(0px 5px 10px rgba(0, 0, 0, 0.25));
    background: #18204D;
    border-radius: 50%;
    @media(max-width: 444px) { 
        width: 50px;
        height: 50px;
    }
`

const ComputerWork = styled.img`
    max-width: 60%;
    @media(max-width: 520px) {
        max-width: 70%;
    }
`

const TextContainer = styled.div`
    width: 721px;
    padding-left: 150px;
    @media(max-width: 444px) {
        margin: 0 auto;
        padding: 0;
    }
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
        @media(max-width: 444px) {
            width: 444px;
            height: 444px;
        }
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
        @media(max-width: 444px) {
            width: 444px;
            height: 444px;
        }
    }
`   
const RectContainer2 = styled.div`
    width: 50%;
    display: grid;
    grid-auto-flow: column;
    grid-gap: 15px;
    @media(max-width: 444px) {
        margin-top: 20px;
        width: 100px;
        justify-content: center;
        
    }
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
        height: 80vh;
    }
    @media (prefers-color-scheme: dark) {
        background: url('/Vector1_dark.svg') top center no-repeat;
        background-size: cover;
    }
`

const Container2 = styled.div`
    height: 80vh;
    display: flex;
    align-items: center;
    position: relative;
    z-index: 100;
    @media(max-width: 444px) {
        overflow: hidden;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
`

const Title = styled(H1)`
    margin-top: 40px;
    color: white;
    text-align: center;
    @media (prefers-color-scheme: dark) {
        color: ${props => props.theme.dark.titleColor};
    }
    @media(max-width: 414px) {
        font-size: 40px;
        line-height: 41px;
    }
`

const CustomH2 = styled(H2)`
    //transform: rotate(+20deg);
    height: 100%;
    @media(max-width: 444px) {
        text-align: center;
    }
`
const BodyIntroMedium = styled(BodyIntro)`
    //transform: rotate(+20deg);
    width: 285px;
    @media(max-width:444px) {
        margin-top: 15px;
        font-size: 15px;
        line-height: 130%;
        text-align: center;
    }

`

const WorkWrapper = styled.div`
    display: grid;
    justify-items: right;
    align-items: center;
    height: 100%;
    grid-template-rows: auto auto;
    border: 1px solid black;
    width: 100%;
    
    grid-gap: 20px;
`
const MyDescription = styled(BodyMain)`
    text-align: center;
    max-width: 80%;
    @media(max-width:444px) {
        font-size: 17px;
        line-height: 140%;
        max-width: 100%;
    }
`


const InfoCard = styled(Card)`
    width: 100%;
    padding: 30px;
    @media (prefers-color-scheme: dark) {
        background: {blue};
    }
`

const ContentWrapper = styled.div`
    height: 100vh;
    display: flex; 
    justify-content: center;
    align-items: center;
    max-width: 1234px;
    margin: 0 auto;
    padding: 200px 30px;
    @media(max-width: 444px) {
        height: 80vh;
    }
`

const ShortDescription = styled.div`
    display: grid;
    grid-template-rows: auto auto auto;
    justify-items: center;
    grid-gap: 4px;
    
`

const DescriptionWrapper = styled.div`
    display: grid;
    justify-items: center;
    grid-template-rows: auto auto;
    grid-gap: 30px;
`

const Avatar = styled.div`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    margin: 5px;
    background: url("/MyPhoto.jpg");
    background-position: 12px -5px;
    background-size: cover;
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    @media(max-width: 414px) {
        width: 125px;
        height: 125px;
    }

`