import React from 'react';
import './SquareBox.css';

const SquareBox = ({ imageSrc, backgroundColor, onClick, id }) => {
  return (
    <div
      className="square-box"
      style={{ backgroundColor }}
      onClick={() => onClick(id)} // Pass the id to identify which box was clicked
    >
      <img src={imageSrc} alt="2D Graphic" className="square-graphic" />
    </div>
  );
};

export default SquareBox;