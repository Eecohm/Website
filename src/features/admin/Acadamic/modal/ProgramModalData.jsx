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
  FiAlertTriangle,
} from "react-icons/fi";
import styles from "@/features/admin/Acadamic/modal/ProgramModalData.module.css";

const ProgramModalData = ({
  programs,
  onClose,
  onProgramUpdate,
  token,
  baseUrl,
}) => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState(programs);
  const [filters, setFilters] = useState({
    affiliatedTo: "",
    durationMonths: "",
    previousProgram: "",
  });
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [programToDelete, setProgramToDelete] = useState(null);

  // Filter programs based on search query and filters
  useEffect(() => {
    let filtered = programs;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.programName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.affiliatedTo?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.previousProgramName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.affiliatedTo) {
      filtered = filtered.filter(
        (p) =>
          p.affiliatedTo?.toLowerCase() === filters.affiliatedTo.toLowerCase()
      );
    }

    if (filters.durationMonths) {
      filtered = filtered.filter(
        (p) => p.durationMonths?.toString() === filters.durationMonths
      );
    }

    if (filters.previousProgram) {
      filtered = filtered.filter(
        (p) =>
          p.previousProgramName?.toLowerCase() ===
          filters.previousProgram.toLowerCase()
      );
    }

    // Sort programs according to hierarchy (Logical Order: Previous -> Next)
    // We build the full hierarchy from 'programs' prop to determine the correct order
    const hierarchySort = (listToSort) => {
      // 1. Build graph
      const graph = new Map();
      programs.forEach(p => graph.set(p.id, { ...p, children: [] }));
      const roots = [];

      // 2. Link nodes
      programs.forEach(p => {
        if (p.previousProgramId && graph.has(p.previousProgramId)) {
          graph.get(p.previousProgramId).children.push(graph.get(p.id));
        } else {
          roots.push(graph.get(p.id));
        }
      });

      // 3. FLatten to ordered list
      const orderedIds = [];
      const traverse = (nodes) => {
        // Sort siblings by name
        nodes.sort((a, b) => (a.programName || "").localeCompare(b.programName || ""));
        nodes.forEach(node => {
          orderedIds.push(node.id);
          traverse(node.children);
        });
      };
      traverse(roots);

      // 4. Create rank map
      const rankMap = new Map(orderedIds.map((id, index) => [id, index]));

      // 5. Sort the target list
      return [...listToSort].sort((a, b) => {
        const rankA = rankMap.has(a.id) ? rankMap.get(a.id) : 999999;
        const rankB = rankMap.has(b.id) ? rankMap.get(b.id) : 999999;
        return rankA - rankB;
      });
    };

    setFilteredPrograms(hierarchySort(filtered));
  }, [searchQuery, filters, programs]);

  const handleProgramSelect = (program) => {
    console.log("🔍 Selected program:", program);
    setSelectedProgram(program);
    setEditData({ ...program }); // Ensure we create a copy
    setEditMode(false); // Reset edit mode
  };

  const handleBackToList = () => {
    setSelectedProgram(null);
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
    const { name, value, type } = e.target;
    // Convert to number for numeric fields
    const processedValue = type === "number" ? parseInt(value) || "" : value;
    setEditData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(
        `${baseUrl}/academics/programs/${selectedProgram.id}/`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSelectedProgram(response.data);
      setEditData(response.data);
      setEditMode(false);
      onProgramUpdate(); // Refresh the program list
    } catch (err) {
      alert("Failed to update program. Please try again.");
    }
  };

  const handleDeleteClick = (program) => {
    setProgramToDelete(program);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(
        `${baseUrl}/academics/programs/${programToDelete.id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setShowDeleteConfirm(false);
      setProgramToDelete(null);
      if (selectedProgram && selectedProgram.id === programToDelete.id) {
        setSelectedProgram(null);
      }
      onProgramUpdate(); // Refresh the program list
    } catch (err) {
      console.error("Error deleting program:", err);
      alert("Failed to delete program. Please try again.");
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setProgramToDelete(null);
  };

  // Get unique values for filter dropdowns
  const affiliatedOptions = [
    ...new Set(programs.map((p) => p.affiliatedTo).filter(Boolean)),
  ].filter((option) => option != null && option !== "");

  const durationOptions = [
    ...new Set(programs.map((p) => p.durationMonths).filter(Boolean)),
  ].filter((option) => option != null && option !== "");

  const previousProgramOptions = [
    ...new Set(programs.map((p) => p.previousProgramName).filter(Boolean)),
  ].filter((option) => option != null && option !== "");

  return (
    <div className={styles.fullScreenModal}>
      <div className={styles.modalHeader}>
        <div className={styles.headerCenter}>
          <FiBookOpen className={styles.headerIcon} />
          <h1>Program Details</h1>
        </div>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className={styles.modalContent}>
        {!selectedProgram ? (
          <>
            {/* Search and Filter Section - Sticky */}
            <div className={styles.stickyHeader}>
              {/* Search Bar */}
              <div className={styles.searchSection}>
                <div className={styles.searchContainer}>
                  <FiSearch className={styles.searchIcon} />
                  <input
                    type="text"
                    placeholder="Search programs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={styles.searchInput}
                  />
                </div>
              </div>

              {/* Filter Section */}
              <div className={styles.filterSection}>
                <div className={styles.filterGroup}>
                  <label>Affiliated To</label>
                  <select
                    name="affiliatedTo"
                    value={filters.affiliatedTo || ""}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {affiliatedOptions.map((option, index) => (
                      <option key={index} value={option || ""}>
                        {option || "Unknown"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Duration (months)</label>
                  <select
                    name="durationMonths"
                    value={filters.durationMonths || ""}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {durationOptions.map((option, index) => (
                      <option key={index} value={option || ""}>
                        {option || "Unknown"}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.filterGroup}>
                  <label>Previous Program</label>
                  <select
                    name="previousProgram"
                    value={filters.previousProgram || ""}
                    onChange={handleFilterChange}
                    className={styles.filterInput}
                  >
                    <option value="">All</option>
                    {previousProgramOptions.map((option, index) => (
                      <option key={index} value={option || ""}>
                        {option || "Unknown"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Program Cards Grid */}
            <div className={styles.cardsContainer}>
              {filteredPrograms.length > 0 ? (
                <div className={styles.cardsGrid}>
                  {filteredPrograms.map((program) => (
                    <div
                      key={program.id}
                      className={styles.programCard}
                      onClick={() => handleProgramSelect(program)}
                    >
                      <div className={styles.cardHeader}>
                        <FiBookOpen className={styles.cardIcon} />
                        <h3 className={styles.programName}>
                          {program.programName || "Unnamed Program"}
                        </h3>
                      </div>

                      <div className={styles.cardContent}>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Duration:</span>
                          <span className={styles.detailValue}>
                            {program.durationMonths || "Not set"} months
                          </span>
                        </div>
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>
                            Affiliated To:
                          </span>
                          <span className={styles.detailValue}>
                            {program.affiliatedTo || "Not set"}
                          </span>
                        </div>
                        {program.previousProgramName && (
                          <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>
                              Previous Program:
                            </span>
                            <span className={styles.detailValue}>
                              {program.previousProgramName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noPrograms}>No programs found</div>
              )}
            </div>
          </>
        ) : (
          /* Program Details View */
          <div className={styles.detailsView}>
            <div className={styles.detailsCard}>
              <div className={styles.cardHeader}>
                <h2>Program Information</h2>
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
                    onClick={() => handleDeleteClick(selectedProgram)}
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
                    Program Name
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
                      {selectedProgram.programName || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Duration (months)
                  </label>
                  {editMode ? (
                    <input
                      type="number"
                      name="durationMonths"
                      value={editData.durationMonths || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedProgram.durationMonths || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCheck className={styles.fieldIcon} />
                    Affiliated To
                  </label>
                  {editMode ? (
                    <input
                      type="text"
                      name="affiliatedTo"
                      value={editData.affiliatedTo || ""}
                      onChange={handleEditChange}
                      className={styles.editInput}
                    />
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedProgram.affiliatedTo || "Not set"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiLayers className={styles.fieldIcon} />
                    Previous Program
                  </label>
                  {editMode ? (
                    <select
                      name="previousProgramId"
                      value={editData.previousProgramId || ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditData(prev => ({
                          ...prev,
                          previousProgramId: val ? parseInt(val) : null
                        }));
                      }}
                      className={styles.editInput}
                    >
                      <option value="">None (Top Level)</option>
                      {programs
                        .filter(p => p.id !== selectedProgram?.id) // Prevent self-reference
                        .map(p => (
                          <option key={p.id} value={p.id}>
                            {p.programName}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <div className={styles.detailValue}>
                      {selectedProgram.previousProgramName || "None"}
                    </div>
                  )}
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Created At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedProgram.created_at || "Not available"}
                  </div>
                </div>

                <div className={styles.detailGroup}>
                  <label className={styles.detailLabel}>
                    <FiCalendar className={styles.fieldIcon} />
                    Updated At
                  </label>
                  <div className={styles.detailValue}>
                    {selectedProgram.updated_at || "Not available"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && programToDelete && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmModal}>
            <h3>Confirm Deletion</h3>

            {(programToDelete.nextProgramDetails?.count > 0 ||
              programToDelete.facultyDetails?.count > 0 ||
              programToDelete.gradeDetails?.count > 0 ||
              programToDelete.classDetails?.count > 0) ? (
              <div className={styles.warningContent}>
                <div style={{ color: "#ef4444", marginBottom: "1rem", fontWeight: "bold" }}>
                  <FiAlertTriangle style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
                  Warning: Dependencies Detected
                </div>
                <p style={{ marginBottom: "1rem" }}>
                  This program cannot be safely deleted because it is related to the following entities:
                </p>
                <ul style={{ textAlign: "left", marginBottom: "1.5rem", paddingLeft: "1.5rem", color: "#e5e7eb" }}>
                  {programToDelete.nextProgramDetails?.count > 0 && (
                    <li style={{ marginBottom: "0.5rem" }}>
                      Is a <strong>Previous Program</strong> for {programToDelete.nextProgramDetails.count} program(s):
                      <div style={{ fontSize: "0.85em", color: "#9ca3af", marginTop: "0.2rem" }}>
                        {programToDelete.nextProgramDetails.names.join(", ")}
                        {programToDelete.nextProgramDetails.count > 5 && "..."}
                      </div>
                    </li>
                  )}
                  {programToDelete.facultyDetails?.count > 0 && (
                    <li style={{ marginBottom: "0.5rem" }}>
                      Has {programToDelete.facultyDetails.count} <strong>Faculty</strong> members:
                      <div style={{ fontSize: "0.85em", color: "#9ca3af", marginTop: "0.2rem" }}>
                        {programToDelete.facultyDetails.names.join(", ")}
                        {programToDelete.facultyDetails.count > 5 && "..."}
                      </div>
                    </li>
                  )}
                  {programToDelete.gradeDetails?.count > 0 && (
                    <li style={{ marginBottom: "0.5rem" }}>
                      Has {programToDelete.gradeDetails.count} <strong>Grades</strong>:
                      <div style={{ fontSize: "0.85em", color: "#9ca3af", marginTop: "0.2rem" }}>
                        {programToDelete.gradeDetails.names.join(", ")}
                        {programToDelete.gradeDetails.count > 5 && "..."}
                      </div>
                    </li>
                  )}
                  {programToDelete.classDetails?.count > 0 && (
                    <li style={{ marginBottom: "0.5rem" }}>
                      Has {programToDelete.classDetails.count} <strong>Classes</strong>:
                      <div style={{ fontSize: "0.85em", color: "#9ca3af", marginTop: "0.2rem" }}>
                        {programToDelete.classDetails.names.join(", ")}
                        {programToDelete.classDetails.count > 5 && "..."}
                      </div>
                    </li>
                  )}
                </ul>
                <p style={{ fontSize: "0.9em", color: "#9ca3af" }}>
                  Please remove these associations before deleting the program.
                </p>
              </div>
            ) : (
              <p>
                Are you sure you want to delete the program "
                {programToDelete.programName}"? This action cannot be undone.
              </p>
            )}

            <div className={styles.confirmButtons}>
              {/* Disable delete if there are hard dependencies (Faculty, Grade, Class) */
                (programToDelete.facultyDetails?.count > 0 || programToDelete.gradeDetails?.count > 0 || programToDelete.classDetails?.count > 0) ? (
                  <button
                    className={styles.cancelDeleteButton}
                    onClick={handleDeleteCancel}
                    style={{ width: "100%" }}
                  >
                    Okay, I understand
                  </button>
                ) : (
                  <>
                    <button
                      className={styles.confirmDeleteButton}
                      onClick={handleDeleteConfirm}
                    >
                      {programToDelete.nextProgramDetails?.count > 0 ? "Delete Anyway" : "Yes, Delete"}
                    </button>
                    <button
                      className={styles.cancelDeleteButton}
                      onClick={handleDeleteCancel}
                    >
                      Cancel
                    </button>
                  </>
                )
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgramModalData;
