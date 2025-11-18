import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './Component/Navbar';
import ItemListContainer from './Component/ItemListConteiner';
import ItemDetailContainer from './Component/ItemDetailContainer';
import Cart from './Component/Cart';
import Checkout from './Component/Checkout';
import NotFound from './Component/NotFound';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <NavBar />
          <main className="main-content">
            <Routes>
              <Route 
                path="/" 
                element={<ItemListContainer greeting="¡Bienvenidos a RestoApp!" />} 
              />
              <Route 
                path="/category/:categoryId" 
                element={<ItemListContainer greeting="Productos por categoría" />} 
              />
              <Route 
                path="/item/:id" 
                element={<ItemDetailContainer />} 
              />
              <Route 
                path="/cart" 
                element={<Cart />} 
              />
              <Route 
                path="/checkout" 
                element={<Checkout />} 
              />
              <Route 
                path="*" 
                element={<NotFound />} 
              />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;

