// KycStatus.jsx (Updated)
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Login/Auth/AuthContext";
import NavBar from "../NavBar/NavBar";

const KycStatus = ({ status }) => {
  const navigate = useNavigate();
  const { kyc_status } = useAuth();

  const getStatusDetails = () => {
    switch (kyc_status) {
      case "pending":
        return {
          title: "Verification in Progress",
          message:
            "Your KYC documents are under review. This process typically takes 24-48 hours.",
          icon: "⏳",
          color: "#ff9800",
        };
      case "rejected":
        return {
          title: "Verification Rejected",
          message:
            "Your KYC submission was not approved. Please check your email for details or submit again.",
          icon: "❌",
          color: "#f44336",
        };
      default:
        return {
          title: "Verification Status",
          message: "Your verification status is being processed.",
          icon: "ℹ️",
          color: "#2196f3",
        };
    }
  };

  const statusInfo = getStatusDetails();

  const handleResubmit = () => {
    navigate("/dashboard/kyc/form");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          minHeight: "calc(100vh - 80px)",
          padding: "2rem",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div className="kyc-status-container">
          <div
            className="status-icon"
            style={{ color: statusInfo.color, fontSize: "4rem" }}
          >
            {statusInfo.icon}
          </div>
          <h2>{statusInfo.title}</h2>
          <p>{statusInfo.message}</p>

          {kyc_status === "rejected" && (
            <button className="resubmit-button" onClick={handleResubmit}>
              Resubmit Documents
            </button>
          )}

          <button className="back-button" onClick={handleBackToDashboard}>
            Back to Dashboard
          </button>

          <div className="support-info">
            <p>
              Need help? Contact our support team at{" "}
              <a href="mailto:support@example.com">support@example.com</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycStatus;
