import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import NavBar from '../NavBar/NavBar';

const Dashboard = () => {
  const [kycStatus, setKycStatus] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchKycStatus = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found');
          navigate('/login');
          return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/user/user/', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setKycStatus(data.kyc_status);
        if (data.kyc_status !== true) {
          setShowAlert(true);
        }
      } catch (error) {
        console.error('Error fetching KYC status:', error);
        navigate('/dashboard');
      }
    };

    fetchKycStatus();
  }, [navigate]);

  const handleNavigate = () => {
    navigate('/register');
    setShowAlert(false);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <NavBar />
      {showAlert && (
        <div className={styles.alert}>
          <div className={styles.alert-content}>
            <span className={styles.alert-symbol}>⚠️</span>
            <p>
              <strong>Action Required:</strong> You haven't completed your registration. Please complete it to unlock all functionalities.
            </p>
            <div className={styles.alert-buttons}>
              <button onClick={handleNavigate}>Complete Registration</button>
              <button onClick={handleCloseAlert}>Dismiss</button>
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