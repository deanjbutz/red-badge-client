import React from 'react';
import Assets from './Assets';
import CreateAsset from './CreateAsset';
import EditAsset from './EditAsset';

class AssetIndex extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            results: [],
            showAssets: true,
            showCreateAsset: false,
            showEditAsset: false,
            editAsset: {}
        }
    }

    toggleAssets = (e: React.MouseEvent): void => {
        (this.state.showAssets) ?
            this.setState({ showAssets: false }) :
            this.setState({
                showCreateAsset: false,
                showEditAsset: false,
                showAssets: true
            })
    }

    toggleCreateAsset = (e: React.MouseEvent): void => {
        (this.state.showCreateAsset) ?
            this.setState({ showCreateAsset: false }) :
            this.setState({
                showAssets: false,
                showEditAsset: false,
                showCreateAsset: true
            })
    }

    toggleEditAsset = (e: React.MouseEvent, asset: object): void => {
        (this.state.showEditAsset) ?
            this.setState({ showEditAsset: false }) :
            this.setState({
                showCreateAsset: false,
                showAssets: false,
                showEditAsset: true,
                editAsset: asset
            })
    }

    render() {
        return (
            <div>
                {
                    (this.state.showAssets) ?
                    <Assets token={this.props.token} toggleCreateAsset={this.toggleCreateAsset} toggleEditAsset={this.toggleEditAsset}/> :
                    null
                }
                {
                    (this.state.showCreateAsset) ?
                    <CreateAsset token={this.props.token} toggleAssets={this.toggleAssets}  /> :
                    null
                }
                {
                    (this.state.showEditAsset) ?
                    <EditAsset token={this.props.token} toggleAssets={this.toggleAssets}  editAsset={this.state.editAsset}/> :
                    null
                }
            </div>
        )
    }
}

export default AssetIndex;