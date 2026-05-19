import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../utils/auth';

const Box = 'div';

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
      <Box className="navbar-content">
        <Box className="navbar__links">
          <Link to="/" className="navbar__brand">ShopVerse</Link>
          <Link to="/products">Shop</Link>
          {user && <Link to="/cart">Cart</Link>}
          {user && <Link to="/orders">Orders</Link>}
          {isAdmin && <Link to="/admin">Admin</Link>}
        </Box>
        <Box className="navbar__links">
          {user ? (
            <>
              <span className="navbar__user">Hi, {user.name.split(' ')[0]}</span>
              <button type="button" onClick={handleLogout} className="btn btn-danger btn-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Sign up</Link>
            </>
          )}
        </Box>
      </Box>
    </nav>
  );
};

export default Navbar;
