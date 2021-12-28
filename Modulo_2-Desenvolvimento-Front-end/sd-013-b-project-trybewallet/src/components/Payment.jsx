import PropTypes from 'prop-types';
import React from 'react';

export default class Payment extends React.Component {
  render() {
    const { handleChange } = this.props;
    return (
      <label htmlFor>
        Método de pagamento:
        <select name="method" onChange={ handleChange }>
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }
}

Payment.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
