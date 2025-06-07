import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import NavBar from '../NavBar/NavBar';

const Dashboard = () => {
  const [kycStatus, setKycStatus] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycStatus = async () => {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        console.warn('Access token missing');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('https://bishamsinchiury.com.np/api/user/user/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setKycStatus(data.kyc_status);

        if (!data.kyc_status) setShowAlert(true);
      } catch (error) {
        console.error('Failed to fetch KYC status:', error);
        navigate('/dashboard');
      }
    };

    fetchKycStatus();
  }, [navigate]);

  const handleNavigate = () => {
    setShowAlert(false);
    navigate('/register');
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <NavBar />

      {showAlert && (
        <div className={styles.alert}>
          <div className={styles.alertContent}>
            <span className={styles.alertSymbol}>⚠️</span>
            <p className={styles.alertText}>
              <strong>Action Required:</strong> You haven't completed your registration. Please complete it to unlock all functionalities.
            </p>
            <div className={styles.alertButtons}>
              <button
                className={`${styles.button} ${styles.completeButton}`}
                onClick={handleNavigate}
              >
                Complete Registration
              </button>
              <button
                className={`${styles.button} ${styles.dismissButton}`}
                onClick={handleCloseAlert}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.dashboard}>
        <h1>Welcome to the Dashboard</h1>
      </div>
    </>
  );
};

export default Dashboard;
