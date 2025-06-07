import React, { useState, useEffect } from 'react';
import styles from './NoticeBoard.module.css';
import noticesData from '../Data/Data.json';

const NoticeCard = ({ title, date, description, image, isExpanded, onExpand }) => {
  return (
    <div 
      className={`${styles.noticeCard} ${isExpanded ? styles.expanded : ''}`}
      onClick={!isExpanded ? onExpand : undefined}
    >
      {isExpanded && (
        <button 
          className={styles.closeCardBtn}
          onClick={(e) => {
            e.stopPropagation();
            onExpand();
          }}
        >
          ×
        </button>
      )}
      <div className={styles.noticeCardContent}>
        <h3 className={styles.noticeTitle}>{title}</h3>
        <p className={styles.noticeDate}>{date}</p>
        <img src={image} alt={title} className={styles.noticeImage} />
        <p className={styles.noticeDescription}>{description}</p>
      </div>
    </div>
  );
};

const NoticeBoard = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [expandedCard, setExpandedCard] = useState(null);
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    setNotices(noticesData);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={styles.noticeBoardContainer}>
      <div className={styles.noticeBoard}>
        <button 
          className={styles.closeBoardBtn}
          onClick={() => setIsVisible(false)}
        >
          ×
        </button>
        <h2 className={styles.noticeBoardTitle}>Notice Board</h2>
        <div className={styles.noticesContainer}>
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