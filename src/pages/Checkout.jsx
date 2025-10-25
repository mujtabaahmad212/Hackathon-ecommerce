import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPricePKR = getTotalPrice().toFixed(0);
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
    alert(`Your order for PKR ${totalPricePKR} has been placed successfully!`);
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
          <h2 className="mb-4 text-primary border-bottom pb-2">Shipping Information</h2>
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
                <label htmlFor="address" className="form-label">Street Address</label>
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
                🚚 Place Order - PKR {totalPricePKR}
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-6">
          <h2 className="mb-4 text-primary border-bottom pb-2">Order Details</h2>
          <div className="card p-4 sticky-top" style={{ top: '80px' }}>
            <h5 className="card-title mb-3 text-primary">Items ({items.length})</h5>
            <ul className="list-group list-group-flush border-bottom mb-3" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {items.map(item => (
                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center text-light">
                  <span className="text-truncate me-2">{item.title}</span>
                  <span className="fw-light">× {item.quantity}</span>
                  <span className="ms-auto fw-bold text-accent-bold">PKR {(item.price * item.quantity * 280).toFixed(0)}</span>
                </li>
              ))}
            </ul>
            <div className="d-flex justify-content-between fw-bolder fs-3">
              <span>Grand Total:</span>
              <span className="text-primary">PKR {totalPricePKR}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}