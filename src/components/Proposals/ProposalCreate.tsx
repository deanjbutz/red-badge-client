import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

class ProposalCreate extends React.Component <any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            status: 'unlocked',
            ticker1: '',
            quantity1: null,
            value1: null,
            ticker2: '',
            quantity2: 0,
            value2: 0,
            ticker3: '',
            quantity3: 0,
            value3: 0
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        console.log(this.state);
        console.log(this.props.token);
        
        fetch(`http://localhost:5000/proposal`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${this.props.token}`
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))
        e.preventDefault()
    }

    render () {
        return (
            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch'}, }} onSubmit={this.handleSubmit} >
                <TextField required id="outlined-required" label="Ticker" placeholder='Ticker' name="ticker1" value={this.state.ticker1} onChange={this.handleChange}/>
                <TextField required id="outlined-required" label="Quantity" placeholder='# of Shares' name='quantity1' value={this.state.quantity1} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                <TextField required id="outlined-required" label="Purchase Price" placeholder='$0.00' name='value1' value={this.state.value1} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                <TextField  id="outlined" label="Email" placeholder='Email' name='email' value={this.state.email} onChange={this.handleChange} />
                <TextField  id="outlined-password-input" label="Password" type="password" autoComplete="current-password" name='password' value={this.state.password} onChange={this.handleChange} />
                <TextField  id="outlined" label="Club Code" placeholder='Club Code' name='groupCode' value={this.state.groupCode} onChange={this.handleChange} />
                <Button type="submit" variant="contained" endIcon={<SendIcon />} size='large' >Register</Button>
            </Box>
        )
    }
}

export default ProposalCreate;