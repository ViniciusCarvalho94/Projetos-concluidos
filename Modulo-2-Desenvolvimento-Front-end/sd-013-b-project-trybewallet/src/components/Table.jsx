import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class Table extends React.Component {
  currencyName(id, currency) {
    const { tableExpenses } = this.props;
    const exchangeObj = tableExpenses.find((n) => n.id === id);
    const { exchangeRates } = exchangeObj;
    const moneyName = exchangeRates[currency].name;
    return moneyName.replace(/\/.+/, '');
  }

  currencyAsk(id, currency) {
    const { tableExpenses } = this.props;
    const exchangeObj = tableExpenses.find((n) => n.id === id);
    const { exchangeRates } = exchangeObj;
    const value = exchangeRates[currency].ask;
    return value;
  }

  currencyConvert(id, currency, value) {
    const ask = this.currencyAsk(id, currency);
    const total = Number(ask) * value;
    return total;
  }

  render() {
    const { tableExpenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {tableExpenses.map((e) => (
          <tr key={ e.id }>
            <td>{e.description}</td>
            <td>{e.tag}</td>
            <td>{e.method}</td>
            <td>{e.value}</td>
            <td>{this.currencyName(e.id, e.currency)}</td>
            <td>{Number(this.currencyAsk(e.id, e.currency)).toFixed(2).toString()}</td>
            <td>{Number(this.currencyConvert(e.id, e.currency, e.value)).toFixed(2)}</td>
            <td>Real</td>
          </tr>
        ))}
      </table>
    );
  }
}

Table.propTypes = {
  tableExpenses: PropTypes.shape({
    find: PropTypes.func,
    map: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  tableExpenses: state.wallet.expenses,
});

export default connect(mapStateToProps, null)(Table);
