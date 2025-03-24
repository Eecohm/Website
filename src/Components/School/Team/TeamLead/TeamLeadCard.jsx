import React from 'react';

function TeamLeadCard({ name, role, bio, image, isSelected, onSelect }) {
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
            {role && <p className="role">{role}</p>}
            <p className="bio">{bio}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default TeamLeadCard;