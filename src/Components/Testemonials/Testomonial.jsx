import React, { useState } from 'react';
import './Testomonial.css';
import pranil from '../../assets/Images/CHOUHAN.png'
import arpan from '../../assets/Images/arpanksharma.png'
import sandhya from '../../assets/Images/sandhya.png'
import sadiksya from '../../assets/Images/sadikshya.png'
const testimonialsData = [
  {
    photo: pranil,
    name: 'Pranil Chauhan',
    description: 'CEO @ NEXT GEN LEARNERS',
    review: 'As a faculty member at EECOHM College, I am committed to bridging the gap between theoretical learning and real-world business applications. Through practical classes, I equip students with essential soft skills and provide hands-on entrepreneurial experiences that prepare them for the dynamic world of business. My goal is to nurture future leaders by fostering critical thinking, creativity, and a problem-solving mindset. At EECOHM, we don’t just teach business—we create opportunities for students to experience it firsthand.',
    stars: 5,
  },
  {
    photo: arpan,
    name: 'Arpan Khatiwada',
    description: 'Faculty of English',
    review: 'Having dedicated four years to teaching English at EECOHM School of Excellence, I can confidently say that it is a truly rewarding environment for both educators and students. The supportive management fosters open communication, ensuring that any concerns are promptly addressed, while the competitive remuneration reflects their commitment to valuing staff. This positive atmosphere directly enhances my teaching experience, allowing me to bring enthusiasm and energy into the classroom. When a teacher is fulfilled, that joy radiates to the students, sparking their curiosity and fostering a genuine love for learning. EECOHM is a place where excellence in education thrives—for teachers and students alike',
    stars: 4,
  },
  {
    photo: sadiksya,
    name: 'Sadikshya Khadka',
    description: 'Executive Vice President (EVP) at Bahradashi Jaycees',
    review: 'Great experience, excellent support team!',
    stars: 5,
  },
  {
    photo: sandhya,
    name: 'Sandhya Mukhiya',
    description: 'Front Office, HM (formor Student)',
    review: 'Studying at EECOHM College has been a truly rewarding experience, and I am incredibly grateful for the opportunity. The Advanced Diploma in Hospitality Management (ADHM) program offered a perfect balance of theory and hands-on learning, which laid a strong foundation for my career. I am deeply thankful for the continuous support and guidance from my teachers and mentors, who motivated me and helped me stay focused on my goals. My internship at Hotel Kingsbury allowed me to apply what I learned, and I’m honored to have been offered a full-time position in the Front Office Department. The transition from intern to employee has been both exciting and fulfilling, and I am grateful for the chance to continue growing and refining my skills in the hospitality industry.',
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