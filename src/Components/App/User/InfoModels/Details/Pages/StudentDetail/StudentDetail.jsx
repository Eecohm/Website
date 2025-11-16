import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Changed from useSearchParams
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "../DetailCard.module.css";

const StudentDetail = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const { id: userId } = useParams(); // Get id from URL path instead of query

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudentData();
  }, [userId]);

  const fetchStudentData = async () => {
    try {
      // Use ViewSet endpoints: /api/user/students/{id}/ or /api/user/students/me/
      const endpoint = userId
        ? `${baseUrl}/api/user/students/${userId}/`
        : `${baseUrl}/api/user/students/me/`;

      console.log("Fetching student from:", endpoint);

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Student response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Student fetch error response:", errorText);
        throw new Error(`Failed to fetch student data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Student data fetched:", data);
      setStudent(data);
    } catch (err) {
      console.error("Student fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/dashboard/users/info/student/form");
  };

  const getKycStatusClass = (status) => {
    switch (status) {
      case "verified":
        return styles.statusVerified;
      case "pending":
        return styles.statusPending;
      default:
        return styles.statusUnverified;
    }
  };

  if (loading) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p className={styles.loadingText}>Loading student details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.errorContainer}>
          <span className={styles.icon}>⚠️</span>
          <p className={styles.errorText}>{error}</p>
        </div>
      </div>
    );
  }

  if (!student) return null;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Student Profile</h1>
        <button onClick={handleEdit} className={styles.editButton}>
          ✏️ Edit Profile
        </button>
      </div>

      <div className={styles.idCard}>
        <div className={styles.cardHeader}>
          <div className={styles.photoSection}>
            <div className={styles.photoFrame}>
              {student.photo ? (
                <img
                  src={student.photo}
                  alt="Student"
                  className={styles.photo}
                />
              ) : (
                <span className={styles.photoPlaceholder}>👤</span>
              )}
            </div>
          </div>

          <div className={styles.basicInfo}>
            <h2 className={styles.name}>
              {student.firstName} {student.middleName} {student.lastName}
            </h2>

            <div className={styles.infoRow}>
              <span className={styles.icon}>🎓</span>
              <span className={styles.label}>Class:</span>
              <span className={styles.value}>
                {student.academicClassName || "Not Assigned"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>📧</span>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{student.userEmail || "N/A"}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>🎂</span>
              <span className={styles.label}>Date of Birth:</span>
              <span className={styles.value}>
                {new Date(student.dateOfBirth).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>⚧</span>
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>{student.gender}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>✅</span>
              <span className={styles.label}>KYC Status:</span>
              <span
                className={`${styles.statusBadge} ${getKycStatusClass(
                  student.kycStatus
                )}`}
              >
                {student.kycStatus || "Unverified"}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.sectionsGrid}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📞</span>
              <h3 className={styles.sectionTitle}>Contact Information</h3>
            </div>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Phone</span>
                <span className={styles.detailValue}>
                  {student.phone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Alternate Phone</span>
                <span className={styles.detailValue}>
                  {student.alternatePhone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tell Phone</span>
                <span className={styles.detailValue}>
                  {student.tellPhone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact Person</span>
                <span className={styles.detailValue}>
                  {student.contactPerson || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📍</span>
              <h3 className={styles.sectionTitle}>Address</h3>
            </div>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Country</span>
                <span className={styles.detailValue}>
                  {student.country || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Province</span>
                <span className={styles.detailValue}>
                  {student.province || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Municipality</span>
                <span className={styles.detailValue}>
                  {student.municipality || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ward</span>
                <span className={styles.detailValue}>
                  {student.ward || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tole</span>
                <span className={styles.detailValue}>
                  {student.tole || "N/A"}
                </span>
              </div>
              {student.pinPoint && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Location</span>
                  <a
                    href={student.pinPoint}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.detailLink}
                  >
                    View on Map
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📄</span>
            <h3 className={styles.sectionTitle}>Documents</h3>
          </div>
          <div className={styles.documentsGrid}>
            {student.idCard && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>🪪</div>
                <div className={styles.documentName}>ID Card</div>
                <a
                  href={student.idCard}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {student.transferCertificate && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📜</div>
                <div className={styles.documentName}>Transfer Certificate</div>
                <a
                  href={student.transferCertificate}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {student.class10Marksheet && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📋</div>
                <div className={styles.documentName}>Class 10 Marksheet</div>
                <a
                  href={student.class10Marksheet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetail;
