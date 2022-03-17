import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function NavbarCostumer() {
  const history = useHistory();
  const [customerName, setCustomerName] = useState();

  function removeLocalStorageAndLogout() {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('user'));
    setCustomerName(obj.name);
  }, []);

  return (
    <header>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-products"
        onClick={ () => history.push('/customer/products') }
      >
        PRODUTOS
      </button>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history.push('/customer/orders') }
      >
        MEUS PEDIDOS
      </button>
      <span data-testid="customer_products__element-navbar-user-full-name">
        {customerName}
      </span>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-logout"
        onClick={ removeLocalStorageAndLogout }
      >
        Sair
      </button>
    </header>
  );
}

export default NavbarCostumer;
