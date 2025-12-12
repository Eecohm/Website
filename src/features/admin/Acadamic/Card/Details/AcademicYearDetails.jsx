import styles from "@/features/admin/Acadamic/Card/Details/AcademicYearDetails.module.css";
import {
  FiSettings,
  FiBookOpen,
  FiCalendar,
  FiSave,
  FiAlertCircle,
  FiCheck,
  FiEye,
} from "react-icons/fi";

const AcademicYearDetails = ({
  selectedYear,
  formData,
  errors,
  loading,
  onChange,
  onSave,
}) => {
  if (!selectedYear) {
    return (
      <div className={styles.noSelection}>
        <FiCalendar className={styles.noSelectionIcon} />
        <h3>Select an Academic Year</h3>
        <p>
          Choose an academic year from the list to view and edit its details
        </p>
      </div>
    );
  }

  return (
    <div className={styles.detailsCard}>
      <div className={styles.cardHeader}>
        <FiSettings className={styles.cardIcon} />
        <h2>Academic Year Details</h2>
      </div>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label>
            <FiBookOpen className={styles.fieldIcon} />
            Academic Year Name
          </label>
          <div className={styles.displayField}>
            {formData.academicName || "Unnamed Year"}
          </div>
        </div>

        <div className={styles.fieldGroup}>
          <label>
            <FiCalendar className={styles.fieldIcon} />
            Start Date
          </label>
          <input
            type="date"
            name="start_of_year"
            value={formData.start_of_year || formData.startDate || ""}
            onChange={onChange}
            className={`${styles.dateInput} ${
              errors.startDate ? styles.inputError : ""
            }`}
          />
          {errors.startDate && (
            <div className={styles.error}>
              <FiAlertCircle className={styles.errorIcon} />
              {errors.startDate}
            </div>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>
            <FiCalendar className={styles.fieldIcon} />
            End Date
          </label>
          <input
            type="date"
            name="end_of_year"
            value={formData.end_of_year || formData.endDate || ""}
            onChange={onChange}
            className={`${styles.dateInput} ${
              errors.endDate ? styles.inputError : ""
            }`}
          />
          {errors.endDate && (
            <div className={styles.error}>
              <FiAlertCircle className={styles.errorIcon} />
              {errors.endDate}
            </div>
          )}
        </div>

        <div className={styles.checkboxSection}>
          <div className={styles.checkboxGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="is_current"
                checked={formData.is_current ?? formData.isCurrent ?? false}
                onChange={onChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              <FiCheck className={styles.checkboxIcon} />
              Set as Current Year
            </label>

            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="is_activate"
                checked={formData.is_activate ?? formData.isActive ?? false}
                onChange={onChange}
                className={styles.checkbox}
              />
              <span className={styles.checkmark}></span>
              <FiEye className={styles.checkboxIcon} />
              Mark as Active
            </label>
          </div>
        </div>
      </div>

      <div className={styles.actionButtons}>
        <button className={styles.saveBtn} onClick={onSave} disabled={loading}>
          <FiSave className={styles.btnIcon} />
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default AcademicYearDetails;
