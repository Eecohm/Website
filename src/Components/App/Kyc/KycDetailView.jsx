import React from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./KycDetailView.module.css";
import NavBar from "../NavBar/NavBar";

const KycDetailView = ({ onBack }) => {
  const { kyc_status, role } = useAuth();
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) onBack();
    else navigate("/dashboard");
  };

  const handleFillKycForm = () => {
    navigate("/dashboard/kyc/form");
  };

  return (
    <>
      <NavBar />
      <div
        style={{
          padding: "2rem",
          backgroundColor: "#f8f9fa",
          minHeight: "calc(100vh - 80px)",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "8px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "2rem",
            }}
          >
            <h1>KYC Verification Status</h1>
            <button
              onClick={handleBack}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              ← Back to Dashboard
            </button>
          </div>

          <div style={{ marginBottom: "2rem" }}>
            <h2>Current Status: {kyc_status?.toUpperCase() || "UNVERIFIED"}</h2>
            {role && (
              <p>
                <strong>Role:</strong> {role}
              </p>
            )}
          </div>

          <div style={{ marginBottom: "2rem" }}>
            {kyc_status === "unverified" && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#fff3cd",
                  border: "1px solid #ffeaa7",
                  borderRadius: "4px",
                }}
              >
                <h3>🔒 KYC Verification Required</h3>
                <p>
                  Complete your KYC verification to access all dashboard
                  features.
                </p>
                <button
                  onClick={handleFillKycForm}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Start KYC Process
                </button>
              </div>
            )}

            {kyc_status === "pending" && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#d1ecf1",
                  border: "1px solid #bee5eb",
                  borderRadius: "4px",
                }}
              >
                <h3>⏳ Under Review</h3>
                <p>
                  Your KYC submission is being reviewed. This usually takes 1-3
                  business days.
                </p>
                <button
                  onClick={handleFillKycForm}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  View/Edit Submission
                </button>
              </div>
            )}

            {kyc_status === "rejected" && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#f8d7da",
                  border: "1px solid #f5c6cb",
                  borderRadius: "4px",
                }}
              >
                <h3>❌ Verification Rejected</h3>
                <p>
                  Your KYC submission was rejected. Please review and resubmit
                  with corrections.
                </p>
                <button
                  onClick={handleFillKycForm}
                  style={{
                    padding: "0.75rem 1.5rem",
                    backgroundColor: "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  Resubmit KYC Form
                </button>
              </div>
            )}

            {kyc_status === "verified" && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "#d4edda",
                  border: "1px solid #c3e6cb",
                  borderRadius: "4px",
                }}
              >
                <h3>✅ Verification Complete</h3>
                <p>
                  Your identity has been successfully verified. You have full
                  access to all features.
                </p>
              </div>
            )}
          </div>

          <div>
            <h3>KYC Process Steps:</h3>
            <ol>
              <li>Complete the KYC form with personal information</li>
              <li>Upload required documents (ID front, back, and selfie)</li>
              <li>Submit for review</li>
              <li>Wait for admin approval</li>
              <li>Gain full dashboard access</li>
            </ol>
          </div>
        </div>
      </div>
    </>
  );
};

export default KycDetailView;
