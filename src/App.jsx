import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './Component/Navbar';
import ItemListContainer from './Component/ItemListConteiner';
import ItemDetailContainer from './Component/ItemDetailContainer';
import Cart from './Component/Cart';
import Checkout from './Component/Checkout';
import NotFound from './Component/NotFound';

// Componente para manejar redirecciones de GitHub Pages (solo en producción)
const GitHubPagesRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Si hay un parámetro de query que empieza con /, significa que viene de 404.html
    const queryParams = new URLSearchParams(location.search);
    const redirectPath = queryParams.get('/');
    
    if (redirectPath) {
      // Reemplazar ~and~ con & y navegar sin recargar
      const path = redirectPath.replace(/~and~/g, '&');
      navigate(path, { replace: true });
    }
  }, [location, navigate]);

  return null;
};

function App() {
  return (
    <CartProvider>
      <Router>
        <GitHubPagesRedirect />
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

