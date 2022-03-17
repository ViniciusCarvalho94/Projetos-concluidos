import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import NavbarCustomer from '../components/NavbarCustomer';
import { axiosGetApi } from '../api/axiosApi';
import ProductCard from '../components/ProductCard';
import Context from '../context/Context';

function CustomerProducts() {
  const history = useHistory();

  const [arrayOfProducts, setArrayOfProducts] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const { globalCart } = useContext(Context);

  useEffect(() => {
    let totalPrice = 0.00;
    const total = globalCart.map(({ subTotal }) => {
      const sum = totalPrice + parseFloat(subTotal);
      totalPrice = sum;
      return sum;
    });
    totalPrice = ((total[total.length - 1] * 100) / 100);
    setTotalCartPrice(totalPrice);
  }, [globalCart]);

  useEffect(() => {
    const getProductsFromApi = async () => {
      const { data } = await axiosGetApi('/customer/products');

      setArrayOfProducts(data);
    };
    getProductsFromApi();
  }, []);

  const disableButton = () => globalCart.length === 0;

  return (
    <>
      <NavbarCustomer />
      {arrayOfProducts.map(({ id, name, price, urlImage }, index) => (
        <ProductCard
          index={ index }
          key={ id }
          productId={ id }
          name={ name }
          unitPrice={ price }
          urlImage={ urlImage }
        />
      ))}
      <button
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ disableButton() }
        onClick={ () => history.push('/customer/checkout') }
      >
        <h1>
          Ver Carrinho: R$
          <span data-testid="customer_products__checkout-bottom-value">
            {totalCartPrice ? totalCartPrice.toFixed(2).replace('.', ',') : '0,00'}
          </span>
        </h1>
      </button>
    </>
  );
}

export default CustomerProducts;
