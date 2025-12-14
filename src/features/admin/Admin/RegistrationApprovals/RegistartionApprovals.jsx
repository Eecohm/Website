import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "@/features/admin/Admin/RegistrationApprovals/RegistartionApprovals.module.css";
import NavBar from "@/features/admin/NavBar/NavBar";
import { useBaseMediaUrl, useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import StudentDetails from "@/features/admin/Admin/RegistrationApprovals/RegistrationApprovalDetails/StudentDetails";
import TeacherDetails from "@/features/admin/Admin/RegistrationApprovals/RegistrationApprovalDetails/TeacherDetails";
import EmployeeDetails from "@/features/admin/Admin/RegistrationApprovals/RegistrationApprovalDetails/EmployeeDetails";
import GuardianDetails from "@/features/admin/Admin/RegistrationApprovals/RegistrationApprovalDetails/GuardianDetails";
import OwnerDetails from "@/features/admin/Admin/RegistrationApprovals/RegistrationApprovalDetails/OwnerDetails";

const RegistrationApproval = () => {
  const pk = localStorage.getItem("userId");
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);
  const baseUrl = useBaseUrl();
  const basemediaUrl = useBaseMediaUrl();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        console.warn("Access token missing");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${baseUrl}/user/user/?verified=unverified`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Invalid or expired token");
          }
          throw new Error(`Failed to fetch users: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        if (err.message.includes("Invalid or expired token")) {
          navigate("/login");
        }
      }
    };

    fetchUsers();
  }, [baseUrl, token, navigate]);

  const handleViewDetails = async (user) => {
    setSelectedUser(user);
    setDetailsLoading(true);
    setDetailsError(null);

    const roleEndpoints = {
      student: "students",
      teacher: "teacher",
      employee: "employee",
      guardian: "guardian",
      owner: "owner",
    };

    const endpoint = roleEndpoints[user.role];
    if (!endpoint) {
      setDetailsError("Invalid user role");
      setDetailsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/user/${endpoint}/${user.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid or expired token");
        }
        throw new Error(`Failed to fetch user details: ${response.status}`);
      }
      const data = await response.json();
      setUserDetails(data);
      setDetailsLoading(false);
      // Prevent body scroll while modal open
      document.body.style.overflow = "hidden";
    } catch (err) {
      setDetailsError(err.message);
      setDetailsLoading(false);
      if (err.message.includes("Invalid or expired token")) {
        navigate("/login");
      }
    }
  };

  const handleStatusChange = async (user, status) => {
    if (!user) return;

    try {
      const response = await fetch(`${baseUrl}/user/user/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          verified: status,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update status to ${status}: ${response.status}`);
      }

      // If viewing details modal, close it
      if (selectedUser && selectedUser.email === user.email) {
        handleCloseModal();
      }

      // Update the list - remove if filtered view, or just update logic if we had a full list
      // Since we are fetching only unverified users by default on this page load:
      // If we verify/reject, they should disappear from the "unverified" list.
      // If we set to "unverified" (from unverified??), they stay.
      // But if we are re-using this for a full list later, we might want to just update.
      // For now, assuming the goal is to process the list, removing them is correct behavior
      // UNLESS we set them to 'unverified' which keeps them in the list.

      if (status === 'unverified' || status === 'pending') {
        // If setting TO unverified/pending, and we are showing unverified list, 
        // we might want to keep them or refresh. 
        // Simplest is to refresh or just update local state if we had a comprehensive list.
        // Given current implementation `users` state depends on initial fetch which is `?verified=unverified`.
        // If we are setting TO unverified, they effectively "stay" or "re-enter" pending.
        // But if we act on an item in the list, it's already there. 
        // So no visual change if it stays unverified.
        // BUT if we click "unverified" on a pending user, it's redundant but fine.
      } else {
        // Verified or Rejected -> Remove from "unverified" list
        setUsers(users.filter((u) => u.email !== user.email));
      }

    } catch (err) {
      setDetailsError(err.message);
      // If triggered from card (no modal), might want to show a global error or toast.
      // For now, setting detailsError works if modal is open, but if not?
      // Maybe reuse `error` state but that replaces the whole list view with error.
      console.error(err);
      alert(`Error: ${err.message}`); // Fallback for quick feedback
    }
  };

  const handleVerify = () => handleStatusChange(selectedUser, 'verified');
  const handleReject = () => handleStatusChange(selectedUser, 'rejected');

  const handleCloseModal = () => {
    setSelectedUser(null);
    setUserDetails(null);
    setDetailsError(null);
    // Restore body scroll
    document.body.style.overflow = "auto";
  };

  const filteredUsers = users.filter((user) =>
    (user.full_name || user.email)
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const renderDetails = () => {
    if (detailsLoading)
      return <p className={styles.loading}>Loading details...</p>;
    if (detailsError) return <p className={styles.error}>{detailsError}</p>;
    if (!userDetails) return null;

    switch (selectedUser.role) {
      case "student":
        return <StudentDetails details={userDetails} />;
      case "teacher":
        return <TeacherDetails details={userDetails} />;
      case "employee":
        return <EmployeeDetails details={userDetails} />;
      case "guardian":
        return <GuardianDetails details={userDetails} />;
      case "owner":
        return <OwnerDetails details={userDetails} />;
      default:
        return <p className={styles.error}>Invalid user role</p>;
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.mainDiv}>
        <div className={styles.container}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          {loading && <p className={styles.loading}>Loading...</p>}
          {error && <p className={styles.error}>{error}</p>}
          {!loading && !error && filteredUsers.length === 0 && (
            <p className={styles.noResults}>No users found</p>
          )}
          <div className={styles.cardGrid}>
            {filteredUsers.map((user, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.photoWrapper}>
                  {user.photo ? (
                    <img
                      src={`${basemediaUrl}${user.photo}`}
                      alt="User"
                      className={styles.userPhoto}
                    />
                  ) : (
                    <div className={styles.photoPlaceholder}>
                      {user.full_name
                        ? user.full_name.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.userName}>
                    {user.full_name || user.email}
                  </h3>
                  <p className={styles.userRole}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </p>
                  <button
                    className={styles.viewButton}
                    onClick={() => handleViewDetails(user)}
                  >
                    View Details
                  </button>
                  <div className={styles.actionButtons}>
                    <button
                      className={`${styles.iconButton} ${styles.verifyAction}`}
                      title="Verify User"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(user, 'verified');
                      }}
                    >
                      ✓
                    </button>
                    <button
                      className={`${styles.iconButton} ${styles.unverifyAction}`}
                      title="Set to Unverified"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(user, 'unverified');
                      }}
                    >
                      ?
                    </button>
                    <button
                      className={`${styles.iconButton} ${styles.rejectAction}`}
                      title="Reject User"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(user, 'rejected');
                      }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedUser && (
        <div
          className={styles.modal}
          onClick={handleCloseModal}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={styles.modalTitle}>User Details</h2>
            {renderDetails()}
            <div className={styles.modalButtons}>
              <button
                className={`${styles.modalButton} ${styles.closeButton}`}
                onClick={handleCloseModal}
              >
                Close
              </button>
              <button
                className={`${styles.modalButton} ${styles.verifyButton}`}
                onClick={handleVerify}
              >
                Verify
              </button>
              <button
                className={`${styles.modalButton} ${styles.rejectButton}`}
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RegistrationApproval;
