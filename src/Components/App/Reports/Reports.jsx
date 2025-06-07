import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Reports.module.css';
import NavBar from '../NavBar/NavBar';

const Reports = () => {
  return (
    <>
      <NavBar />
      <div className={styles.reportsDiv}>
        <div className={styles.cardsContainer}>
          <Link to="/enter-feedback" className={styles.reportCard}>
            <h3>Enter Student Monthly Feedback</h3>
            <p>Submit monthly feedback for students.</p>
          </Link>
          <Link to="/show-feedback" className={styles.reportCard}>
            <h3>Show Student Feedback</h3>
            <p>View and analyze student feedback data.</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Reports;