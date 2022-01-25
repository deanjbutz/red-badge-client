import React from 'react';
import { Button, Box, ToggleButtonGroup, ToggleButton, TextField, List, ListItem, Divider, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import VoteCreate from './Votes/VoteCreate';
import { integerPropType } from '@mui/utils';
import { NumericLiteral } from 'typescript';
import VoteView from './Votes/VoteView';

class ProposalView extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            alignment: '',
            comment: '',
            showCreateVote: false
        }
    }

    handleChange = (e: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        this.setState({
            alignment: newAlignment
        })
    }

    deleteProposal = (e: React.MouseEvent, proposalId: string) => {
        const confirm = window.confirm("Are you sure you want to delete this asset?")
        if (confirm) {
            fetch(`http://localhost:5000/proposal/${proposalId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            })
            .then(() => this.props.fetchProposals())
                .then(() => this.props.fetchVotes())
        } else {
        }
    }

    deleteVote = (e: React.MouseEvent, voteId: string) => {
        const confirm = window.confirm("Are you sure you want to delete this vote?")
        if (confirm) {
            fetch(`http://localhost:5000/vote/vote/${voteId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            })
                .then(() => this.props.fetchVotes())
                .then(() => this.props.fetchProposals())
        } else {
        }
    }



    render() {
        return (
            <List style={{ marginBottom: '10vh' }} >
                <Box display='flex' justifyContent="center" alignItems='center' paddingTop='10px' paddingBottom='10px'>
                    <Button onClick={this.props.toggleCreateProposal} variant="contained" color='success' endIcon={<SendIcon />} size='large' style={{ alignSelf: 'center' }}>Create New Proposal</Button>
                </Box>
                {
                    this.props.results.map((proposal: any, id: any) => {
                        const date = proposal.createdAt
                        const formatDate = new Date(date).toLocaleDateString("en-US")
                        return (
                            <div>
                                <Box display='flex' flexDirection="column" justifyContent="center" alignItems='center' textAlign="center" paddingTop='5px'>
                                    <Typography variant='h5' style={{ width: '95%', backgroundColor: '#1976d2', color: 'white', borderRadius: '50px' }}>
                                        {`${proposal.fName}'s Proposal - ${formatDate}`}
                                    </Typography>
                                    <br />
                                    {
                                        (JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin") ?
                                            <Box style={{display: 'flex', flexDirection: 'row', gap: '10px'}}>
                                                <Button color='warning' variant='contained' id={proposal.id} size="small" onClick={e => this.props.toggleProposalEdit(e, proposal)}>Edit</Button>
                                                <Button color='error' variant='contained' id={proposal.id} size="small" onClick={e => this.deleteProposal(e, proposal.id)}>Delete</Button>
                                            </Box> :
                                            null
                                    }
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>Ticker</TableCell>
                                                    <TableCell align='right'>Qty</TableCell>
                                                    <TableCell align='right'>Price</TableCell>
                                                    <TableCell align='right'>Total</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>{proposal.ticker1}</TableCell>
                                                    <TableCell align='right'>{proposal.quantity1}</TableCell>
                                                    <TableCell align='right'>${Intl.NumberFormat('en-US').format(proposal.value1)}</TableCell>
                                                    <TableCell align='right'>${Intl.NumberFormat('en-US').format(proposal.quantity1 * proposal.value1)}</TableCell>
                                                </TableRow>
                                                {
                                                    (proposal.ticker2) ?
                                                        <>
                                                            <TableRow>
                                                                <TableCell>{proposal.ticker2}</TableCell>
                                                                <TableCell align='right'>{proposal.quantity2}</TableCell>
                                                                <TableCell align='right'>${Intl.NumberFormat('en-US').format(proposal.value2)}</TableCell>
                                                                <TableCell align='right'>${Intl.NumberFormat('en-US').format(proposal.quantity2 * proposal.value2)}</TableCell>
                                                            </TableRow>
                                                            {
                                                                (proposal.ticker3) ?
                                                                    <>
                                                                        <TableRow>
                                                                            <TableCell>{proposal.ticker3}</TableCell>
                                                                            <TableCell align='right'>{proposal.quantity3}</TableCell>
                                                                            <TableCell align='right'>${Intl.NumberFormat('en-US').format(proposal.value3)}</TableCell>
                                                                            <TableCell align='right'>${Intl.NumberFormat('en-US').format(proposal.quantity3 * proposal.value3)}</TableCell>
                                                                        </TableRow>
                                                                    </>
                                                                    : null
                                                            }
                                                        </>
                                                        :
                                                        null
                                                }
                                                <TableRow>
                                                    <TableCell></TableCell>
                                                    <TableCell></TableCell>
                                                    <TableCell align='right'>Total:</TableCell>
                                                    <TableCell align='right'>${Intl.NumberFormat('en-US').format(proposal.quantity1 * proposal.value1 + proposal.quantity2 * proposal.value2 + proposal.quantity3 * proposal.value3)}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    {/* Render Votes Here */}
                                    <Box style={{ alignSelf: 'self-start' }}>
                                        <List>
                                            {
                                                this.props.voteResults.map((vote: any, id: any) => {
                                                    if (vote.proposalId === proposal.id) {
                                                        return (
                                                            (vote.vote === 'YAY') ?
                                                                (vote.comment) ?
                                                                    (
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin" ||
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).id === vote.userId
                                                                    ) ?
                                                                        <ListItem style={{ color: 'green', alignSelf: 'left', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'green' }}>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`YAY: ${vote.fName} ${vote.lName} - ${vote.comment}`} />
                                                                            <ListItemButton>
                                                                                <Button color='error' variant='contained' id={vote.id} size="small" onClick={e => this.deleteVote(e, vote.id)}>Delete</Button>
                                                                            </ListItemButton>
                                                                        </ListItem> :
                                                                        <ListItem style={{ color: 'green', alignSelf: 'left', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'green' }}>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`YAY: ${vote.fName} ${vote.lName} - ${vote.comment}`} />
                                                                        </ListItem> :
                                                                    (
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin" ||
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).id === vote.userId
                                                                    ) ?
                                                                        <ListItem style={{ color: 'green', alignSelf: 'left', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'green' }}>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`YAY: ${vote.fName} ${vote.lName}`} />
                                                                            <ListItemButton>
                                                                                <Button color='error' variant='contained' id={vote.id} size="small" onClick={e => this.deleteVote(e, vote.id)}>Delete</Button>
                                                                            </ListItemButton>
                                                                        </ListItem> :
                                                                        <ListItem style={{ color: 'green', alignSelf: 'left', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'green' }}>
                                                                                <CheckIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`YAY: ${vote.fName} ${vote.lName}`} />
                                                                        </ListItem> :
                                                                (vote.comment) ?
                                                                    (
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin" ||
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).id === vote.userId
                                                                    ) ?
                                                                        <ListItem style={{ color: 'red', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'red' }}>
                                                                                <DoNotDisturbAltIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`NAY: ${vote.fName} ${vote.lName} - ${vote.comment}`} />
                                                                            <ListItemButton>
                                                                                <Button color='error' variant='contained' id={vote.id} size="small" onClick={e => this.deleteVote(e, vote.id)}>Delete</Button>
                                                                            </ListItemButton>
                                                                        </ListItem> :
                                                                        <ListItem style={{ color: 'red', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'red' }}>
                                                                                <DoNotDisturbAltIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`NAY: ${vote.fName} ${vote.lName} - ${vote.comment}`} />
                                                                        </ListItem> :
                                                                    (
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin" ||
                                                                        JSON.parse(window.atob(this.props.token.split('.')[1])).id === vote.userId
                                                                    ) ?
                                                                        <ListItem style={{ color: 'red', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'red' }}>
                                                                                <DoNotDisturbAltIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`NAY: ${vote.fName} ${vote.lName}`} />
                                                                            <ListItemButton>
                                                                                <Button color='error' variant='contained' id={vote.id} size="small" onClick={e => this.deleteVote(e, vote.id)}>Delete</Button>
                                                                            </ListItemButton>
                                                                        </ListItem>
                                                                        :
                                                                        <ListItem style={{ color: 'red', paddingTop: 0, paddingBottom: 0 }}>
                                                                            <ListItemIcon style={{ color: 'red' }}>
                                                                                <DoNotDisturbAltIcon />
                                                                            </ListItemIcon>
                                                                            <ListItemText primary={`NAY: ${vote.fName} ${vote.lName}`} />
                                                                        </ListItem>
                                                        )
                                                    } else {
                                                        return (
                                                            null
                                                        )
                                                    }
                                                })
                                            }
                                        </List>
                                    </Box>
                                    <VoteCreate id={proposal.id} token={this.props.token} fetchVotes={this.props.fetchVotes} fetchProposals={this.props.fetchProposals}/>
                                </Box>
                            </div>
                        )
                    })
                }
            </List>
        )
    }
}

export default ProposalView;