import React from 'react';
import styles from './CourseCard.module.css';

const CourseCard = ({ courseName, description, photo, duration, keyFeatures, targetedAudience, isExpanded, onExpand, onClose, icon }) => {
  return (
    <div 
      className={`${styles.courseCard} ${isExpanded ? styles.expanded : ''}`}
      onClick={!isExpanded ? () => onExpand() : undefined}
    >
      <div className={styles.courseImageContainer}>
        <img src={photo} alt={courseName} className={styles.courseImage} />
        {!isExpanded && (
          <div className={styles.iconOverlay}>
            <img src={icon} alt={`${courseName} icon`} className={styles.courseIcon} />
          </div>
        )}
      </div>
      <div className={styles.courseContent}>
        <h2 className={styles.courseTitle}>{courseName}</h2>
        <p className={styles.courseDescription}>{description}</p>
        {isExpanded && (
          <>
            <h4 className={styles.courseDuration}>Duration: {duration}</h4>
            <div className={styles.courseKeyFeatures}>
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
          className={styles.closeCourseButton} 
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