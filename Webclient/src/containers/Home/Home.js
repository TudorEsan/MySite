import React from 'react'
import { H1, BodyMain, MediumText, SmallText, H2, BodyIntro } from '../../styles/TextStyles';
import { Card } from '../../styles/CardStyles';
import styled from 'styled-components'

function Home() {
    return (
        <>
            <Bulb1></Bulb1>
            <Bulb2>
                <ComputerWork src="./computer-work.svg" />
                <TextWrapper>    
                    <Title>Hi.<br/>Welcome to<br/>My Website!</Title>
                </TextWrapper>
            </Bulb2>
            <Wrapper>
                <ContentWrapper>
                    {/* <InfoCard>
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
                    </InfoCard> */}
                </ContentWrapper>
                {/* <Rectangle1></Rectangle1>
                <Rectangle2>
                    <WorkWrapper>
                        <CustomH2>What I <br />work with:</CustomH2>
                        <BodyIntroMedium>
                            I’ve mostly done Web Development, however I 
                            have have in mind to learn SwiftUI so i can create IOS apps.
                        </BodyIntroMedium>
                    </WorkWrapper>
                </Rectangle2> */}
            </Wrapper>
        </>
    )
}

export default Home;

const CustomH2 = styled(H2)`
    //transform: rotate(+20deg);
    height: 100%;
`
const BodyIntroMedium = styled(BodyIntro)`
    //transform: rotate(+20deg);
    width: 285px;

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

const Rectangle2 = styled.div`
    border: 1px solid black;
    position: relative;
    padding: 50px;
    width: 50%;
    height: 50%;
    background: url("/Rectangle1.svg") ;
    background: linear-gradient(317.89deg, #229AD2 5.14%, #22D2B2 88.9%);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 90px;
    
    transform: rotate(-20deg);
    // left: calc(0% - 793px/3);
`
const Rectangle1 = styled.div`

    width: 50%;
    height: 50%;
    border: 1px solid black;
    //left: calc(0% - 793px/3);
    /* Gradient 3 */
    background: url("/Rectangle2.svg");
    background: linear-gradient(180deg, #2242D2 43.75%, #5A22D2 65.62%);
    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
    border-radius: 90px;
    transform: rotate(-40deg);
    
`


const MyDescription = styled(BodyMain)`
    text-align: center;
    max-width: 80%;
`

const Wrapper = styled.div`
    height: 100%;
`

const InfoCard = styled(Card)`
    position: relative;
    margin: auto ;
    width: 80%;
    padding: 30px;
`
            
const ComputerWork = styled.img`
    width: 568px;
    height: 420px;
    left: calc(50% - 568px/2 - 202.5px);
    justify-content: center;
    align-content: center;
`

const Bulb1 = styled.div`
    position: absolute;
    background: url("/Vector2.svg") no-repeat;
    width: 100%;
    height: 100%;
    background-size: 100%;
`
const Bulb2 = styled.div`
    position: absolute;
    background: url("/Vector.svg") no-repeat;
    background-size: 100%;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto auto;
    justify-content: center;
    align-content: center;
`

const ContentWrapper = styled.div`
    max-width: 1234px;
    margin: 0 auto;
    padding: 200px 30px;
`

const TitleWrapper = styled.div`
    display: grid;
    position: realtive;
    grid-column-gap: 20px;
    grid-template-columns: 50% 50%;

`
const TextWrapper = styled.div`
    max-width: 360px;
    display: grid;
    grid-gap: 30px;
    justify-content: center;
    align-content: center;
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

`

const Title = styled(H1)`
    color: white;
`