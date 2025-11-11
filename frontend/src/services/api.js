import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  getAllUsers: () => api.get('/users/all'),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

// Product API
export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getByCategory: (category) => api.get(`/products/category/${category}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: (userId) => api.get(`/cart/${userId}`),
  addToCart: (userId, productId, quantity) => 
    api.post('/cart/add', { userId, productId, quantity }),
  updateCartItem: (cartId, quantity) => 
    api.put(`/cart/${cartId}`, { quantity }),
  removeFromCart: (cartId) => api.delete(`/cart/${cartId}`),
  clearCart: (userId) => api.delete(`/cart/clear/${userId}`),
};

// Order API
export const orderAPI = {
  placeOrder: (userId) => api.post(`/orders/place/${userId}`),
  getOrdersByUser: (userId) => api.get(`/orders/user/${userId}`),
  getOrderById: (orderId) => api.get(`/orders/${orderId}`),
  getAllOrders: () => api.get('/orders/all'),
  updateOrderStatus: (orderId, status) => 
    api.put(`/orders/${orderId}/status`, { status }),
};

// Payment API
export const paymentAPI = {
  simulatePayment: (amount) => api.post('/payment/simulate', { amount }),
};

export default api;

