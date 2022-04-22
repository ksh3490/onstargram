import caver from '../../klaytn/caver'
import {
  LOGIN,
  LOGOUT,
  INTEGRATE_WALLET,
  REMOVE_WALLET,
} from './actionTypes'

// 1. Integrate Wallet
export const integrateWallet = (privateKey: string) => (dispatch: any) => {

  // Create wallet instance using caver's privateKeyToAccount
  const walletInstance = caver.klay.accounts.privateKeyToAccount(privateKey);

  // To send transaction, Add wallet instnace to caver
  caver.klay.accounts.wallet.add(walletInstance);

  // To keep user login, Save walletInstance to sessionStorage
  sessionStorage.setItem('walletInstance', JSON.stringify(walletInstance));

  // To access to walletInstance while running app, Save info to redux store
  return dispatch({
    type: INTEGRATE_WALLET,
    payload: {
      privateKey,
      address: walletInstance.address
    }
  })
}

// 2. Remove wallet
export const removeWallet = () => (dispatch: any) => {
  caver.klay.accounts.wallet.clear();
  sessionStorage.removeItem('walletInstance');
  return dispatch({
    type: REMOVE_WALLET,
  })
}

export const login = (privateKey: string) => (dispatch: any) => {
  dispatch(integrateWallet(privateKey));
  return dispatch({
    type: LOGIN,
  })
}

export const logout = () => (dispatch: any) => {
  dispatch(removeWallet());
  return dispatch({
    type: LOGOUT,
  })
}