import React from 'react';
import { Button, Box, ToggleButtonGroup, ToggleButton, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import VoteCreate from './Votes/VoteCreate';

class ProposalView extends React.Component <any, any> {
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

    render () {
        return (
            <div>
                ProposalView.tsx
                {
                    this.props.results.map((proposal: any, id: any) => {
                        return (
                            <div>
                                {proposal.id}
                                <VoteCreate id={proposal.id} token={this.props.token}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ProposalView;