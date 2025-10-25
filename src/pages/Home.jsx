import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(1000); 
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none'); 
  const [selectedCategory, setSelectedCategory] = useState('all'); 
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      
      // Get unique categories for the filter
      const uniqueCategories = ['all', ...new Set(data.map(p => p.category))];
      // Capitalize first letter for display
      setCategories(uniqueCategories.map(c => c.charAt(0).toUpperCase() + c.slice(1))); 

    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const sortProducts = (productsToSort) => {
    const sorted = [...productsToSort];

    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'title-asc':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted; 
    }
  };

  const filteredProducts = products.filter(
    product =>
      product.price <= priceRange &&
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase())
  );

  const finalProducts = sortProducts(filteredProducts); 

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5 text-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <div className="hero-section text-center">
        <div className="container">
          <h1 className="display-3 fw-bolder text-light mb-3">
             <span className="text-accent-bold">Pakistan</span> ki Shaan, <span className="text-secondary">Har Item Mahan!</span>
          </h1>
          <p className="lead text-secondary opacity-75 mb-4">
            Find the finest items, Ustad-approved. Quick delivery across Karachi, Lahore, and Islamabad.
          </p>
          <a href="#product-list" className="btn hero-btn">
            Abhi Khareedari Shuru Karain (Start Shopping Now)
          </a>
        </div>
      </div>

      <div className="container py-5">
        <h1 id="product-list" className="mb-5 text-center fw-bolder text-light">
          <span className="text-accent-bold">Bazaar</span> Main Naye Items 🌟
        </h1>
        <div className="row mb-5 g-3 align-items-center p-3 rounded shadow" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
          
          {/* Search */}
          <div className="col-md-3">
            <input
              type="text"
              className="form-control"
              placeholder="Item Search Karain..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="col-md-3">
            <select 
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value.toLowerCase())}
            >
              <option value="all">Category Chunain (Select)</option>
              {categories.map(cat => (
                  <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="col-md-3">
            <div className="d-flex align-items-center">
              <label className="me-3 text-nowrap">Max Price: <span className="fw-bold text-primary">PKR {(priceRange * 280).toFixed(0)}</span></label>
              <input
                type="range"
                className="form-range"
                min="0"
                max="1000"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
              />
            </div>
          </div>
          
          {/* Sort Dropdown */}
          <div className="col-md-3">
            <select 
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="none">Sort By (Default)</option>
              <option value="price-asc">Rupay: Kam se Zyada</option>
              <option value="price-desc">Rupay: Zyada se Kam</option>
              <option value="title-asc">Naam: A-Z</option>
            </select>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
          {finalProducts.length > 0 ? (
            finalProducts.map(product => (
              <div key={product.id} className="col">
                <ProductCard product={product} /> 
              </div>
            ))
          ) : (
              <div className="col-12 text-center py-5">
                  <p className="lead">Koi item nahi mila. Filter badal kar dekhein.</p>
              </div>
          )}
        </div>
      </div>
    </>
  );
}