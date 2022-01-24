import React from 'react';
import Login from './Login';
import Register from './Register';
import { Box, Button, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout'

class AuthIndex extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            sessionToken: '',
            showRegister: false
        }
    }

    toggleRegister = (e: React.MouseEvent): void => {
        (this.state.showRegister) ?
            this.setState({ showRegister: false }) :
            this.setState({
                showRegister: true
            })
    }

    render() {
        return (
            <div>
                {
                    (!this.state.showRegister) ?
                        <Box display='flex' flexDirection='column' justifyContent="center" alignItems="center">
                            <Login updateToken={this.props.updateToken} />
                            <Button onClick={this.toggleRegister} variant='outlined'>
                                <Typography>
                                    Not a Member? Register Here
                                </Typography>
                            </Button>
                        </Box> :
                        <Box display='flex' flexDirection='column' justifyContent="center" alignItems="center">
                            <Register updateToken={this.props.updateToken} />
                            <Button onClick={this.toggleRegister} variant='outlined'>
                                <Typography>
                                    Already a Member? Login Here
                                </Typography>
                            </Button>
                        </Box>
                }
            </div>
        )
    }
}

export default AuthIndex;