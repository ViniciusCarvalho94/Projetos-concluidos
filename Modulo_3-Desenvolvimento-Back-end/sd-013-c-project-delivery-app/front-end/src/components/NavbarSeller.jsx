import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function NavbarSeller() {
  const history = useHistory();
  const [sellerName, setSellerName] = useState();

  function removeLocalStorageAndLogout() {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    const obj = JSON.parse(localStorage.getItem('user'));
    setSellerName(obj.name);
  }, []);

  return (
    <header>
      <button
        type="button"
        data-testid="customer_products__element-navbar-link-orders"
        onClick={ () => history.push('/seller/orders') }
      >
        PEDIDOS
      </button>
      <span data-testid="customer_products__element-navbar-user-full-name">
        {sellerName}
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

export default NavbarSeller;
