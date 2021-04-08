import React, { useState } from 'react'
import styled from 'styled-components'
import { theme } from '../../Api/colorScheeme'
import { Dialog } from '../../components/Dialog'
import { NormalButton } from '../../styles/ButtonStyles'
import { NormalInput } from '../../styles/InputStyles'
import { ErrorMessage, H2, H3 } from '../../styles/TextStyles'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { sellCrypto } from '../../Api/Crypto'

const schema = yup.object().shape({
    type: yup.string().required(),
    amount: yup.number().required(),
    price: yup.number().required(),
    date: yup.string().matches(/^\s*(3[01]|[12][0-9]|0?[1-9])-(1[012]|0?[1-9])-((?:19|20)\d{2})\s*$/g).required()
});
export const SellCrypto = ({ isOpen, setState }) => {
    const [requestError, setRequestError] = useState("");
    
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });
    
    const cancel = () => {
        setState(prevState => ({
            ...prevState,
            sellIsOpen: false
        }))
    }

    const submitCrypto = async (data, e) => {
        console.log(data, e);
        const resp = await sellCrypto(data);
        if (resp.status === 200) {
            cancel()
        } else {
            const { message } = await resp.json()
            setRequestError(message)
        }
    }
    return (
		<Dialog isOpen={isOpen} onDismiss={cancel}>
			<DialogTitle>Add Crypto</DialogTitle>
			<form id="cryptoForm" onSubmit={handleSubmit(submitCrypto)}>
				<DialogContainer>
					<DialogLabel>Type</DialogLabel>
					<Input
						placeholder="Type"
						name="type"
						error={!!errors.type}
						ref={register}
					/>
					<DialogLabel>Amount</DialogLabel>
					<Input
						placeholder="Amount"
						type="number"
						name="amount"
						error={!!errors.amount}
						ref={register}
						step=".00001"
						min="0"
					/>
					<DialogLabel theme={theme}>Price</DialogLabel>
					<Input
						placeholder="Price"
						step=".00001"
						type="number"
						name="price"
						min="0"
						error={!!errors.price}
						ref={register}
					/>
					<DialogLabel theme={theme}>Date</DialogLabel>
					<Input
						placeholder="Date"
						name="date"
						error={!!errors.date}
						ref={register}
						step=".01"
					/>
				</DialogContainer>
				<ButtonContainer2>
					<Button theme={theme} type="submit">
						Sell Crypto
					</Button>
					<DialogButtonLabel2
						theme={theme}
						onClick={() => {
							cancel();
						}}
					>
						Cancel
					</DialogButtonLabel2>
				</ButtonContainer2>
			</form>
			{requestError && <ErrorMessage theme={theme}>{requestError}</ErrorMessage>}
		</Dialog>
	);
}
const Button = styled(NormalButton)`
    color: rgba(255,255,255, 0.8);
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

const DialogLabel = styled(H3)`
    text-align: left;
    font-size: 18px;
    margin-bottom: 15px;
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
        min-width: 250px;
    }
`

const Input = styled(NormalInput)`
`;

const DialogTitle = styled(H2)`
    text-align: center;
    margin-bottom: 20px;
`