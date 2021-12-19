const emailAction = (state) => ({
  type: 'email',
  state,
});

const ApiCurrencyRequest = () => ({
  type: 'requestCurrency',
});

const ApiCurrencyResponse = (state) => ({
  type: 'responseCurrency',
  state,
});

function fetchCurrency() {
  return (dispatch) => {
    dispatch(ApiCurrencyRequest());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((currency) => dispatch(ApiCurrencyResponse(currency)));
  };
}

const expensesAction = (state) => ({
  type: 'adicionarDespesa',
  state,
});

export {
  emailAction,
  fetchCurrency,
  expensesAction,
};
