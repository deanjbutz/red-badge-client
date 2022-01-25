import React from 'react';
import { Button, Box, ToggleButtonGroup, ToggleButton, TextField, List, ListItem, Divider, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import BallotIcon from '@mui/icons-material/Ballot';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import VoteCreate from './Votes/VoteCreate';
import { integerPropType } from '@mui/utils';
import { NumericLiteral } from 'typescript';

class ProposalView extends React.Component<any, any> {
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

    render() {
        return (
            <List style={{ marginBottom: '10vh' }} >
                <Box display='flex' justifyContent="center" alignItems='center' paddingTop='10px' paddingBottom='10px'>
                    <Button onClick={this.props.toggleCreateProposal} variant="contained" endIcon={<SendIcon />} size='large' style={{ alignSelf: 'center' }}>Create New Proposal</Button>
                </Box>
                {
                    this.props.results.map((proposal: any, id: any) => {
                        const date = proposal.createdAt
                        const formatDate = new Date(date).toLocaleDateString("en-US")
                        return (
                            <div>
                                <Box display='flex' flexDirection="column" justifyContent="center" alignItems='center' textAlign="center" paddingTop='5px'>
                                    <Typography variant='h5' style={{ width: '100%', backgroundColor: '#1976d2', color: 'white' }}>
                                        {`${proposal.fName}'s Proposal - ${formatDate}`}

                                    </Typography>
                                    <br />
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
                                    {
                                        this.props.voteResults.map((vote: any, id: any) => {
                                            if (vote.proposalId === proposal.id) {
                                                return (
                                                    <div>test</div>
                                                )
                                            } else {
                                                return (
                                                    null
                                                )
                                            }
                                        })
                                    }

                                    {/* {
                                        this.props.voteResults.map((vote: any) => {
                                            let found = false
                                            while (vote.proposalId === proposal.id &&
                                                vote.userId === JSON.parse(window.atob(this.props.token.split('.')[1])).id &&found === false) {
                                                    found = true
                                                    console.log(vote.userId)
                                                    console.log(JSON.parse(window.atob(this.props.token.split('.')[1])).id)
                                                
                                                    return (
                                                        <VoteCreate id={proposal.id} token={this.props.token} />
                                                        )
                                                    }
                                            
                                        })
                                    } */}

                                </Box>
                                {/* <Divider /> */}
                            </div>
                        )
                    })
                }

            </List>
        )
    }
}

export default ProposalView;