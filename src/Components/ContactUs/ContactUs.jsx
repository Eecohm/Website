import React from 'react';
import ContactCard from './ContactCard';
import ContactForm from './ContactForm';
import SocialMedia from './SocialMedia';
import './ContactUs.css';

const ContactUs = () => {
  return (
    <div className="contact-us-container">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">We'd love to hear from you!</p>

      <div className="contact-grid">
        <a href="#">
        <ContactCard
          icon="📞"
          title="Phone"
          detail="023-546392"
          animationDelay="0.2s"
        />
        </a>
        <a href="#">
        <ContactCard
          icon="✉️"
          title="Email"
          detail="eecohm@gmail.com"
          animationDelay="0.4s"
          clickable={true}
          onClick={() => window.location.href = 'mailto:support@example.com'}
        />
        </a>
        <a href="https://www.google.com/maps/place/EECOHM+College/@26.643542,87.9692917,17z/data=!3m1!4b1!4m6!3m5!1s0x39e5bb4aa9db167f:0x6dc56474f09f04c6!8m2!3d26.6435372!4d87.9718666!16s%2Fg%2F11t8d9415q?entry=ttu&g_ep=EgoyMDI1MDMxOS4xIKXMDSoASAFQAw%3D%3D">
            <ContactCard
            icon="🧭"
            title="Location"
            detail="Birtamod Jhapa Nepal"
            animationDelay="0.6s"
            />
        </a>
      </div>

      <ContactForm />

      <SocialMedia />
    </div>
  );
};

export default ContactUs;