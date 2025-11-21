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
import styles from "@/Components/App/Acadamic/modal/GradeData.module.css";

const GradeDataModule = ({
  grades,
  onClose,
  onGradeUpdate,
  token,
  baseUrl,
}) => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredGrades, setFilteredGrades] = useState(grades);
  const [filters, setFilters] = useState({
    programName: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [gradeToDelete, setGradeToDelete] = useState(null);

  // Filter grades based on search query and filters
  useEffect(() => {
    let filtered = grades;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (g) =>
          g.gradeName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          g.programName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.programName) {
      filtered = filtered.filter(
        (g) =>
          g.programName?.toLowerCase() === filters.programName.toLowerCase()
      );
    }

    setFilteredGrades(filtered);
  }, [searchQuery, filters, grades]);

  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setEditData(grade);
  };

  const handleBackToList = () => {
    setSelectedGrade(null);
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
      console.log("Saving grade data:", editData);
      const response = await axios.patch(
        `${baseUrl}/academics/grades/${selectedGrade.id}/`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Grade save response:", response.data);

      // Update local state with the response data
      setSelectedGrade(response.data);
      setEditData(response.data);
      setEditMode(false);

      // Call the update callback if provided to refresh the parent list
      if (onGradeUpdate) {
        console.log("Calling onGradeUpdate to refresh list");
        onGradeUpdate();
      }

      alert("Grade updated successfully!");
    } catch (err) {
      console.error("Error updating grade:", err);
      alert("Failed to update grade. Please try again.");
    }
  };

  const handleDeleteClick = (grade) => {
    setGradeToDelete(grade);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${baseUrl}/academics/grades/${gradeToDelete.id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowDeleteConfirm(false);
      setGradeToDelete(null);
      if (selectedGrade && selectedGrade.id === gradeToDelete.id) {
        setSelectedGrade(null);
      }
      onClose();
      alert("Grade deleted successfully!");
    } catch (err) {
      console.error("Error deleting grade:", err);
      alert("Failed to delete grade. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setGradeToDelete(null);
  };

  // Get unique values for filter dropdowns
  const programOptions = [
    ...new Set(grades.map((g) => g.programName).filter(Boolean)),
  ];

  return (
    <div className={styles.fullScreenModal}>
      <div className={styles.modalHeader}>
        <div className={styles.headerCenter}>
          <FiBookOpen className={styles.headerIcon} />
          <h1>Grade Details</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className={styles.modalContent}>
        {!selectedGrade ? (
          <>
            {/* Search and Filter Section - Sticky */}
            <div className={styles.stickyHeader}>
              {/* Search Bar */}
              <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <FiSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search grades..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {/* Filter Section */}
              <div className={styles.filterSection}>
                <div className={styles.filterGroup}>
                  <label>Program</label>
                  <select
                    name="programName"
                    value={filters.programName}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {programOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grade Cards Grid */}
            <div className={styles.cardsContainer}>
              {filteredGrades.length > 0 ? (
                <div className={styles.cardsGrid}>
                  {filteredGrades.map((grade) => (
                    <div
                      key={grade.id}
                      className={styles.gradeCard}
                      onClick={() => handleGradeSelect(grade)}
                    >
                      <div className={styles.cardHeader}>
                        <FiBookOpen className={styles.cardIcon} />
                        <h3 className={styles.gradeName}>
                          {grade.gradeName || "Unnamed Grade"}
                        </h3>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Program:</span>
                          <span className={styles.detailValue}>
                            {grade.programName || "Not set"}
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Status:</span>
                          <span className={styles.detailValue}>
                            {grade.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noGrades}>No grades found</div>
              )}
            </div>
          </>
        ) : (
          /* Grade Details View */
          <div className={styles.detailsView}>
            <div className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <h2>Grade Information</h2>
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
                    onClick={() => handleDeleteClick(selectedGrade)}
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
                    Grade Name
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
                      {selectedGrade.gradeName || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiUsers className={styles.fieldIcon} />
                    Program
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="programName"
                      value={editData.programName || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedGrade.programName || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCheck className={styles.fieldIcon} />
                    Status
                  </label>
                  {editMode ? (
                    <select
                      name="isActive"
                      value={editData.isActive ? "true" : "false"}
                      onChange={(e) =>
                        setEditData((prev) => ({
                          ...prev,
                          isActive: e.target.value === "true",
                        }))
                      }
                      className={styles.editInput}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedGrade.isActive ? "Active" : "Inactive"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Created At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedGrade.created_at || "Not available"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Updated At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedGrade.updated_at || "Not available"}
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
              Are you sure you want to delete the grade "
              {gradeToDelete.gradeName}"? This action cannot be undone.
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

export default GradeDataModule;
