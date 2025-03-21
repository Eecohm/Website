import React from 'react';
import './RoundImage.css';

const RoundImage = ({ imageSrc, altText }) => {
  return (
    <div className="round-image-container">
      <img src={imageSrc} alt={altText} className="round-image" />
      <div className="hover-graphics">
        {/* Graphics content */}
        <div className="graphic-circle graphic-1"></div>
        <div className="graphic-circle graphic-2"></div>
        <div className="graphic-circle graphic-3"></div>
      </div>
    </div>
  );
};

export default RoundImage;