import React, { useState } from 'react';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';
import './MeetTheTeam.css'; // Ensure CSS is imported here if separate

function TeamMember({ name, role, bio, quote, image, social }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="team-member-card" onClick={handleFlip}>
      <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="card-front">
          <div className="team-member-image">
            <img src={image} alt={name} />
          </div>
          <div className="team-member-info">
            <h3>{name}</h3>
            <p className="role">{role}</p>
            <p className="bio">{bio}</p>
            <div className="social-icons">
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
        <div className="card-back">
          <div className="team-member-quote">
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