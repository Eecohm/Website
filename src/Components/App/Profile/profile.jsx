import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useBaseUrl } from "../../../Context/BaseUrlContext";
import { useAuth } from "../../../Context/AuthContext";
import Notification from "../../../GlobalComponets/Notification";
import { Building2, Users, ArrowLeft, Briefcase } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const token = useAuth();
  const [hasOrg, sethasOrg] = useState(false);
  const [notification, setNotification] = useState(null);

  // check if org exists
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/org/orgs`, {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        });
        if (response.status === 200) {
          sethasOrg(true);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotification({
            type: "help",
            message:
              "No organization found. Please create your organization to get started.",
          });
        } else {
          setNotification({
            type: "error",
            message: error.message || "Something went wrong.",
          });
        }
      }
    };
    fetchData();
  }, [baseUrl, token]);

  // handle organization card click
  const handleOrganizationClick = () => {
    if (hasOrg) {
      navigate("/dashboard/profile/profile-data");
    } else {
      navigate("/dashboard/profile/organization");
    }
  };

  // handle sub-organization card click
  const handleSubOrganizationClick = () => {
    navigate("/dashboard/profile/sub-organization");
  };

  return (
    <>
      <div className={styles.profileContainer}>
        <div
          className={styles.backButton}
          onClick={() => navigate("/dashboard")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              navigate("/dashboard");
            }
          }}
        >
          <ArrowLeft size={24} />
        </div>

        {/* Notification */}
        {notification && (
          <div className={styles.notificationWrapper}>
            <Notification
              type={notification.type}
              message={notification.message}
              onClose={() => setNotification(null)}
            />
          </div>
        )}

        {/* Main Content */}
        <div className={styles.mainContent}>
          <div className={styles.header}>
            <h1>Profile Management</h1>
            <p>Manage your organization and sub-organization settings</p>
          </div>

          <div className={styles.cardsContainer}>
            <div className={`${styles.profileCard} ${styles.organizationCard}`} onClick={handleOrganizationClick}>
              <div className={styles.cardIcon}>
                <Building2 size={48} />
              </div>
              <div className={styles.cardContent}>
                <h2>Organization</h2>
                <p>Manage your organization details, settings, and configurations</p>
                <div className={styles.cardStatus}>
                  {hasOrg ? (
                    <span className={`${styles.statusBadge} ${styles.active}`}>Active</span>
                  ) : (
                    <span className={`${styles.statusBadge} ${styles.inactive}`}>Setup Required</span>
                  )}
                </div>
              </div>
              <div className={styles.cardArrow}>
                <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
              </div>
            </div>

            <div className={`${styles.profileCard} ${styles.subOrgCard}`} onClick={handleSubOrganizationClick}>
              <div className={styles.cardIcon}>
                <Users size={48} />
              </div>
              <div className={styles.cardContent}>
                <h2>Sub-Organization</h2>
                <p>Create and manage your sub-organizations, teams, and departments</p>
                <div className={styles.cardStatus}>
                  <span className={`${styles.statusBadge} ${styles.neutral}`}>Manage</span>
                </div>
              </div>
              <div className={styles.cardArrow}>
                <ArrowLeft size={20} style={{ transform: 'rotate(180deg)' }} />
              </div>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className={styles.infoSection}>
            <div className={styles.infoCard}>
              <Briefcase size={24} />
              <div>
                <h3>Quick Setup</h3>
                <p>Get started by setting up your organization profile first, then create sub-organizations as needed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;