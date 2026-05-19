import React from 'react';
import { Link } from 'react-router-dom';
import ProductImage from './ProductImage';

const ProductCard = ({ product, showDescription = true }) => {
  const price = typeof product.price === 'number'
    ? product.price.toFixed(2)
    : product.price;

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-card__image-link">
        <ProductImage product={product} size="card" />
        <span className="product-card__badge">{product.category}</span>
      </Link>
      <div className="product-card-body">
        <Link to={`/products/${product.id}`} className="product-card__title">
          <h3>{product.name}</h3>
        </Link>
        {showDescription && product.description && (
          <p className="product-card__desc">{product.description.substring(0, 90)}...</p>
        )}
        <div className="product-card__footer">
          <span className="product-price">${price}</span>
          <Link to={`/products/${product.id}`} className="btn btn-primary btn-sm">
            View
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
