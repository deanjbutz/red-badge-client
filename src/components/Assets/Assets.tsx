import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';



class Assets extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            assets: [],
            totalAssets: 0,
            availableCash: 0
        }
    }

    getAssets = () => {
        fetch(`http://localhost:5000/asset`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    assets: data
                })
            })
            // .then(() => console.log(this.state.assets)
            .then(() => this.calculateTotalAssets())
            .then(() => this.getAvailableCash())
            .catch(err => console.log(err)
            )
    }

    deleteAsset = (e: React.MouseEvent, assetId: string) => {
        const confirm = window.confirm("Are you sure you want to delete this asset?")
        if (confirm) {
            fetch(`http://localhost:5000/asset/${assetId}`, {
                method: 'DELETE',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': this.props.token
                })
            })
                .then(() => this.getAssets())
        } else {

        }
    }

    componentDidMount() {
        this.getAssets()
        this.calculateTotalAssets()
        this.getAvailableCash()
    }

    calculateTotalAssets = () => {
        var total = 0
        this.state.assets.map((asset: any) => {
            total = total + (asset.quantity * asset.value)
            this.setState({
                totalAssets: total
            })
        })
    }

    getAvailableCash = () => {
        var cash = 0
        this.state.assets.map((asset: any) => {
            if (asset.asset === 'Cash') {
                // console.log(asset.asset, asset.value);
                
                cash = cash + asset.value;
                this.setState({
                    availableCash: cash
                })
            } else {
                // console.log(asset.asset, asset.value)
            }
        })
    }

    render() {
        return (
            <div>
                {/* asset table with edit and del asset buttons for admin only */}
                <Typography align='center' paddingTop='10px' paddingBottom='5px'>Welcome, {JSON.parse(window.atob(this.props.token.split('.')[1])).fName}.</Typography>

                <Typography align='right' paddingTop='10px' paddingBottom='10px' paddingRight='5px' variant='h5'>Total Assets: ${Intl.NumberFormat('en-US').format(this.state.totalAssets)}</Typography>

                <Typography align='right' paddingBottom='10px' paddingRight='5px' variant='h5'>Available Cash: ${Intl.NumberFormat('en-US').format(this.state.availableCash)}</Typography>

                <TableContainer component={Paper} style={{ marginBottom: '10vh' }} >
                    <Table size='small'>
                        <TableHead>
                            <TableRow>
                                {/* <TableCell /> */}
                                <TableCell style={{ paddingRight: 0 }}>Asset</TableCell>
                                <TableCell align="right" padding='none' >Qty</TableCell>
                                <TableCell align="right" padding='none'>Value</TableCell>
                                <TableCell align="right" padding='none'>Total</TableCell>
                                <TableCell align="right" style={{ paddingLeft: 0 }}>%</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                this.state.assets.map((asset: any, id: number) => {
                                    return (
                                        <>
                                            <TableRow key={id}>
                                                {/* <TableCell /> */}
                                                <TableCell style={{ paddingRight: 0 }}>{asset.asset}</TableCell>
                                                <TableCell align="right" padding='none'>{asset.quantity}</TableCell>
                                                <TableCell padding='none' align="right" >${Intl.NumberFormat('en-US').format(asset.value)}</TableCell>
                                                <TableCell padding='none' align="right" >${Intl.NumberFormat('en-US').format(asset.quantity * asset.value)}</TableCell>
                                                <TableCell align="right" style={{ paddingLeft: 0 }}>{((asset.quantity * asset.value) / this.state.totalAssets * 100).toFixed(2)}%</TableCell>
                                            </TableRow>
                                            {
                                                (JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin") ?
                                                    <TableRow>
                                                        <TableCell></TableCell>
                                                        <TableCell></TableCell>
                                                        <TableCell><Button color='warning' variant='contained' id={asset.id} size="small" onClick={e => this.props.toggleEditAsset(e, asset)}>Edit</Button></TableCell>
                                                        <TableCell><Button color='error' variant='contained' id={asset.id} size="small" onClick={e => this.deleteAsset(e, asset.id)}>Delete</Button></TableCell>
                                                        <TableCell></TableCell>
                                                    </TableRow>
                                                    : null
                                            }
                                        </>
                                    )
                                })
                            }
                            {/* {
                                (JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin") ?
                                this.state.assets.map((asset: any, id: number) => {
                                    return (
                                        <TableRow>
                                            <TableCell>Button1</TableCell>
                                            <TableCell>Button 2</TableCell>
                                        </TableRow>
                                    )
                                }) : null
                            } */}
                        </TableBody>
                    </Table>
                </TableContainer>
                {
                    (this.props.token) ?
                        (JSON.parse(window.atob(this.props.token.split('.')[1])).role === "Admin") ?
                            <Box display='flex' justifyContent="center" alignItems='center' paddingTop='10px'>
                                <Button color="success" onClick={this.props.toggleCreateAsset} variant="contained" endIcon={<SendIcon />} size='large' style={{ marginBottom: '12vh', alignSelf: 'center' }}>Create New Asset</Button>
                            </Box> :
                            null :
                        null
                }
            </div>
        )
    }
}

export default Assets;