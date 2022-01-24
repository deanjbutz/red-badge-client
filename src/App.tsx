import React from 'react';
import './App.css';
import Assets from './components/Assets/Assets';
import AssetIndex from './components/Assets/Index';
import AuthIndex from './components/Auth/Index'
import Header from './components/Header/Header';
import ProposalIndex from './components/Proposals/Index';
import ThumbBar from './components/ThumbBar/ThumbBar';

class App extends React.Component {

  state = {
    sessionToken: '',
    showAuth: true,
    showProposals: false,
    showAssets: false
  }

  updateToken = (newToken: string, role: string) => {
    localStorage.setItem('token', newToken);
    this.setState({
      sessionToken: newToken,
      showAuth: false,
      showProposals: false,
      showAssets: true
    })
  }

  handleLogout = (e: React.MouseEvent): void => {
    localStorage.clear();
    this.setState({
      sessionToken: null,
      showAssets: false,
      showProposals: false,
      showAuth: true
    })
  }

  toggleAuth = (e: React.MouseEvent): void => {
    (this.state.showAuth) ?
      this.setState({ showAuth: false }) :
      this.setState({
        showProposals: false,
        showAssets: false,
        showAuth: true
      })
  }

  toggleProposal = (e: React.MouseEvent): void => {
    (this.state.showProposals) ?
      this.setState({ showProposals: false }) :
      this.setState({
        showAuth: false,
        showAssets: false,
        showProposals: true
      })
  }

  toggleAssets = (e: React.MouseEvent): void => {
    (this.state.showAssets) ?
      this.setState({ showAssets: false }) :
      this.setState({
        showAuth: false,
        showProposals: false,
        showAssets: true
      })
  }

  render() {
    return (
      <div>
        <Header />
        {
          (this.state.showAuth) ?
            <AuthIndex updateToken={this.updateToken} handleLogout={this.handleLogout} /> :
            null
        }
        {
          (this.state.showProposals) ?
            <ProposalIndex token={this.state.sessionToken} /> :
            null
        }
        {
          (this.state.showAssets) ?
            <AssetIndex token={this.state.sessionToken} /> :
            null
        }

        <ThumbBar
          toggleAuth={this.toggleAuth}
          toggleProposal={this.toggleProposal}
          toggleAssets={this.toggleAssets}
          showAuth={this.state.showAuth}
          showProposals={this.state.showProposals}
          showAssets={this.state.showAssets}
          token={this.state.sessionToken}
          handleLogout={this.handleLogout}
        />
      </div>
    )
  }
}

export default App;
