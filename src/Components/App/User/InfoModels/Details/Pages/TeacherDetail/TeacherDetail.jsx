import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import {
  FiEdit,
  FiUser,
  FiMail,
  FiCalendar,
  FiPhone,
  FiMapPin,
  FiFileText,
  FiCreditCard,
  FiFile,
  FiBookOpen,
} from "react-icons/fi";
import styles from "@/Components/App/User/InfoModels/Details/Pages/DetailCard.module.css";

const TeacherDetail = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const { id: userId } = useParams(); // Get id from URL path instead of query

  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If no userId provided, redirect to dashboard
    if (!userId) {
      navigate("/dashboard");
      return;
    }
    fetchTeacherData();
  }, [userId]);

  const fetchTeacherData = async () => {
    try {
      // Use ViewSet endpoint: /api/user/teachers/{id}/
      const endpoint = `${baseUrl}/user/teachers/${userId}/`;

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
    // Navigate to form with teacher data for editing
    navigate("/dashboard/users/info/teacher/form", {
      state: { teacherData: teacher, isEditing: true },
    });
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
          <FiFileText className={styles.icon} />
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
          <FiEdit size={16} />
          Edit Profile
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
                <FiUser size={48} className={styles.photoPlaceholder} />
              )}
            </div>
          </div>

          <div className={styles.basicInfo}>
            <h2 className={styles.name}>
              {teacher.firstName} {teacher.middleName} {teacher.lastName}
            </h2>

            <div className={styles.infoRow}>
              <FiBookOpen className={styles.icon} />
              <span className={styles.label}>Primary Class:</span>
              <span className={styles.value}>
                {teacher.academicClassName || "Not Assigned"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <FiFileText className={styles.icon} />
              <span className={styles.label}>Subjects:</span>
              <span className={styles.value}>
                {teacher.subjectNames?.join(", ") || "None"}
              </span>
            </div>

            <div className={styles.infoRow}>
              <FiMail className={styles.icon} />
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{teacher.userEmail || "N/A"}</span>
            </div>

            <div className={styles.infoRow}>
              <FiCalendar className={styles.icon} />
              <span className={styles.label}>Date of Birth:</span>
              <span className={styles.value}>
                {new Date(teacher.dateOfBirth).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <FiUser className={styles.icon} />
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>{teacher.gender}</span>
            </div>

            <div className={styles.infoRow}>
              <FiCreditCard className={styles.icon} />
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
              <FiPhone className={styles.sectionIcon} />
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
              <FiMapPin className={styles.sectionIcon} />
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
              <FiCreditCard className={styles.sectionIcon} />
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
            <FiFile className={styles.sectionIcon} />
            <h3 className={styles.sectionTitle}>Documents</h3>
          </div>
          <div className={styles.documentsGrid}>
            {teacher.nagariktaPhoto && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>
                  <FiCreditCard size={24} />
                </div>
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
                <div className={styles.documentIcon}>
                  <FiCreditCard size={24} />
                </div>
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
                <div className={styles.documentIcon}>
                  <FiBookOpen size={24} />
                </div>
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
                <div className={styles.documentIcon}>
                  <FiFileText size={24} />
                </div>
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
                <div className={styles.documentIcon}>
                  <FiFile size={24} />
                </div>
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
                <div className={styles.documentIcon}>
                  <FiFileText size={24} />
                </div>
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
                <div className={styles.documentIcon}>
                  <FiMail size={24} />
                </div>
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
