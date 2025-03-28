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
          Eecohm School of Excellence is a top-tier educational establishment that provides comprehensive education from Pre-school till High School Diploma. Our dynamic environment fosters intellectual, artistic, and physical growth in students, with an emphasis on academic excellence and skill-based education.
        </p>
        <a href="https://eschool.ezonecloud.com/">
        <button className="btn animate-text">Log In</button></a>
      </div>
    </div>
  );
}

export default Hero;