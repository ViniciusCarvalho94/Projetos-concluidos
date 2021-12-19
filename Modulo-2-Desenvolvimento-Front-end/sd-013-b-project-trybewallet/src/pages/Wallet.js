import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { expensesAction, fetchCurrency } from '../actions';
import Header from '../components/Header';
import Payment from '../components/Payment';
import Table from '../components/Table';

class Wallet extends React.Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.addWithClick = this.addWithClick.bind(this);
    this.sumTotal = this.sumTotal.bind(this);

    this.state = {
      id: -1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: [],
    };
  }

  componentDidMount() {
    const { currency } = this.props;
    currency();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async addWithClick() {
    const { currency, expenses } = this.props;
    const res = await currency();
    await this.setState((estadoAnterior) => ({
      exchangeRates: res.state,
      id: estadoAnterior.id + 1,
    }));
    await expenses(this.state);
  }

  sumTotal() {
    const { totalExpenses } = this.props;
    if (totalExpenses.length !== 0) {
      const accValueExpenses = totalExpenses
        .reduce((acc, curr) => {
          acc += curr.value * curr.exchangeRates[curr.currency].ask;
          return acc;
        }, 0);
      return accValueExpenses;
    }
    return 0;
  }

  render() {
    const { email, coin } = this.props;
    const sum = this.sumTotal();
    const tagOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <>
        <Header email={ email } totalValue={ sum } />
        <form>
          <label htmlFor>
            Valor:
            <input type="text" name="value" onChange={ this.handleChange } />
          </label>
          <label htmlFor>
            Descrição:
            <input type="text" name="description" onChange={ this.handleChange } />
          </label>
          <label htmlFor>
            Moeda:
            <select name="currency" onChange={ this.handleChange }>
              {coin && Object.keys(coin).filter((money) => money !== 'USDT')
                .map((money) => <option key={ money } value={ money }>{money}</option>)}
            </select>
          </label>
          <Payment handleChange={ this.handleChange } />
          <label htmlFor>
            Tag:
            <select name="tag" onChange={ this.handleChange }>
              {tagOptions.map((text) => (
                <option key={ text } value={ text }>{text}</option>
              ))}
            </select>
          </label>
        </form>
        <button
          type="button"
          onClick={ this.addWithClick }
        >
          Adicionar despesa
        </button>
        <Table />
      </>
    );
  }
}

Wallet.propTypes = {
  coin: PropTypes.objectOf(PropTypes.string).isRequired,
  currency: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  expenses: PropTypes.func.isRequired,
  totalExpenses: PropTypes.shape({
    length: PropTypes.number,
    reduce: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  coin: state.wallet.currency,
  totalExpenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  currency: () => dispatch(fetchCurrency()),
  expenses: (state) => dispatch(expensesAction(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
