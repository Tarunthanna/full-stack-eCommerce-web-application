import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { authService } from '../utils/auth';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await orderAPI.getOrderById(orderId);
      setOrder(response.data);
    } catch (err) {
      setError('Failed to load order');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error || !order) return <div className="container error">{error || 'Order not found'}</div>;

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
        <h1 style={{ color: '#28a745' }}>Order Confirmed!</h1>
        <p style={{ fontSize: '18px', marginTop: '20px' }}>
          Thank you for your order. Your order ID is: <strong>#{order.id}</strong>
        </p>
        <div style={{ marginTop: '30px', textAlign: 'left', maxWidth: '600px', margin: '30px auto' }}>
          <h2>Order Details</h2>
          <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
          <h3 style={{ marginTop: '20px' }}>Items:</h3>
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
              {order.orderItems.map(item => (
                <tr key={item.id}>
                  <td>{item.product.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ marginTop: '30px' }}>
          <Link to="/orders" className="btn btn-primary" style={{ marginRight: '10px' }}>
            View Order History
          </Link>
          <Link to="/products" className="btn btn-success">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

