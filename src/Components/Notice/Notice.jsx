// src/components/NoticeBoard.jsx
import React, { useState, useEffect } from 'react';
import './Notice.css';
import noticesData from '../Data/Data.json';

const NoticeCard = ({ title, date, description, image, isExpanded, onExpand }) => {
  return (
    <div 
      className={`notice-card ${isExpanded ? 'expanded' : ''}`}
      onClick={!isExpanded ? onExpand : undefined}
    >
      {isExpanded && (
        <button 
          className="close-card-btn"
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          ×
        </button>
      )}
      <div className="notice-card-content">
        <h3 className="notice-title">{title}</h3>
        <p className="notice-date">{date}</p>
        <img src={image} alt={title} className="notice-image" />
        <p className="notice-description">{description}</p>
      </div>
    </div>
  );
};

const NoticeBoard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [notices, setNotices] = useState([]);

  // Load notices from JSON file when component mounts
  useEffect(() => {
    setNotices(noticesData);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="notice-board-container">
      <div className="notice-board">
        <button 
          className="close-board-btn"
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
        <h2 className="notice-board-title">Notice Board</h2>
        <div className="notices-container">
          {notices.map(notice => (
            <NoticeCard
              key={notice.id}
              {...notice}
              isExpanded={expandedCard === notice.id}
              onExpand={() => setExpandedCard(
                expandedCard === notice.id ? null : notice.id
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;