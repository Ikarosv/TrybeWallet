// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import {
  DELETE_EXPENSE, EDIT_EXPENSE, SAVE_EDITED, SAVE_EXPENSES, SEARCH_CURRENCIES,
} from '../actions';

const initialState = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  ids: 0,
};

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        action.payload,
      ],
      ids: state.ids + 1,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case SAVE_EDITED:
    return {
      ...state,
      editor: false,
      expenses: action.payload,
    };
  default: return state;
  }
};

export default wallet;
