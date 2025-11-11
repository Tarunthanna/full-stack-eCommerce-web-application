import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = selectedCategory
        ? await productAPI.getByCategory(selectedCategory)
        : await productAPI.getAll();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(p => p.category))];

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h1>Products</h1>
      <div style={{ marginBottom: '20px' }}>
        <label>Filter by Category: </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '8px', marginLeft: '10px' }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div className="grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/300'}
              alt={product.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/300';
              }}
            />
            <div className="product-card-body">
              <h3>{product.name}</h3>
              <p>{product.description?.substring(0, 100)}...</p>
              <div className="product-price">${product.price}</div>
              <Link to={`/products/${product.id}`} className="btn btn-primary">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && (
        <div className="card">No products found</div>
      )}
    </div>
  );
};

export default ProductList;

