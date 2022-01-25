import React from 'react';
import { Button, Box, ToggleButtonGroup, ToggleButton, TextField, List, ListItem, Divider, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Typography, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';


class VoteView extends React.Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            id: this.props.proposalId
        }
    }

    render() {
        return (
            <Box style={{ alignSelf: 'self-start' }}>
                <List>
                    {
                        this.props.voteResults.map((vote: any, id: any) => {
                            if (vote.proposalId === this.state.id) {
                                return (
                                    (vote.vote === 'YAY') ?
                                        (vote.comment) ?
                                            <ListItem style={{ color: 'green', alignSelf: 'left', paddingTop: 0, paddingBottom: 0 }}>
                                                <ListItemIcon style={{ color: 'green' }}>
                                                    <CheckIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={`YAY: ${vote.fName} ${vote.lName} - ${vote.comment}`} />
                                            </ListItem> :
                                            <ListItem style={{ color: 'green', alignSelf: 'left', paddingTop: 0, paddingBottom: 0 }}>
                                                <ListItemIcon style={{ color: 'green' }}>
                                                    <CheckIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={`YAY: ${vote.fName} ${vote.lName}`} />
                                            </ListItem> :
                                        (vote.comment) ?
                                            <ListItem style={{ color: 'red', paddingTop: 0, paddingBottom: 0 }}>
                                                <ListItemIcon style={{ color: 'red' }}>
                                                    <DoNotDisturbAltIcon />
                                                </ListItemIcon>
                                                <ListItemText primary={`NAY: ${vote.fName} ${vote.lName} - ${vote.comment}`} />
                                            </ListItem> :
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
        )
    }
}

export default VoteView;