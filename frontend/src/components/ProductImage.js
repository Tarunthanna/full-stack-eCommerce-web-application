import React, { useState } from 'react';
import { getProductImageUrl, DEFAULT_IMAGE } from '../utils/productImages';

const ProductImage = ({ product, alt, className = '', size = 'card' }) => {
  const [src, setSrc] = useState(() => getProductImageUrl(product));

  const handleError = () => {
    if (src !== DEFAULT_IMAGE) {
      setSrc(DEFAULT_IMAGE);
    }
  };

  return (
    <div className={`product-image-wrap product-image-wrap--${size} ${className}`}>
      <img src={src} alt={alt || product?.name || 'Product'} onError={handleError} loading="lazy" />
    </div>
  );
};

export default ProductImage;
