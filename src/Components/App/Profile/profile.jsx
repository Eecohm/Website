import { useNavigate } from "react-router-dom";
import styles from "./styles/OrgFrom.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useAuth } from "../Login/Auth/AuthContext";
 

const Profile = () => {

  // usenavigate hooks and const auth
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const token = useAuth()
  const [hasOrg, sethasOrg] = useState(false);
  // usenavigate hooks and const auth
  

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
          alert(error.message);
        }
      };
        fetchData(); 
      }, []);
    // check if org exists
    
  // handle orgization card click
  const handleOrganizationClick = () => {
    if (hasOrg) {
      navigate("/dashboard/profile/profile-data");
    } else {
      navigate("/dashboard/profile/organization");
    }
  };
  // handle orgization card click


  // handle sub-orgization card click
  const handleSubOrganizationClick = () => {
    navigate("/dashboard/profile/sub-organization");
  };
  // handle sub-orgization card click

  return (
    <>
    <div className={styles.wholediv}>
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
          <p>Manage your sub-organizations    </p>
        </div>
      </div>
      </div>
    </>
  );
};

export default Profile;
