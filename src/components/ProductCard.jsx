import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaShippingFast, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { BiBot } from 'react-icons/bi'; 
import { toast } from 'react-toastify'; 

// --- CONSTANTS ---
const SHORT_TITLE_LENGTH = 30; // Max length for the short title
const SHORT_DESCRIPTION_LENGTH = 70; // Max length for the short description
// -----------------

// Simulated AI Assistant function 
const assistantRefineDescription = (title) => {
  const descriptions = [
    `AI Optimized: This ${title} is a professional choice. Experience superior quality and lasting performance.`,
    `Recommended by the Assistant: The innovative ${title} offers the best features in its class.`,
    `Certified Excellence: Get the reliable ${title} today. Engineered for precision and modern needs.`,
  ];
  const randomIndex = Math.floor(Math.random() * descriptions.length);
  return descriptions[randomIndex];
};

// Local Delivery Estimate Function
const getDeliveryEstimate = (city) => {
    const cityLower = city.toLowerCase();
    if (cityLower.includes('karachi') || cityLower.includes('lahore') || cityLower.includes('islamabad')) {
        return "1-3 Days 🚚";
    } else if (cityLower.length > 2) {
        return "3-5 Days 📦";
    }
    return "";
}

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [currentDescription, setCurrentDescription] = useState(product.description);
  const [deliveryCity, setDeliveryCity] = useState('');
  const [deliveryEstimate, setDeliveryEstimate] = useState('');
  
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  
  const pricePKR = (product.price * 280).toFixed(0);

  const handleRefineDescription = () => {
    const newDescription = assistantRefineDescription(product.title);
    setCurrentDescription(newDescription);
  };
  
  const handleCheckDelivery = () => {
      setDeliveryEstimate(getDeliveryEstimate(deliveryCity));
  };
  
  const handleAddToCart = () => {
      addToCart(product);
      toast.success(`${product.title} added to cart!`, {
          icon: "🛒"
      });
  };
  
  // --- NEW LOGIC FOR SHORTENING/EXPANDING ---
  const shortTitle = product.title.length > SHORT_TITLE_LENGTH 
    ? product.title.substring(0, SHORT_TITLE_LENGTH) + '...'
    : product.title;

  const shortDescription = currentDescription.length > SHORT_DESCRIPTION_LENGTH 
    ? currentDescription.substring(0, SHORT_DESCRIPTION_LENGTH) + '...'
    : currentDescription;
    
  const toggleDescription = () => {
      setIsDescriptionExpanded(!isDescriptionExpanded);
  };
  // ------------------------------------------

  return (
    <div className="card h-100 overflow-hidden">
      <div className="p-3 text-center" style={{ height: '200px', backgroundColor: '#E0E0E0' }}>
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
        {/* CONDITIONAL TITLE DISPLAY */}
        <h5 
            className="card-title text-primary fw-bold" 
            style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: isDescriptionExpanded ? 'normal' : 'nowrap' }}
        >
            {isDescriptionExpanded ? product.title : shortTitle}
        </h5>
        
        {/* DESCRIPTION DISPLAY */}
        <p className="card-text text-muted mb-2">
            {isDescriptionExpanded ? currentDescription : shortDescription}
        </p>
        
        {/* Toggle Button for Read More/Less */}
        {(currentDescription.length > SHORT_DESCRIPTION_LENGTH || product.title.length > SHORT_TITLE_LENGTH) && (
            <button 
                className="btn btn-link btn-sm p-0 text-accent-bold text-start mb-3"
                onClick={toggleDescription}
                style={{ textDecoration: 'none' }}
            >
                {isDescriptionExpanded ? (
                    <>
                        <FaChevronUp size={10} className="me-1"/> Show Less
                    </>
                ) : (
                    <>
                        <FaChevronDown size={10} className="me-1"/> Read More
                    </>
                )}
            </button>
        )}
        
        {/* DELIVERY ESTIMATION FEATURE: Hidden when expanded to save space */}
        {!isDescriptionExpanded && (
            <div className="mt-auto pt-3 border-top border-secondary-custom">
                <div className="input-group input-group-sm mb-1">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="City Name"
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
                <p className={`small fw-bold mb-3 ${deliveryEstimate ? 'text-accent-bold' : 'text-muted'}`}>
                    Shipping: {deliveryEstimate || "Check Delivery Time"}
                </p>
            </div>
        )}

        <p className="fw-bolder fs-4 text-accent-bold mt-2">PKR {pricePKR}</p>
          
        <button
            className="btn btn-primary w-100 mb-2"
            onClick={handleAddToCart}
        >
            🛒 Add to Cart
        </button>

        {/* AI ASSISTANT BUTTON: Hidden when expanded to save space */}
        {!isDescriptionExpanded && (
            <button
                className="btn btn-outline-dark w-100 btn-sm"
                onClick={handleRefineDescription}
            >
                <BiBot className="me-1 text-primary"/> AI Assistant Refine
            </button>
        )}
      </div>
    </div>
  );
}