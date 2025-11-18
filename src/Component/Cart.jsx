import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeItem, clearCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-empty">
          <h2>Tu carrito está vacío</h2>
          <p>Agrega productos para comenzar tu pedido</p>
          <Link to="/" className="btn-primary">
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p className="cart-item-price">${item.price.toLocaleString()}</p>
                <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                <p className="cart-item-subtotal">
                  Subtotal: ${(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="btn-remove"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Resumen del pedido</h2>
          <div className="cart-total">
            <p>Total: <span>${getTotalPrice().toLocaleString()}</span></p>
          </div>
          <div className="cart-actions">
            <button onClick={clearCart} className="btn-clear">
              Vaciar carrito
            </button>
            <Link to="/checkout" className="btn-checkout">
              Finalizar compra
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

