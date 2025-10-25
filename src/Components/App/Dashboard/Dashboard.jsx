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
  const [pendingStatus, setPendingStatus] = useState(null);
  const [pendingUserId, setPendingUserId] = useState(null);
  const [modalMessage, setModalMessage] = useState("");

  // Callback triggered from useStatusCheck hook
  const handleKycStatus = (role, kyc_status, user_id) => {
    setPendingRole(role);
    setPendingStatus(kyc_status);
    setPendingUserId(user_id);

    let message = "";

    switch (kyc_status) {
      case "unverified":
        message =
          "You haven't completed your verification yet. Please fill out your KYC form to continue.";
        break;
      case "pending":
        message =
          "Your verification is currently under review. Please wait until your form is approved.";
        break;
      case "rejected":
        message =
          "Your KYC form has been rejected. Please recheck your details and resubmit the form.";
        break;
      default:
        return; // verified, do nothing
    }

    setModalMessage(message);
    setShowModal(true);
  };

  // Hook with callback
  useStatusCheck(baseUrl, token, handleKycStatus);

  const handleCloseModal = () => {
    setShowModal(false);

    if (pendingStatus === "verified") return;

    if (pendingStatus === "unverified") {
      navigate(`/dashboard/users/info/${pendingRole}/form`);
      return;
    }

    if (pendingStatus === "pending" || pendingStatus === "rejected") {
      // Navigate to detail page with user ID
      navigate(`/dashboard/users/detail/${pendingRole}/detail?id=${pendingUserId}`);
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
          type={
            pendingStatus === "rejected"
              ? "error"
              : pendingStatus === "pending"
              ? "info"
              : "warning"
          }
          message={modalMessage}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default DashBoard;