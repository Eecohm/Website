import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useAuth } from "../../../Context/AuthContext";
import styles from "./Dashboard.module.css";
import { useStatusCheck } from "./utils/StatusCheck";
import ModalNotification from "@/GlobalComponets/ModalNotification";

const DashBoard = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [pendingRole, setPendingRole] = useState(null);

  // callback when unverified
  const handleUnverified = (role) => {
    setPendingRole(role);
    setShowModal(true);
  };

  // hook with callback
  useStatusCheck(baseUrl, token, handleUnverified);

  // handle modal close + navigation
  const handleCloseModal = () => {
    setShowModal(false);

    switch (pendingRole) {
      case "student":
        navigate("/dashboard/users/info/student/form");
        break;
      case "guardian":
        navigate("/dashboard/users/info/guardian/form");
        break;
      case "employee":
        navigate("/dashboard/users/info/employee/form");
        break;
      case "admin":
        navigate("/dashboard/users/info/employee/form");
        break;
      case "owner":
        navigate("/dashboard/users/info/owner/form");
        break;
      case "teacher":
        navigate("/dashboard/users/info/teacher/form");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.dashboard}>
        <h1>Welcome to the Dashboard</h1>
      </div>

      {showModal && (
        <ModalNotification
          type="warning"
          message="Oops! Looks like you haven't verified yourself. Please fill the form to get verified."
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default DashBoard;
