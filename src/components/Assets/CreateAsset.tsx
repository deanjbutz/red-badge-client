import React from 'react';
import { Box, Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class CreateAsset extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            asset: '',
            quantity: null,
            value: null,
            datePurchased: null,
            dateSold: null
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        console.log(this.state)
        
        fetch(`http://localhost:5000/asset/create`, {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then(res => res.json())
            .then(() => this.props.toggleAssets())
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} onSubmit={this.handleSubmit} display='flex' flexDirection='column' justifyContent="center" alignItems='center' paddingTop="5vh" paddingBottom="5vh">
                    <TextField required id="outlined-required" label="Asset" placeholder='AMZN, Cash, etc.' name="asset" value={this.state.asset} onChange={this.handleChange} />
                    <TextField required id="outlined-required" label="Quantity" placeholder='# of Shares' name='quantity' value={this.state.quantity} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    <TextField required id="outlined-required" label="Value" placeholder='$0.00' name='value' value={this.state.value} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '([0-9].[0-9]|[0-9])*' }} />
                    <Button type="submit" variant="contained" endIcon={<SendIcon />} size='large' style={{ marginTop: '3vh' }}>Submit Asset</Button>
                </Box>
                <Box display='flex' justifyContent="center" alignItems='center' paddingTop='10px'>
                <Button onClick={this.props.toggleAssets} variant="outlined" startIcon={<ArrowBackIcon />} size='large'>Back to Assets</Button>
                </Box>
                
            </div>
        )
    }
}

export default CreateAsset;