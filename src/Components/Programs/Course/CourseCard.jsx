// CourseCard.jsx
import React from 'react';
import './CourseCard.css';

const CourseCard = ({ courseName, description, photo }) => {
  return (
    <div className="course-card">
      <div className="course-image-container">
        <img src={photo} alt={courseName} className="course-image" />
      </div>
      <div className="course-content">
        <h2 className="course-title">{courseName}</h2>
        <p className="course-description">{description}</p>
      </div>
    </div>
  );
};

export default CourseCard;