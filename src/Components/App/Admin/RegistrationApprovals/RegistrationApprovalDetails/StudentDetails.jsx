import styles from "@/Components/App/Admin/RegistrationApprovals/RegistartionApprovals.module.css";

const StudentDetails = ({ details }) => {
  return (
    <div className={styles.detailsContainer}>
      <h3 className={styles.detailsTitle}>Student Details</h3>
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
        <strong>Country:</strong> {details.country || "N/A"}
      </p>
      <p>
        <strong>Province:</strong> {details.province || "N/A"}
      </p>
      <p>
        <strong>Municipality:</strong> {details.municipality || "N/A"}
      </p>
      <p>
        <strong>Ward:</strong> {details.ward || "N/A"}
      </p>
      <p>
        <strong>Tole:</strong> {details.tole || "N/A"}
      </p>
      <p>
        <strong>Grade:</strong> {details.grade?.name || "N/A"}
      </p>
      <p>
        <strong>Mother's Name:</strong> {details.mother_name || "N/A"}
      </p>
      <p>
        <strong>Father's Name:</strong> {details.father_name || "N/A"}
      </p>
      <p>
        <strong>Guardian Contact:</strong> {details.guardian_contact || "N/A"}
      </p>
      <p>
        <strong>Roll No:</strong> {details.rollno || "N/A"}
      </p>
      <p>
        <strong>Symbol Number:</strong> {details.symbol_number || "N/A"}
      </p>
      <p>
        <strong>IEMIS Code:</strong> {details.iemis_code || "N/A"}
      </p>
      {details.photo && (
        <div className={styles.detailImageWrapper}>
          <p>
            <strong>Photo:</strong>
          </p>
          <img
            src={details.photo}
            alt="Student"
            className={styles.detailImage}
          />
        </div>
      )}
      {details.birth_certificate_photo && (
        <div className={styles.detailImageWrapper}>
          <p>
            <strong>Birth Certificate:</strong>
          </p>
          <img
            src={details.birth_certificate_photo}
            alt="Birth Certificate"
            className={styles.detailImage}
          />
        </div>
      )}
    </div>
  );
};

export default StudentDetails;
