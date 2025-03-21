import React, { useRef, useEffect } from 'react';
import './AboutUs.css';
import RoundImage from './RoundImage/RoundImage';
import sampleImage from '../../assets/Images/program_3.png'
import one from '../../assets/pngs/1.png'
import two from '../../assets/pngs/2.png'
import three from '../../assets/pngs/3.png'
import four from '../../assets/pngs/4.png'
import five from '../../assets/pngs/5.png'
import six from '../../assets/pngs/6.png'
import seven from '../../assets/pngs/7.png'
import eight from '../../assets/pngs/8.png'
import nine from '../../assets/pngs/9.png'
import SquareBox from './SquareBox/SquareBox';
const AboutUs = () => {
  const titleRef = useRef(null);

  // Title animation when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-title');
            observer.unobserve(entry.target); // Run animation only once
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of title is visible
      }
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
    <div className='aboutus-main'>
        <div className="about-us-pictures">
        <RoundImage 
        imageSrc={sampleImage}
        altText="Sample Image"
      />
        <div className="square-box-container-1">
        <SquareBox 
        imageSrc={one}
        backgroundColor="#79222a" // Deep purple
      />
      <SquareBox 
        imageSrc={two}
        backgroundColor="#79222a" // Deep green
      />
      <SquareBox 
        imageSrc={three}
        backgroundColor="#79222a" // Deep purple
      />
      <SquareBox 
        imageSrc={four}
        backgroundColor="#79222a" // Deep green
      />

        </div>
        <div className='square-box-container'>
        <SquareBox 
        imageSrc={five}
        backgroundColor="#79222a" // Deep purple
      />
      <SquareBox 
        imageSrc={six}
        backgroundColor="#79222a" // Deep green
      />
      <SquareBox 
        imageSrc={seven}
        backgroundColor="#79222a" // Deep purple
      />
      <SquareBox 
        imageSrc={eight}
        backgroundColor="#79222a" // Deep green
      />
      <SquareBox 
        imageSrc={nine}
        backgroundColor="#79222a" // Deep green
      />

        </div>
        </div>
        <div className="about-us-text">
        <h2 ref={titleRef} className="title">About Us</h2>
        <p id='about-us-id'>Our company was founded in 2010 by a group of passionate individuals who wanted. Our company was founded in 2010 by a group of passionate individuals who wanted. Our company was founded in 2010 by a group of passionate individuals who wanted. Our company was founded in 2010 by a group of passionate individuals who wanted. Our company was founded in 2010 by a group of passionate individuals who wanted. 
        </p>
        
        
        </div>
    </div>

  );
};

export default AboutUs;