// Esse reducer será responsável por tratar as informações da pessoa usuária
// import { LOGIN_INFO } from '../actions';
// import { getLoginInfo } from '../actions';

const INITIAL_STATE = {
  user: {
    email: '', // string que armazena o email da pessoa usuária
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

export default userReducer;
