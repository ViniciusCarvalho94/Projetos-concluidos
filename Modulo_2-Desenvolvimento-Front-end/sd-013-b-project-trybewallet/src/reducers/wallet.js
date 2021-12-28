const INITIAL_STATE = {
  currency: {},
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'responseCurrency':
    return {
      ...state,
      currency: action.state,
    };
  case 'adicionarDespesa':
    return {
      ...state,
      expenses: [...state.expenses, action.state],
    };
  default:
    return state;
  }
}

export default wallet;
