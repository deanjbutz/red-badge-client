import React from 'react';
import ProposalCreate from './ProposalCreate';
import ProposalView from './ProposalView';

class ProposalIndex extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            results: [],
            voteResults: [],
            showProposalView: true,
            showCreateProposal: false
        }
    }
    
    componentDidMount() {
        this.fetchProposals()
        this.fetchVotes()
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

    fetchVotes = () => {
        fetch(`http://localhost:5000/vote`, {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({
                voteResults: data
            })
        })
        .catch(err => console.log(err)
        )
    }

    toggleProposalView = (e: React.MouseEvent): void => {
        (this.state.showProposalView) ?
            this.setState({ showProposalView: false }) :
            this.setState({
                showCreateProposal: false,
                showProposalView: true
            })
    }

    toggleCreateProposal = (e: React.MouseEvent): void => {
        (this.state.showCreateProposal) ?
            this.setState({ showCreateProposal: false }) :
            this.setState({
                showProposalView: false,
                showCreateProposal: true
            })
    }

    render () {
        return (
            <div>
                {
                    (this.state.showProposalView) ?
                    <ProposalView results={this.state.results} token={this.props.token} toggleCreateProposal={this.toggleCreateProposal} voteResults={this.state.voteResults} /> :
                    null
                }
                {
                    (this.state.showCreateProposal) ?
                    <ProposalCreate token={this.props.token} toggleProposalView={this.toggleProposalView} fetchProposals={this.fetchProposals} fetchVotes={this.fetchVotes} /> :
                    null
                }
            </div>
        )
    }
}

export default ProposalIndex;