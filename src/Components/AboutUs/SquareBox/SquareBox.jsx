import React from 'react';
import './SquareBox.css';

const SquareBox = ({ imageSrc, backgroundColor }) => {
  return (
    <div className="square-box" style={{ backgroundColor }}>
      <img src={imageSrc} alt="2D Graphic" className="square-graphic" />
    </div>
  );
};

export default SquareBox;