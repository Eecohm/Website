import styles from "./AcademicYearList.module.css";
import { FiCalendar, FiCheck, FiEye, FiAlertCircle } from "react-icons/fi";

const AcademicYearList = ({
  academicYears,
  selectedYear,
  onSelectYear,
  searchQuery,
  onSearchChange,
  onViewDetails,
}) => {
  return (
    <div className={styles.leftPanel}>
      <div className={styles.panelHeader}>
        <div className={styles.acadHeader}>
          <FiCalendar className={styles.panelIcon} />
          <h3>Academic Years</h3>
        </div>
        <button
          className={styles.viewData}
          onClick={onViewDetails}
          disabled={!selectedYear}
        >
          View details
        </button>
      </div>

      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search academic years..."
          value={searchQuery}
          onChange={onSearchChange}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.yearListContainer}>
        <div className={styles.yearList}>
          {academicYears.length ? (
            academicYears.slice(0, 4).map((year) => (
              <div
                key={year.id}
                className={`${styles.yearItem} ${
                  selectedYear?.id === year.id ? styles.active : ""
                }`}
                onClick={() => onSelectYear(year)}
              >
                <div className={styles.yearItemContent}>
                  <FiCalendar className={styles.yearIcon} />
                  <div className={styles.yearDetails}>
                    <span className={styles.yearName}>{year.name}</span>
                    <div className={styles.yearBadges}>
                      {(year.is_current || year.isCurrent) && (
                        <span
                          className={styles.badge + " " + styles.currentBadge}
                        >
                          <FiCheck className={styles.badgeIcon} />
                          Current
                        </span>
                      )}
                      {(year.is_activate || year.isActive) && (
                        <span
                          className={styles.badge + " " + styles.activeBadge}
                        >
                          <FiEye className={styles.badgeIcon} />
                          Active
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className={styles.noData}>
              <FiAlertCircle className={styles.noDataIcon} />
              <span>No academic years found</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AcademicYearList;
