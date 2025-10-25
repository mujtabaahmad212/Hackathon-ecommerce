import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4 text-light">Your Cart is Empty 😔</h2>
        <p className="lead text-primary">Add some cyber-gear to get started!</p>
        <Link to="/" className="btn btn-primary btn-lg mt-3">
          🛒 Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 border-bottom pb-2 text-primary">Your Shopping Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-3 sticky-top" style={{ top: '80px' }}>
            <div className="card-body">
              <h5 className="card-title text-secondary-custom mb-3 border-bottom pb-2">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-light">Total Items:</span>
                <span className="fw-bold text-light">{items.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 fs-4 fw-bolder">
                <span>Total:</span>
                <span className="text-secondary-custom">${getTotalPrice().toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary w-100 mb-2">
                Secure Checkout →
              </Link>
              <button onClick={clearCart} className="btn btn-outline-light w-100">
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}