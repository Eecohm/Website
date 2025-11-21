import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiX,
  FiArrowLeft,
  FiSearch,
  FiEdit,
  FiTrash2,
  FiSave,
  FiBookOpen,
  FiUsers,
} from "react-icons/fi";
import styles from "@/Components/App/Acadamic/modal/FacultyData.module.css";

const FacultyDataModule = ({ faculties, onClose, token, baseUrl }) => {
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredFaculties, setFilteredFaculties] = useState(faculties);
  const [filters, setFilters] = useState({
    facultyName: "",
    programName: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [facultyToDelete, setFacultyToDelete] = useState(null);
  const [programs, setPrograms] = useState([]);

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
    fetchPrograms();
  }, []);

  // Filter faculties based on search query and filters
  useEffect(() => {
    let filtered = faculties;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (f) =>
          f.facultyName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.programName?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.facultyName) {
      filtered = filtered.filter(
        (f) =>
          f.facultyName?.toLowerCase() === filters.facultyName.toLowerCase()
      );
    }

    if (filters.programName) {
      filtered = filtered.filter(
        (f) =>
          f.programName?.toLowerCase() === filters.programName.toLowerCase()
      );
    }

    setFilteredFaculties(filtered);
  }, [searchQuery, filters, faculties]);

  const handleFacultySelect = (faculty) => {
    setSelectedFaculty(faculty);
    setEditData(faculty);
  };

  const handleBackToList = () => {
    setSelectedFaculty(null);
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
      const payload = {
        facultyName: editData.facultyName,
        programId: editData.programId,
      };

      await axios.patch(
        `${baseUrl}/academics/faculties/${selectedFaculty.id}/`,
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setEditMode(false);
      // Refresh the faculty list by calling the parent component's fetch function
      window.location.reload(); // Or implement a better state update mechanism
    } catch (err) {
      console.error("Error updating faculty:", err);
      alert("Failed to update faculty. Please try again.");
    }
  };

  const handleDeleteClick = (faculty) => {
    setFacultyToDelete(faculty);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${baseUrl}/academics/faculties/${facultyToDelete.id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowDeleteConfirm(false);
      setFacultyToDelete(null);
      if (selectedFaculty && selectedFaculty.id === facultyToDelete.id) {
        setSelectedFaculty(null);
      }
      // Refresh the faculty list
      window.location.reload(); // Or implement a better state update mechanism
    } catch (err) {
      console.error("Error deleting faculty:", err);
      alert("Failed to delete faculty. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setFacultyToDelete(null);
  };

  // Get unique values for filter dropdowns
  const facultyNameOptions = [
    ...new Set(faculties.map((f) => f.facultyName).filter(Boolean)),
  ];
  const programNameOptions = [
    ...new Set(faculties.map((f) => f.programName).filter(Boolean)),
  ];

  return (
    <div className={styles.fullScreenModal}>
      <div className={styles.modalHeader}>
        <div className={styles.headerCenter}>
          <FiUsers className={styles.headerIcon} />
          <h1>Faculty Details</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className={styles.modalContent}>
        {!selectedFaculty ? (
          <>
            {/* Search and Filter Section - Sticky */}
            <div className={styles.stickyHeader}>
              {/* Search Bar */}
              <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <FiSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search faculties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {/* Filter Section */}
              <div className={styles.filterSection}>
                <div className={styles.filterGroup}>
                  <label>Faculty Name</label>
                  <select
                    name="facultyName"
                    value={filters.facultyName}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {facultyNameOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Program</label>
                  <select
                    name="programName"
                    value={filters.programName}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {programNameOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Faculty Cards Grid */}
            <div className={styles.cardsContainer}>
              {filteredFaculties.length > 0 ? (
                <div className={styles.cardsGrid}>
                  {filteredFaculties.map((faculty) => (
                    <div
                      key={faculty.id}
                      className={styles.facultyCard}
                      onClick={() => handleFacultySelect(faculty)}
                    >
                      <div className={styles.cardHeader}>
                        <FiUsers className={styles.cardIcon} />
                        <h3 className={styles.facultyName}>
                          {faculty.facultyName || "Unnamed Faculty"}
                        </h3>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Program:</span>
                          <span className={styles.detailValue}>
                            {faculty.programName || "Not set"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noFaculties}>No faculties found</div>
              )}
            </div>
          </>
        ) : (
          /* Faculty Details View */
          <div className={styles.detailsView}>
            <div className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <h2>Faculty Information</h2>
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
                    onClick={() => handleDeleteClick(selectedFaculty)}
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
                    <FiUsers className={styles.fieldIcon} />
                    Faculty Name
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="facultyName"
                      value={editData.facultyName || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedFaculty.facultyName || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiBookOpen className={styles.fieldIcon} />
                    Program
                  </label>
                  {editMode ? (
                    <select
                      name="programId"
                      value={editData.programId || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    >
                      <option value="">Select a program</option>
                      {programs.map((program) => (
                        <option key={program.id} value={program.id}>
                          {program.programName}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedFaculty.programName || "Not set"}
                    </div>
                  )}
                </div>

                {/* <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiBookOpen className={styles.fieldIcon} />
                    Created At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedFaculty.created_at || "Not available"}
                  </div>
                </div> */}

                {/* <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiBookOpen className={styles.fieldIcon} />
                    Updated At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedFaculty.updated_at || "Not available"}
                  </div>
                </div> */}
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
              Are you sure you want to delete the faculty "
              {facultyToDelete.facultyName}"? This action cannot be undone.
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

export default FacultyDataModule;
