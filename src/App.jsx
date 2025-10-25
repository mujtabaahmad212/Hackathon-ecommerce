import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { Spinner } from 'react-bootstrap'; 
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// --- Full-Page Loading Overlay Component ---
const LoadingOverlay = ({ isLoading }) => {
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        const removeTimer = setTimeout(() => setShowOverlay(false), 500); 
        return () => clearTimeout(removeTimer);
      }, 50); 
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (!showOverlay) return null;

  return (
    <div className={`loading-overlay ${!isLoading ? 'fade-out' : ''}`}>
      <Spinner animation="border" variant="primary" size="lg" style={{ width: '3rem', height: '3rem' }} />
      <p className="loader-text">Loading E-Commerce Platform...</p>
    </div>
  );
};
// ---------------------------------------------


function App() {
  const [appLoading, setAppLoading] = useState(true);

  const handleAppLoaded = () => {
    setAppLoading(false);
  }

  return (
    <Router>
      <LoadingOverlay isLoading={appLoading} /> 
      
      {/* TOAST CONTAINER: For all global notifications */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light" 
      />
      
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home onDataLoaded={handleAppLoaded} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App