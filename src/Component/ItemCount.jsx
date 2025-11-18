import React, { useState } from 'react';

const ItemCount = ({ initial = 1, stock = 0, onAdd }) => {
  const [quantity, setQuantity] = useState(initial);

  const increment = () => {
    if (quantity < stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    onAdd(quantity);
  };

  return (
    <div className="item-count">
      <div className="quantity-controls">
        <button 
          onClick={decrement} 
          disabled={quantity <= 1}
          className="quantity-btn"
        >
          -
        </button>
        <span className="quantity">{quantity}</span>
        <button 
          onClick={increment} 
          disabled={quantity >= stock}
          className="quantity-btn"
        >
          +
        </button>
      </div>
      <button 
        onClick={handleAddToCart}
        disabled={stock === 0}
        className="add-to-cart-btn"
      >
        {stock === 0 ? 'Sin stock' : 'Agregar al carrito'}
      </button>
    </div>
  );
};

export default ItemCount;
