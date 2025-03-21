import React from 'react';

const ContactCard = ({ icon, title, detail, animationDelay, clickable = false, onClick }) => {
  return (
    <div
      className={`contact-card ${clickable ? 'clickable' : ''}`}
      style={{ animationDelay }}
      onClick={clickable ? onClick : null}
    >
      <div className="contact-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{detail}</p>
    </div>
  );
};

export default ContactCard;