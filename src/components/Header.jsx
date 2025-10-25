import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { BsCart3 } from 'react-icons/bs';

export default function Header() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top">
      <div className="container">
        <Link className="navbar-brand fs-4 fw-bold" to="/">
          <span className="text-primary">Mujtaba Ahmad</span>
        </Link>
        <div className="navbar-nav ms-auto align-items-center">
          <Link className="nav-link mx-2" to="/">Home</Link>
          <Link className="nav-link mx-2 position-relative" to="/cart">
            <BsCart3 className="me-1 fs-5" />
            Cart
            <span 
              className={`badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle ${totalItems > 0 ? 'pulse-animation' : ''}`}
              style={{ fontSize: '0.7em' }}
            >
              {totalItems}
            </span>
          </Link>
          <Link className="nav-link btn btn-primary btn-sm ms-3 px-3" to="/checkout">
            Checkout
          </Link>
        </div>
      </div>
    </nav>
  );
}