import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CartWidget from './CartWidget';
import { getCategories } from '../services/firestoreService';

const NavBar = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        // Error handled silently for production
      }
    };

    fetchCategories();
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo a la izquierda */}
        <div className="navbar-logo">
          <NavLink to="/">
            <h2>🍽️ RestoApp</h2>
          </NavLink>
        </div>
        
        {/* Enlaces al centro */}
        <div className="navbar-links">
          <NavLink to="/" end>Home</NavLink>
          <div className="dropdown">
            <span>Categorías</span>
            <div className="dropdown-content">
              {categories.map((category) => (
                <NavLink 
                  key={category.id} 
                  to={`/category/${category.id}`}
                >
                  {category.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
        
        {/* CartWidget a la derecha */}
        <div className="navbar-cart">
          <CartWidget />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

