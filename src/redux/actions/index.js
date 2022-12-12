// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SEARCH_CURRENCIES = 'SEARCH_CURRENCIES';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const SAVE_EDITED = 'SAVE_EDITED';

// SALVAR INFORMAÇÕES DO USUARIO

export const userEmailSaver = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

export const objKeys = (obj) => Object.keys(obj);

export const searchCurrencies = (currencies) => ({
  type: SEARCH_CURRENCIES,
  payload: objKeys(currencies).filter((currency) => currency !== 'USDT'),
});

export const currencyApi = () => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(searchCurrencies(data)))
    .catch((error) => console.log(error));
};

// SALVAR FORMULARIO DE DESPESAS

export const saveExpenses = (expenses) => ({
  type: SAVE_EXPENSES,
  payload: expenses,
});

export const saveExpensesForm = (expenseInfos) => async (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => { delete data.USDT; return data; })
    .then((data) => dispatch(saveExpenses({ ...expenseInfos, exchangeRates: data })))
    .catch((error) => console.log(error));
};

//  DELETAR DESPESA

export const deleteExpense = (id, expenses) => ({
  type: DELETE_EXPENSE,
  payload: expenses.filter((expense) => expense.id !== id),
});

export const editExpense = (id) => ({
  type: EDIT_EXPENSE,
  payload: id,
});

export const saveEditedExpenses = (edited, expenses) => ({
  type: SAVE_EDITED,
  payload: expenses.map((expense) => (
    expense.id === edited.id ? { ...expense, ...edited } : expense
  )),
});
