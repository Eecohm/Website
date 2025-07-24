import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Dashboard.module.css';
import NavBar from '../NavBar/NavBar';
import { useAuth } from '../Login/Auth/AuthContext';
import { useBaseUrl } from '../../../BaseUrlContext';
import StudentDetails from '../Admin/RegistrationApprovals/RegistrationApprovalDetails/StudentDetails';
import TeacherDetails from '../Admin/RegistrationApprovals/RegistrationApprovalDetails/TeacherDetails';
import EmployeeDetails from '../Admin/RegistrationApprovals/RegistrationApprovalDetails/EmployeeDetails';
import GuardianDetails from '../Admin/RegistrationApprovals/RegistrationApprovalDetails/GuardianDetails';
import OwnerDetails from '../Admin/RegistrationApprovals/RegistrationApprovalDetails/OwnerDetails';

const Dashboard = () => {
  const baseUrl = useBaseUrl();
  const [userData, setUserData] = useState({ kyc_status: null, verified: null, role: null });
  const [alertType, setAlertType] = useState(null); // 'kyc_pending' or 'registration_incomplete'
  const [userDetails, setUserDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {

      try {
        const response = await fetch(`${baseUrl}/user/user/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Invalid or expired token');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData({ kyc_status: data.kyc_status, verified: data.verified, role: data.role });

        if (!data.kyc_status) {
          setAlertType('registration_incomplete');
        } else if (data.kyc_status && !data.verified) {
          setAlertType('kyc_pending');
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        if (error.message.includes('Invalid or expired token')) {
          navigate('/login');
        } else {
          navigate('/dashboard');
        }
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

  const handleViewDetails = async () => {
    setDetailsLoading(true);
    setDetailsError(null);

    const roleEndpoints = {
      student: 'students',
      teacher: 'teacher',
      employee: 'employee',
      guardian: 'guardian',
      owner: 'owner'
    };

    const endpoint = roleEndpoints[userData.role];
    if (!endpoint) {
      setDetailsError('Invalid user role');
      setDetailsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/user/${endpoint}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Invalid or expired token');
        }
        throw new Error(`Failed to fetch user details: ${response.status}`);
      }
      const data = await response.json();
      setUserDetails(data);
      setDetailsLoading(false);
    } catch (err) {
      setDetailsError(err.message);
      setDetailsLoading(false);
      if (err.message.includes('Invalid or expired token')) {
        navigate('/login');
      }
    }
  };

  const handleCloseModal = () => {
    setUserDetails(null);
    setDetailsError(null);
  };

  const renderDetails = () => {
    if (detailsLoading) return <p className={styles.loading}>Loading details...</p>;
    if (detailsError) return <p className={styles.error}>{detailsError}</p>;
    if (!userDetails) return null;

    switch (userData.role) {
      case 'student':
        return <StudentDetails details={userDetails} />;
      case 'teacher':
        return <TeacherDetails details={userDetails} />;
      case 'employee':
        return <EmployeeDetails details={userDetails} />;
      case 'guardian':
        return <GuardianDetails details={userDetails} />;
      case 'owner':
        return <OwnerDetails details={userDetails} />;
      default:
        return <p className={styles.error}>Invalid user role</p>;
    }
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
              <strong>Registration Pending:</strong> Your registration is yet to be verified. Wait for 24 hours. If it isn't verified by 24 hours, contact admin or IT at college.
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
        {userData.kyc_status && (
          <button
            className={styles.viewDetailsButton}
            onClick={handleViewDetails}
          >
            View Details
          </button>
        )}
      </div>
      {userDetails && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Your Details</h2>
            {renderDetails()}
            <div className={styles.modalButtons}>
              <button
                className={`${styles.modalButton} ${styles.closeButton}`}
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;