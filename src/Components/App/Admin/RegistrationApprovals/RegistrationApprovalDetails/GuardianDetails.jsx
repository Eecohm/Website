import styles from "@/Components/App/Admin/RegistrationApprovals/RegistartionApprovals.module.css";

const GuardianDetails = ({ details }) => {
  return (
    <div className={styles.detailsContainer}>
      <h3 className={styles.detailsTitle}>Guardian Details</h3>
      <p>
        <strong>Full Name:</strong> {details.full_name || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {details.user?.email || "N/A"}
      </p>
      <p>
        <strong>Date of Birth:</strong> {details.date_of_birth || "N/A"}
      </p>
      <p>
        <strong>Gender:</strong> {details.gender || "N/A"}
      </p>
      <p>
        <strong>Phone:</strong> {details.phone || "N/A"}
      </p>
      <p>
        <strong>Alternate Phone:</strong> {details.alternate_phone || "N/A"}
      </p>
      <p>
        <strong>Relation to Student:</strong>{" "}
        {details.relation_to_student || "N/A"}
      </p>
      {details.photo && (
        <div className={styles.detailImageWrapper}>
          <p>
            <strong>Photo:</strong>
          </p>
          <img
            src={details.photo}
            alt="Guardian"
            className={styles.detailImage}
          />
        </div>
      )}
    </div>
  );
};

export default GuardianDetails;
