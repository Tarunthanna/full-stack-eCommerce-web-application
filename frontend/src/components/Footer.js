import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="container site-footer__inner">
      <div>
        <strong className="site-footer__brand">ShopVerse</strong>
        <p>Curated products. Secure checkout. Fast delivery.</p>
      </div>
      <div className="site-footer__links">
        <Link to="/products">Shop</Link>
        <Link to="/login">Account</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
    <p className="site-footer__copy">&copy; {new Date().getFullYear()} ShopVerse ECommerce</p>
  </footer>
);

export default Footer;
