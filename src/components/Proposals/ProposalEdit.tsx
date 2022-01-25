import React from 'react';
import { Box, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

class ProposalEdit extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: this.props.editProposal.id,
            status: this.props.editProposal.status,
            ticker1: this.props.editProposal.ticker1,
            quantity1: this.props.editProposal.quantity1,
            value1: this.props.editProposal.value1,
            ticker2: this.props.editProposal.ticker2,
            quantity2: this.props.editProposal.quantity2,
            value2: this.props.editProposal.value2,
            ticker3: this.props.editProposal.ticker3,
            quantity3: this.props.editProposal.quantity3,
            value3: this.props.editProposal.value3
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        // console.log(this.state);
        // console.log(this.props.token);

        fetch(`http://localhost:5000/proposal/${this.state.id}`, {
            method: "PUT",
            body: JSON.stringify({
                status: this.state.status,
                ticker1: this.state.ticker1,
                quantity1: this.state.quantity1,
                value1: this.state.value1,
                ticker2: this.state.ticker2,
                quantity2: this.state.quantity2,
                value2: this.state.value2,
                ticker3: this.state.ticker3,
                quantity3: this.state.quantity3,
                value3: this.state.value3
            }),
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

    render() {
        return (
            <div>
                <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} onSubmit={this.handleSubmit} display='flex' flexDirection="column" justifyContent="center" alignItems='center'>
                    <TextField required id="outlined-required" label="Ticker" placeholder='Ticker' name="ticker1" value={this.state.ticker1} onChange={this.handleChange} />
                    <TextField required id="outlined-required" label="Quantity" placeholder='# of Shares' name='quantity1' value={this.state.quantity1} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    <TextField required id="outlined-required" label="Purchase Price" placeholder='$0.00' name='value1' value={this.state.value1} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '([0-9]|[0-9].[0-9])*' }} />

                    <TextField id="outlined" label="Ticker 2 (optional)" placeholder='Ticker' name="ticker2" value={this.state.ticker2} onChange={this.handleChange} />
                    <TextField id="outlined" label="Quantity 2 (optional)" placeholder='# of Shares' name='quantity2' value={this.state.quantity2} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    <TextField id="outlined" label="Purchase Price 2 (optional)" placeholder='$0.00' name='value2' value={this.state.value2} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '([0-9]|[0-9].[0-9])*' }} />

                    <TextField id="outlined" label="Ticker 3 (optional)" placeholder='Ticker' name="ticker3" value={this.state.ticker3} onChange={this.handleChange} />
                    <TextField id="outlined" label="Quantity 3 (optional)" placeholder='# of Shares' name='quantity3' value={this.state.quantity3} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />
                    <TextField id="outlined" label="Purchase Price 3 (optional)" placeholder='$0.00' name='value3' value={this.state.value3} onChange={this.handleChange} inputProps={{ inputMode: 'numeric', pattern: '([0-9]|[0-9].[0-9])*' }} />

                    <Button type="submit" variant="contained" endIcon={<SendIcon />} size='large' >Submit Edit</Button>
                </Box>
                <Box display='flex' justifyContent="center" alignItems='center' paddingTop='10px'>
                    <Button onClick={this.props.toggleProposalView} variant="outlined" startIcon={<ArrowBackIcon />} size='large' style={{ marginBottom: '10vh', alignSelf: 'center' }}>Back to Proposals</Button>
                </Box>
            </div>
        )
    }
}

export default ProposalEdit;