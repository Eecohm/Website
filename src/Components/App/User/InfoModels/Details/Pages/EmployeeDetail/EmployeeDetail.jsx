import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "../DetailCard.module.css";

const EmployeeDetail = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployeeData();
  }, [userId]);

  const fetchEmployeeData = async () => {
    try {
      // Use ViewSet endpoints: /api/user/employees/{id}/ or /api/user/employees/me/
      const endpoint = userId 
        ? `${baseUrl}/user/employees/${userId}/`
        : `${baseUrl}/user/employees/me/`;
        
      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch employee data");

      const data = await response.json();
      setEmployee(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/dashboard/users/info/employee/form");
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
          <p className={styles.loadingText}>Loading employee details...</p>
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

  if (!employee) return null;

  return (
    <div className={styles.detailContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Employee Profile</h1>
        <button onClick={handleEdit} className={styles.editButton}>
          ✏️ Edit Profile
        </button>
      </div>

      <div className={styles.idCard}>
        <div className={styles.cardHeader}>
          <div className={styles.photoSection}>
            <div className={styles.photoFrame}>
              {employee.photo ? (
                <img src={employee.photo} alt="Employee" className={styles.photo} />
              ) : (
                <span className={styles.photoPlaceholder}>👤</span>
              )}
            </div>
          </div>

          <div className={styles.basicInfo}>
            <h2 className={styles.name}>
              {employee.firstName} {employee.middleName} {employee.lastName}
            </h2>

            <div className={styles.infoRow}>
              <span className={styles.icon}>💼</span>
              <span className={styles.label}>Role:</span>
              <span className={styles.value}>Employee</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>📧</span>
              <span className={styles.label}>Email:</span>
              <span className={styles.value}>{employee.userEmail || "N/A"}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>🎂</span>
              <span className={styles.label}>Date of Birth:</span>
              <span className={styles.value}>
                {new Date(employee.dateOfBirth).toLocaleDateString()}
              </span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>⚧</span>
              <span className={styles.label}>Gender:</span>
              <span className={styles.value}>{employee.gender}</span>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.icon}>✅</span>
              <span className={styles.label}>KYC Status:</span>
              <span className={`${styles.statusBadge} ${getKycStatusClass(employee.kycStatus)}`}>
                {employee.kycStatus || "Unverified"}
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
                <span className={styles.detailValue}>{employee.phone || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Alternate Phone</span>
                <span className={styles.detailValue}>{employee.alternatePhone || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Tell Phone</span>
                <span className={styles.detailValue}>{employee.tellPhone || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Contact Person</span>
                <span className={styles.detailValue}>{employee.contactPerson || "N/A"}</span>
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
                <span className={styles.detailValue}>{employee.country || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Province</span>
                <span className={styles.detailValue}>{employee.province || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Municipality</span>
                <span className={styles.detailValue}>{employee.municipality || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>Ward / Tole</span>
                <span className={styles.detailValue}>{employee.ward}, {employee.tole}</span>
              </div>
              {employee.pinPoint && (
                <div className={styles.detailItem}>
                  <span className={styles.detailLabel}>Location</span>
                  <a href={employee.pinPoint} target="_blank" rel="noopener noreferrer" className={styles.detailLink}>
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
                <span className={styles.detailValue}>{employee.nagariktaNo || "N/A"}</span>
              </div>
              <div className={styles.detailItem}>
                <span className={styles.detailLabel}>PAN No.</span>
                <span className={styles.detailValue}>{employee.panNo || "N/A"}</span>
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
            {employee.nagariktaPhoto && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>🪪</div>
                <div className={styles.documentName}>Nagarikta Photo</div>
                <a href={employee.nagariktaPhoto} target="_blank" rel="noopener noreferrer" className={styles.documentButton}>
                  View
                </a>
              </div>
            )}
            {employee.panPhoto && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>💳</div>
                <div className={styles.documentName}>PAN Photo</div>
                <a href={employee.panPhoto} target="_blank" rel="noopener noreferrer" className={styles.documentButton}>
                  View
                </a>
              </div>
            )}
            {employee.academicQualification && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>🎓</div>
                <div className={styles.documentName}>Academic Qualification</div>
                <a href={employee.academicQualification} target="_blank" rel="noopener noreferrer" className={styles.documentButton}>
                  View
                </a>
              </div>
            )}
            {employee.resumeCv && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📋</div>
                <div className={styles.documentName}>Resume/CV</div>
                <a href={employee.resumeCv} target="_blank" rel="noopener noreferrer" className={styles.documentButton}>
                  View
                </a>
              </div>
            )}
            {employee.jobApplication && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>📝</div>
                <div className={styles.documentName}>Job Application</div>
                <a href={employee.jobApplication} target="_blank" rel="noopener noreferrer" className={styles.documentButton}>
                  View
                </a>
              </div>
            )}
            {employee.hiringLetter && (
              <div className={styles.documentCard}>
                <div className={styles.documentIcon}>✉️</div>
                <div className={styles.documentName}>Hiring Letter</div>
                <a href={employee.hiringLetter} target="_blank" rel="noopener noreferrer" className={styles.documentButton}>
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

export default EmployeeDetail;