import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Context from './Context';

function Provider({ children }) {
  const [user, setUser] = useState({ email: '', password: '' });
  const [globalCart, setGlobalCart] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const context = {
    user,
    setUser,
    globalCart,
    setGlobalCart,
    email,
    setEmail,
    password,
    setPassword,
  };

  return (
    <main>
      <Context.Provider value={ context }>
        {children}
      </Context.Provider>
    </main>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
