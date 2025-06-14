import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import NavBar from '../NavBar/NavBar';
import { useAuth } from '../Login/Auth/AuthContext';
import { useBaseUrl } from '../../../BaseUrlContext';

const Dashboard = () => {
  const baseUrl = useBaseUrl();
  const [userData, setUserData] = useState({ kyc_status: null, verified: null });
  const [alertType, setAlertType] = useState(null); // 'kyc_pending' or 'registration_incomplete'
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        console.warn('Access token missing');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch(`${baseUrl}/user/user/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        setUserData({ kyc_status: data.kyc_status, verified: data.verified });

        if (!data.kyc_status) {
          setAlertType('registration_incomplete');
        } else if (data.kyc_status && !data.verified) {
          setAlertType('kyc_pending');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        navigate('/dashboard');
      }
    };

    fetchUserData();
  }, [navigate, token, baseUrl]);

  const handleNavigate = () => {
    setAlertType(null);
    navigate('/register');
  };

  const handleCloseAlert = () => {
    setAlertType(null);
  };

  return (
    <>
      <NavBar />

      {alertType === 'registration_incomplete' && (
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

      {alertType === 'kyc_pending' && (
        <div className={`${styles.alert} ${styles.kycPendingAlert}`}>
          <div className={styles.alertContent}>
            <span className={styles.alertSymbol}>⏳</span>
            <p className={styles.alertText}>
              <strong>KYC Pending:</strong> Your KYC is yet to be verified. Wait for 24 hours. If it isn't verified by 24 hours, contact admin or IT at college.
            </p>
            <div className={styles.alertButtons}>
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