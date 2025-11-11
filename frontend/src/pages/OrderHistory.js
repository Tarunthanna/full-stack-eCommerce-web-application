import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { orderAPI } from '../services/api';
import { authService } from '../utils/auth';

const OrderHistory = () => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    try {
      const response = await orderAPI.getOrdersByUser(user.id);
      setOrders(response.data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="container">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <div className="card">
          <p>No orders found</p>
          <Link to="/products" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div>
          {orders.map(order => (
            <div key={order.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>
                  <h3>Order #{order.id}</h3>
                  <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
                  <p>Status: <strong>{order.status}</strong></p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h2>${order.totalAmount.toFixed(2)}</h2>
                </div>
              </div>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

