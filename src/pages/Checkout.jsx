import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zip: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order for $${getTotalPrice().toFixed(2)} placed successfully! Your delivery drone is en route.`);
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-md-6">
          <h2 className="mb-4 text-primary border-bottom pb-2">Shipping Terminal</h2>
          <div className="card p-4">
             <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Street Address (Cyber-Grid Location)</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="row g-3">
                <div className="col-md-8">
                  <label htmlFor="city" className="form-label">City</label>
                  <input
                    type="text"
                    className="form-control"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="zip" className="form-label">ZIP Code</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-lg w-100 mt-4">
                🚀 Initiate Order - Total ${getTotalPrice().toFixed(2)}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-4 text-primary border-bottom pb-2">Order Review (Manifest)</h2>
          <div className="card p-4 sticky-top" style={{ top: '80px' }}>
            <h5 className="card-title mb-3 text-secondary-custom">Items ({items.length})</h5>
            <ul className="list-group list-group-flush border-bottom mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {items.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent text-light border-secondary">
                  <span className="text-truncate me-2">{item.title}</span>
                  <span className="fw-light">× {item.quantity}</span>
                  <span className="ms-auto fw-bold text-secondary-custom">${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bolder fs-3">
              <span>Grand Total:</span>
              <span className="text-primary">${getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}