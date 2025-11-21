import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "@/Components/App/NavBar/NavBar";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "@/Components/App/Dashboard/Dashboard.module.css";
import { useStatusCheck } from "@/Components/App/Dashboard/utils/StatusCheck";
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
  const [effectiveStatus, setEffectiveStatus] = useState(null);

  // Callback triggered from useStatusCheck hook
  const handleKycStatus = async (role, kyc_status, user_id) => {
    setPendingRole(role);
    setPendingStatus(kyc_status);
    setPendingUserId(user_id);

    // For student role, check if they have an existing record
    let hasExistingRecord = false;
    if (role === "student") {
      try {
        const studentResponse = await fetch(
          `${baseUrl}/user/students/${user_id}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        hasExistingRecord = studentResponse.ok;
      } catch (error) {
        console.log("Could not check existing student record:", error.message);
      }
    }

    let message = "";
    let effectiveStatus = kyc_status;

    // If student has existing record, treat as pending for UI purposes
    if (
      role === "student" &&
      hasExistingRecord &&
      kyc_status === "unverified"
    ) {
      effectiveStatus = "pending";
    }

    switch (effectiveStatus) {
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
    setEffectiveStatus(effectiveStatus);
    setShowModal(true);
  };

  // Hook with callback
  useStatusCheck(baseUrl, token, handleKycStatus);

  const handleCloseModal = () => {
    setShowModal(false);

    if (effectiveStatus === "verified") return;

    if (effectiveStatus === "unverified") {
      navigate(`/dashboard/users/info/${pendingRole}/form`);
      return;
    }

    if (effectiveStatus === "pending" || effectiveStatus === "rejected") {
      // Navigate to detail page with user ID
      navigate(
        `/dashboard/users/detail/${pendingRole}/detail/${pendingUserId}`
      );
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
            effectiveStatus === "rejected"
              ? "error"
              : effectiveStatus === "pending"
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
