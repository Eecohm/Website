import React from 'react';
import styles from './ContactUs.module.css';

const ContactCard = ({ icon, title, detail, animationDelay, clickableCard = false, onClick }) => {
  return (
    <div
      className={`${styles.contactCard} ${clickableCard ? styles.clickableCard : ''}`}
      style={{ animationDelay }}
      onClick={clickableCard ? onClick : null}
    >
      <div className={styles.contactIcon}>{icon}</div>
      <h3>{title}</h3>
      <p>{detail}</p>
    </div>
  );
};

export default ContactCard;