import React, { useState } from 'react';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from './MeetTheTeam.module.css';

function TeamMember({ name, role, bio, quote, image, social }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = (e) => {
    e.stopPropagation(); // Prevent flip click from triggering scroll
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={styles.teamMemberCard} onClick={handleFlip}>
      <div className={`${styles.cardInner} ${isFlipped ? styles.cardInnerFlipped : ''}`}>
        {/* Front Side */}
        <div className={styles.cardFront}>
          <div className={styles.teamMemberImage}>
            <img src={image} alt={name} />
          </div>
          <div className={styles.teamMemberInfo}>
            <h3>{name}</h3>
            <p className={styles.role}>{role}</p>
            <p className={styles.bio}>{bio}</p>
            <div className={styles.socialIcons}>
              <a href={social.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
              <a href={`mailto:${social.mail}`} target="_blank" rel="noopener noreferrer">
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>
        {/* Back Side */}
        <div className={styles.cardBack}>
          <div className={styles.teamMemberQuote}>
            <p>{quote}</p>
            <br />
            <br />
            <FaPhone />
            <p>{social.phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;