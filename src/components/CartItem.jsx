import { useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { Spinner } from 'react-bootstrap'; 
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  
  // NEW STATE for local loading
  const [isLoading, setIsLoading] = useState(false);
  
  const itemPricePKR = (item.price * 280).toFixed(0);
  const totalItemPricePKR = (item.price * item.quantity * 280).toFixed(0);

  const handleUpdateQuantity = (newQuantity) => {
    if (newQuantity < 1) return;
    setIsLoading(true);
    // Pass setIsLoading as a callback function to the context
    updateQuantity(item.id, newQuantity, setIsLoading); 
  };
  
  const handleRemove = () => {
    setIsLoading(true);
    // Pass setIsLoading as a callback function to the context
    removeFromCart(item.id, setIsLoading);
  };

  return (
    <div className="card mb-3 shadow-lg">
      <div className="row g-0 align-items-center">
        <div className="col-md-2 p-2 text-center">
          <img
            src={item.image}
            className="img-fluid rounded-start"
            alt={item.title}
            style={{ maxHeight: '100px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-10">
          <div className="card-body p-3">
            <div className="d-flex justify-content-between align-items-start">
              <h5 className="card-title text-primary">{item.title}</h5>
              
              {/* Show full loading overlay or button */}
              {isLoading ? (
                  <Spinner animation="border" variant="danger" size="sm" />
              ) : (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={handleRemove}
                    disabled={isLoading}
                  >
                    <BsTrash /> Remove
                  </button>
              )}
            </div>
            
            <p className="card-text text-dark fw-bold fs-5">PKR {totalItemPricePKR}</p>
            <p className="card-text text-muted">Per Item: PKR {itemPricePKR}</p>
            
            <div className="d-flex align-items-center mt-2">
              <button
                className="btn btn-outline-dark btn-sm me-1"
                onClick={() => handleUpdateQuantity(item.quantity - 1)}
                disabled={item.quantity <= 1 || isLoading}
              >
                -
              </button>
              
              {/* Quantity display with optional small loader */}
              <span className="mx-2 fs-5 text-dark">
                {item.quantity}
                {isLoading && (
                    <Spinner 
                        animation="border" 
                        variant="primary" 
                        size="sm" 
                        className="ms-2" 
                        style={{ width: '0.8rem', height: '0.8rem' }}
                    />
                )}
              </span>
              
              <button
                className="btn btn-outline-dark btn-sm ms-1"
                onClick={() => handleUpdateQuantity(item.quantity + 1)}
                disabled={isLoading}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}