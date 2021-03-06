import React, { useState } from 'react'
import styled from 'styled-components'
import { BodyMain, ErrorMessage, H2, MediumText, SmallText } from '../styles/TextStyles'
import { NormalInput } from '../styles/InputStyles'
import { Dialog } from './Dialog'
import { NormalButton } from '../styles/ButtonStyles'
import { theme } from '../Api/colorScheeme'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import Auth from "../Api/Authentification"

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});

export const Login = ({ isOpen, onDismiss }) => {
	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
		mode: "onBlur",
	});

    const [error, setError] = useState("");

	const onSubmit = async (data, e) => {
		const { password, username } = data;
        const resp = await Auth.login(username, password);
        if (!resp) {
            onDismiss();
        }
        else {
            setError(resp);
        }
	};
	return (
		<>
			<Dialog isOpen={isOpen} onDismiss={onDismiss}>
				<Container>
					<Title>Login</Title>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormContainer>
                            <Label>Username</Label>
                            <InputContainer error={errors.username}>
                                <Input
                                    error={errors.username}
                                    name="username"
                                    placeholder="Username"
                                    ref={register}
                                />
                            </InputContainer>
                            <Label>Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Password"
                                ref={register}
                                />
                        </FormContainer>
                        {error && (
                            <ErrorMessage theme={theme}>{ error }</ErrorMessage>
                        )}
						<Button type="submit" theme={theme}>
							<ButtonText theme={theme}>Login</ButtonText>
						</Button>
					</Form>
                </Container>
			</Dialog>
		</>
	);
};

const Form = styled.form`
    display: grid;
    justify-content: center;
`

const Error = styled(SmallText)`
    color: red;
`

const ButtonText = styled(MediumText)`
    color: white;
`

const Button = styled(NormalButton)`
    margin-top: 20px;
`

const Title = styled(H2)`
    text-align: center;
    margin-bottom: 20px;
`

const Container = styled.div`
    display: grid;
    grid-auto-flow: row;
    justify-content: center;

    min-width: 250px;
`
const FormContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-gap: 25px;
    align-items: center;
    @media(max-width: 400px) {
        grid-auto-flow: row;
        grid-template-columns: 1fr;
        grid-gap: 0px;
    }
`


const InputContainer = styled.div`
    position: relative;
    :before {
        position: absolute;
        content: ${(props) =>  props.error? `"${props.error.message}"`: 'none'};
        height: 10px;
        width: 100%;
        color: red;
        bottom: -5px;
        left: 10px;
    }

`



const Input = styled(NormalInput)`
    border: ${ props => !!props.error? '1px solid red' : ''};
`

const Label = styled(BodyMain)`
    padding: 10px;
`