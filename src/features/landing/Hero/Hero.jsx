import React from "react";
import { Link } from "react-router-dom";
import styles from "@/features/landing/Hero/Hero.module.css";

function Hero() {
  return (
    <div id="hero" className={`${styles.hero} container`}>
      <div className={styles.heroText}>
        <h1 className={styles.animateText}>EECOHM SCHOOL OF EXCELLENCE</h1>
        <h4 className={styles.animateText}>LEARN . GROW . INNOVATE</h4>
        <p className={styles.animateText}>
          EECOHM School of Excellence is a top-tier educational establishment
          that provides comprehensive education from Pre-school till High School
          Diploma. Our dynamic environment fosters intellectual, artistic, and
          physical growth in students, with an emphasis on academic excellence
          and skill-based education.
        </p>
        <div className={styles.heroButtonDiv}>
          <Link to="/login">
            <button className={`${styles.loginBtn} ${styles.animateText}`}>
              Log In
            </button>
          </Link>
          <Link to="/signup">
            <button className={`${styles.registerBtn} ${styles.animateText}`}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
