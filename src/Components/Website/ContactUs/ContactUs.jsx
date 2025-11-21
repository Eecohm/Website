import React from "react";
import ContactCard from "@/Components/Website/ContactUs/ContactCard";
import ContactForm from "@/Components/Website/ContactUs/ContactForm";
import SocialMedia from "@/Components/Website/ContactUs/SocialMedia";
import styles from "@/Components/Website/ContactUs/ContactUs.module.css";

const ContactUs = () => {
  return (
    <div className={styles.contactUsContainer}>
      <h1 className={styles.contactTitle}>Contact Us</h1>
      <p className={styles.contactSubtitle}>We'd love to hear from you!</p>

      <div className={styles.contactGrid}>
        <a href="tel:023546392">
          <ContactCard
            icon="📞"
            title="Phone"
            detail="023-536392"
            animationDelay="0.2s"
          />
        </a>
        <a href="mailto:eecohm@gmail.com">
          <ContactCard
            icon="✉️"
            title="Email"
            detail="eecohm@gmail.com"
            animationDelay="0.4s"
            clickableCard={true}
            onClick={() => (window.location.href = "mailto:eecohm@gmail.com")}
          />
        </a>
        <a href="https://www.google.com/maps/place/EECOHM+College/@26.643542,87.9692917,17z/data=!3m1!4b1!4m6!3m5!1s0x39e5bb4aa9db167f:0x6dc56474f09f04c6!8m2!3d26.6435372!4d87.9718666!16s%2Fg%2F11t8d9415q?entry=ttu&g_ep=EgoyMDI1MDMxOS4xIKXMDSoASAFQAw%3D%3D">
          <ContactCard
            icon="🗺️"
            title="Location"
            detail="Birtamod Jhapa, Nepal"
            animationDelay="0.6s"
          />
        </a>
      </div>

      <ContactForm />

      <SocialMedia />
      <p className={styles.footer}>© 2025 All Rights Reserved EECOHM</p>
    </div>
  );
};

export default ContactUs;
