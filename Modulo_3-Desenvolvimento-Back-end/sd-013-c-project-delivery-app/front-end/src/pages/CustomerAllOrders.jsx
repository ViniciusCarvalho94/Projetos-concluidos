import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axiosPostApi } from '../api/axiosApi';
import NavbarCustomer from '../components/NavbarCustomer';

function CustomerAllOrders() {
  const history = useHistory();
  const [allOrders, SetAllOrders] = useState([]);

  useEffect(() => {
    const getAllUserOrders = async () => {
      const { token } = JSON.parse(localStorage.getItem('user'));
      const { data } = await axiosPostApi('/customer/orders', { token });

      SetAllOrders(data);
    };
    getAllUserOrders();
  }, []);

  const DATA_TEST_ID = 'customer_orders__element-';

  return (
    <>
      <NavbarCustomer />
      {allOrders.length >= 1 && allOrders.map((
        { id, saleDate, totalPrice, status },
      ) => (
        <div
          key={ id }
          role="button"
          tabIndex={ id }
          onClick={ () => history.push(`/customer/orders/${id}`) }
          onKeyDown={
            (ev) => ev.key === 'Enter' && history.push(`/customer/orders/${id}`)
          }
        >
          <div>
            <h1>Pedido</h1>
            <h4 data-testid={ `${DATA_TEST_ID}order-id-${id}` }>{`000${id}`}</h4>
          </div>
          <div>
            <h4 data-testid={ `${DATA_TEST_ID}delivery-status-${id}` }>{status}</h4>
            <h4 data-testid={ `${DATA_TEST_ID}order-date-${id}` }>
              {`${new Date(saleDate).toLocaleDateString('pt-br',
                { year: 'numeric', month: '2-digit', day: '2-digit' })
              }`}
            </h4>
            <h4 data-testid={ `${DATA_TEST_ID}card-price-${id}` }>
              {`${totalPrice.replace('.', ',')}`}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
}

export default CustomerAllOrders;
