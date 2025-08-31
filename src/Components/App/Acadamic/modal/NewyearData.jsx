import React, { useState, useEffect } from "react";
import styles from "./NewYearData.module.css";
import {
  FiX,
  FiCalendar,
  FiArrowLeft,
  FiCheck,
  FiEye,
  FiSearch,
} from "react-icons/fi";

const NewYearData = ({ year, onClose, allYears = [] }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredYears, setFilteredYears] = useState(allYears);

  // Filter years based on search query
  useEffect(() => {
    if (searchQuery) {
      const filtered = allYears.filter(
        (y) =>
          y.academicName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          y.start_of_year?.includes(searchQuery) ||
          y.end_of_year?.includes(searchQuery)
      );
      setFilteredYears(filtered);
    } else {
      setFilteredYears(allYears);
    }
  }, [searchQuery, allYears]);

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const handleBackToList = () => {
    setSelectedYear(null);
  };

  if (allYears.length === 0) return null;

  return (
    <div className={styles.fullScreenModal}>
      <div className={styles.modalHeader}>
        <div className={styles.headerCenter}>
          <FiCalendar className={styles.headerIcon} />
          <h1>Academic Year Details</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className={styles.modalContent}>
        {!selectedYear ? (
          <>
            {/* Search Bar */}
            <div className={styles.searchSection}>
              <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search academic years..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>

            {/* Year Cards Grid */}
            <div className={styles.cardsContainer}>
              {filteredYears.length > 0 ? (
                <div className={styles.cardsGrid}>
                  {filteredYears.map((y) => (
                    <div
                      key={y.id}
                      className={styles.yearCard}
                      onClick={() => handleYearSelect(y)}
                    >
                      <div className={styles.cardHeader}>
                        <FiCalendar className={styles.cardIcon} />
                        <h3 className={styles.yearName}>
                          {y.academicName || "Unnamed Year"}
                        </h3>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.dateRow}>
                          <span className={styles.dateLabel}>Start:</span>
                          <span className={styles.dateValue}>
                            {y.start_of_year || y.startDate || "Not set"}
                          </span>
                        </div>
                        <div className={styles.dateRow}>
                          <span className={styles.dateLabel}>End:</span>
                          <span className={styles.dateValue}>
                            {y.end_of_year || y.endDate || "Not set"}
                          </span>
                        </div>
                      </div>

                      <div className={styles.yearBadges}>
                        {(y.is_current || y.isCurrent) && (
                          <span
                            className={`${styles.badge} ${styles.currentBadge}`}
                          >
                            <FiCheck className={styles.badgeIcon} />
                            Current
                          </span>
                        )}
                        {(y.is_activate || y.isActive) && (
                          <span
                            className={`${styles.badge} ${styles.activeBadge}`}
                          >
                            <FiEye className={styles.badgeIcon} />
                            Active
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noYears}>No academic years found</div>
              )}
            </div>
          </>
        ) : (
          /* Year Details View */
          <div className={styles.detailsView}>
            <div className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <h2>Year Information</h2>
                <button
                  className={styles.backButton}
                  onClick={handleBackToList}
                >
                  <FiArrowLeft className={styles.btnIcon} />
                  Back to List
                </button>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Academic Year Name
                  </label>
                  <div className={styles.detailValue}>
                    {selectedYear.academicName || "Unnamed Year"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Start Date
                  </label>
                  <div className={styles.detailValue}>
                    {selectedYear.start_of_year ||
                      selectedYear.startDate ||
                      "Not set"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    End Date
                  </label>
                  <div className={styles.detailValue}>
                    {selectedYear.end_of_year ||
                      selectedYear.endDate ||
                      "Not set"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Status
                  </label>
                  <div className={styles.detailValue}>
                    {selectedYear.is_current || selectedYear.isCurrent
                      ? "Current Year"
                      : selectedYear.is_activate || selectedYear.isActive
                      ? "Active"
                      : "Inactive"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Created At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedYear.created_at || "Not available"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Updated At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedYear.updated_at || "Not available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewYearData;
