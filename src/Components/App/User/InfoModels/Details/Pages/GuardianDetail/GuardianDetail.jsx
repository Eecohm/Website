import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "../DetailCard.module.css";

const GuardianDetail = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [guardian, setGuardian] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGuardianData();
  }, [userId]);

  const fetchGuardianData = async () => {
    try {
      // Use ViewSet endpoints: /api/user/guardians/{id}/ or /api/user/guardians/me/
      const endpoint = userId 
        ? `${baseUrl}/user/guardians/${userId}/`
        : `${baseUrl}/user/guardians/me/`;
        
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch guardian data");

      const data = await response.json();
      setGuardian(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/dashboard/users/info/guardian/form");
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
          <p className={styles.loadingText}>Loading guardian details...</p>
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

  if (!guardian) return null;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Guardian Profile</h1>
        <button onClick={handleEdit} className={styles.editButton}>
          ✏️ Edit Profile
        </button>
      </div>

      <div className={styles.idCard}>
        <div className={styles.cardHeader}>
          <div className={styles.photoSection}>
            <div className={styles.photoFrame}>
              {guardian.photo ? (
                <img src={guardian.photo} alt="Guardian" className={styles.photo} />
              ) : (
                <span className={styles.photoPlaceholder}>👤</span>
              )}
            </div>
          </div>

          <div className={styles.basicInfo}>
            <h2 className={styles.name}>
              {guardian.firstName} {guardian.middleName} {guardian.lastName}
            </h2>

            <div className={styles.infoRow}>
              <span className={styles.icon}>👨‍👩‍👧‍👦</span>
              <span className={styles.label}>Role:</span>
              <span className={styles.value}>Guardian</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>📧</span>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{guardian.userEmail || "N/A"}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>🎂</span>
              <span className={styles.label}>Date of Birth:</span>
              <span className={styles.value}>
                {new Date(guardian.dateOfBirth).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>⚧</span>
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>{guardian.gender}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>✅</span>
              <span className={styles.label}>KYC Status:</span>
              <span className={`${styles.statusBadge} ${getKycStatusClass(guardian.kycStatus)}`}>
                {guardian.kycStatus || "Unverified"}
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
                <span className={styles.detailValue}>{guardian.phone || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Alternate Phone</span>
                <span className={styles.detailValue}>{guardian.alternatePhone || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tell Phone</span>
                <span className={styles.detailValue}>{guardian.tellPhone || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact Person</span>
                <span className={styles.detailValue}>{guardian.contactPerson || "N/A"}</span>
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
                <span className={styles.detailValue}>{guardian.country || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Province</span>
                <span className={styles.detailValue}>{guardian.province || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Municipality</span>
                <span className={styles.detailValue}>{guardian.municipality || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ward / Tole</span>
                <span className={styles.detailValue}>{guardian.ward}, {guardian.tole}</span>
              </div>
              {guardian.pinPoint && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Location</span>
                  <a href={guardian.pinPoint} target="_blank" rel="noopener noreferrer" className={styles.detailLink}>
                    View on Map
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {guardian.studentIds && guardian.studentIds.length > 0 && (
          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>🎓</span>
              <h3 className={styles.sectionTitle}>Associated Students</h3>
            </div>
            <div className={styles.detailsList}>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Number of Students</span>
                <span className={styles.detailValue}>{guardian.studentIds.length}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Student IDs</span>
                <span className={styles.detailValue}>{guardian.studentIds.join(", ")}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuardianDetail;