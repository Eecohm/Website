import { useState } from "react";
import styles from "@/Components/App/Acadamic/Card/Details/AddAcademicYearModal.module.css";
import {
  FiPlus,
  FiX,
  FiCalendar,
  FiAlertCircle,
  FiCheck,
  FiEye,
} from "react-icons/fi";

const AddAcademicYearModal = ({ onClose, onAdd }) => {
  const [data, setData] = useState({
    start_of_year: "",
    end_of_year: "",
    is_current: false,
    is_activate: false,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.start_of_year) newErrors.start_of_year = "Start date required";
    if (!data.end_of_year) newErrors.end_of_year = "End date required";
    if (
      data.start_of_year &&
      data.end_of_year &&
      new Date(data.start_of_year) >= new Date(data.end_of_year)
    ) {
      newErrors.end_of_year = "End date must be after start date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onAdd(data);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <FiPlus className={styles.modalIcon} />
          <h3>Add New Academic Year</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <label>
              <FiCalendar className={styles.fieldIcon} />
              Start Date
            </label>
            <input
              type="date"
              name="start_of_year"
              value={data.start_of_year}
              onChange={handleChange}
              className={`${styles.dateInput} ${
                errors.start_of_year ? styles.inputError : ""
              }`}
            />
            {errors.start_of_year && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.start_of_year}
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
              value={data.end_of_year}
              onChange={handleChange}
              className={`${styles.dateInput} ${
                errors.end_of_year ? styles.inputError : ""
              }`}
            />
            {errors.end_of_year && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.end_of_year}
              </div>
            )}
          </div>

          <div className={styles.checkboxSection}>
            <div className={styles.checkboxGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  name="is_current"
                  checked={data.is_current}
                  onChange={handleChange}
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
                  checked={data.is_activate}
                  onChange={handleChange}
                  className={styles.checkbox}
                />
                <span className={styles.checkmark}></span>
                <FiEye className={styles.checkboxIcon} />
                Mark as Active
              </label>
            </div>
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={handleSubmit} className={styles.saveBtn}>
            <FiPlus className={styles.btnIcon} />
            Add Academic Year
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>
            <FiX className={styles.btnIcon} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAcademicYearModal;
