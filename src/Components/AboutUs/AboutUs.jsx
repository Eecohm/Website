import React, { useRef, useEffect, useState } from 'react';
import './AboutUs.css';
import RoundImage from './RoundImage/RoundImage';
import SquareBox from './SquareBox/SquareBox';
import sampleImage from '../../assets/Images/program_3.png';
import one from '../../assets/pngs/1.png';
import two from '../../assets/pngs/2.png';
import three from '../../assets/pngs/3.png';
import four from '../../assets/pngs/4.png';
import five from '../../assets/pngs/5.png';
import six from '../../assets/pngs/6.png';
import seven from '../../assets/pngs/7.png';
import eight from '../../assets/pngs/8.png';
import nine from '../../assets/pngs/9.png';

const AboutUs = () => {
  const titleRef = useRef(null);
  const [activeQuote, setActiveQuote] = useState(null); // State to track active quote

  // Define quotes for each square box
  const quotes = {
    1: "Innovation drives us forward.",
    2: "Creativity is our foundation.",
    3: "Teamwork makes the dream work.",
    4: "Excellence in every detail.",
    5: "Passion fuels our mission.",
    6: "Together, we build the future.",
    7: "Every step counts.",
    8: "Dream big, act bold.",
    9: "Inspire, create, succeed.",
  };

  // Handle box click
  const handleBoxClick = (id) => {
    setActiveQuote(activeQuote === id ? null : id); // Toggle quote visibility
  };

  // Title animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-title');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  return (
    <div className="aboutus-main">
      <div className="about-us-pictures">
        <RoundImage imageSrc={sampleImage} altText="Sample Image" />
        <div className="square-box-container-1">
          <SquareBox
            id="1"
            imageSrc={one}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
          <SquareBox
            id="2"
            imageSrc={two}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
          <SquareBox
            id="3"
            imageSrc={three}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
          <SquareBox
            id="4"
            imageSrc={four}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
        </div>
        {/* Quote display for square-box-container-1 */}
        <div className="quote-display">
          {activeQuote && quotes[activeQuote] && activeQuote <= 4 ? (
            <p>{quotes[activeQuote]}</p>
          ) : null}
        </div>

        <div className="square-box-container">
          <SquareBox
            id="5"
            imageSrc={five}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
          <SquareBox
            id="6"
            imageSrc={six}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
          <SquareBox
            id="7"
            imageSrc={seven}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
          <SquareBox
            id="8"
            imageSrc={eight}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
          <SquareBox
            id="9"
            imageSrc={nine}
            backgroundColor="#79222a"
            onClick={handleBoxClick}
          />
        </div>
        {/* Quote display for square-box-container */}
        <div className="quote-display">
          {activeQuote && quotes[activeQuote] && activeQuote > 4 ? (
            <p>{quotes[activeQuote]}</p>
          ) : null}
        </div>
      </div>
      <div className="about-us-text">
        <h2 ref={titleRef} className="title">About Us</h2>
        <p id="about-us-id">
          Our company was founded in 2010 by a group of passionate individuals
          who wanted...
        </p>
      </div>
    </div>
  );
};

export default AboutUs;