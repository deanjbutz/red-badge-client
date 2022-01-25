import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

class Login extends React.Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        fetch(`http://localhost:5000/user/login`, {
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
                // alert(`${data.message}`)
            } else {
                alert(`${data.message}`)
            }
        })
        e.preventDefault();
    }

    render() {
        return(
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch'}, }} onSubmit={this.handleSubmit} display='flex' flexDirection='column' justifyContent="center" alignItems='center' paddingTop='10vh' paddingBottom='10vh'>
                <TextField required id="outlined-required" label="Email" placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} autoComplete='email' />
                <TextField required id="outlined-password-input" label="Password" type="password" autoComplete="current-password" name='password' value={this.state.password} onChange={this.handleChange} />
                <Button type="submit" variant="contained" endIcon={<LoginIcon />} size='large' style={{marginTop: '3vh'}}>Login</Button>
            </Box>
        )
    }
}

export default Login;