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
  FiPlus,
} from "react-icons/fi";
import styles from "@/features/admin/Acadamic/modal/GradeData.module.css";

const GradeDataModule = ({
  grades,
  grade,
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
  const [programs, setPrograms] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGrade, setNewGrade] = useState({ gradeName: "", programId: "" });

  const fetchPrograms = async () => {
    try {
      console.log("Fetching programs...");
      const res = await axios.get(`${baseUrl}/academics/programs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Programs fetched:", res.data);
      setPrograms(res.data);
    } catch (err) {
      console.error("Error fetching programs:", err);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

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
      const payload = {
        ...editData,
        previousGradeId: editData.previousGradeId || null,
      };
      const response = await axios.patch(
        `${baseUrl}/academics/grades/${selectedGrade.id}/`,
        payload,
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
      const msg = err.response?.data?.error || err.response?.data?.detail || "Failed to update grade.";
      alert(msg);
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
      const msg = err.response?.data?.error || "Failed to delete grade. It might have related entities.";
      alert(msg); // Show strict warning
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setGradeToDelete(null);
  };

  const handleAddGrade = async (e) => {
    e.preventDefault();
    console.log("Submitting new grade:", newGrade);
    try {
      if (!newGrade.programId) {
        alert("Please select a program.");
        return;
      }
      const payload = {
        gradeName: newGrade.gradeName,
        programId: newGrade.programId,
        previousGradeId: newGrade.previousGradeId || null,
      };

      await axios.post(`${baseUrl}/academics/grades/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Grade added successfully!");
      setShowAddModal(false);
      setNewGrade({ gradeName: "", programId: "", previousGradeId: "" });
      if (onGradeUpdate) onGradeUpdate();
    } catch (err) {
      console.error("Error adding grade:", err);
      const msg = err.response?.data?.error || "Failed to add grade.";
      alert(msg);
    }
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
                <button
                  className={styles.saveButton}
                  style={{ marginLeft: "1rem", height: "42px" }}
                  onClick={() => setShowAddModal(true)}
                >
                  <FiPlus className={styles.btnIcon} />
                  Add Grade
                </button>
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
                    <FiLayers className={styles.fieldIcon} />
                    Previous Grade
                  </label>
                  {editMode ? (
                    <select
                      name="previousGradeId"
                      value={editData.previousGradeId || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    >
                      <option value="">None (Start Grade)</option>
                      {grades
                        .filter((g) => g.id !== selectedGrade.id)
                        .map((g) => (
                          <option key={g.id} value={g.id}>
                            {g.gradeName}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedGrade.previousGradeName || "None (Start Grade)"}
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

      {/* Add Grade Modal */}
      {showAddModal && (
        <div className={styles.confirmOverlay}>
          <div className={styles.detailsCard} style={{ width: "400px", zIndex: 2001 }}>
            <div className={styles.cardHeader}>
              <h2>Add New Grade</h2>
              <button className={styles.closeButton} onClick={() => setShowAddModal(false)}>
                <FiX />
              </button>
            </div>
            <form onSubmit={handleAddGrade}>
              <div className={styles.detailGroup}>
                <label className={styles.detailLabel}>Grade Name</label>
                <input
                  type="text"
                  required
                  className={styles.editInput}
                  value={newGrade.gradeName}
                  onChange={(e) =>
                    setNewGrade({ ...newGrade, gradeName: e.target.value })
                  }
                  placeholder="e.g. Grade 1"
                />
              </div>
              <div className={styles.detailGroup} style={{ marginTop: "1rem" }}>
                <label className={styles.detailLabel}>Program</label>
                <select
                  required
                  className={styles.editInput}
                  value={newGrade.programId}
                  onChange={(e) =>
                    setNewGrade({ ...newGrade, programId: e.target.value })
                  }
                >
                  <option value="">Select Program</option>
                  {programs.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.programName || p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.detailGroup} style={{ marginTop: "1rem" }}>
                <label className={styles.detailLabel}>Previous Grade</label>
                <select
                  className={styles.editInput}
                  value={newGrade.previousGradeId || ""}
                  onChange={(e) =>
                    setNewGrade({ ...newGrade, previousGradeId: e.target.value })
                  }
                >
                  <option value="">None (Start Grade)</option>
                  {grades.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.gradeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.headerActions} style={{ marginTop: "2rem", justifyContent: "flex-end" }}>
                <button type="submit" className={styles.saveButton}>
                  Add Grade
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
