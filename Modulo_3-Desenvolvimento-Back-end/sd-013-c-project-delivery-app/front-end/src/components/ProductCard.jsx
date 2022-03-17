import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function ProductCard({ productId, name, unitPrice, urlImage }, index) {
  const { globalCart, setGlobalCart } = useContext(Context);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const product = globalCart.find((item) => item.productId === productId);
    if (!product) {
      const subTotal = (parseFloat(unitPrice) * quantity).toFixed(2);
      return setGlobalCart([...globalCart,
        { productId, name, unitPrice, quantity, subTotal }]);
    }

    if (product) {
      product.subTotal = (parseFloat(unitPrice) * quantity).toFixed(2);
      product.quantity = quantity;
      setGlobalCart([...globalCart]);
    }

    if (product.quantity <= 0) {
      const newArray = globalCart
        .filter((productCart) => productCart.productId !== productId);
      setGlobalCart(newArray);
    }
  }, [quantity]);

  useEffect(() => {
    setGlobalCart([...globalCart]);
  }, []);

  return (
    <div key={ index }>
      <h1 data-testid={ `customer_products__element-card-title-${productId}` }>
        { name }
      </h1>
      <h1 data-testid={ `customer_products__element-card-price-${productId}` }>
        {`${unitPrice.replace('.', ',')}`}
      </h1>
      <img
        data-testid={ `customer_products__img-card-bg-image-${productId}` }
        src={ urlImage }
        alt={ name }
      />
      <button
        type="button"
        data-testid={ `customer_products__button-card-add-item-${productId}` }
        onClick={ () => {
          setQuantity(quantity + 1);
        } }
      >
        +
      </button>
      <button
        type="button"
        data-testid={ `customer_products__button-card-rm-item-${productId}` }
        onClick={ () => {
          if (quantity >= 1) setQuantity(quantity - 1);
        } }
      >
        -
      </button>
      <input
        data-testid={ `customer_products__input-card-quantity-${productId}` }
        value={ quantity }
        onChange={ ({ target }) => setQuantity(target.value) }
      />
    </div>
  );
}

ProductCard.propTypes = {
  productId: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  unitPrice: PropTypes.string.isRequired,
  urlImage: PropTypes.string.isRequired,
};

export default ProductCard;
