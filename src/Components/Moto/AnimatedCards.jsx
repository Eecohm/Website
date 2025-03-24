import React, { useState } from 'react';
import { FaBook, FaLeaf, FaLightbulb } from 'react-icons/fa';
import './AnimatedCards.css';

const AnimatedCards = () => {
  const [clickedCard, setClickedCard] = useState(null);

  const handleClick = (card) => {
    setClickedCard(clickedCard === card ? null : card); // Toggle click state
  };

  return (
    <div className="cards-container">
      {/* Card 1: Learn */}
      <div
        className={`card ${clickedCard === 'learn' ? 'clicked' : ''}`}
        onClick={() => handleClick('learn')}
      >
        <FaBook className="card-icon" />
        <h3 className="card-title">LEARN</h3>
        <span className="star-1">★</span>
        <span className="dot-1">•</span>
        <span className="star-2">★</span>
        <span className="dot-2"></span>
      </div>

      {/* Card 2: Grow */}
      <div
        className={`card ${clickedCard === 'grow' ? 'clicked' : ''}`}
        onClick={() => handleClick('grow')}
      >
        <FaLeaf className="card-icon" />
        <h3 className="card-title">GROW</h3>
        <span className="star-1">★</span>
        <span className="dot-1">•</span>
        <span className="star-2">★</span>
        <span className="dot-2"></span>
      </div>

      {/* Card 3: Innovate */}
      <div
        className={`card ${clickedCard === 'innovate' ? 'clicked' : ''}`}
        onClick={() => handleClick('innovate')}
      >
        <FaLightbulb className="card-icon" />
        <h3 className="card-title">INNOVATE</h3>
        <span className="star-1">★</span>
        <span className="dot-1">•</span>
        <span className="star-2">★</span>
        <span className="dot-2"></span>
      </div>
    </div>
  );
};

export default AnimatedCards;