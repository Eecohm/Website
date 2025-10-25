import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "../DetailCard.module.css";

const OwnerDetail = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOwnerData();
  }, [userId]);

  const fetchOwnerData = async () => {
    try {
      const endpoint = userId
        ? `${baseUrl}/user/owners/${userId}/`
        : `${baseUrl}/user/owners/me/`;

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch owner data");

      const data = await response.json();
      setOwner(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    // Pass owner data to the form via navigation state
    navigate("/dashboard/users/info/owner/form", { state: { owner, isEditMode: true } });
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
          <p className={styles.loadingText}>Loading owner details...</p>
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

  if (!owner) return null;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Owner Profile</h1>
        <button onClick={handleEdit} className={styles.editButton}>
          ✏️ Edit Profile
        </button>
      </div>

      <div className={styles.idCard}>
        <div className={styles.cardHeader}>
          <div className={styles.photoSection}>
            <div className={styles.photoFrame}>
              {owner.photo ? (
                <img src={owner.photo} alt="Owner" className={styles.photo} />
              ) : (
                <span className={styles.photoPlaceholder}>👤</span>
              )}
            </div>
          </div>

          <div className={styles.basicInfo}>
            <h2 className={styles.name}>
              {owner.firstName} {owner.middleName} {owner.lastName}
            </h2>

            <div className={styles.infoRow}>
              <span className={styles.icon}>👑</span>
              <span className={styles.label}>Role:</span>
              <span className={styles.value}>Owner</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>📧</span>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{owner.userEmail || "N/A"}</span>
            </div>

            {owner.website && (
              <div className={styles.infoRow}>
                <span className={styles.icon}>🌐</span>
                <span className={styles.label}>Website:</span>
                <a
                  href={owner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.detailLink}
                >
                  {owner.website}
                </a>
              </div>
            )}

            <div className={styles.infoRow}>
              <span className={styles.icon}>🎂</span>
              <span className={styles.label}>Date of Birth:</span>
              <span className={styles.value}>
                {new Date(owner.dateOfBirth).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>⚧</span>
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>{owner.gender}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>✅</span>
              <span className={styles.label}>KYC Status:</span>
              <span
                className={`${styles.statusBadge} ${getKycStatusClass(owner.kycStatus)}`}
              >
                {owner.kycStatus || "Unverified"}
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
                <span className={styles.detailValue}>{owner.phone || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Alternate Phone</span>
                <span className={styles.detailValue}>
                  {owner.alternatePhone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tell Phone</span>
                <span className={styles.detailValue}>
                  {owner.tellPhone || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact Person</span>
                <span className={styles.detailValue}>
                  {owner.contactPerson || "N/A"}
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
                  {owner.country || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Province</span>
                <span className={styles.detailValue}>
                  {owner.province || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Municipality</span>
                <span className={styles.detailValue}>
                  {owner.municipality || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ward / Tole</span>
                <span className={styles.detailValue}>
                  {owner.ward}, {owner.tole}
                </span>
              </div>
              {owner.pinPoint && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Location</span>
                  <a
                    href={owner.pinPoint}
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
                  {owner.nagariktaNo || "N/A"}
                </span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>PAN No.</span>
                <span className={styles.detailValue}>
                  {owner.panNo || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionIcon}>📄</span>
              <h3 className={styles.sectionTitle}>Documents</h3>
            </div>
            <div className={styles.documentsGrid}>
              {owner.nagariktaPhoto && (
                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>🪪</div>
                  <div className={styles.documentName}>Nagarikta Photo</div>
                  <a
                    href={owner.nagariktaPhoto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.documentButton}
                  >
                    View
                  </a>
                </div>
              )}
              {owner.panPhoto && (
                <div className={styles.documentCard}>
                  <div className={styles.documentIcon}>💳</div>
                  <div className={styles.documentName}>PAN Photo</div>
                  <a
                    href={owner.panPhoto}
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
    </div>
  );
};

export default OwnerDetail;