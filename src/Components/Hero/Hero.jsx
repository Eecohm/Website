import React from 'react';
import './Hero.css';

function Hero() {
  return (
    <div className="hero container">
      <div className="hero-text">
        <h1 className="animate-text">
          EECOHM SCHOOL OF EXCELLENCE
        </h1>
        <h4 className="animate-text">
          Learn . Grow . Innovate
        </h4>
        <p className="animate-text">
          A school is a place where students come to learn, grow, and develop important life skills. It serves as a foundation for education, shaping young minds with knowledge in subjects like math, science, literature, and history. Beyond academics, schools also foster social interactions, teamwork, and discipline, helping students build confidence and character. Teachers play a vital role in guiding and inspiring students, creating an environment that encourages curiosity and creativity.
        </p>
        <button className="btn animate-text">Explore More</button>
      </div>
    </div>
  );
}

export default Hero;