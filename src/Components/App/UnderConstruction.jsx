import React from 'react';
import './UnderConstruction.css';

const UnderConstruction = () => {
  return (
    <div className="construction-container">
      <div className="construction-content">
        <h1 className="construction-title">🚧 Site Under Construction 🚧</h1>
        <p className="construction-message">
          We're working hard to bring you an amazing experience! Please check back soon.
        </p>
        <div className="construction-animation">
          <div className="crane"></div>
          <div className="building"></div>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;