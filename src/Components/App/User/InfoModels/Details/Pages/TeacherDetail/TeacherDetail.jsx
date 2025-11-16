import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "../DetailCard.module.css";

const TeacherDetail = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeacherData();
  }, [userId]);

  const fetchTeacherData = async () => {
    try {
      // Use ViewSet endpoints: /api/user/teachers/{id}/ or /api/user/teachers/me/
      const endpoint = userId
        ? `${baseUrl}/api/user/teachers/${userId}/`
        : `${baseUrl}/api/user/teachers/me/`;

      console.log("Fetching teacher from:", endpoint);

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Teacher response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Teacher fetch error response:", errorText);
        throw new Error(`Failed to fetch teacher data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Teacher data fetched:", data);
      setTeacher(data);
    } catch (err) {
      console.error("Teacher fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/dashboard/users/info/teacher/form");
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
          <p className={styles.loadingText}>Loading teacher details...</p>
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

  if (!teacher) return null;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Teacher Profile</h1>
        <button onClick={handleEdit} className={styles.editButton}>
          ✏️ Edit Profile
        </button>
      </div>

      <div className={styles.idCard}>
        <div className={styles.cardHeader}>
          <div className={styles.photoSection}>
            <div className={styles.photoFrame}>
              {teacher.photo ? (
                <img
                  src={teacher.photo}
                  alt="Teacher"
                  className={styles.photo}
                />
              ) : (
                <span className={styles.photoPlaceholder}>👤</span>
              )}
            </div>
          </div>

          <div className={styles.basicInfo}>
            <h2 className={styles.name}>
              {teacher.firstName} {teacher.middleName} {teacher.lastName}
            </h2>

            <div className={styles.infoRow}>
              <span className={styles.icon}>🏫</span>
              <span className={styles.label}>Primary Class:</span>
              <span className={styles.value}>
                {teacher.academicClassName || "Not Assigned"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>📚</span>
              <span className={styles.label}>Subjects:</span>
              <span className={styles.value}>
                {teacher.subjectNames?.join(", ") || "None"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>📧</span>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{teacher.userEmail || "N/A"}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>🎂</span>
              <span className={styles.label}>Date of Birth:</span>
              <span className={styles.value}>
                {new Date(teacher.dateOfBirth).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>⚧</span>
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>{teacher.gender}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>✅</span>
              <span className={styles.label}>KYC Status:</span>
              <span
                className={`${styles.statusBadge} ${getKycStatusClass(
                  teacher.kycStatus
                )}`}
              >
                {teacher.kycStatus || "Unverified"}
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
                  {teacher.phone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Alternate Phone</span>
                <span className={styles.detailValue}>
                  {teacher.alternatePhone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tell Phone</span>
                <span className={styles.detailValue}>
                  {teacher.tellPhone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact Person</span>
                <span className={styles.detailValue}>
                  {teacher.contactPerson || "N/A"}
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
                  {teacher.country || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Province</span>
                <span className={styles.detailValue}>
                  {teacher.province || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Municipality</span>
                <span className={styles.detailValue}>
                  {teacher.municipality || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ward / Tole</span>
                <span className={styles.detailValue}>
                  {teacher.ward}, {teacher.tole}
                </span>
              </div>
              {teacher.pinPoint && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Location</span>
                  <a
                    href={teacher.pinPoint}
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

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>🆔</span>
              <h3 className={styles.sectionTitle}>Identity Documents</h3>
            </div>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Nagarikta No.</span>
                <span className={styles.detailValue}>
                  {teacher.nagariktaNo || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>PAN No.</span>
                <span className={styles.detailValue}>
                  {teacher.panNo || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionIcon}>📄</span>
            <h3 className={styles.sectionTitle}>Documents</h3>
          </div>
          <div className={styles.documentsGrid}>
            {teacher.nagariktaPhoto && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>🪪</div>
                <div className={styles.documentName}>Nagarikta Photo</div>
                <a
                  href={teacher.nagariktaPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {teacher.panPhoto && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>💳</div>
                <div className={styles.documentName}>PAN Photo</div>
                <a
                  href={teacher.panPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {teacher.academicQualification && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>🎓</div>
                <div className={styles.documentName}>
                  Academic Qualification
                </div>
                <a
                  href={teacher.academicQualification}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {teacher.skillCertifications && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📜</div>
                <div className={styles.documentName}>Skill Certifications</div>
                <a
                  href={teacher.skillCertifications}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {teacher.resumeCv && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📋</div>
                <div className={styles.documentName}>Resume/CV</div>
                <a
                  href={teacher.resumeCv}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {teacher.jobApplication && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📝</div>
                <div className={styles.documentName}>Job Application</div>
                <a
                  href={teacher.jobApplication}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.documentButton}
                >
                  View
                </a>
              </div>
            )}
            {teacher.hiringLetter && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>✉️</div>
                <div className={styles.documentName}>Hiring Letter</div>
                <a
                  href={teacher.hiringLetter}
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

export default TeacherDetail;
