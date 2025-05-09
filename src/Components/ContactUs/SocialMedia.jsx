import React from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Import specific icons

const socialLinks = [
  { name: 'Twitter', icon: <FaTwitter />, url: 'https://twitter.com/example' },
  { name: 'Facebook', icon: <FaFacebook />, url: 'https://www.facebook.com/eecohmschoolofexcellence' },
  { name: 'Instagram', icon: <FaInstagram />, url: 'https://www.instagram.com/eecohm_college?igsh=NzRmMWpyM2JpaW42&utm_source=qr' },
  { name: 'LinkedIn', icon: <FaLinkedin />, url: 'https://www.linkedin.com/company/106791483/admin/dashboard/' },
];

const SocialMedia = () => {
  return (
    <div className="social-media-container">
      <h3>Follow Us</h3>
      <div className="social-links">
        {socialLinks.map((link, index) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{ animationDelay: `${0.2 * (index + 1)}s` }}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;