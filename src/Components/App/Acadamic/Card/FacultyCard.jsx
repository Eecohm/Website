import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "@/Components/App/Acadamic/Card/FacultyCard.module.css";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import NavBar from "@/Components/App/NavBar/NavBar";
import FacultyDataModule from "@/Components/App/Acadamic/modal/FacultyDataModule";
import {
  FiAlertCircle,
  FiSearch,
  FiPlus,
  FiSave,
  FiX,
  FiBookOpen,
  FiSettings,
  FiUsers,
} from "react-icons/fi";

const FacultyCard = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();

  const [faculties, setFaculties] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showFacultyDataModule, setShowFacultyDataModule] = useState(false); // New state for modal

  // Fetch faculties
  const fetchFaculties = async (query = "") => {
    try {
      const res = await axios.get(`${baseUrl}/academics/faculties/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: query },
      });
      setFaculties(res.data);

      if (res.data.length) {
        setSelectedFaculty(res.data[0]);
        setFormData(res.data[0]);
      } else {
        setSelectedFaculty(null);
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
    fetchFaculties();
    fetchPrograms();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchFaculties(e.target.value);
  };

  const handleSelectFaculty = (faculty) => {
    setSelectedFaculty(faculty);
    setFormData(faculty);
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
    if (!formData.facultyName) newErrors.facultyName = "Faculty name required";
    if (!formData.programId) newErrors.programId = "Program selection required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        facultyName: formData.facultyName,
        programId: formData.programId,
      };

      const res = await axios.patch(
        `${baseUrl}/academics/faculties/${formData.id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({
        type: "success",
        message: "Faculty updated successfully!",
      });
      fetchFaculties();
      setSelectedFaculty(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      setNotification({
        type: "error",
        message: "Failed to update faculty",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newData) => {
    try {
      const payload = {
        facultyName: newData.facultyName,
        programId: newData.programId,
      };

      const res = await axios.post(`${baseUrl}/academics/faculties/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotification({
        type: "success",
        message: "Faculty added successfully!",
      });
      setAddModalOpen(false);
      fetchFaculties();
      setSelectedFaculty(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        setNotification({
          type: "error",
          message:
            "Faculty with this name already exists. Please enter a different name.",
        });
      } else {
        setNotification({
          type: "error",
          message: "Failed to add faculty",
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
                <FiUsers className={styles.panelIcon} />
                <h3>Faculties</h3>
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
                placeholder="Search faculties..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.facultyList}>
              {faculties.length ? (
                <>
                  {faculties.slice(0, 3).map((faculty) => (
                    <div
                      key={faculty.id}
                      className={`${styles.facultyItem} ${
                        selectedFaculty?.id === faculty.id ? styles.active : ""
                      }`}
                      onClick={() => handleSelectFaculty(faculty)}
                    >
                      <div className={styles.facultyItemContent}>
                        <FiBookOpen className={styles.facultyIcon} />
                        <div className={styles.facultyDetails}>
                          <span className={styles.facultyName}>
                            {faculty.facultyName}
                          </span>
                          <div className={styles.facultyBadges}>
                            <span className={styles.badge}>
                              {faculty.programName || "No Program"}
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
                  <span>No faculties found</span>
                </div>
              )}
            </div>

            <button
              className={`${styles.addBtn} ${
                !faculties.length ? styles.highlightBtn : ""
              }`}
              onClick={() => setAddModalOpen(true)}
            >
              <FiPlus className={styles.btnIcon} />
              Add New Faculty
            </button>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            {selectedFaculty ? (
              <div className={styles.detailsCard}>
                <div className={styles.cardHeader}>
                  <FiSettings className={styles.cardIcon} />
                  <h2>Faculty Details</h2>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label>
                      <FiBookOpen className={styles.fieldIcon} />
                      Faculty Name
                    </label>
                    <input
                      type="text"
                      name="facultyName"
                      value={formData.facultyName || ""}
                      onChange={handleChange}
                      className={`${styles.textInput} ${
                        errors.facultyName ? styles.inputError : ""
                      }`}
                      placeholder="Enter faculty name"
                    />
                    {errors.facultyName && (
                      <div className={styles.error}>
                        <FiAlertCircle className={styles.errorIcon} />
                        {errors.facultyName}
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
                <FiUsers className={styles.noSelectionIcon} />
                <h3>Select a Faculty</h3>
                <p>
                  Choose a faculty from the list to view and edit its details
                </p>
              </div>
            )}
          </div>
        </div>

        {addModalOpen && (
          <AddFacultyModal
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

        {showFacultyDataModule && (
          <FacultyDataModule
            faculties={faculties}
            onClose={() => setShowFacultyDataModule(false)}
            token={token}
            baseUrl={baseUrl}
          />
        )}
      </div>
    </>
  );
};

const AddFacultyModal = ({ onClose, onAdd, programs }) => {
  const [data, setData] = useState({
    facultyName: "",
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
    if (!data.facultyName) newErrors.facultyName = "Faculty name required";
    if (!data.programId) newErrors.programId = "Program selection required";
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
          <h3>Add New Faculty</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <label>
              <FiBookOpen className={styles.fieldIcon} />
              Faculty Name
            </label>
            <input
              type="text"
              name="facultyName"
              value={data.facultyName}
              onChange={handleChange}
              className={`${styles.textInput} ${
                errors.facultyName ? styles.inputError : ""
              }`}
              placeholder="Enter faculty name"
            />
            {errors.facultyName && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.facultyName}
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
            Add Faculty
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

export default FacultyCard;
