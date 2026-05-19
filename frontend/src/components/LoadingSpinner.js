import React from 'react';

const LoadingSpinner = ({ label = 'Loading...' }) => (
  <div className="loading-state">
    <div className="spinner" aria-hidden="true" />
    <p>{label}</p>
  </div>
);

export default LoadingSpinner;
