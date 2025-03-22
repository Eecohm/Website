import React from 'react';
import { FaLinkedin, FaTwitter, FaGithub, FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';

function TeamMember({ name, role, bio, image, social }) {
  return (
    <div className="team-member-card">
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
          <a href={social.phone} target="_blank" rel="noopener noreferrer">
            <FaPhone />
          </a>
          <a href={social.mail} target="_blank" rel="noopener noreferrer">
            <FaEnvelope /> {/* Replaced FaMailBulk with FaEnvelope */}
          </a>
        </div>
      </div>
    </div>
  );
}

export default TeamMember;