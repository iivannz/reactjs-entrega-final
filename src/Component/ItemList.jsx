import React from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ products }) => {
  return (
    <div className="item-list">
      {products.map((product) => (
        <div key={product.id} className="item-card">
          <div className="item-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="item-info">
            <h3 className="item-title">{product.title}</h3>
            <p className="item-price">${product.price.toLocaleString()}</p>
            <p className="item-description">{product.description}</p>
            <div className="item-stock">
              Stock: {product.stock}
            </div>
            <Link to={`/item/${product.id}`} className="item-detail-link">
              Ver detalles
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemList;
