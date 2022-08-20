// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  GET_CURRENCIES,
  DELETE_EXPENSE,
  SELECT_EXPENSE_TO_EDIT,
  EDIT_EXPENSE,
  UPDATE_TOTAL_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  total: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES: {
    return {
      ...state,
      currencies: [...action.payload.currencies],
    };
  }
  case ADD_EXPENSE: {
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenses.length, ...action.payload }],
    };
  }
  case DELETE_EXPENSE: {
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.payload),
    };
  }
  case SELECT_EXPENSE_TO_EDIT: {
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  }
  case EDIT_EXPENSE: {
    const remainingExpenses = state.expenses
      .map((expense) => {
        if (expense.id === state.idToEdit) {
          return {
            ...action.payload, exchangeRates: expense.exchangeRates, id: state.idToEdit };
        }
        return expense;
      });
    return {
      ...state,
      expenses: remainingExpenses,
      editor: false,
    };
  }
  case UPDATE_TOTAL_EXPENSE: {
    return {
      ...state,
      total: action.payload,
    };
  }
  default:
    return state;
  }
};

export default walletReducer;
