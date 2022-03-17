import React, { useEffect, useState } from 'react';
import NavbarSeller from '../components/NavbarSeller';
import { axiosGetApi } from '../api/axiosApi';

function SellerOrderDetails(params) {
  const { match: { params: { id: paramsId } } } = params;

  const [orderProducts, setOrderProducts] = useState([]);
  const [isPreparing, setIsPreparing] = useState(false);

  useEffect(() => {
    const getOrderById = async () => {
      const { data } = await axiosGetApi(`/seller/orders/${paramsId}`);
      setOrderProducts(data);
    };
    getOrderById();
  }, []);

  const handleClick = ((status) => {
    if (status === 'Preparando') setIsPreparing(true);
    setOrderProducts({ ...orderProducts, status });
  });

  const DATA_TEST_ID = 'seller_order_details__element-order-';

  if (orderProducts.length === 0) return <p>Loading...</p>;

  return (
    <>
      <NavbarSeller />
      <span data-testid={ `${DATA_TEST_ID}details-label-order-id` }>
        {orderProducts.id}
      </span>
      <span data-testid={ `${DATA_TEST_ID}details-label-order-date` }>
        {`${new Date(orderProducts.saleDate).toLocaleDateString(
          'pt-br',
          { day: '2-digit', month: '2-digit', year: 'numeric' },
        )}`}
      </span>
      <button
        type="button"
        disabled={ isPreparing }
        onClick={ () => handleClick('Preparando') }
        data-testid="seller_order_details__button-preparing-check"
      >
        PREPARAR PEDIDO
      </button>
      <button
        type="button"
        disabled={ !isPreparing }
        onClick={ () => handleClick('A Caminho') }
        data-testid="seller_order_details__button-dispatch-check"
      >
        SAIU PARA ENTREGA
      </button>
      <span data-testid={ `${DATA_TEST_ID}details-label-delivery-status` }>
        {orderProducts.status}
      </span>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        {
          orderProducts.product && orderProducts.product.map(
            ({ name, price, saleProduct: { quantity } }, index) => (
              <tr
                key={ index }
                data-testid={ `${DATA_TEST_ID}table-item-number-${index}` }
              >
                <td data-testid={ `${DATA_TEST_ID}item-number-${index}` }>
                  { index + 1 }
                </td>
                <td data-testid={ `${DATA_TEST_ID}table-name-${index}` }>
                  {name}
                </td>
                <td data-testid={ `${DATA_TEST_ID}table-quantity-${index}` }>
                  {quantity}
                </td>
                <td data-testid={ `${DATA_TEST_ID}table-unit-price-${index}` }>
                  {`R$ ${price}`}
                </td>
                <td data-testid={ `${DATA_TEST_ID}table-sub-total-${index}` }>
                  {
                    `R$ ${(((parseFloat(price) * quantity) * 100) / 100)
                      .toFixed(2)
                      .replace('.', ',')}`
                  }
                </td>
              </tr>
            ),
          )
        }
      </table>
      <h3 data-testid={ `${DATA_TEST_ID}total-price` }>
        {(orderProducts.totalPrice).replace('.', ',')}
      </h3>
    </>
  );
}

export default SellerOrderDetails;
