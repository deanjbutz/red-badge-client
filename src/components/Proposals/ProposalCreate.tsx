import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class ProposalCreate extends React.Component <any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            status: 'unlocked',
            ticker1: '',
            quantity1: 0,
            value1: 0,
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
        .then(() => this.props.toggleProposalView())
        .then(() => this.props.fetchProposals())
        .then(() => this.props.fetchVotes())
        .catch(err => console.log(err))
        e.preventDefault()
    }

    render () {
        return (
            <div>
                <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch'}, }} onSubmit={this.handleSubmit} display='flex' flexDirection="column" justifyContent="center" alignItems='center'>
                    <TextField required id="outlined-required" label="Ticker" placeholder='Ticker' name="ticker1" value={this.state.ticker1} onChange={this.handleChange}/>
                    <TextField required id="outlined-required" label="Quantity" placeholder='# of Shares' name='quantity1' value={null} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    <TextField required id="outlined-required" label="Purchase Price" placeholder='$0.00' name='value1' value={null} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '([0-9]|[0-9].[0-9])*' }} />

                    <TextField id="outlined" label="Ticker 2 (optional)" placeholder='Ticker' name="ticker2" value={this.state.ticker2} onChange={this.handleChange}/>
                    <TextField id="outlined" label="Quantity 2 (optional)" placeholder='# of Shares' name='quantity2' value={null} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    <TextField id="outlined" label="Purchase Price 2 (optional)" placeholder='$0.00' name='value2' value={null} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '([0-9]|[0-9].[0-9])*' }} />

                    <TextField id="outlined" label="Ticker 3 (optional)" placeholder='Ticker' name="ticker3" value={this.state.ticker3} onChange={this.handleChange}/>
                    <TextField id="outlined" label="Quantity 3 (optional)" placeholder='# of Shares' name='quantity3' value={null} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    <TextField id="outlined" label="Purchase Price 3 (optional)" placeholder='$0.00' name='value3' value={null} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '([0-9]|[0-9].[0-9])*' }} />

                    <Button type="submit" variant="contained" endIcon={<SendIcon />} size='large' >Submit Proposal</Button>
                </Box>
                <Box display='flex' justifyContent="center" alignItems='center' paddingTop='10px'>
                    <Button onClick={this.props.toggleProposalView} variant="outlined" startIcon={<ArrowBackIcon />} size='large' style={{ marginBottom: '10vh', alignSelf: 'center' }}>Back to Proposals</Button>
                </Box>
            </div>
        )
    }
}

export default ProposalCreate;