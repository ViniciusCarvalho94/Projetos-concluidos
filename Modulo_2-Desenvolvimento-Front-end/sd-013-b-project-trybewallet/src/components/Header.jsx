import PropTypes from 'prop-types';
import React from 'react';

export default class Header extends React.Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header data-testid="email-field">
        {`Email Logado: ${email}`}
        <p data-testid="total-field">
          {`Valor total das despesas: R$${Number(totalValue).toFixed(2)}`}
        </p>
        <p data-testid="header-currency-field">Câmbio usado: BRL</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.string.isRequired,
};
