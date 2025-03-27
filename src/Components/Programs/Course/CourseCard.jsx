import React from 'react';
import './CourseCard.css';

const CourseCard = ({ courseName, description, photo, duration, keyFeatures, targetedAudience, isExpanded, onExpand, onClose, icon }) => {
  return (
    <div 
      className={`course-card ${isExpanded ? 'expanded' : ''}`}
      onClick={!isExpanded ? () => onExpand() : undefined}
    >
      <div className="course-image-container">
        <img src={photo} alt={courseName} className="course-image" />
        {!isExpanded && (
          <div className="icon-overlay">
            <img src={icon} alt={`${courseName} icon`} className="course-icon" />
          </div>
        )}
      </div>
      <div className="course-content">
        <h2 className="course-title">{courseName}</h2>
        <p className="course-description">{description}</p>
        {isExpanded && (
          <>
            <h4 className="course-duration">Duration: {duration}</h4>
            <div className="course-key-features">
              <h4>Key Features</h4>
              <ul>
                {keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
      {isExpanded && (
        <button 
          className="close-course-button" 
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default CourseCard;
