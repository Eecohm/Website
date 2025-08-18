import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../BaseUrlContext";
import { useAuth } from "../../Login/Auth/AuthContext";
import styles from "./AcademicClassCard.module.css";
import ModalNotification from "../../../../GlobalComponets/ModalNotification";
import NavBar from "../../NavBar/NavBar";
import {
  FiAlertCircle,
  FiSearch,
  FiPlus,
  FiSave,
  FiX,
  FiBookOpen,
  FiSettings,
  FiUsers,
  FiCalendar,
  FiLayers,
} from "react-icons/fi";

const AcademicClassCard = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();

  const [academicClasses, setAcademicClasses] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [grades, setGrades] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({
    academicYearId: "",
    gradeId: "",
    facultyId: "",
    section: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // Fetch academic classes
  const fetchAcademicClasses = async (query = "") => {
    try {
      const res = await axios.get(`${baseUrl}/academics/academic-classes/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: query },
      });
      setAcademicClasses(res.data);

      if (res.data.length) {
        setSelectedClass(res.data[0]);
        setFormData(res.data[0]);
      } else {
        setSelectedClass(null);
        setFormData({
          academicYearId: "",
          gradeId: "",
          facultyId: "",
          section: "",
        });
      }
    } catch (err) {
      console.error("Error fetching academic classes:", err);
      setNotification({
        type: "error",
        message: "Failed to load academic classes",
      });
    }
  };

  // Fetch dropdown data
  const fetchDropdownData = async () => {
    try {
      const [yearsRes, gradesRes, facultiesRes] = await Promise.all([
        axios.get(`${baseUrl}/academics/academic-years/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${baseUrl}/academics/grades/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${baseUrl}/academics/faculties/`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setAcademicYears(yearsRes.data);
      setGrades(gradesRes.data);
      setFaculties(facultiesRes.data);
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
      setNotification({
        type: "error",
        message: "Failed to load dropdown options",
      });
    }
  };

  useEffect(() => {
    fetchAcademicClasses();
    fetchDropdownData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchAcademicClasses(e.target.value);
  };

  const handleSelectClass = (academicClass) => {
    setSelectedClass(academicClass);
    setFormData(academicClass);
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
    if (!formData.academicYearId)
      newErrors.academicYearId = "Academic year required";
    if (!formData.gradeId) newErrors.gradeId = "Grade required";
    if (!formData.facultyId) newErrors.facultyId = "Faculty required";
    if (!formData.section) newErrors.section = "Section required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        academicYearId: formData.academicYearId,
        gradeId: formData.gradeId,
        facultyId: formData.facultyId,
        section: formData.section,
      };

      const res = await axios.patch(
        `${baseUrl}/academics/academic-classes/${formData.id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({
        type: "success",
        message: "Academic class updated successfully!",
      });
      fetchAcademicClasses();
      setSelectedClass(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error("Error updating academic class:", err);
      setNotification({
        type: "error",
        message:
          err.response?.data?.message || "Failed to update academic class",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newData) => {
    try {
      const payload = {
        academicYearId: newData.academicYearId,
        gradeId: newData.gradeId,
        facultyId: newData.facultyId,
        section: newData.section,
      };

      const res = await axios.post(
        `${baseUrl}/academics/academic-classes/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setNotification({
        type: "success",
        message: "Academic class added successfully!",
      });
      setAddModalOpen(false);
      fetchAcademicClasses();
      setSelectedClass(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error("Error adding academic class:", err);
      setNotification({
        type: "error",
        message: err.response?.data?.message || "Failed to add academic class",
      });
    }
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm("Are you sure you want to delete this academic class?")
    ) {
      return;
    }

    try {
      await axios.delete(`${baseUrl}/academics/academic-classes/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotification({
        type: "success",
        message: "Academic class deleted successfully!",
      });
      fetchAcademicClasses();
    } catch (err) {
      console.error("Error deleting academic class:", err);
      setNotification({
        type: "error",
        message: "Failed to delete academic class",
      });
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
              <FiLayers className={styles.panelIcon} />
              <h3>Academic Classes</h3>
            </div>

            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search classes..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.classList}>
              {academicClasses.length ? (
                academicClasses.map((academicClass) => (
                  <div
                    key={academicClass.id}
                    className={`${styles.classItem} ${
                      selectedClass?.id === academicClass.id
                        ? styles.active
                        : ""
                    }`}
                    onClick={() => handleSelectClass(academicClass)}
                  >
                    <div className={styles.classItemContent}>
                      <FiBookOpen className={styles.classIcon} />
                      <div className={styles.classDetails}>
                        <span className={styles.className}>
                          {academicClass.gradeName} - {academicClass.section}
                        </span>
                        <div className={styles.classBadges}>
                          <span className={styles.badge}>
                            {academicClass.academicYearName}
                          </span>
                          <span className={styles.badge}>
                            {academicClass.facultyName}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(academicClass.id);
                      }}
                    >
                      <FiX />
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.noData}>
                  <FiAlertCircle className={styles.noDataIcon} />
                  <span>No academic classes found</span>
                </div>
              )}
            </div>

            <button
              className={`${styles.addBtn} ${
                !academicClasses.length ? styles.highlightBtn : ""
              }`}
              onClick={() => setAddModalOpen(true)}
            >
              <FiPlus className={styles.btnIcon} />
              Add New Class
            </button>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            {selectedClass ? (
              <div className={styles.detailsCard}>
                <div className={styles.cardHeader}>
                  <FiSettings className={styles.cardIcon} />
                  <h2>Academic Class Details</h2>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.fieldGroup}>
                    <label>
                      <FiCalendar className={styles.fieldIcon} />
                      Academic Year
                    </label>
                    <select
                      name="academicYearId"
                      value={formData.academicYearId || ""}
                      onChange={handleChange}
                      className={`${styles.selectInput} ${
                        errors.academicYearId ? styles.inputError : ""
                      }`}
                    >
                      <option value="">Select academic year</option>
                      {academicYears.map((year) => (
                        <option key={year.id} value={year.id}>
                          {year.academicYearName}
                        </option>
                      ))}
                    </select>
                    {errors.academicYearId && (
                      <div className={styles.error}>
                        <FiAlertCircle className={styles.errorIcon} />
                        {errors.academicYearId}
                      </div>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label>
                      <FiBookOpen className={styles.fieldIcon} />
                      Grade
                    </label>
                    <select
                      name="gradeId"
                      value={formData.gradeId || ""}
                      onChange={handleChange}
                      className={`${styles.selectInput} ${
                        errors.gradeId ? styles.inputError : ""
                      }`}
                    >
                      <option value="">Select grade</option>
                      {grades.map((grade) => (
                        <option key={grade.id} value={grade.id}>
                          {grade.gradeName}
                        </option>
                      ))}
                    </select>
                    {errors.gradeId && (
                      <div className={styles.error}>
                        <FiAlertCircle className={styles.errorIcon} />
                        {errors.gradeId}
                      </div>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label>
                      <FiUsers className={styles.fieldIcon} />
                      Faculty
                    </label>
                    <select
                      name="facultyId"
                      value={formData.facultyId || ""}
                      onChange={handleChange}
                      className={`${styles.selectInput} ${
                        errors.facultyId ? styles.inputError : ""
                      }`}
                    >
                      <option value="">Select faculty</option>
                      {faculties.map((faculty) => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.facultyName}
                        </option>
                      ))}
                    </select>
                    {errors.facultyId && (
                      <div className={styles.error}>
                        <FiAlertCircle className={styles.errorIcon} />
                        {errors.facultyId}
                      </div>
                    )}
                  </div>

                  <div className={styles.fieldGroup}>
                    <label>
                      <FiBookOpen className={styles.fieldIcon} />
                      Section
                    </label>
                    <input
                      type="text"
                      name="section"
                      value={formData.section || ""}
                      onChange={handleChange}
                      className={`${styles.textInput} ${
                        errors.section ? styles.inputError : ""
                      }`}
                      placeholder="Enter section (e.g., A, B)"
                    />
                    {errors.section && (
                      <div className={styles.error}>
                        <FiAlertCircle className={styles.errorIcon} />
                        {errors.section}
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
                <FiLayers className={styles.noSelectionIcon} />
                <h3>Select an Academic Class</h3>
                <p>Choose a class from the list to view and edit its details</p>
              </div>
            )}
          </div>
        </div>

        {addModalOpen && (
          <AddClassModal
            onClose={() => setAddModalOpen(false)}
            onAdd={handleAdd}
            academicYears={academicYears}
            grades={grades}
            faculties={faculties}
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

const AddClassModal = ({
  onClose,
  onAdd,
  academicYears,
  grades,
  faculties,
}) => {
  const [data, setData] = useState({
    academicYearId: "",
    gradeId: "",
    facultyId: "",
    section: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
    if (!data.academicYearId)
      newErrors.academicYearId = "Academic year required";
    if (!data.gradeId) newErrors.gradeId = "Grade required";
    if (!data.facultyId) newErrors.facultyId = "Faculty required";
    if (!data.section) newErrors.section = "Section required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onAdd(data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <FiPlus className={styles.modalIcon} />
          <h3>Add New Academic Class</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <label>
              <FiCalendar className={styles.fieldIcon} />
              Academic Year
            </label>
            <select
              name="academicYearId"
              value={data.academicYearId}
              onChange={handleChange}
              className={`${styles.selectInput} ${
                errors.academicYearId ? styles.inputError : ""
              }`}
            >
              <option value="">Select academic year</option>
              {academicYears.map((year) => (
                <option key={year.id} value={year.id}>
                  {year.academicYearName}
                </option>
              ))}
            </select>
            {errors.academicYearId && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.academicYearId}
              </div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>
              <FiBookOpen className={styles.fieldIcon} />
              Grade
            </label>
            <select
              name="gradeId"
              value={data.gradeId}
              onChange={handleChange}
              className={`${styles.selectInput} ${
                errors.gradeId ? styles.inputError : ""
              }`}
            >
              <option value="">Select grade</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.gradeName}
                </option>
              ))}
            </select>
            {errors.gradeId && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.gradeId}
              </div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>
              <FiUsers className={styles.fieldIcon} />
              Faculty
            </label>
            <select
              name="facultyId"
              value={data.facultyId}
              onChange={handleChange}
              className={`${styles.selectInput} ${
                errors.facultyId ? styles.inputError : ""
              }`}
            >
              <option value="">Select faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.id} value={faculty.id}>
                  {faculty.facultyName}
                </option>
              ))}
            </select>
            {errors.facultyId && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.facultyId}
              </div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>
              <FiBookOpen className={styles.fieldIcon} />
              Section
            </label>
            <input
              type="text"
              name="section"
              value={data.section}
              onChange={handleChange}
              className={`${styles.textInput} ${
                errors.section ? styles.inputError : ""
              }`}
              placeholder="Enter section (e.g., A, B)"
            />
            {errors.section && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.section}
              </div>
            )}
          </div>
        </div>

        <div className={styles.modalFooter}>
          <button
            onClick={handleSubmit}
            className={styles.saveBtn}
            disabled={loading}
          >
            <FiPlus className={styles.btnIcon} />
            {loading ? "Adding..." : "Add Class"}
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

export default AcademicClassCard;
