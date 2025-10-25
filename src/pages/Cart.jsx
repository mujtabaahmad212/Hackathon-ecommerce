import { Link } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, getTotalPrice, clearCart } = useCart();
  const totalPricePKR = getTotalPrice().toFixed(0);

  if (items.length === 0) {
    return (
      <div className="container py-5 text-center">
        <h2 className="mb-4 text-light">Aap ka Cart Khali Hai (Your Cart is Empty) 😔</h2>
        <p className="lead text-primary">Kuch achi khareedari karain!</p>
        <Link to="/" className="btn btn-primary btn-lg mt-3">
          🛒 Bazaar Dekhein (View Market)
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 border-bottom pb-2 text-primary">Aap ki Khareedari (Your Shopping)</h2>
      <div className="row">
        <div className="col-md-8">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="col-md-4">
          <div className="card p-3 sticky-top" style={{ top: '80px' }}>
            <div className="card-body">
              <h5 className="card-title text-accent-bold mb-3 border-bottom pb-2">Hisaab (Summary)</h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="fw-light">Total Items:</span>
                <span className="fw-bold text-light">{items.length}</span>
              </div>
              <div className="d-flex justify-content-between mb-4 fs-4 fw-bolder">
                <span>Kul Rupay (Total):</span>
                <span className="text-accent-bold">PKR {totalPricePKR}</span>
              </div>
              <Link to="/checkout" className="btn btn-primary w-100 mb-2">
                Paisa Dein (Pay) →
              </Link>
              <button onClick={clearCart} className="btn btn-outline-light w-100">
                Cart Saaf Karain
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}