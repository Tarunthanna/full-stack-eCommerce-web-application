import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getUser();
  const isAdmin = authService.isAdmin();

  const handleLogout = () => {
    authService.removeUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div>
          <Link to="/">ECommerce</Link>
          <Link to="/products">Products</Link>
          {user && <Link to="/cart">Cart</Link>}
          {user && <Link to="/orders">My Orders</Link>}
          {isAdmin && <Link to="/admin">Admin Dashboard</Link>}
        </div>
        <div>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={handleLogout} className="btn btn-danger" style={{ marginLeft: '15px' }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

