import { useNavigate } from "react-router-dom";
import styles from "./styles/Profile.module.css";

const Profile = () => {
  const navigate = useNavigate();

  const handleOrganizationClick = () => {
    const hasOrganization = false;
    if (hasOrganization) {
      navigate("/dashboard/profile/profile-data");
    } else {
      navigate("/dashboard/profile/organization");
    }
  };

  const handleSubOrganizationClick = () => {
    navigate("/dashboard/profile/sub-organization");
  };

  return (
    <>
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
      ></div>
      <div className={styles.profileContainer}>
        <div className={styles.profileCard} onClick={handleOrganizationClick}>
          <h2>Organization</h2>
          <p>Manage your organization details</p>
        </div>
        <div
          className={styles.profileCard}
          onClick={handleSubOrganizationClick}
        >
          <h2>Sub-Organization</h2>
          <p>Manage your sub-organizations</p>
        </div>
      </div>
    </>
  );
};

export default Profile;
