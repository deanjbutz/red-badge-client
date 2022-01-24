import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

class Register extends React.Component <any, any> {
    
    constructor(props: any) {
        super(props);
        this.state = {
            fName: '',
            lName: '',
            email: '',
            title: '',
            role: 'User',
            password: '',
            groupCode: '',
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        fetch(`http://localhost:5000/user/register`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token !== undefined) {
                this.props.updateToken(data.token)
                alert(`${data.message}`)
            } else {
                alert(`${data.message}`)
            }
        })
        e.preventDefault();
    }

    render() {
        return(
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch'}, }} onSubmit={this.handleSubmit} display='flex' flexDirection='column' justifyContent="center" alignItems='center' paddingTop="5vh" paddingBottom="5vh">
                <TextField required id="outlined-required" label="Title" placeholder='Owner, Member, etc.' name="title" value={this.state.title} onChange={this.handleChange}/>
                <TextField required id="outlined-required" label="First Name" placeholder='First Name' name='fName' value={this.state.fName} onChange={this.handleChange} />
                <TextField required id="outlined-required" label="Last Name" placeholder='Last Name' name='lName' value={this.state.lName} onChange={this.handleChange}/>
                <TextField required id="outlined-required" label="Email" placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
                <TextField required id="outlined-password-input" label="Password" type="password" autoComplete="current-password" name='password' value={this.state.password} onChange={this.handleChange} />
                <TextField required id="outlined-required" label="Club Code" placeholder='Club Code' name='groupCode' value={this.state.groupCode} onChange={this.handleChange} />
                <Button type="submit" variant="contained" endIcon={<SendIcon />} size='large' style={{marginTop: '3vh'}}>Register</Button>
            </Box>
        )
    }
}

export default Register;