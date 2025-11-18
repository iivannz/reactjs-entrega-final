import React from 'react';
import { Link } from 'react-router-dom';
import ItemCount from './ItemCount';

const ItemDetail = ({ product, onAddToCart, addedToCart }) => {
  const handleAddToCart = (quantity) => {
    onAddToCart(product, quantity);
  };

  return (
    <div className="item-detail">
      <div className="item-detail-container">
        <div className="item-detail-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="item-detail-info">
          <h1 className="item-detail-title">{product.title}</h1>
          <p className="item-detail-price">${product.price.toLocaleString()}</p>
          <p className="item-detail-description">{product.description}</p>
          <div className="item-detail-stock">
            Stock disponible: {product.stock}
          </div>
          {!addedToCart ? (
            <ItemCount 
              stock={product.stock} 
              onAdd={handleAddToCart}
            />
          ) : (
            <div className="added-to-cart">
              <p>¡Producto agregado al carrito!</p>
              <Link to="/cart" className="btn-primary">
                Ver carrito
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
