import React from 'react';
import ProposalCreate from './ProposalCreate';
import ProposalEdit from './ProposalEdit';
import ProposalView from './ProposalView';

class ProposalIndex extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            results: [],
            voteResults: [],
            showProposalView: true,
            showCreateProposal: false,
            showProposalEdit: false,
            editProposal: {}
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
            const array = data.sort((a:any , b:any) => ( a.createdAt < b.createdAt) ? 1 : -1);
            // console.log(array[0].createdAt);
            
            this.setState({
                results: array
            })
        })
        // .then(data => console.log(this.state.results))
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
                showProposalEdit: false,
                showProposalView: true
            })
    }

    toggleCreateProposal = (e: React.MouseEvent): void => {
        (this.state.showCreateProposal) ?
            this.setState({ showCreateProposal: false }) :
            this.setState({
                showProposalView: false,
                showProposalEdit: false,
                showCreateProposal: true
            })
    }

    toggleProposalEdit = (e: React.MouseEvent, proposal: object): void => {
        (this.state.showProposalEdit) ?
            this.setState({ showProposalEdit: false}) :
            this.setState({
                showProposalView: false,
                showCreateProposal: false,
                showProposalEdit: true,
                editProposal: proposal
            })
    }

    render () {
        return (
            <div>
                {
                    (this.state.showProposalView) ?
                    <ProposalView results={this.state.results} token={this.props.token} toggleCreateProposal={this.toggleCreateProposal} voteResults={this.state.voteResults} toggleProposalView={this.toggleProposalView} fetchProposals={this.fetchProposals} fetchVotes={this.fetchVotes} toggleProposalEdit={this.toggleProposalEdit}/> :
                    null
                }
                {
                    (this.state.showCreateProposal) ?
                    <ProposalCreate token={this.props.token} toggleProposalView={this.toggleProposalView} fetchProposals={this.fetchProposals} fetchVotes={this.fetchVotes} /> :
                    null
                }
                {
                    (this.state.showProposalEdit) ?
                    <ProposalEdit token={this.props.token} toggleProposalView={this.toggleProposalView} editProposal={this.state.editProposal} fetchProposals={this.fetchProposals} fetchVotes={this.fetchVotes}/> :
                    null
                }
            </div>
        )
    }
}

export default ProposalIndex;