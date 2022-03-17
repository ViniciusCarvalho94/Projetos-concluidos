import React, { useEffect, useState, useContext } from 'react';
import Context from '../context/Context';
import DeliveryDetails from '../components/DeliveryDetails';
import NavbarCustomer from '../components/NavbarCustomer';

const DATA_TEST_ID = 'customer_checkout__element-order-table-';

function CustomerCheckout() {
  const { globalCart } = useContext(Context);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    setProducts(globalCart);
  }, []);

  useEffect(() => {
    const totalPriceProducts = products.reduce((pv, cv) => pv + Number(cv.subTotal), 0);
    const fixedPrice = ((totalPriceProducts * 100) / 100).toFixed(2).replace('.', ',');

    setTotalPrice(fixedPrice);
  }, [products]);

  const removeListItem = (productId) => {
    const filteredProducts = products
      .filter((product) => product.productId !== productId);

    setProducts(filteredProducts);
  };

  return (
    <div className="CustomerCheckout">
      <NavbarCustomer />
      <table>
        <tbody>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover Item</th>
          </tr>
        </tbody>
        {
          products && products.map(
            ({ productId, name, quantity, unitPrice, subTotal }, index) => (
              <tr
                key={ index }
                id={ index }
                data-testid={ `element-order-table-name-${index}` }
              >
                <td data-testid={ `${DATA_TEST_ID}item-number-${index}` }>
                  { index + 1 }
                </td>
                <td data-testid={ `${DATA_TEST_ID}name-${index}` }>
                  { name }
                </td>
                <td data-testid={ `${DATA_TEST_ID}quantity-${index}` }>
                  { quantity }
                </td>
                <td data-testid={ `${DATA_TEST_ID}unit-price-${index}` }>
                  { unitPrice.replace('.', ',') }
                </td>
                <td data-testid={ `${DATA_TEST_ID}sub-total-${index}` }>
                  { subTotal.replace('.', ',') }
                </td>
                <button
                  type="button"
                  onClick={ () => removeListItem(productId) }
                  data-testid={ `${DATA_TEST_ID}remove-${index}` }
                >
                  Delete
                </button>
              </tr>
            ),
          )
        }
      </table>
      <h3 data-testid="customer_checkout__element-order-total-price">
        {`${totalPrice}`}
      </h3>
      <DeliveryDetails
        totalPrice={ totalPrice }
        globalCart={ globalCart }
      />
    </div>
  );
}

export default CustomerCheckout;
