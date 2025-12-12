import React from "react";
import { FaFacebookMessenger, FaWhatsapp } from "react-icons/fa";
import styles from "@/features/landing/SocialMediaButtons/SocialButtons.module.css";

const SocialButtons = () => {
  const handleFacebookClick = () => {
    // Replace with your Facebook Page ID or Messenger link
    window.open("https://m.me/yourfacebookpageid", "_blank");
  };

  const handleWhatsappClick = () => {
    // Replace with your phone number (e.g., +1234567890) and optional message
    const phoneNumber = "+977 985-2646392"; // Replace with your number
    const message = "Hello! I’d like to chat with you.";
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className={styles.socialButtonsContainer}>
      <button
        className={`${styles.socialButton} ${styles.facebook}`}
        onClick={handleFacebookClick}
      >
        <FaFacebookMessenger size={30} />
      </button>
      <button
        className={`${styles.socialButton} ${styles.whatsapp}`}
        onClick={handleWhatsappClick}
      >
        <FaWhatsapp size={30} />
      </button>
    </div>
  );
};

export default SocialButtons;
