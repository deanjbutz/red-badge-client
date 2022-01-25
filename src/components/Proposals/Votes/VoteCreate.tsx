import React from 'react';
import { Button, Box, ToggleButtonGroup, ToggleButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';

class VoteCreate extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            alignment: '',
            comment: ''
        }
    }

    handleChange = (e: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        this.setState({
            alignment: newAlignment
        })
    }

    handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            comment: e.currentTarget.value
        });
    }

    handleSubmit = (e: React.FormEvent): void => {
        fetch(`http://localhost:5000/vote`, {
            method: "POST",
            body: JSON.stringify({
                "vote": this.state.alignment,
                "comment": this.state.comment,
                "proposalId": this.props.id
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.token !== undefined) {
                this.props.updateToken(data.token)
            } else {
            }
        })
        .then(() => this.props.fetchVotes())
        .then(() => this.props.fetchProposals())
        .then(() => this.setState({
            alignment: null,
            comment: ''
        }))
        e.preventDefault();
    }

    render() {
        return (
            <div>
                <Box id={this.props.id} component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' }, }} onSubmit={this.handleSubmit} display='flex' flexDirection="column" justifyContent="center" alignItems='center' marginBottom="15px">
                    <Box display='flex' flexDirection="row" justifyContent="center" alignItems='center'>
                        <ToggleButtonGroup color="primary" value={this.state.alignment} exclusive onChange={this.handleChange} >
                            <ToggleButton disabled value={null} ><BallotIcon /></ToggleButton>
                            <ToggleButton value="YAY" ><CheckIcon /></ToggleButton>
                            <ToggleButton value="NAY" ><DoNotDisturbAltIcon /></ToggleButton>
                        </ToggleButtonGroup>
                        <TextField id="outlined" label="Comment (optional)" placeholder='(optional)' name='comment' value={this.state.comment} onChange={this.handleCommentChange} />
                    </Box>
                    {
                        (this.state.alignment === '' || this.state.alignment === null) ?
                        <Button disabled type="submit" variant="contained" endIcon={<SendIcon />} size='large' >Vote</Button> :
                        <Button type="submit" variant="contained" endIcon={<SendIcon />} size='large' >Vote</Button>
                    }
                </Box>
            </div>
        )
    }
}

export default VoteCreate;