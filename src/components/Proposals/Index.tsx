import React from 'react';
import ProposalCreate from './ProposalCreate';
import ProposalView from './ProposalView';

class ProposalIndex extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            results: []
        }
    }
    
    componentDidMount() {
        this.fetchProposals()
    }

    fetchProposals = () => {
        fetch(`http://localhost:5000/proposal`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                results: data
            })
        })
        .then(data => console.log(this.state.results))
        .catch(err => console.log(err)
        )
    }

    render () {
        return (
            <div>
                Proposals Index.tsx
                <ProposalCreate token={this.props.token}/>
                <ProposalView results={this.state.results} token={this.props.token}/>
            </div>
        )
    }
}

export default ProposalIndex;