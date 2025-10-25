import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState(1000);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('none'); 

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
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
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="container py-5">
      <h1 className="mb-5 text-center fw-bolder text-light">
        <span className="text-secondary-custom">Explore</span> The Collection ✨
      </h1>
      <div className="row mb-5 g-3 align-items-center p-3 rounded shadow" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
        {/* Search */}
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Price Range */}
        <div className="col-md-4">
          <div className="d-flex align-items-center">
            <label className="me-3 text-nowrap">Max Price: <span className="fw-bold text-primary">${priceRange}</span></label>
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
        <div className="col-md-4">
          <select 
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="none">Sort By (Default)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Name: A-Z</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
        {finalProducts.length > 0 ? (
          finalProducts.map(product => (
            <div key={product.id} className="col">
              {/* Pass the original product object to ProductCard */}
              <ProductCard product={product} /> 
            </div>
          ))
        ) : (
            <div className="col-12 text-center py-5">
                <p className="lead">No products match your current filters. Adjust the range or search term.</p>
            </div>
        )}
      </div>
    </div>
  );
}