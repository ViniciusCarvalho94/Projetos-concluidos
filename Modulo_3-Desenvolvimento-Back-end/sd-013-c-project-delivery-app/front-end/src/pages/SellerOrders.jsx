import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosPostApi } from '../api/axiosApi';
import NavbarSeller from '../components/NavbarSeller';

function SellerOrders() {
  const history = useHistory();

  const [arrayOfOrders, SetArrayOfOrders] = useState([]);

  useEffect(() => {
    const { email } = JSON.parse(localStorage.getItem('user'));

    const getOrdersFromApi = async () => {
      const { data } = await axiosPostApi('/seller/orders', { email });
      SetArrayOfOrders(data);
    };
    getOrdersFromApi();
  }, []);

  const DATA_TEST_ID = 'seller_orders__element-';

  return (
    <>
      <NavbarSeller />
      {arrayOfOrders.length >= 1 && arrayOfOrders.map((
        { id, saleDate, totalPrice, deliveryAddress, deliveryNumber, status },
      ) => (
        <span
          aria-hidden="true"
          key={ id }
          onClick={ () => history.push(`/seller/orders/${id}`) }
        >
          <div>
            <span>Pedido</span>
            <span data-testid={ `${DATA_TEST_ID}order-id-${id}` }>{id}</span>
          </div>
          <div>
            <span data-testid={ `${DATA_TEST_ID}delivery-status-${id}` }>{status}</span>
            <span data-testid={ `${DATA_TEST_ID}order-date-${id}` }>
              {`${new Date(saleDate).toLocaleDateString('pt-br',
                { year: '2-digit', month: '2-digit', day: '2-digit' })
              }`}
            </span>
            <span data-testid={ `${DATA_TEST_ID}card-price-${id}` }>{totalPrice}</span>
            <span data-testid={ `${DATA_TEST_ID}card-address-${id}` }>
              {`${deliveryAddress}, ${deliveryNumber}`}
            </span>
          </div>
        </span>
      ))}
    </>
  );
}

export default SellerOrders;
