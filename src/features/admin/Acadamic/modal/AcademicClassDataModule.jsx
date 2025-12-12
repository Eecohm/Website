import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiX,
  FiCalendar,
  FiArrowLeft,
  FiCheck,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiSave,
  FiBookOpen,
  FiLayers,
  FiUsers,
} from "react-icons/fi";
import styles from "@/features/admin/Acadamic/modal/AcademicClassData.module.css";

const AcademicClassDataModule = ({
  academicClasses,
  onClose,
  token,
  baseUrl,
}) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredClasses, setFilteredClasses] = useState(academicClasses);
  const [filters, setFilters] = useState({
    academicYearName: "",
    gradeName: "",
    facultyName: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [faculties, setFaculties] = useState([]);

  // Fetch faculties data
  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const res = await axios.get(`${baseUrl}/academics/faculties/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFaculties(res.data);
      } catch (err) {
        console.error("Error fetching faculties:", err);
      }
    };

    fetchFaculties();
  }, [baseUrl, token]);

  // Filter classes based on search query and filters
  useEffect(() => {
    let filtered = academicClasses;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (c) =>
          c.gradeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.section?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.academicYearName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (c.facultyName || c.programName)
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.academicYearName) {
      filtered = filtered.filter(
        (c) =>
          c.academicYearName?.toLowerCase() ===
          filters.academicYearName.toLowerCase()
      );
    }

    if (filters.gradeName) {
      filtered = filtered.filter(
        (c) => c.gradeName?.toLowerCase() === filters.gradeName.toLowerCase()
      );
    }

    if (filters.facultyName) {
      filtered = filtered.filter(
        (c) =>
          (c.facultyName || c.programName)?.toLowerCase() ===
          filters.facultyName.toLowerCase()
      );
    }

    setFilteredClasses(filtered);
  }, [searchQuery, filters, academicClasses]);

  const handleClassSelect = (academicClass) => {
    setSelectedClass(academicClass);
    setEditData(academicClass);
  };

  const handleBackToList = () => {
    setSelectedClass(null);
    setEditMode(false);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      await axios.patch(
        `${baseUrl}/academics/academic-classes/${selectedClass.id}/`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditMode(false);
      onClose();
      alert("Academic class updated successfully!");
    } catch (err) {
      console.error("Error updating academic class:", err);
      alert("Failed to update academic class. Please try again.");
    }
  };

  const handleDeleteClick = (academicClass) => {
    setClassToDelete(academicClass);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${baseUrl}/academics/academic-classes/${classToDelete.id}/`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setShowDeleteConfirm(false);
      setClassToDelete(null);
      if (selectedClass && selectedClass.id === classToDelete.id) {
        setSelectedClass(null);
      }
      onClose();
      alert("Academic class deleted successfully!");
    } catch (err) {
      console.error("Error deleting academic class:", err);
      alert("Failed to delete academic class. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setClassToDelete(null);
  };

  // Get unique values for filter dropdowns
  const academicYearOptions = [
    ...new Set(academicClasses.map((c) => c.academicYearName).filter(Boolean)),
  ];
  const gradeOptions = [
    ...new Set(academicClasses.map((c) => c.gradeName).filter(Boolean)),
  ];

  // Use faculties from API or fallback to academicClasses data
  const facultyOptions =
    faculties.length > 0
      ? faculties.map((f) => f.facultyName || f.name).filter(Boolean)
      : [
          ...new Set(
            academicClasses
              .map((c) => c.facultyName || c.programName)
              .filter(Boolean)
          ),
        ];

  return (
    <div className={styles.fullScreenModal}>
      <div className={styles.modalHeader}>
        <div className={styles.headerCenter}>
          <FiLayers className={styles.headerIcon} />
          <h1>Academic Class Details</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className={styles.modalContent}>
        {!selectedClass ? (
          <>
            {/* Search and Filter Section - Sticky */}
            <div className={styles.stickyHeader}>
              {/* Search Bar */}
              <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <FiSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search classes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {/* Filter Section */}
              <div className={styles.filterSection}>
                <div className={styles.filterGroup}>
                  <label>Academic Year</label>
                  <select
                    name="academicYearName"
                    value={filters.academicYearName}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {academicYearOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Grade</label>
                  <select
                    name="gradeName"
                    value={filters.gradeName}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {gradeOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Faculty</label>
                  <select
                    name="facultyName"
                    value={filters.facultyName}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {facultyOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Class Cards Grid */}
            <div className={styles.cardsContainer}>
              {filteredClasses.length > 0 ? (
                <div className={styles.cardsGrid}>
                  {filteredClasses.map((academicClass) => (
                    <div
                      key={academicClass.id}
                      className={styles.classCard}
                      onClick={() => handleClassSelect(academicClass)}
                    >
                      <div className={styles.cardHeader}>
                        <FiBookOpen className={styles.cardIcon} />
                        <h3 className={styles.className}>
                          {academicClass.gradeName} - {academicClass.section}
                        </h3>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>
                            Academic Year:
                          </span>
                          <span className={styles.detailValue}>
                            {academicClass.academicYearName || "Not set"}
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Faculty:</span>
                          <span className={styles.detailValue}>
                            {academicClass.facultyName ||
                              academicClass.programName ||
                              "Not set"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noClasses}>
                  No academic classes found
                </div>
              )}
            </div>
          </>
        ) : (
          /* Class Details View */
          <div className={styles.detailsView}>
            <div className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <h2>Academic Class Information</h2>
                <div className={styles.headerActions}>
                  {editMode ? (
                    <button className={styles.saveButton} onClick={handleSave}>
                      <FiSave className={styles.btnIcon} />
                      Save
                    </button>
                  ) : (
                    <button className={styles.editButton} onClick={handleEdit}>
                      <FiEdit className={styles.btnIcon} />
                      Edit
                    </button>
                  )}
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDeleteClick(selectedClass)}
                  >
                    <FiTrash2 className={styles.btnIcon} />
                    Delete
                  </button>
                  <button
                    className={styles.backButton}
                    onClick={handleBackToList}
                  >
                    <FiArrowLeft className={styles.btnIcon} />
                    Back to List
                  </button>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiBookOpen className={styles.fieldIcon} />
                    Grade
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="gradeName"
                      value={editData.gradeName || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedClass.gradeName || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Academic Year
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="academicYearName"
                      value={editData.academicYearName || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedClass.academicYearName || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiUsers className={styles.fieldIcon} />
                    Faculty
                  </label>
                  {editMode ? (
                    <select
                      name="facultyName"
                      value={editData.facultyName || editData.programId || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    >
                      <option value="">Select Faculty</option>
                      {faculties.map((faculty) => (
                        <option key={faculty.id} value={faculty.id}>
                          {faculty.facultyName || faculty.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedClass.facultyName ||
                        selectedClass.programName ||
                        "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiBookOpen className={styles.fieldIcon} />
                    Section
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="section"
                      value={editData.section || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedClass.section || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Created At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedClass.created_at || "Not available"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Updated At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedClass.updated_at || "Not available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmModal}>
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete the class "
              {classToDelete.gradeName} - {classToDelete.section}"? This action
              cannot be undone.
            </p>
            <div className={styles.confirmButtons}>
              <button
                className={styles.confirmDeleteButton}
                onClick={handleDeleteConfirm}
              >
                Yes, Delete
              </button>
              <button
                className={styles.cancelDeleteButton}
                onClick={handleDeleteCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicClassDataModule;
