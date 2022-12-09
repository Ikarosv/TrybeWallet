// Coloque aqui suas actions
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SEARCH_CURRENCIES = 'SEARCH_CURRENCIES';

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
