// Coloque aqui suas actions
export const LOGIN_INFO = 'LOGIN_INFO';
export const GET_CURRENCIES = 'GET_CURRENCIES';

export const getLoginInfo = (email) => ({ type: LOGIN_INFO, email });
const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: {
    currencies,
  },
});

export const fetchCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => Object.entries(data).map((currency) => (currency[0])).filter((coin) => (
    coin !== 'USDT')))
  .then((currencies) => dispatch(getCurrencies(currencies)));
