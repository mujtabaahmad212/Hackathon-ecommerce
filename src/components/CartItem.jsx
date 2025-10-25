import { BsTrash } from 'react-icons/bs';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const itemPricePKR = (item.price * 280).toFixed(0);
  const totalItemPricePKR = (item.price * item.quantity * 280).toFixed(0);

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
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => removeFromCart(item.id)}
              >
                <BsTrash /> Remove
              </button>
            </div>
            <p className="card-text text-light fw-bold fs-5">PKR {totalItemPricePKR}</p>
            <p className="card-text text-muted">Per Item: PKR {itemPricePKR}</p>
            <div className="d-flex align-items-center mt-2">
              <button
                className="btn btn-outline-light btn-sm me-1"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="mx-2 fs-5 text-light">{item.quantity}</span>
              <button
                className="btn btn-outline-light btn-sm ms-1"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
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