// Coloque aqui suas actions
export const LOGIN_INFO = 'LOGIN_INFO';
export const WALLET_INFO = 'WALLET_INFO';

export const getLoginInfo = (email) => ({ type: LOGIN_INFO, email });
export const getWalletInfo = () => ({ type: WALLET_INFO });
