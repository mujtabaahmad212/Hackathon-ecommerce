import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaGem, FaShippingFast } from 'react-icons/fa';

// Simulated Ustad (AI) function 
const ustadRefineDescription = (title) => {
  const suffixes = [
    `Ustad-approved: This ${title} is pure khareedari (shopping) delight! A must-have for your home.`,
    `A gift from the Ustad: The revolutionary ${title}. Crafted with desi (local) love and global tech.`,
    `This ${title} is not just an item, it's a shaan (pride). Bold design meets local functionality.`,
    `As recommended by Ustad: The ultimate ${title} has arrived. Engineered for peak performance and durability.`,
  ];
  const randomIndex = Math.floor(Math.random() * suffixes.length);
  return suffixes[randomIndex];
};

// Local Delivery Estimate Function
const getDeliveryEstimate = (city) => {
    const cityLower = city.toLowerCase();
    if (cityLower.includes('karachi') || cityLower.includes('lahore') || cityLower.includes('islamabad')) {
        return "1-3 din (days) 🚚";
    } else if (cityLower.length > 2) {
        return "3-5 din (days) 📦";
    }
    return ""; // Empty string when no city is entered
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [currentDescription, setCurrentDescription] = useState(product.description);
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState('');
  
  const pricePKR = (product.price * 280).toFixed(0);

  const handleRefineDescription = () => {
    const newDescription = ustadRefineDescription(product.title);
    setCurrentDescription(newDescription);
  };
  
  const handleCheckDelivery = () => {
      setDeliveryEstimate(getDeliveryEstimate(deliveryCity));
  };

  return (
    // The animation class is applied via CSS globally to the .card element
    <div className="card h-100 overflow-hidden truck-art-border">
      <div className="p-3 text-center" style={{ height: '200px' }}>
        <img
          src={product.image}
          className="card-img-top h-100"
          alt={product.title}
          style={{ objectFit: 'contain', transition: 'transform 0.3s ease' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </div>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-accent-bold fw-bold text-truncate">{product.title}</h5>
        <p className="card-text text-truncate text-secondary opacity-75">{currentDescription}</p> 
        <div className="mt-auto pt-3 border-top border-secondary-custom opacity-50">
          <p className="fw-bolder fs-4 text-light">PKR {pricePKR}</p>
          
          {/* Delivery Estimation Feature */}
          <div className="input-group input-group-sm mb-1">
            <input
                type="text"
                className="form-control city-input"
                placeholder="Shehar Naam (City)"
                value={deliveryCity}
                onChange={(e) => setDeliveryCity(e.target.value)}
            />
            <button 
                className="btn btn-primary" 
                type="button"
                onClick={handleCheckDelivery}
                title="Check Delivery"
            >
                <FaShippingFast />
            </button>
          </div>
          <p className={`text-${deliveryEstimate ? 'primary' : 'muted'} small fw-bold mb-3`}>
              Delivery: {deliveryEstimate || "Check Delivery Time"}
          </p>
          
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={() => addToCart(product)}
          >
            🛒 Khareedain (Buy)
          </button>
          <button
            className="btn btn-outline-light w-100 btn-sm"
            onClick={handleRefineDescription}
          >
            <FaGem className="me-1 text-primary"/> Ustad Refines
          </button>
        </div>
      </div>
    </div>
  );
}