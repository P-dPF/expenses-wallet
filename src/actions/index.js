// Coloque aqui suas actions
export const LOGIN_INFO = 'LOGIN_INFO';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const SELECT_EXPENSE_TO_EDIT = 'SELECT_EXPENSE_TO_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const UPDATE_TOTAL_EXPENSE = 'UPDATE_TOTAL_EXPENSE';

export const getLoginInfo = (email) => ({ type: LOGIN_INFO, email });
const getCurrencies = (currencies) => ({
  type: GET_CURRENCIES,
  payload: {
    currencies,
  },
});

export const addExpense = ({
  value,
  currency,
  method,
  tag,
  description,
  exchangeRates,
}) => ({
  type: ADD_EXPENSE,
  payload: {
    value,
    currency,
    method,
    tag,
    description,
    exchangeRates,
  },
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id,
});

export const selectExpenseToEdit = (id) => ({
  type: SELECT_EXPENSE_TO_EDIT,
  payload: id,
});

export const editExpense = ({
  value,
  currency,
  method,
  tag,
  description,
}) => ({
  type: EDIT_EXPENSE,
  payload: {
    value,
    currency,
    method,
    tag,
    description,
  },
});

export const updateTotalExpense = (totalExpense) => ({
  type: UPDATE_TOTAL_EXPENSE,
  payload: totalExpense,
});

export const fetchCurrencies = () => (dispatch) => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => Object.entries(data).map((currency) => (currency[0])).filter((coin) => (
    coin !== 'USDT')))
  .then((currencies) => dispatch(getCurrencies(currencies)));

export const fetchExchangeRates = () => () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json())
  .then((data) => data);
