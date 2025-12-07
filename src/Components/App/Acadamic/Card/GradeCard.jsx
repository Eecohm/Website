import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "@/Components/App/Acadamic/Card/GradeCard.module.css";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import NavBar from "@/Components/App/NavBar/NavBar";
import GradeDataModule from "@/Components/App/Acadamic/modal/GradeDataModule";
import {
  FiAlertCircle,
  FiSearch,
  FiPlus,
  FiSave,
  FiX,
  FiBookOpen,
  FiCheck,
  FiUsers,
} from "react-icons/fi";

const GradeCard = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();

  const [grades, setGrades] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showFacultyDataModule, setShowFacultyDataModule] = useState(false);

  // Fetch grades
  const fetchGrades = async (query = "") => {
    try {
      const res = await axios.get(`${baseUrl}/academics/grades/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: query },
      });
      setGrades(res.data);

      if (res.data.length) {
        setSelectedGrade(res.data[0]);
        setFormData(res.data[0]);
      } else {
        setSelectedGrade(null);
        setFormData({});
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Fetch programs for dropdown
  const fetchPrograms = async () => {
    try {
      const res = await axios.get(`${baseUrl}/academics/programs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrograms(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchGrades();
    fetchPrograms();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchGrades(e.target.value);
  };

  const handleSelectGrade = (grade) => {
    setSelectedGrade(grade);
    setFormData(grade);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.gradeName) newErrors.gradeName = "Grade name required";
    if (!formData.programId) newErrors.programId = "Program selection required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        gradeName: formData.gradeName,
        programId: formData.programId,
      };

      const res = await axios.patch(
        `${baseUrl}/academics/grades/${formData.id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({
        type: "success",
        message: "Grade updated successfully!",
      });
      fetchGrades();
      setSelectedGrade(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "Failed to update grade",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newData) => {
    try {
      const payload = {
        gradeName: newData.gradeName,
        programId: newData.programId,
      };

      const res = await axios.post(`${baseUrl}/academics/grades/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotification({
        type: "success",
        message: "Grade added successfully!",
      });
      setAddModalOpen(false);
      fetchGrades();
      setSelectedGrade(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        setNotification({
          type: "error",
          message:
            "Grade with this name already exists. Please use a different name.",
        });
      } else {
        setNotification({
          type: "error",
          message: "Failed to add grade",
        });
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.wholeDiv}>
          {/* Left Panel */}
          <div className={styles.leftPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.panelTitle}>
                <FiBookOpen className={styles.panelIcon} />
                <h3>Grades</h3>
              </div>

              <button
                className={styles.viewDetailsButton}
                onClick={() => setShowFacultyDataModule(true)}
              >
                View Details
              </button>
            </div>

            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search grades..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.gradeList}>
              {grades.length ? (
                <>
                  {grades.slice(0, 3).map((grade) => (
                    <div
                      key={grade.id}
                      className={`${styles.gradeItem} ${
                        selectedGrade?.id === grade.id ? styles.active : ""
                      }`}
                      onClick={() => handleSelectGrade(grade)}
                    >
                      <div className={styles.gradeItemContent}>
                        <FiBookOpen className={styles.gradeIcon} />
                        <div className={styles.gradeDetails}>
                          <span className={styles.gradeName}>
                            {grade.gradeName}
                          </span>
                          <div className={styles.gradeBadges}>
                            <span className={styles.badge}>
                              {grade.programName || "No Program"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className={styles.noData}>
                  <FiAlertCircle className={styles.noDataIcon} />
                  <span>No grades found</span>
                </div>
              )}
            </div>

            <button
              className={`${styles.addBtn} ${
                !grades.length ? styles.highlightBtn : ""
              }`}
              onClick={() => setAddModalOpen(true)}
            >
              <FiPlus className={styles.btnIcon} />
              Add New Grade
            </button>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            {selectedGrade ? (
              <div className={styles.detailsCard}>
                <div className={styles.cardHeader}>
                  <FiBookOpen className={styles.cardIcon} />
                  <h2>Grade Details</h2>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label>
                      <FiBookOpen className={styles.fieldIcon} />
                      Grade Name
                    </label>
                    <input
                      type="text"
                      name="gradeName"
                      value={formData.gradeName || ""}
                      onChange={handleChange}
                      className={`${styles.textInput} ${
                        errors.gradeName ? styles.inputError : ""
                      }`}
                      placeholder="Enter grade name"
                    />
                    {errors.gradeName && (
                      <div className={styles.error}>
                        <FiAlertCircle className={styles.errorIcon} />
                        {errors.gradeName}
                      </div>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label>
                      <FiBookOpen className={styles.fieldIcon} />
                      Program
                    </label>
                    <select
                      name="programId"
                      value={formData.programId || ""}
                      onChange={handleChange}
                      className={`${styles.selectInput} ${
                        errors.programId ? styles.inputError : ""
                      }`}
                    >
                      <option value="">Select a program</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.programName}
                        </option>
                      ))}
                    </select>
                    {errors.programId && (
                      <div className={styles.error}>
                        <FiAlertCircle className={styles.errorIcon} />
                        {errors.programId}
                      </div>
                    )}
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
                <FiBookOpen className={styles.noSelectionIcon} />
                <h3>Select a Grade</h3>
                <p>Choose a grade from the list to view and edit its details</p>
              </div>
            )}
          </div>
        </div>

        {addModalOpen && (
          <AddGradeModal
            onClose={() => setAddModalOpen(false)}
            onAdd={handleAdd}
            programs={programs}
          />
        )}

        {notification && (
          <ModalNotification
            type={notification.type}
            message={notification.message}
            onClose={() => setNotification(null)}
          />
        )}

        {/* Add this modal rendering section */}
        {showFacultyDataModule && (
          <GradeDataModule
            grades={grades}
            onClose={() => setShowFacultyDataModule(false)}
            onGradeUpdate={fetchGrades} // Add callback to refresh grades
            token={token}
            baseUrl={baseUrl}
          />
        )}
      </div>
    </>
  );
};

const AddGradeModal = ({ onClose, onAdd, programs }) => {
  const [data, setData] = useState({
    gradeName: "",
    programId: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.gradeName) newErrors.gradeName = "Grade name required";
    if (!data.programId) newErrors.programId = "Program selection required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    onAdd(data);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <FiPlus className={styles.modalIcon} />
          <h3>Add New Grade</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <label>
              <FiBookOpen className={styles.fieldIcon} />
              Grade Name
            </label>
            <input
              type="text"
              name="gradeName"
              value={data.gradeName}
              onChange={handleChange}
              className={`${styles.textInput} ${
                errors.gradeName ? styles.inputError : ""
              }`}
              placeholder="Enter grade name"
            />
            {errors.gradeName && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.gradeName}
              </div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>
              <FiBookOpen className={styles.fieldIcon} />
              Program
            </label>
            <select
              name="programId"
              value={data.programId}
              onChange={handleChange}
              className={`${styles.selectInput} ${
                errors.programId ? styles.inputError : ""
              }`}
            >
              <option value="">Select a program</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.programName}
                </option>
              ))}
            </select>
            {errors.programId && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.programId}
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button onClick={handleSubmit} className={styles.saveBtn}>
            <FiPlus className={styles.btnIcon} />
            Add Grade
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

export default GradeCard;
