import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { userAPI } from '../services/api';
import { authService } from '../utils/auth';
import { AUTH_IMAGE } from '../utils/productImages';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await userAPI.login(formData);
      authService.setUser(response.data.user);
      navigate(response.data.user.role === 'ADMIN' ? '/admin' : '/products');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div
          className="auth-card__visual"
          style={{ backgroundImage: `url(${AUTH_IMAGE})` }}
        >
          <div className="auth-card__visual-text">
            <h2>Welcome back</h2>
            <p>Sign in to track orders, save your cart, and checkout faster.</p>
          </div>
        </div>
        <div className="auth-card__form">
          <h2>Login</h2>
          <p>Enter your account details below</p>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
          <p className="auth-hint">
            Demo admin: <strong>admin@example.com</strong> / <strong>admin123</strong>
          </p>
          <p style={{ marginTop: '16px', fontSize: '14px' }}>
            No account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
