import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cartAPI } from '../services/api';
import { authService } from '../utils/auth';
import ProductImage from '../components/ProductImage';
import LoadingSpinner from '../components/LoadingSpinner';

const D = 'div';

const Cart = () => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    try {
      const response = await cartAPI.getCart(user.id);
      setCart(response.data);
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (cartId, newQuantity) => {
    try {
      await cartAPI.updateCartItem(cartId, newQuantity);
      fetchCart();
    } catch (err) {
      setError('Failed to update cart');
    }
  };

  const handleRemove = async (cartId) => {
    try {
      await cartAPI.removeFromCart(cartId);
      fetchCart();
    } catch (err) {
      setError('Failed to remove item');
    }
  };

  if (loading) return <LoadingSpinner label="Loading your cart..." />;
  if (error) {
    return (
      <D className="container">
        <D className="alert alert-error">{error}</D>
      </D>
    );
  }

  return (
    <D className="container">
      <header className="page-header">
        <h1>Your cart</h1>
        <p>Review items before checkout</p>
      </header>

      {cart.items.length === 0 ? (
        <D className="card cart-empty">
          <p>Your cart is empty — explore our collection and find something you love.</p>
          <Link to="/products" className="btn btn-primary">Continue shopping</Link>
        </D>
      ) : (
        <D className="cart-layout">
          <D className="card">
            {cart.items.map((item) => (
              <D key={item.id} className="cart-item">
                <ProductImage product={item.product} size="thumb" />
                <D className="cart-item__info">
                  <Link to={`/products/${item.product.id}`}>{item.product.name}</Link>
                  <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                    ${Number(item.product.price).toFixed(2)} each
                  </p>
                </D>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                  style={{ width: '64px', padding: '8px', borderRadius: '8px', border: '1px solid var(--border)' }}
                  aria-label="Quantity"
                />
                <strong>${(item.product.price * item.quantity).toFixed(2)}</strong>
                <button type="button" onClick={() => handleRemove(item.id)} className="btn btn-danger btn-sm">
                  Remove
                </button>
              </D>
            ))}
          </D>
          <D className="card cart-summary">
            <h2>Order total</h2>
            <p className="product-detail__price" style={{ marginBottom: '20px' }}>
              ${cart.totalPrice.toFixed(2)}
            </p>
            <Link to="/checkout" className="btn btn-success btn-block">
              Proceed to checkout
            </Link>
          </D>
        </D>
      )}
    </D>
  );
};

export default Cart;
