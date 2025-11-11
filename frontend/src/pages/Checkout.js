import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI, paymentAPI } from '../services/api';
import { authService } from '../utils/auth';

const Checkout = () => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [cart, setCart] = useState({ items: [], totalPrice: 0 });
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

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
      if (response.data.items.length === 0) {
        navigate('/cart');
      }
    } catch (err) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    try {
      // Simulate payment
      await paymentAPI.simulatePayment(cart.totalPrice);
      
      // Place order
      const response = await orderAPI.placeOrder(user.id);
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error && !processing) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h1>Checkout</h1>
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: '2' }}>
          <div className="card">
            <h2>Order Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.items.map(item => (
                  <tr key={item.id}>
                    <td>{item.product.name}</td>
                    <td>{item.quantity}</td>
                    <td>${item.product.price}</td>
                    <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: 'right', marginTop: '20px' }}>
              <h2>Total: ${cart.totalPrice.toFixed(2)}</h2>
            </div>
          </div>

          <div className="card">
            <h2>Payment Information</h2>
            <form onSubmit={handlePlaceOrder}>
              <div className="form-group">
                <label>Card Number</label>
                <input
                  type="text"
                  name="cardNumber"
                  value={paymentData.cardNumber}
                  onChange={handlePaymentChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="form-group" style={{ flex: '1' }}>
                  <label>Expiry Date</label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={paymentData.expiryDate}
                    onChange={handlePaymentChange}
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group" style={{ flex: '1' }}>
                  <label>CVV</label>
                  <input
                    type="text"
                    name="cvv"
                    value={paymentData.cvv}
                    onChange={handlePaymentChange}
                    placeholder="123"
                    required
                  />
                </div>
              </div>
              {error && <div className="error">{error}</div>}
              <button
                type="submit"
                className="btn btn-success"
                disabled={processing}
                style={{ marginTop: '20px' }}
              >
                {processing ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

