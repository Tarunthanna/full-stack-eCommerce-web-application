import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { HERO_IMAGE, CATEGORY_IMAGES } from '../utils/productImages';

const Box = 'div';
const CATEGORIES = ['Electronics', 'Clothing', 'Accessories', 'Sports', 'Footwear'];

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll()
      .then((res) => setFeatured(res.data.slice(0, 4)))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="hero" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <Box className="hero__content">
          <span className="hero__eyebrow">New season collection</span>
          <h1>Style, tech & essentials — all in one place</h1>
          <p>Discover curated products with fast checkout and a seamless shopping experience.</p>
          <Box className="hero__actions">
            <Link to="/products" className="btn btn-primary">Shop now</Link>
            <Link to="/register" className="btn btn-outline">Create account</Link>
          </Box>
        </Box>
      </section>

      <Box className="container">
        <Box className="category-strip">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="category-pill"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url(${CATEGORY_IMAGES[cat] || CATEGORY_IMAGES.Electronics})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                color: 'white',
                border: 'none',
              }}
            >
              {cat}
            </Link>
          ))}
        </Box>

        <Box className="section-title">
          <h2>Featured products</h2>
          <p>Hand-picked favorites from our catalog</p>
        </Box>

        {loading ? (
          <LoadingSpinner label="Loading featured products..." />
        ) : featured.length > 0 ? (
          <Box className="grid">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Box>
        ) : (
          <Box className="card cart-empty">
            <p>No products yet. Browse the shop or ask an admin to add inventory.</p>
            <Link to="/products" className="btn btn-primary">View shop</Link>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Home;
