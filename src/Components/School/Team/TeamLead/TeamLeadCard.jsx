import React from 'react';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';

function TeamLeadCard({ name, role, bio, image, social, isSelected, onSelect }) {
  return (
    <div
      className={`team-lead-card ${isSelected ? 'selected' : ''}`}
      onClick={onSelect}
    >
      <div className="team-lead-image">
        <img src={image} alt={name} />
      </div>
      <div className="team-lead-info">
        <h3>{name}</h3>
        {isSelected && (
          <>
            <p className="bio">{bio}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default TeamLeadCard;