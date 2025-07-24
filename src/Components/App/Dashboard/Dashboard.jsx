import NavBar from "../NavBar/NavBar";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { throttle } from "lodash";
import { useAuth } from "../Login/Auth/AuthContext";
import styles from "./Dashboard.module.css";
import { FaHandLizard } from "react-icons/fa";
import StudentDetails from "../Admin/RegistrationApprovals/RegistrationApprovalDetails/StudentDetails";


const DashBoard = () => {

  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null)
  const [alert, setAlertType] = useState(null)
  
  
    
  useEffect(() => {
    
    const fetchUserData = async () => {
        if(!token) {
        console.warn('Access token missing');
        navigate('/login');
        return;
      }
      try {
        const response = await fetch(`${baseUrl}/user/user`, {
          method: 'GET',
          headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        setUserDetails(
          {
            kyc_status: data.kyc_status,
            verified : data.verified,
            role: data.role
          }
        );
        if (!data.kyc_status) {
          setAlertType('incomplete_registration');
        }
        else if(data.kyc_status && !data.verified) {
          setAlertType('pending_registration')
        }
        if (!response.ok){
          if (response.status === 401) {
            throw new Error('Invalid or expired token');
          }
          throw new Error(`HTTP error! status: ${res}`)
          
        }

      } catch(error)
    {
      console.error('Failed to fetch user data:', error);
      if (error.message.includes('Invalid or expired token'))
      {
        navigate('/login');
      } else {
        navigate('/dashboard');
       
      }
    };

    }
    fetchUserData()
  }, [])

  const handleCloseAlert = () => {
    setAlertType(null);
  };
  const handleNavigate = () => {
    setAlertType(null);
    navigate('/register');
  }

  return (
  <>
    <NavBar />
    <div className={styles.dashboard}>
      <h1>Welcome to the Dashboard</h1> 
    {
      alert === 'incomplete_registration' && (
        <div className={styles.alert}>

          <span className={styles.alertSymbol}>⚠️</span>
          <h4> ACTION REQUIRED</h4>
          <p>
          Opps Looks like you haven't Completed your registration.
          Please Complete to Continue
          </p>
          <button className={styles.completeButton} onClick={handleNavigate}>Register</button>
          <button className={styles.dismissButton}
          onClick={handleCloseAlert}
          >Close</button>
        </div>
      )
    }
    </div>
  
  </>
  );

};
export default DashBoard;