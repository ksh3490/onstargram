import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Modal from './components/Modal';
import Toast from './components/Toast';

import * as authActions from './redux/actions/auth';

import './App.scss';


class App extends Component {
  constructor(props) {
    super(props)
    // 1. Initialize 'isLoggedIn' state
    const walletFromSession = sessionStorage.getItem('walletInstance');
    const { integrateWallet, removeWallet } = this.props;

    if (walletFromSession) {
      try {
        // 2-1. Connect with wallet
        integrateWallet(JSON.parse(walletFromSession).privateKey);
      } catch (e) {
        // 2-2. Remove wallet
        removeWallet();
      }
    }
  }
  // 3. Page rendering
  render() {
    const { isLoggedIn } = this.props;
    return (
      <div className="App" >
        <Modal />
        <Toast />
        {isLoggedIn && <Nav />}
        {isLoggedIn ? <FeedPage /> : <AuthPage />}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state: any) => ({
  isLoggedIn: state.auth.isLoggedIn,
})

const mapDispatchToProps = (dispatch: any) => ({
  integrateWallet: (privateKey: string) => dispatch(authActions.integrateWallet(privateKey)),
  removeWallet: () => dispatch(authActions.removeWallet()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)