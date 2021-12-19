import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { emailAction } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      email: '',
      password: '',
      validateEmail: false,
      validatePassword: false,
    };
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
    if (name === 'email') {
      this.validateEmail(value);
    }
    if (name === 'password') {
      this.validatePassword(value);
    }
  }

  validateEmail(email) {
    const emailFormat = /^\S+@\S+\.\S+$/;
    const correctEmail = emailFormat.test(email);
    if (correctEmail) {
      this.setState({ validateEmail: true });
    } else this.setState({ validateEmail: false });
  }

  validatePassword(password) {
    const passwordFormat = /^\S{5}\S+$/;
    const correctPassword = passwordFormat.test(password);
    if (correctPassword) {
      this.setState({ validatePassword: true });
    } else this.setState({ validatePassword: false });
  }

  render() {
    const { validateEmail, validatePassword } = this.state;
    const { OneAction } = this.props;
    return (
      <fieldset>
        <label htmlFor="email">
          <input
            data-testid="email-input"
            type="text"
            name="email"
            placeholder="Digite seu Email"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="password">
          <input
            data-testid="password-input"
            type="text"
            name="password"
            placeholder="Digite sua senha"
            onChange={ this.handleChange }
          />
        </label>

        <Link to="/carteira">
          <input
            disabled={ !validateEmail || !validatePassword }
            type="button"
            value="Entrar"
            onClick={ () => OneAction(this.state) }
          />
        </Link>
      </fieldset>
    );
  }
}

Login.propTypes = {
  OneAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  OneAction: (state) => dispatch(emailAction(state)),
});

export default connect(null, mapDispatchToProps)(Login);
