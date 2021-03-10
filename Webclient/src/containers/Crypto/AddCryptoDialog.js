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
import { addCrypto } from '../../Api/Crypto'

const schema = yup.object().shape({
    type: yup.string().required(),
    usd: yup.number().required(),
    amount: yup.number().required(),
    date: yup.string().matches(/^\s*(3[01]|[12][0-9]|0?[1-9])\-(1[012]|0?[1-9])\-((?:19|20)\d{2})\s*$/g).required()
});

export const AddCryptoDialog = ({ isOpen, setState }) => {
    const [requestError, setRequestError] = useState("");
    
    const { register, handleSubmit, errors, reset } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
    });
    
    const cancel = () => {
        setState(prevState => ({
            ...prevState,
            isOpen: false
        }))
    }

    const submitCrypto = async (data, e) => {
        console.log(data, e);
        const resp = await addCrypto(data);
        if (resp.status === 200) {
            cancel()
        } else {
            const { message } = await resp.json()
            setRequestError(message)
        }
    }
    return (
        <Dialog isOpen={isOpen}>
            <DialogTitle>Add Crypto</DialogTitle>
                <form id="cryptoForm" onSubmit={handleSubmit(submitCrypto)}>
                    <DialogContainer>
                        <DialogLabel>Type</DialogLabel>
                        <Input placeholder='Type' name="type" error={!!errors.type} ref={register}/>
                        <DialogLabel>USD</DialogLabel>
                        <Input placeholder='USD' type='number' name="usd" error={!!errors.usd} ref={register}/>
                        <DialogLabel theme={theme} type='number' ref={register}>Amount</DialogLabel>
                        <Input placeholder="Amount" name='amount' error={!!errors.amount} ref={register}/>
                        <DialogLabel theme={theme} >Date</DialogLabel>
                        <Input placeholder="Date" name='date' error={!!errors.date} ref={register}/>
                    </DialogContainer>
                    <ButtonContainer2>
                        <Button theme={theme} type="submit">
                            Add Crypto
                        </Button>
                        <DialogButtonLabel2 theme={theme} onClick={() => { cancel() }}>
                            Cancel
                        </DialogButtonLabel2>
                    </ButtonContainer2>
            </form>
            {requestError && (
                <ErrorMessage>
                    {requestError}
                </ErrorMessage>
            )}

            </Dialog>
    )
}
const Button = styled(NormalButton)`
    color: rgba(255,255,255, 0.8);
`

const DialogButtonLabel = styled.button`
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 140%;
    color: white;
    text-align: center;
    cursor: pointer;
    width: 250px;

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