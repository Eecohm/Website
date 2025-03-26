import React, { useState, useEffect } from 'react';
import './PopupModal.css'; // We'll create this CSS file next
import img from '../../assets/Icons/python.png'
const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show popup on page load/refresh
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Function to handle button click and redirect
  const handleSignUp = () => {
    window.location.href = 'https://docs.google.com/forms/d/e/1FAIpQLScSlBeI4fuxKa_wk0x9EAPx78JcJrBP0MwGT8xwNB33ILCWGA/viewform?pli=1';
  };

  // Function to close popup
  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={handleClose}>
          ×
        </button>
        <div className="popup-image">
          <img src={img} className='python-img' alt="PYTHON" />
        </div>
        
        <h2 className="popup-text">
          ✨✨✨
          <br />
           Join our 30-day FREE Python course and kickstart your programming career! No cost, just pure coding magic. Don't miss this limited-time offer—hit the button below and start your journey today! 
           <br />
           🚀🔥
        </h2>
        <div className="popup-image">
        <h2>
          Click Here !!!
        </h2>
        </div>
        
        <button className="signup-button" onClick={handleSignUp}>
          Sign Up for the Course
        </button>
      </div>
    </div>
  );
};

export default PopupModal;