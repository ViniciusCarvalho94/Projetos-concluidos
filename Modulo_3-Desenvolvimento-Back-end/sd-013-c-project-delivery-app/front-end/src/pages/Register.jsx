import React, { useState } from 'react';
import { useHistory } from 'react-router';
import { axiosPostApi } from '../api/axiosApi';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState(false);

  const history = useHistory();

  const disableButton = () => {
    const minPassword = 6;
    const minName = 12;
    const emailValidRegex = /\S+@\S+\.\S+/;
    if (password.length >= minPassword && emailValidRegex.test(email)
          && name.length >= minName) {
      return true;
    }
    return false;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosPostApi('/register', { name, email, password });

      const userRegister = {
        name, email, role: 'customer', token: data.token,
      };

      localStorage.setItem('user', JSON.stringify(userRegister));
      history.push('/customer/products');
    } catch (error) {
      setRegisterError(true);
      console.log(error);
      return error;
    }
  };

  return (
    <div className="container-cadastro">
      <h4>Cadastro</h4>
      <form className="register-form" onSubmit={ handleRegister }>
        <div className="inputs-register">
          <label htmlFor="input-name">
            Nome
            <input
              data-testid="common_register__input-name"
              type="text"
              id="input-name"
              value={ name }
              onChange={ (e) => setName(e.target.value) }
            />
          </label>

          <label htmlFor="input-email">
            Email
            <input
              data-testid="common_register__input-email"
              type="email"
              id="input-email"
              value={ email }
              onChange={ (e) => setEmail(e.target.value) }
            />
          </label>

          <label htmlFor="input-senha">
            Senha
            <input
              data-testid="common_register__input-password"
              type="password"
              id="input-senha"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>

          <button
            type="submit"
            className="register-button"
            data-testid="common_register__button-register"
            disabled={ !disableButton() }
            /* onClick={ () => history.push('/customer/products') } */
          >
            CADASTRAR
          </button>
          {registerError
            && <h3 data-testid="common_register__element-invalid_register">Invalid</h3>}
        </div>
      </form>
    </div>
  );
}

export default Register;
