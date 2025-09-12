import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login/Auth/AuthContext";
import styles from "./Dashboard.module.css";
import KycStatusModal from "./KycStatusModal";

const DashBoard = () => {
  const { token, isVerified, kycStatus, role, isLoading } = useAuth();
  const navigate = useNavigate();

  const [alert, setAlertType] = useState(null);
  const [showModal, setShowModal] = useState(true);

  useEffect(() => {
    if (isLoading) return; // wait until AuthContext finishes loading

    if (!token) {
      navigate("/login");
      return;
    }

    // Decide what alert to show based on auth values
    if (!kycStatus) {
      setAlertType("incomplete_registration");
    } else if (kycStatus && !isVerified) {
      setAlertType("pending_registration");
    }
  }, [token, kycStatus, isVerified, isLoading, navigate]);

  const handleCloseAlert = () => setAlertType(null);

  const handleNavigate = () => {
    setAlertType(null);
    navigate("/register"); // replace with your KYC form route
  };

  return (
    <>
      <NavBar />
      <div className={styles.dashboard}>
        <h1>Welcome to the Dashboard</h1>

        {alert === "incomplete_registration" && (
          <div className={styles.alert}>
            <span className={styles.alertSymbol}>⚠️</span>
            <h4>ACTION REQUIRED</h4>
            <p>
              Oops! Looks like you haven't completed your registration. Please
              complete it to continue.
            </p>
            <button className={styles.completeButton} onClick={handleNavigate}>
              Register
            </button>
            <button className={styles.dismissButton} onClick={handleCloseAlert}>
              Close
            </button>
          </div>
        )}

        {alert === "pending_registration" && (
          <div className={styles.alert}>
            <span className={styles.alertSymbol}>⏳</span>
            <h4>REGISTRATION PENDING</h4>
            <p>
              Your KYC form has been submitted and is under review. You’ll be
              notified once it’s verified.
            </p>
            <button className={styles.dismissButton} onClick={handleCloseAlert}>
              Close
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <KycStatusModal
          verified={isVerified}
          kycStatus={kycStatus}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default DashBoard;

// import NavBar from "../NavBar/NavBar";
// import { useBaseUrl } from "../../../BaseUrlContext";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { throttle } from "lodash";
// import { useAuth } from "../Login/Auth/AuthContext";
// import styles from "./Dashboard.module.css";
// import KycStatusModal from "./KycStatusModal"; // Import the new modal component

// const DashBoard = () => {
//   const baseUrl = useBaseUrl();
//   const { token } = useAuth();
//   const navigate = useNavigate();
//   const [userDetails, setUserDetails] = useState(null);
//   const [alert, setAlertType] = useState(null);
//   const [showKycModal, setShowKycModal] = useState(false);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       if (!token) {
//         console.warn("Access token missing");
//         navigate("/login");
//         return;
//       }
//       try {
//         const response = await fetch(`${baseUrl}/user/me`, {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });

//         const data = await response.json();
//         setUserDetails({
//           kyc_status: data.kyc_status,
//           verified: data.verified,
//           role: data.role,
//         });

//         // Show KYC modal if user is not verified
//         if (!data.verified) {
//           setShowKycModal(true);
//         }

//         if (!data.kyc_status) {
//           setAlertType("incomplete_registration");
//         } else if (data.kyc_status && !data.verified) {
//           setAlertType("pending_registration");
//         }
//         if (!response.ok) {
//           if (response.status === 401) {
//             throw new Error("Invalid or expired token");
//           }
//           throw new Error(`HTTP error! status: ${res}`);
//         }
//       } catch (error) {
//         console.error("Failed to fetch user data:", error);
//         if (error.message.includes("Invalid or expired token")) {
//           navigate("/login");
//         } else {
//           navigate("/dashboard");
//         }
//       }
//     };
//     fetchUserData();
//   }, []);

//   const handleCloseAlert = () => {
//     setAlertType(null);
//   };

//   const handleNavigate = () => {
//     setAlertType(null);
//     navigate("/register");
//   };

//   const handleCloseKycModal = () => {
//     setShowKycModal(false);
//   };

//   return (
//     <>
//       <NavBar />
//       <div className={styles.dashboard}>
//         <h1>Welcome to the Dashboard</h1>
//         {alert === "incomplete_registration" && (
//           <div className={styles.alert}>
//             <span className={styles.alertSymbol}>⚠️</span>
//             <h4> ACTION REQUIRED</h4>
//             <p>
//               Opps Looks like you haven't Completed your registration. Please
//               Complete to Continue
//             </p>
//             <button className={styles.completeButton} onClick={handleNavigate}>
//               Register
//             </button>
//             <button className={styles.dismissButton} onClick={handleCloseAlert}>
//               Close
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Render KYC Modal if needed */}
//       {showKycModal && userDetails && (
//         <KycStatusModal
//           userDetails={userDetails}
//           onClose={handleCloseKycModal}
//         />
//       )}
//     </>
//   );
// };
// export default DashBoard;
