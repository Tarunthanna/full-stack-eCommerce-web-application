import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { cartAPI } from '../services/api';
import { authService } from '../utils/auth';

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
  }, [user]);

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

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h1>Shopping Cart</h1>
      {cart.items.length === 0 ? (
        <div className="card">
          <p>Your cart is empty</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cart.items.map(item => (
                <tr key={item.id}>
                  <td>
                    <Link to={`/products/${item.product.id}`}>
                      {item.product.name}
                    </Link>
                  </td>
                  <td>${item.product.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                      style={{ width: '60px', padding: '5px' }}
                    />
                  </td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="card" style={{ textAlign: 'right' }}>
            <h2>Total: ${cart.totalPrice.toFixed(2)}</h2>
            <Link to="/checkout" className="btn btn-success" style={{ marginTop: '10px' }}>
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

