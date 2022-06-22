import { combineReducers } from 'redux';
import userReducer from './user';
// import user from './user';
import walletReducer from './wallet';
// import wallet from './wallet';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const reducer = combineReducers({ user: userReducer, wallet: walletReducer });

export default reducer;
