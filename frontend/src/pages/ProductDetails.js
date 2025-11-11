import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, cartAPI } from '../services/api';
import { authService } from '../utils/auth';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await productAPI.getById(id);
      setProduct(response.data);
    } catch (err) {
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    const user = authService.getUser();
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await cartAPI.addToCart(user.id, product.id, quantity);
      setMessage('Product added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add to cart');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error || !product) return <div className="container error">{error || 'Product not found'}</div>;

  return (
    <div className="container">
      <div className="card" style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: '1' }}>
          <img
            src={product.imageUrl || 'https://via.placeholder.com/500'}
            alt={product.name}
            style={{ width: '100%', borderRadius: '8px' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500';
            }}
          />
        </div>
        <div style={{ flex: '1' }}>
          <h1>{product.name}</h1>
          <p style={{ fontSize: '24px', color: '#007bff', margin: '20px 0' }}>
            ${product.price}
          </p>
          <p><strong>Category:</strong> {product.category}</p>
          <p style={{ marginTop: '20px' }}>{product.description}</p>
          <div style={{ marginTop: '30px' }}>
            <label>Quantity: </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              style={{ width: '80px', padding: '8px', marginLeft: '10px' }}
            />
          </div>
          {message && <div className="success">{message}</div>}
          {error && <div className="error">{error}</div>}
          <button onClick={handleAddToCart} className="btn btn-primary" style={{ marginTop: '20px' }}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

