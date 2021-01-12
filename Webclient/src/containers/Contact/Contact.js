import React, { useState } from 'react'
import { TextField, Container, Grid, Button } from '@material-ui/core';
import { withRouter } from 'react-router';
import { sendMessage } from '../../Data/Api/MessageApi';
import { useForm } from "react-hook-form";
import { useEffect } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
            <div>
                <Container maxWidth='sm' >
                    <h1>Contact</h1>
                    <ValidatorForm ref="form" instantValidate={true} onError={(e) => {console.log(e)}} withRequiredValidator={true} onSubmit={this.onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextValidator id="outlined-basic" label="Name" variant="outlined" 
                                name='name' value={this.state.name} onChange={this.onChange} validators={['required']} 
                                errorMessages={['this field is required']} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator id="outlined-basic" value={this.state.email} onChange={this.onChange} label="Email" variant="outlined" name='email' validators={['required', 'isEmail']} errorMessages={['this field is required', 'this is not an email']} fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator id="outlined-basic" label="Subject" variant="outlined" name='subject' fullWidth/>
                            </Grid>
                            <Grid item xs={12}>
                                <TextValidator id="outlined-basic" label="Message" variant="outlined" name='body' fullWidth multiline rows={3}/>
                            </Grid>
                            <Button type="submit" variant="contained"> Send</Button>
                        </Grid>
                    </ValidatorForm>
                </Container>
            </div>
        )
    }
}


export default withRouter(Contact)
