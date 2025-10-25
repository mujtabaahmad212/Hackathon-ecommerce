import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPricePKR = getTotalPrice().toFixed(0);

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4 text-light">Your Shopping Cart is Empty 🛒</h2>
        <p className="lead text-primary">Start adding great items to your cart!</p>
        <Link to="/" className="btn btn-primary btn-lg mt-3">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 border-bottom pb-2 text-primary">Your Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-3 sticky-top" style={{ top: '80px' }}>
            <div className="card-body">
              <h5 className="card-title text-primary mb-3 border-bottom pb-2">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-light">Total Items:</span>
                <span className="fw-bold text-light">{items.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 fs-4 fw-bolder">
                <span>Total Amount:</span>
                <span className="text-accent-bold">PKR {totalPricePKR}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary w-100 mb-2">
                Proceed to Checkout →
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