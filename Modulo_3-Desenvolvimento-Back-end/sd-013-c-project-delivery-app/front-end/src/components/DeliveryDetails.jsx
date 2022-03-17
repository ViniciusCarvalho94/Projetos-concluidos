import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { axiosPostApi, axiosGetApi } from '../api/axiosApi';

function DeliveryDetails({ totalPrice, globalCart }) {
  const [sellerId, setSellerId] = useState(2);
  const [sellersArray, setSellersArray] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const history = useHistory();

  const { token, email } = JSON.parse(localStorage.getItem('user'));
  const axiosConfig = {
    headers: {
      authorization: token,
    },
  };

  const insertCheckoutDataOnTableSale = async () => {
    const saleCheckout = {
      email,
      sellerId,
      totalPrice: Number(totalPrice.replace(',', '.')),
      deliveryAddress,
      deliveryNumber,
    };
    const createdSale = await axiosPostApi('/sale', {
      saleCheckout,
      globalCart,
    }, axiosConfig);

    return createdSale.data.dataValues.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saleId = await insertCheckoutDataOnTableSale();

      history.push(`/customer/orders/${saleId}`);
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  useEffect(() => {
    const getProductsFromApi = async () => {
      const { data } = await axiosGetApi('/seller');

      setSellersArray(data);
      setSellerId(data[0].id);
    };
    getProductsFromApi();
  }, []);

  return (
    <div className="div-seller">
      <h1>Detalhes e Endereço para entrega</h1>
      <label htmlFor="seller">
        P. Vendedora Responsável
        <select
          id="seller"
          className="input"
          data-testid="customer_checkout__select-seller"
          value={ sellerId }
          onChange={ ({ target }) => setSellerId(target.value) }
        >
          {sellersArray && sellersArray.map(({ id, name }, index) => (
            <option
              aria-label="seller"
              value={ id }
              key={ index }
            >
              {name}
            </option>
          ))}
        </select>
      </label>
      <label htmlFor="address">
        Endereço
        <input
          id="address"
          className="input"
          type="address"
          data-testid="customer_checkout__input-address"
          value={ deliveryAddress }
          onChange={ ({ target }) => setDeliveryAddress(target.value) }
        />
      </label>
      <label htmlFor="addressNumber">
        Número
        <input
          id="addressNumber"
          className="input"
          type="addressNumber"
          data-testid="customer_checkout__input-addressNumber"
          value={ deliveryNumber }
          onChange={ ({ target }) => setDeliveryNumber(target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="customer_checkout__button-submit-order"
        onClick={ handleSubmit }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

DeliveryDetails.propTypes = {
  totalPrice: PropTypes.number.isRequired,
  globalCart: PropTypes.arrayOf.isRequired,
};

export default DeliveryDetails;
