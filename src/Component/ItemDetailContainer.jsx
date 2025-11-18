import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemDetail from './ItemDetail';
import { getProductById } from '../services/firestoreService';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { id } = useParams();
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = (product, quantity) => {
    addItem(product, quantity);
    setAddedToCart(true);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <h2>Producto no encontrado</h2>
        <p>El producto solicitado no existe.</p>
      </div>
    );
  }

  return (
    <ItemDetail 
      product={product} 
      onAddToCart={handleAddToCart}
      addedToCart={addedToCart}
    />
  );
};

export default ItemDetailContainer;
