import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaGem } from 'react-icons/fa'; // Icon for Gemini feature

// Simulated AI function - would be replaced by an actual API call
const geminiRefineDescription = (title) => {
  const suffixes = [
    `Experience the future with this ${title}. A must-have in every digital nomad's arsenal. Optimized for the next decade.`,
    `Unleash the full potential of your day with the revolutionary ${title}. Crafted with precision and powered by the latest tech.`,
    `This isn't just a ${title}, it's a statement. Bold design meets unparalleled functionality. Elevate your status.`,
    `The ultimate ${title} has arrived. Engineered for peak performance and minimal energy consumption. Simply sublime.`,
  ];
  const randomIndex = Math.floor(Math.random() * suffixes.length);
  return suffixes[randomIndex];
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  // State to hold the dynamic description
  const [currentDescription, setCurrentDescription] = useState(product.description);

  const handleRefineDescription = () => {
    // Call the simulated Gemini function
    const newDescription = geminiRefineDescription(product.title);
    setCurrentDescription(newDescription);
  };

  return (
    <div className="card h-100 overflow-hidden">
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
        <h5 className="card-title text-secondary-custom fw-bold text-truncate">{product.title}</h5>
        {/* Displaying the dynamic description */}
        <p className="card-text text-truncate opacity-75">{currentDescription}</p> 
        <div className="mt-auto pt-3 border-top border-secondary-custom opacity-50">
          <p className="fw-bolder fs-4 text-light">${product.price.toFixed(2)}</p>
          <button
            className="btn btn-primary w-100 mb-2"
            onClick={() => addToCart(product)}
          >
            ➕ Add to Cart
          </button>
          {/* New Gemini button */}
          <button
            className="btn btn-outline-light w-100 btn-sm"
            onClick={handleRefineDescription}
          >
            <FaGem className="me-1 text-primary"/> AI Refine Description
          </button>
        </div>
      </div>
    </div>
  );
}