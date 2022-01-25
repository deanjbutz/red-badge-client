import React from 'react';
import { Box, AppBar, Typography } from '@mui/material';

class Header extends React.Component {

    render() {
        return (
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Typography variant="h4" component="div" sx={{ flexGrow: 1, paddingTop: '10px', paddingBottom: '10px'}} align='center'>
                        Your Investment Club
                    </Typography>
                </AppBar>
            </Box>
        )
    }
}

export default Header;