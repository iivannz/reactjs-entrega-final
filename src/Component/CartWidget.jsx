import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

  return (
    <Link to="/cart" className="cart-widget">
      <span className="cart-icon">🛒</span>
      {totalQuantity > 0 && (
        <span className="cart-count">{totalQuantity}</span>
      )}
    </Link>
  );
};

export default CartWidget;

