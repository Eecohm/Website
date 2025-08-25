import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../BaseUrlContext";
import { useAuth } from "../../Login/Auth/AuthContext";
import styles from "./AcademicYearCard.module.css";
import ModalNotification from "../../../../GlobalComponets/ModalNotification";
import NavBar from "../../NavBar/NavBar";
import NewYearData from "../modal/NewyearData";
import {
  FiAlertCircle,
  FiSearch,
  FiPlus,
  FiCalendar,
  FiSave,
  FiArrowLeft,
  FiCheck,
  FiX,
  FiEye,
  FiBookOpen,
  FiSettings,
} from "react-icons/fi";

const AcademicYearCard = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();

  //new model for view details
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch academic years
  const fetchAcademicYears = async (query = "") => {
    try {
      const res = await axios.get(`${baseUrl}/academics/academic-years/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: query },
      });
      const data = res.data.map((y) => ({
        ...y,
        name:
          y.academicName ||
          (y.start_of_year && y.end_of_year
            ? `${y.start_of_year} - ${y.end_of_year}`
            : "Unnamed Year"),
      }));
      setAcademicYears(data);

      if (data.length) {
        const currentYear =
          data.find((y) => y.is_current || y.isCurrent) || data[0];
        setSelectedYear(currentYear);
        setFormData(currentYear);
      } else {
        setSelectedYear(null);
        setFormData({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchAcademicYears(e.target.value);
  };

  const handleSelectYear = (year) => {
    setSelectedYear(year);
    setFormData(year);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.startDate && !formData.start_of_year)
      newErrors.startDate = "Start date required";
    if (!formData.endDate && !formData.end_of_year)
      newErrors.endDate = "End date required";
    const start = formData.startDate || formData.start_of_year;
    const end = formData.endDate || formData.end_of_year;
    if (start && end && new Date(start) >= new Date(end)) {
      newErrors.endDate = "End date must be after start date";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        isCurrent: formData.is_current ?? formData.isCurrent,
        isActive: formData.is_activate ?? formData.isActive,
        startDate: formData.start_of_year ?? formData.startDate,
        endDate: formData.end_of_year ?? formData.endDate,
      };

      const res = await axios.patch(
        `${baseUrl}/academics/academic-years/${formData.id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({
        type: "success",
        message: "Academic year updated successfully!",
      });
      fetchAcademicYears();
      setSelectedYear(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "Failed to update academic year",
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle adding a new academic year
  const handleAdd = async (newData) => {
    try {
      const payload = {
        startDate: newData.start_of_year,
        endDate: newData.end_of_year,
        isCurrent: newData.is_current,
        isActive: newData.is_activate,
      };

      const res = await axios.post(
        `${baseUrl}/academics/academic-years/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({
        type: "success",
        message: "Academic year added successfully!",
      });
      setAddModalOpen(false);
      fetchAcademicYears();
      setSelectedYear(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);

      let errorMessage = "Academic year could not be added";
      if (err.response && err.response.status === 400) {
        errorMessage = "Academic year must be at least 1 year long.";
      }

      setNotification({
        type: "error",
        message: errorMessage,
      });
    }
  };

  return (
    <>
      {/* Add NavBar component */}
      <NavBar />
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.wholeDiv}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.acadHeader}>
                <FiCalendar className={styles.panelIcon} />
                <h3>Academic Years</h3>
              </div>
              <button
                className={styles.viewData}
                onClick={() => {
                  if (selectedYear) {
                    setDetailsModalOpen(true);
                  }
                }}
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
                onChange={handleSearchChange}
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
                      onClick={() => handleSelectYear(year)}
                    >
                      <div className={styles.yearItemContent}>
                        <FiCalendar className={styles.yearIcon} />
                        <div className={styles.yearDetails}>
                          <span className={styles.yearName}>{year.name}</span>
                          <div className={styles.yearBadges}>
                            {(year.is_current || year.isCurrent) && (
                              <span
                                className={
                                  styles.badge + " " + styles.currentBadge
                                }
                              >
                                <FiCheck className={styles.badgeIcon} />
                                Current
                              </span>
                            )}
                            {(year.is_activate || year.isActive) && (
                              <span
                                className={
                                  styles.badge + " " + styles.activeBadge
                                }
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

            {/* add new year button to open new modal */}
            <div className={styles.addButtonContainer}>
              <button
                className={`${styles.addBtn} ${
                  !academicYears.length ? styles.highlightBtn : ""
                }`}
                onClick={() => setAddModalOpen(true)}
              >
                <FiPlus className={styles.btnIcon} />
                Add New Year
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            {selectedYear ? (
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
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                          checked={
                            formData.is_current ?? formData.isCurrent ?? false
                          }
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
                          checked={
                            formData.is_activate ?? formData.isActive ?? false
                          }
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

                <div className={styles.actionButtons}>
                  <button
                    className={styles.saveBtn}
                    onClick={handleSave}
                    disabled={loading}
                  >
                    <FiSave className={styles.btnIcon} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            ) : (
              <div className={styles.noSelection}>
                <FiCalendar className={styles.noSelectionIcon} />
                <h3>Select an Academic Year</h3>
                <p>
                  Choose an academic year from the list to view and edit its
                  details
                </p>
              </div>
            )}
          </div>
        </div>

        {addModalOpen && (
          <AddAcademicYearModal
            onClose={() => setAddModalOpen(false)}
            onAdd={handleAdd}
          />
        )}

        {detailsModalOpen && (
          <NewYearData
            year={selectedYear}
            onClose={() => setDetailsModalOpen(false)}
            allYears={academicYears}
          />
        )}

        {notification && (
          <ModalNotification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </>
  );
};

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

export default AcademicYearCard;
