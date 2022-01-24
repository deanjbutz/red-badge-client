import React from 'react';
import { Button, AppBar, Container } from '@mui/material';
import './thumbBar.css'
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import BallotIcon from '@mui/icons-material/Ballot';
import ShowChartIcon from '@mui/icons-material/ShowChart';

class ThumbBar extends React.Component <any, any> {

    constructor(props: any) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        console.log(`ThumbBar.tsx componentDidMount`);
    }

    componentDidUpdate() {
        console.log(`ThumbBar.tsx componentDidUpdate`);
        
    }

    render() {
        return (
            <AppBar position="fixed" sx={{ top: 'auto', bottom: 0}}>
                <Container id="thumbBar">
                    {
                        (this.props.showAssets || !this.props.token) ?
                        <Button disabled id="disabledThumbBarButton" onClick={this.props.toggleAssets} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><ShowChartIcon fontSize='large' />Assets</Button> :
                        <Button id="thumbBarButton" onClick={this.props.toggleAssets} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><ShowChartIcon fontSize='large' />Assets</Button>
                    }
                    {
                        (this.props.showProposals || !this.props.token) ?
                        <Button disabled id="disabledThumbBarButton" onClick={this.props.toggleProposal} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><BallotIcon fontSize='large'/>Proposals</Button> :
                        <Button id="thumbBarButton" onClick={this.props.toggleProposal} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}><BallotIcon fontSize='large'/>Proposals</Button>
                    }
                    {
                        (this.props.showAuth) ?
                        <Button disabled id="disabledThumbBarButton" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} ><LoginIcon fontSize='large'/>Login</Button> :
                        <Button id="thumbBarButton" onClick={this.props.handleLogout} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}} ><LogoutIcon fontSize='large'/>Logout</Button>
                    }
                </Container>
            </AppBar>
        )
    }
}

export default ThumbBar;