import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { NormalButton } from "../../styles/ButtonStyles";
import { NormalInput, NormalTextField } from "../../styles/InputStyles";
import { BodyIntro, ErrorMessage, H2, H3 } from "../../styles/TextStyles";
import { theme } from "../../Api/colorScheeme";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import MessageLogic from "../../Api/Messages";
import emailjs from 'emailjs-com'
import { ReactComponent as ContactLogo } from "./contact_ilustration.svg";

const schema = yup.object().shape({
	name: yup.string().required(),
	recieverEmail: yup.string().email().required(),
	message: yup.string().required(),
});

const Contact = () => {
	const { register, handleSubmit, errors, reset } = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
	});
	const [error, setError] = useState("");
	const onSend = async (data, e) => {
		console.log(data)
		const resp = await emailjs.send("service_2hogqhq", "template_223rjog", data);
		console.log(resp);
		reset();
	};

	return (
		<>
			<Wrapper>
				<Container1>
					<TextContainer>
						<CustomH2>Contact</CustomH2>
						<BodyIntroMedium>
							You can contact me through this form or by sending
							me an email
						</BodyIntroMedium>
					</TextContainer>
					<ContactIlustration />
				</Container1>
			</Wrapper>
			<Container2>
				<Background />
				<Container3>
					<Form onSubmit={handleSubmit(onSend)}>
						<CustomH3>Send a Message</CustomH3>
						<Input
							placeholder="Name"
							name="name"
							ref={register}
							error={errors.name}
						/>
						<Input
							placeholder="Email"
							name="recieverEmail"
							ref={register}
							error={errors.recieverEmail}
						/>
						<TextField
							placeholder="Message"
							name="message"
							ref={register}
							error={errors.message}
						/>
						{error && <ErrorMessage>{error}</ErrorMessage>}
						<Button type="submit" theme={theme}>
							Send
						</Button>
					</Form>
					<Divider></Divider>
					<div style={{ margin: "auto" }}>
						<AlternativeContactWrapper>
							<Icon src="/mailIcon.svg" />
							<Text>tudor.esan@icloud.com</Text>
							<Icon src="/instagramIcon.svg" />
							<Text>tudoresan</Text>
							<Icon src="/phoneIcon.svg" />
							<Text>+40 757 491 686</Text>
						</AlternativeContactWrapper>
					</div>
				</Container3>
			</Container2>
			<Footer></Footer>
		</>
	);
};




const CustomH3 = styled(H3)`
	font-size: 25px;
	margin-bottom: 15px;
	color: rgba(255, 255, 255, 0.9);
	@media (max-width: 600px) {
		font-size: 20px;
	}
`;

const Button = styled(NormalButton)`
	width: 80px;
	background: linear-gradient(260.12deg, #22d2b2 54.01%, #229ad2 81.63%);
	@media (prefers-color-scheme: dark) {
		background: linear-gradient(260.12deg, #22d2b2 54.01%, #229ad2 81.63%);
	}
`;

const Divider = styled.div`
	@media (max-width: 600px) {
		display: none;
	}
`;

const Input = styled(NormalInput)`
	margin-bottom: 15px;
`;
const TextField = styled(NormalTextField)`
	margin-bottom: 15px;
`;

const Text = styled(BodyIntro)`
	color: rgba(255, 255, 255, 0.9);
	font-size: 20px;
	@media (max-width: 295px) {
		font-size: 17px;
	}
`;

const Icon = styled.img`
	height: 44px;
	display: inline-block;
	margin-right: 15px;
	filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
	overflow: visible;
`;

const AlternativeContactWrapper = styled.div`
	display: grid;
	grid-template-rows: auto auto auto;
	grid-template-columns: auto auto;
	grid-gap: 15px;
	justify-content: center;
	align-items: center;
`;

const Container3 = styled.div`
	padding: 20px;
	height: 70%;
	max-width: 1234px;
	margin: auto;
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	@media (max-width: 600px) {
		grid-template-columns: auto;
		grid-template-rows: auto auto;
		padding: 0;
		height: 80%;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const Footer = styled.div`
	height: 50px;
`;

const Background = styled.img`
	position: absolute;
	content: url("/contactBackgroundBulb.svg");
	z-index: -100;
	width: 100%;
	height: 100%;
	@media (prefers-color-scheme: dark) {
		content: url("/contactDarkBackground.svg");
	}
	@media (max-width: 600px) {
		content: url("/contactSmallBackground.svg");
		@media (prefers-color-scheme: dark) {
			content: url("/contactSmallDarkBackground.svg");
		}
	}
`;

const Container2 = styled.div`
	position: relative;
	display: grid;
	width: 100%;
	height: 70vh;
	@media (max-width: 600px) {
		height: 90vh;
		@media (max-height: 770px) {
			height: 750px;
		}
	}
`;

const cloudAnimation = keyframes`
	from { transform: translateX(-80%); opacity: 100%; }
	to { transform: translateX(70%); opacity: 50%; }
`;

const ContactIlustration = styled(ContactLogo)`
	position: relative;
	width: 100%;
	max-width: 540px;
	margin: 0 auto;
	overflow: visible;
	#Cloud4 {
		animation: ${cloudAnimation} 25s linear infinite;
	}
	#Cloud3 {
		animation: ${cloudAnimation} 20s linear infinite;
	}
	#Cloud2 {
		animation: ${cloudAnimation} 15s linear infinite;
	}
	#Cloud1 {
		animation: ${cloudAnimation} 17s linear infinite;
	}
`;

const CustomH2 = styled(H2)`
	text-align: left;
	color: rgba(0, 0, 0, 0.9);
	@media (max-width: 750px) {
		font-size: 30px;
	}
	@media (max-width: 450px) {
		text-align: center;
	}
	@media (prefers-color-scheme: dark) {
		color: rgba(255, 255, 255, 0.9);
	}
`;
const BodyIntroMedium = styled(BodyIntro)`
	color: rgba(0, 0, 0, 0.9);
	@media (max-width: 750px) {
		font-size: 16px;
	}
	@media (max-width: 450px) {
		font-size: 17px;
		max-width: 100%;
		text-align: center;
	}
	@media (prefers-color-scheme: dark) {
		color: rgba(255, 255, 255, 0.9);
	}
`;

const Wrapper = styled.div`
	width: 90%;
	margin: 0 auto;
	max-width: 1234px;
	padding: 30px;
	@media (max-width: 620px) {
		width: 100%;
	}
`;
const TextContainer = styled.div`
	display: grid;
	grid-gap: 16px;
	max-width: 300px;
`;

const Container1 = styled.div`
	height: 40vh;
	margin-top: 40px;
	display: grid;
	grid-template-columns: 4fr 6fr;
	justify-items: center;
	align-items: center;

	@media (max-width: 620px) {
		grid-gap: 15px;
	}
	@media (max-width: 450px) {
		margin-top: 40px;
		grid-template-columns: 1fr;
		grid-auto-flow: row;
		grid-gap: 0px;
	}
`;

export default Contact;
