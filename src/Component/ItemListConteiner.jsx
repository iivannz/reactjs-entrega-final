import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ItemList from './ItemList';
import { getProducts, getCategories } from '../services/firestoreService';

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch categories for navigation
        const categoriesData = await getCategories();
        setCategories(categoriesData);
        
        // Fetch products (filtered by category if specified)
        const productsData = await getProducts(categoryId);
        setProducts(productsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
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

  const currentCategory = categoryId 
    ? categories.find(cat => cat.id === categoryId)
    : null;

  return (
    <div className="item-list-container">
      <h1>{greeting}</h1>
      {currentCategory && (
        <div className="category-info">
          <h2>{currentCategory.name}</h2>
          <p>{currentCategory.description}</p>
        </div>
      )}
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;

