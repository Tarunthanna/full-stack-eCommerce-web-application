import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productAPI, cartAPI } from '../services/api';
import { authService } from '../utils/auth';
import ProductImage from '../components/ProductImage';
import LoadingSpinner from '../components/LoadingSpinner';

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
      setMessage('Added to cart!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add to cart');
    }
  };

  if (loading) return <LoadingSpinner label="Loading product..." />;
  if (error || !product) {
    return (
      <div className="container">
        <div className="alert alert-error">{error || 'Product not found'}</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card product-detail">
        <ProductImage product={product} size="detail" />
        <div className="product-detail__info">
          <span className="product-detail__meta">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="product-detail__price">${Number(product.price).toFixed(2)}</p>
          <p className="product-detail__desc">{product.description}</p>
          <div className="quantity-row">
            <label htmlFor="qty">Quantity</label>
            <input
              id="qty"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
          </div>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-error">{error}</div>}
          <button type="button" onClick={handleAddToCart} className="btn btn-primary">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
