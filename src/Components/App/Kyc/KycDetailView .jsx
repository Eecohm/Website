// components/KycDetailView.jsx
import React, { useState, useEffect } from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./KycDetailView.module.css";
import NavBar from "../NavBar/NavBar";

const KycDetailView = ({ onBack }) => {
  const { userId, kyc_status } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  console.log("KycDetailView rendering with:", { userId, kyc_status });

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate("/dashboard");
    }
  };

  const handleStartKyc = () => {
    navigate("/dashboard/kyc/form");
  };

  return (
    <>
      <NavBar />
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "calc(100vh - 80px)",
        padding: "2rem",
        backgroundColor: "#f8f9fa",
      }}>
        <div className={styles.kycDetailContainer}>
          {/* Header with navigation */}
          <div className={styles.headerButtons}>
            <button onClick={handleBack} className={styles.backButton}>
              ← Back to Dashboard
            </button>

            {/* Action button based on KYC status */}
            {(kyc_status === "unverified" || !kyc_status) && (
              <button onClick={handleStartKyc} className={styles.startKycButton}>
                📄 Start KYC Process
              </button>
            )}

            {kyc_status === "rejected" && (
              <button onClick={handleStartKyc} className={styles.resubmitButton}>
                📄 Resubmit KYC Form
              </button>
            )}

            {kyc_status === "pending" && (
              <button onClick={handleStartKyc} className={styles.resubmitButton}>
                📄 View/Edit KYC Form
              </button>
            )}
          </div>

          {/* Main content */}
          <h2>KYC Verification Details</h2>

          {/* Current status display */}
          <div className={styles.statusExplanation}>
            <h3>Current Status: {(kyc_status || "UNVERIFIED").toUpperCase()}</h3>
            <div className={styles.statusMessage}>
              {(!kyc_status || kyc_status === 'unverified') && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>📝</div>
                  <div className={styles.statusText}>
                    <strong>KYC Not Started</strong>
                    <p>You need to complete the KYC verification process to access dashboard features. Click "Start KYC Process" to begin.</p>
                  </div>
                </div>
              )}

              {kyc_status === 'pending' && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>⏳</div>
                  <div className={styles.statusText}>
                    <strong>Under Review</strong>
                    <p>Your KYC submission is being reviewed by our team. This process typically takes 1-3 business days.</p>
                  </div>
                </div>
              )}

              {kyc_status === 'rejected' && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>❌</div>
                  <div className={styles.statusText}>
                    <strong>Verification Rejected</strong>
                    <p>Your KYC submission was rejected. Please review the feedback and resubmit with the required corrections.</p>
                  </div>
                </div>
              )}

              {kyc_status === 'verified' && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>✅</div>
                  <div className={styles.statusText}>
                    <strong>Verification Complete</strong>
                    <p>Your KYC verification is complete! You now have full access to all dashboard features.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Requirements section for unverified users */}
          {(!kyc_status || kyc_status === 'unverified') && (
            <div className={styles.noDataMessage}>
              <div className={styles.noDataIcon}>📝</div>
              <h3>Ready to Start KYC Process</h3>
              <p>You haven't submitted your KYC information yet. Click the button above to begin the verification process.</p>
              <div className={styles.requirements}>
                <h4>You'll need:</h4>
                <ul>
                  <li>📄 Government-issued ID (front and back)</li>
                  <li>🤳 Selfie with your ID</li>
                  <li>📝 Personal information (name, address, etc.)</li>
                  <li>👤 Role selection</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KycDetailView;
import React, { useState, useEffect } from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./KycDetailView.module.css";
import NavBar from "../NavBar/NavBar";

const KycDetailView = ({ onBack }) => {
  const { userId, kyc_status } = useAuth();
  const navigate = useNavigate();
  const [kycData, setKycData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Add debugging
  console.log("KycDetailView rendering with:", { userId, kyc_status, isLoading, error });

  // Simple test render to debug blank UI
  return (
    <>
      <NavBar />
      <div style={{ padding: "2rem", backgroundColor: "white", minHeight: "50vh" }}>
        <h1>KYC Detail View Test</h1>
        <p>Component is rendering successfully!</p>
        <p>User ID: {userId || "Not available"}</p>
        <p>KYC Status: {kyc_status || "Not available"}</p>
        <button onClick={() => navigate("/dashboard")}>Back to Dashboard</button>
        <button onClick={() => navigate("/dashboard/kyc/form")}>Go to KYC Form</button>
      </div>
    </>
  );

  // Commented out the complex logic for now
  /*
  // Always render something for debugging
  if (!userId) {
    return (
      <>
        <NavBar />
        <div style={{ padding: "2rem", textAlign: "center" }}>
          <h2>Authentication Required</h2>
          <p>Please log in to view KYC details.</p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      </>
    );
  }

  useEffect(() => {
    // Instead of fetching from API, we'll use the KYC status from auth context
    // and create a mock data structure for display purposes
    const initializeKycData = () => {
      try {
        console.log("Initializing KYC data with status:", kyc_status);
        
        // Create mock KYC data based on current status
        const mockKycData = {
          status: kyc_status || "unverified", // Default to unverified if not set
          submittedAt: null,
          reviewedAt: null,
          reviewerNotes: null,
          fullName: "User Information",
          dateOfBirth: "To be filled",
          address: "To be provided",
          idType: "Not specified",
          idNumber: "Not provided",
          idFrontUrl: null,
          idBackUrl: null,
          selfieUrl: null
        };

        // Set different messages based on status
        const currentStatus = kyc_status || "unverified";
        if (currentStatus === "rejected") {
          mockKycData.reviewerNotes = "Please review and correct the submitted information.";
          mockKycData.reviewedAt = new Date().toISOString();
        } else if (currentStatus === "pending") {
          mockKycData.submittedAt = new Date().toISOString();
          mockKycData.reviewerNotes = "Your submission is under review.";
        }

        console.log("Setting KYC data:", mockKycData);
        setKycData(mockKycData);
        setError("");
      } catch (err) {
        console.error("Error initializing KYC data:", err);
        setError("Error loading KYC information.");
      } finally {
        console.log("Setting loading to false");
        setIsLoading(false);
      }
    };

    // Add a small delay to ensure auth context is loaded
    setTimeout(initializeKycData, 100);
  }, [userId, kyc_status]);

  const handleBack = () => {
    if (onBack) {
      onBack(); // Use the prop function if provided
    } else {
      navigate("/dashboard"); // Fallback navigation
    }
  };

  const handleResubmit = () => {
    navigate("/dashboard/kyc/form");
  };

  if (isLoading) {
    return (
      <div className={styles.kycDetailContainer}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Dashboard
        </button>
        <div className={styles.loadingSpinner}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.kycDetailContainer}>
        <button onClick={handleBack} className={styles.backButton}>
          ← Back to Dashboard
        </button>
        <div className={styles.errorMessage}>{error}</div>
      </div>
    );
  }

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
        <div className={styles.kycDetailContainer}>
          <div className={styles.headerButtons}>
            <button onClick={handleBack} className={styles.backButton}>
              ← Back to Dashboard
            </button>

            {/* Show appropriate button based on KYC status */}
            {kyc_status === "rejected" && (
              <button
                onClick={handleResubmit}
                className={styles.resubmitButton}
              >
                📄 Resubmit KYC Form
              </button>
            )}

            {kyc_status === "unverified" && (
              <button
                onClick={handleResubmit}
                className={styles.startKycButton}
              >
                📄 Start KYC Process
              </button>
            )}

            {kyc_status === "pending" && (
              <button
                onClick={handleResubmit}
                className={styles.resubmitButton}
              >
                📄 View/Edit KYC Form
              </button>
            )}
          </div>

          <h2>KYC Verification Details</h2>

          {/* KYC Workflow Visualization */}
          <div className={styles.workflowSection}>
            <h3>KYC Process Workflow</h3>
            <div className={styles.workflowSteps}>
              <div className={styles.workflowStep}>
                <div className={styles.stepIcon}>🔑</div>
                <div className={styles.stepTitle}>Login</div>
                <div className={styles.stepDescription}>
                  User authentication
                </div>
                <div className={styles.stepStatus}>✅ Complete</div>
              </div>

              <div className={styles.workflowArrow}>→</div>

              <div
                className={`${styles.workflowStep} ${
                  kyc_status === "unverified" ? styles.currentStep : ""
                }`}
              >
                <div className={styles.stepIcon}>👁️</div>
                <div className={styles.stepTitle}>Detail View</div>
                <div className={styles.stepDescription}>
                  Review KYC requirements
                </div>
                <div className={styles.stepStatus}>
                  {kyc_status === "unverified"
                    ? "📍 Current Step"
                    : "✅ Complete"}
                </div>
              </div>

              <div className={styles.workflowArrow}>→</div>

              <div
                className={`${styles.workflowStep} ${
                  kyc_status === "pending" ? styles.currentStep : ""
                }`}
              >
                <div className={styles.stepIcon}>📄</div>
                <div className={styles.stepTitle}>KYC Form</div>
                <div className={styles.stepDescription}>
                  Complete verification form
                </div>
                <div className={styles.stepStatus}>
                  {kyc_status === "pending"
                    ? "📍 Current Step"
                    : kyc_status === "verified"
                    ? "✅ Complete"
                    : kyc_status === "rejected"
                    ? "❌ Needs Revision"
                    : "⏳ Pending"}
                </div>
              </div>

              <div className={styles.workflowArrow}>→</div>

              <div
                className={`${styles.workflowStep} ${
                  kyc_status === "verified" ? styles.completed : ""
                }`}
              >
                <div className={styles.stepIcon}>🏆</div>
                <div className={styles.stepTitle}>Dashboard Access</div>
                <div className={styles.stepDescription}>
                  Full platform access
                </div>
                <div className={styles.stepStatus}>
                  {kyc_status === "verified" ? "✅ Complete" : "⏳ Locked"}
                </div>
              </div>
            </div>
          </div>

          {/* Status Explanation Section */}
          <div className={styles.statusExplanation}>
            <h3>Current Status: {kyc_status?.toUpperCase()}</h3>
            <div className={styles.statusMessage}>
              {kyc_status === "unverified" && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>📝</div>
                  <div className={styles.statusText}>
                    <strong>KYC Not Started</strong>
                    <p>
                      You need to complete the KYC verification process to
                      access dashboard features. Click "Start KYC Process" to
                      begin.
                    </p>
                  </div>
                </div>
              )}
              {kyc_status === "pending" && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>⏳</div>
                  <div className={styles.statusText}>
                    <strong>Under Review</strong>
                    <p>
                      Your KYC submission is being reviewed by our team. This
                      process typically takes 1-3 business days.
                    </p>
                  </div>
                </div>
              )}
              {kyc_status === "rejected" && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>❌</div>
                  <div className={styles.statusText}>
                    <strong>Verification Rejected</strong>
                    <p>
                      Your KYC submission was rejected. Please review the
                      feedback below and resubmit with the required corrections.
                    </p>
                  </div>
                </div>
              )}
              {kyc_status === "verified" && (
                <div className={styles.statusCard}>
                  <div className={styles.statusIcon}>✅</div>
                  <div className={styles.statusText}>
                    <strong>Verification Complete</strong>
                    <p>
                      Your KYC verification is complete! You now have full
                      access to all dashboard features.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {kycData ? (
            <div className={styles.kycDetails}>
              <div className={styles.detailSection}>
                <h3>Personal Information</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Full Name:</span>
                  <span className={styles.detailValue}>{kycData.fullName}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Date of Birth:</span>
                  <span className={styles.detailValue}>
                    {kycData.dateOfBirth}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Address:</span>
                  <span className={styles.detailValue}>{kycData.address}</span>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Identification</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID Type:</span>
                  <span className={styles.detailValue}>{kycData.idType}</span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>ID Number:</span>
                  <span className={styles.detailValue}>{kycData.idNumber}</span>
                </div>
              </div>

              <div className={styles.detailSection}>
                <h3>Verification Status</h3>
                <div className={styles.detailRow}>
                  <span className={styles.detailLabel}>Status:</span>
                  <span
                    className={`${styles.statusValue} ${
                      styles[kycData.status]
                    }`}
                  >
                    {kycData.status.toUpperCase()}
                  </span>
                </div>
                {kycData.submittedAt && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Submitted On:</span>
                    <span className={styles.detailValue}>
                      {new Date(kycData.submittedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {kycData.reviewedAt && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Reviewed On:</span>
                    <span className={styles.detailValue}>
                      {new Date(kycData.reviewedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
                {kycData.reviewerNotes && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Reviewer Notes:</span>
                    <span className={styles.detailValue}>
                      {kycData.reviewerNotes}
                    </span>
                  </div>
                )}
              </div>

              <div className={styles.detailSection}>
                <h3>Document Images</h3>
                <div className={styles.documentImages}>
                  {kycData.idFrontUrl && (
                    <div className={styles.documentImage}>
                      <div className={styles.imageLabel}>ID Front</div>
                      <img src={kycData.idFrontUrl} alt="ID Front" />
                    </div>
                  )}
                  {kycData.idBackUrl && (
                    <div className={styles.documentImage}>
                      <div className={styles.imageLabel}>ID Back</div>
                      <img src={kycData.idBackUrl} alt="ID Back" />
                    </div>
                  )}
                  {kycData.selfieUrl && (
                    <div className={styles.documentImage}>
                      <div className={styles.imageLabel}>Selfie with ID</div>
                      <img src={kycData.selfieUrl} alt="Selfie with ID" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.noDataMessage}>
              <div className={styles.noDataIcon}>📝</div>
              <h3>Ready to Start KYC Process</h3>
              <p>You haven't submitted your KYC information yet. Click the button above to begin the verification process.</p>
              <div className={styles.requirements}>
                <h4>You'll need:</h4>
                <ul>
                  <li>📄 Government-issued ID (front and back)</li>
                  <li>🤳 Selfie with your ID</li>
                  <li>📝 Personal information (name, address, etc.)</li>
                  <li>👤 Role selection</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default KycDetailView;
