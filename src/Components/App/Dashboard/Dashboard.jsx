import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useUserVerification } from "../Login/Auth/useUserVerification";
import PostLoginOptions from "../PostLoginOptions/PostLoginOptions";
import KycStatusCard from "../Kyc/KycStatusCard";
import styles from "./Dashboard.module.css";

const DashBoard = () => {
  const { token } = useAuth();
  const { role, verified, kyc_status } = useUserVerification();
  const [userStats, setUserStats] = useState(null);
  const [showPostLoginOptions, setShowPostLoginOptions] = useState(true);
  const [showKycStatusCard, setShowKycStatusCard] = useState(false);

  useEffect(() => {
    // Check if we should show KYC status card (after form submission)
    const urlParams = new URLSearchParams(window.location.search);
    const showStatus = urlParams.get("showKycStatus");

    if (showStatus === "true") {
      setShowKycStatusCard(true);
      setShowPostLoginOptions(false);
      // Clean up the URL
      const newUrl = window.location.pathname;
      window.history.replaceState({}, document.title, newUrl);
    }

    // Since UserValidationGuard protects this route, we know the user is verified
    // We can focus on dashboard functionality here
    const loadDashboardData = async () => {
      if (!token) return;

      try {
        // Load dashboard-specific data here
        // This could include user stats, notifications, etc.
        console.log("Dashboard loaded for verified user with role:", role);
      } catch (error) {
        console.error("Error loading dashboard data:", error);
      }
    };

    loadDashboardData();
  }, [token, role]);

  return (
    <>
      {/* Only show navbar when overlays are hidden */}
      {!showPostLoginOptions && !showKycStatusCard && <NavBar />}
      <div className={styles.dashboard}>
        <div className={styles.dashboardStyling}>
          <div className={styles.welcomeSection}>
            <h1>Welcome to your Dashboard</h1>
            <p className={styles.subtitle}>
              You have full access to all features. Your account is verified and
              active.
            </p>

            {role && (
              <div className={styles.roleInfo}>
                <span className={styles.roleLabel}>Role:</span>
                <span className={styles.roleBadge}>
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </span>
              </div>
            )}
          </div>

          <div className={styles.quickActions}>
            <h2>Quick Actions</h2>
            <div className={styles.actionGrid}>
              <div className={styles.actionCard}>
                <h3>Reports</h3>
                <p>View and manage reports</p>
                <button
                  className={styles.actionButton}
                  onClick={() => (window.location.href = "/dashboard/reports")}
                >
                  Go to Reports
                </button>
              </div>

              <div className={styles.actionCard}>
                <h3>Profile</h3>
                <p>Manage your profile information</p>
                <button
                  className={styles.actionButton}
                  onClick={() => (window.location.href = "/dashboard/profile")}
                >
                  View Profile
                </button>
              </div>

              {(role === "admin" || role === "owner") && (
                <div className={styles.actionCard}>
                  <h3>Administration</h3>
                  <p>Admin panel and user management</p>
                  <button
                    className={styles.actionButton}
                    onClick={() => (window.location.href = "/dashboard/admin")}
                  >
                    Admin Panel
                  </button>
                </div>
              )}

              <div className={styles.actionCard}>
                <h3>Academic</h3>
                <p>Academic information and management</p>
                <button
                  className={styles.actionButton}
                  onClick={() => (window.location.href = "/dashboard/academic")}
                >
                  Academic Section
                </button>
              </div>
            </div>

            {/* KYC Status Section */}
            <div className={styles.statusInfo}>
              <div className={styles.statusCard}>
                <h3>Account Status</h3>
                <div className={styles.statusItem}>
                  <span>Verification Status:</span>
                  <span
                    className={`${styles.statusBadge} ${
                      verified ? styles.verified : styles.pending
                    }`}
                  >
                    {verified ? "✅ Verified" : "⏳ Pending"}
                  </span>
                </div>
                <div className={styles.statusItem}>
                  <span>KYC Status:</span>
                  <span
                    className={`${styles.statusBadge} ${
                      kyc_status === "verified"
                        ? styles.completed
                        : kyc_status === "pending"
                        ? styles.pending
                        : kyc_status === "rejected"
                        ? styles.rejected
                        : styles.unverified
                    }`}
                  >
                    {kyc_status === "verified"
                      ? "✅ Completed"
                      : kyc_status === "pending"
                      ? "⏳ Under Review"
                      : kyc_status === "rejected"
                      ? "❌ Rejected"
                      : "📝 Not Submitted"}
                  </span>
                </div>

                {/* Action button based on KYC status */}
                <div className={styles.kycActionSection}>
                  {!kyc_status || kyc_status === "unverified" ? (
                    <button
                      className={styles.actionButton}
                      onClick={() =>
                        (window.location.href = "/dashboard/kyc/form")
                      }
                    >
                      Complete KYC Form
                    </button>
                  ) : (
                    <button
                      className={styles.actionButton}
                      onClick={() =>
                        (window.location.href = "/dashboard/kyc/form")
                      }
                    >
                      View Details
                    </button>
                  )}
                </div>

                {/* Status messages */}
                {kyc_status === "pending" && (
                  <div className={styles.waitingMessage}>
                    <div className={styles.waitingIcon}>💫</div>
                    <p>
                      Your KYC application is being reviewed! Our team is
                      working hard to verify your information. This usually
                      takes 1-3 business days.
                      <br />
                      <span className={styles.waitingSubtext}>
                        Thank you for your patience! 🙏
                      </span>
                    </p>
                  </div>
                )}

                {kyc_status === "rejected" && (
                  <div className={styles.rejectedMessage}>
                    <div className={styles.rejectedIcon}>🔄</div>
                    <p>
                      Your KYC application needs some updates. Please check your
                      email for specific feedback and resubmit your information.
                      <br />
                      <span className={styles.rejectedSubtext}>
                        Don't worry, you can fix this! 💪
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Post-login options overlay */}
      {showPostLoginOptions && (
        <PostLoginOptions onHide={() => setShowPostLoginOptions(false)} />
      )}
    </>
  );
};

export default DashBoard;
