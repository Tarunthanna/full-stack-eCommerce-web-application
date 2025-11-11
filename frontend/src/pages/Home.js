import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const featuredProducts = [
    {
      name: 'Dell XPS Laptop',
      image: '/images/laptop-dell-xps.jpg',
      price: '$1299.99',
      category: 'Electronics'
    },
    {
      name: 'Apple iPhone (Purple)',
      image: '/images/smartphone-purple.jpg',
      price: '$999.99',
      category: 'Electronics'
    },
    {
      name: 'Luxury Wristwatch',
      image: '/images/watch-luxury.jpg',
      price: '$2499.99',
      category: 'Accessories'
    },
    {
      name: 'Mountain Bike',
      image: '/images/bike-mountain.jpg',
      price: '$799.99',
      category: 'Sports'
    }
  ];

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', padding: '50px', marginBottom: '40px' }}>
        <h1>Welcome to ECommerce Store</h1>
        <p style={{ fontSize: '18px', marginTop: '20px', marginBottom: '30px' }}>
          Discover amazing products at great prices
        </p>
        <Link to="/products" className="btn btn-primary">
          Browse Products
        </Link>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Featured Products</h2>
        <div className="grid">
          {featuredProducts.map((product, index) => (
            <div key={index} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300';
                }}
              />
              <div className="product-card-body">
                <h3>{product.name}</h3>
                <p style={{ color: '#666', marginBottom: '10px' }}>{product.category}</p>
                <div className="product-price">{product.price}</div>
                <Link to="/products" className="btn btn-primary">
                  View All Products
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

