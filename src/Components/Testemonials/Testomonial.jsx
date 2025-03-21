import React, { useState } from 'react';
import './Testomonial.css';

const testimonialsData = [
  {
    photo: 'https://randomuser.me/api/portraits/men/32.jpg',
    name: 'John Doe',
    description: 'CEO @ TechCorp',
    review: 'This product changed the way we work. Absolutely fantastic! This product changed the way we work. Absolutely fantastic!',
    stars: 5,
  },
  {
    photo: 'https://randomuser.me/api/portraits/women/44.jpg',
    name: 'Jane Smith',
    description: 'CTO @ InnovateX',
    review: 'A game-changer in the industry. Highly recommended!. A game-changer in the industry. Highly recommended!. A game-changer in the industry. Highly recommended!. ',
    stars: 4,
  },
  {
    photo: 'https://randomuser.me/api/portraits/men/55.jpg',
    name: 'Michael Brown',
    description: 'Founder @ StartUpHub',
    review: 'Great experience, excellent support team! Great experience, excellent support team! Great experience, excellent support team! Great experience, excellent support team!',
    stars: 5,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="testimonials-container">
      <button className="arrow left-arrow" onClick={prevTestimonial}>
        ❮
      </button>
      <div
        className="testimonial-card"
        key={currentIndex} // Forces re-render to retrigger animation
      >
        <img
          src={testimonialsData[currentIndex].photo}
          alt={testimonialsData[currentIndex].name}
          className="testimonial-photo"
        />
        <div className="testimonial-text-div">
          <h3 className="testimonial-name">{testimonialsData[currentIndex].name}</h3>
          <p className="testimonial-description">
            {testimonialsData[currentIndex].description}
          </p>
          <p className="testimonial-review">"{testimonialsData[currentIndex].review}"</p>
          <div className="testimonial-stars">
            {Array(testimonialsData[currentIndex].stars)
              .fill('★')
              .join('')}
            {Array(5 - testimonialsData[currentIndex].stars)
              .fill('☆')
              .join('')}
          </div>
        </div>
      </div>
      <button className="arrow right-arrow" onClick={nextTestimonial}>
        ❯
      </button>
    </div>
  );
};

export default Testimonials;