import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

function Hero() {
  return (
    <div className="hero container">
      <div className="hero-text">
        <h1 className="animate-text">
          EECOHM SCHOOL OF EXCELLENCE
        </h1>
        <h4 className="animate-text">
          LEARN . GROW . INNOVATE
        </h4>
        <p className="animate-text">
          Eecohm School of Excellence is a top-tier educational establishment that provides comprehensive education from Pre-school till High School Diploma. Our dynamic environment fosters intellectual, artistic, and physical growth in students, with an emphasis on academic excellence and skill-based education.
        </p>
        <Link to="/login">
          <button className="login-btn">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="register-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Hero;