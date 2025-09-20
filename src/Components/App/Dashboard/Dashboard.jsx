import NavBar from "../NavBar/NavBar";
import { useEffect, useState } from "react";
import { useAuth } from "../Login/Auth/AuthContext";
import { useUserVerification } from "../Login/Auth/useUserVerification";
import styles from "./Dashboard.module.css";

const DashBoard = () => {
  const { token } = useAuth();
  const { role, verified, kyc_status } = useUserVerification();
  const [userStats, setUserStats] = useState(null);

  useEffect(() => {
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
      <NavBar />
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

              <div className={styles.statusInfo}>
                <div className={styles.statusCard}>
                  <h3>Account Status</h3>
                  <div className={styles.statusItem}>
                    <span>Verification Status:</span>
                    <span
                      className={`${styles.statusBadge} ${styles.verified}`}
                    >
                      ✅ Verified
                    </span>
                  </div>
                  <div className={styles.statusItem}>
                    <span>KYC Status:</span>
                    <span
                      className={`${styles.statusBadge} ${styles.completed}`}
                    >
                      ✅ Completed
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoard;
