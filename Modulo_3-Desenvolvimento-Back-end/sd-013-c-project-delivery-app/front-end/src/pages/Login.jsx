import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosPostApi } from '../api/axiosApi';
import Context from '../context/Context';

function Login() {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(Context);

  const history = useHistory();

  const emailIsValid = () => {
    const validationRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    // source: https://www.w3resource.com/javascript/form/email-validation.php
    const validEmail = validationRegex.test(email);
    return validEmail;
  };

  const minPasswordLength = 6;
  const passwordIsValid = password.length >= minPasswordLength;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosPostApi('/login', { email, password });

      localStorage.setItem('user', JSON.stringify(data.user));
      const { role } = data.user;
      switch (role) {
      case 'seller':
        history.push('/seller/orders');
        break;
      case 'administrator':
        history.push('/admin/manage');
        break;
      default: history.push('/customer/products');
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    const checkLoggedUser = async () => {
      const user = JSON.parse(localStorage.getItem('user'));

      if (user) {
        switch (user.role) {
        case 'seller':
          history.push('/seller/orders');
          break;
        case 'administrator':
          history.push('/admin/manage');
          break;
        default: history.push('/customer/products');
        }
      }
    };
    checkLoggedUser();
  }, []);

  return (
    <div className="div-login">
      <h1>Login</h1>
      <form onSubmit={ handleLogin } className="form-login">
        <div className="div-input">
          <label htmlFor="email">
            Login
            <input
              id="email"
              className="input"
              type="email"
              data-testid="common_login__input-email"
              value={ email }
              onChange={ ({ target }) => setEmail(target.value) }
            />
          </label>
          <label htmlFor="password">
            Senha
            <input
              id="password"
              className="input"
              type="password"
              data-testid="common_login__input-password"
              value={ password }
              onChange={ ({ target }) => setPassword(target.value) }
            />
          </label>
        </div>
        <div className="button-login">
          <button
            type="submit"
            className="button-login"
            data-testid="common_login__button-login"
            disabled={ !(emailIsValid() && passwordIsValid) }
          >
            LOGIN
          </button>
        </div>
        <div className="button-register">
          <button
            type="button"
            className="button-register"
            data-testid="common_login__button-register"
            onClick={ () => history.push('/register') }
          >
            Ainda não tenho conta
          </button>
        </div>
        <span data-testid="common_login__element-invalid-email" />
      </form>
    </div>
  );
}

export default Login;
