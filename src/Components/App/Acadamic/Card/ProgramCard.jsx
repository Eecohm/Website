import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../BaseUrlContext";
import { useAuth } from "../../Login/Auth/AuthContext";
import styles from "./ProgramCard.module.css";
import ModalNotification from "../../../../GlobalComponets/ModalNotification";
import NavBar from "../../NavBar/NavBar";
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
  FiLayers,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

const ProgramCard = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();

  const [programs, setPrograms] = useState([]);
  const [previousProgramOptions, setPreviousProgramOptions] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [formData, setFormData] = useState({
    programName: "",
    durationMonths: "",
    previousProgramId: "",
    previousProgramName: "",
    affiliatedTo: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [notification, setNotification] = useState(null);
  const [viewDetailsOpen, setViewDetailsOpen] = useState(false);
  const [activeView, setActiveView] = useState(null);

  // Fetch all programs for the previous program dropdown
  const fetchPreviousPrograms = async () => {
    try {
      const res = await axios.get(`${baseUrl}/academics/programs/`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Add "None" option and format the data
      const programOptions = [
        { id: "", programName: "-- None --" },
        ...res.data,
      ];

      setPreviousProgramOptions(programOptions);
    } catch (err) {
      console.error("Error fetching previous programs:", err);
    }
  };

  // Fetch programs
  const fetchPrograms = async (query = "") => {
    try {
      const res = await axios.get(`${baseUrl}/academics/programs/`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { search: query },
      });
      setPrograms(res.data);

      if (res.data.length) {
        setSelectedProgram(res.data[0]);
        setFormData(res.data[0]);
      } else {
        setSelectedProgram(null);
        setFormData({
          programName: "",
          durationMonths: "",
          previousProgramId: "",
          previousProgramName: "",
          affiliatedTo: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPrograms();
    fetchPreviousPrograms();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    fetchPrograms(e.target.value);
  };

  const handleSelectProgram = (program) => {
    setSelectedProgram(program);
    setFormData(program);
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "previousProgramId") {
      const selected = previousProgramOptions.find(
        (p) => String(p.id) === value
      );
      setFormData((prev) => ({
        ...prev,
        previousProgramName: selected ? selected.programName : "",
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.programName) newErrors.programName = "Program name required";
    if (!formData.durationMonths)
      newErrors.durationMonths = "Duration required";
    if (!formData.affiliatedTo) newErrors.affiliatedTo = "Affiliation required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        programName: formData.programName,
        durationMonths: formData.durationMonths,
        previousProgramId: formData.previousProgramId || null,
        previousProgramName: formData.previousProgramName || null,
        affiliatedTo: formData.affiliatedTo,
      };

      if (selectedProgram) {
        // Update existing program
        await axios.patch(
          `${baseUrl}/academics/programs/${selectedProgram.id}/`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setNotification({
          type: "success",
          message: "Program updated successfully!",
        });
      } else {
        // Create new program
        await axios.post(`${baseUrl}/academics/programs/`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotification({
          type: "success",
          message: "Program created successfully!",
        });
      }

      fetchPrograms();
      fetchPreviousPrograms(); // Refresh previous programs list
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        setNotification({
          type: "error",
          message: "Program already exists. Please enter a new program name.",
        });
      } else {
        setNotification({
          type: "error",
          message: "Failed to save program",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (newData) => {
    try {
      const payload = {
        programName: newData.programName,
        durationMonths: newData.durationMonths,
        previousProgramId: newData.previousProgramId || null,
        previousProgramName: newData.previousProgramName || null,
        affiliatedTo: newData.affiliatedTo,
      };

      const res = await axios.post(`${baseUrl}/academics/programs/`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setNotification({
        type: "success",
        message: "Program added successfully!",
      });
      setAddModalOpen(false);
      fetchPrograms();
      fetchPreviousPrograms(); // Refresh previous programs list
      setSelectedProgram(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 400) {
        setNotification({
          type: "error",
          message: "Program already exists. Please enter a new program name.",
        });
      } else {
        setNotification({
          type: "error",
          message: "Failed to add program",
        });
      }
    }
  };

  const handleViewDetails = (view) => {
    setActiveView(view);
    // Navigate to the appropriate component
    if (view === "affiliated") {
      navigate("/affiliated-data");
    } else if (view === "previous") {
      navigate("/previous-program-data");
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
              <FiBookOpen className={styles.panelIcon} />
              <h3>Programs</h3>
              <div className={styles.viewDetailsDropdown}>
                <button
                  className={styles.viewDetailsButton}
                  onClick={() => setViewDetailsOpen(!viewDetailsOpen)}
                >
                  View Details
                  {viewDetailsOpen ? <FiChevronUp /> : <FiChevronDown />}
                </button>
                {viewDetailsOpen && (
                  <div className={styles.viewDetailsMenu}>
                    <button
                      className={styles.viewDetailsItem}
                      onClick={() => handleViewDetails("affiliated")}
                    >
                      <FiCheck className={styles.viewDetailsIcon} />
                      Affiliated To
                    </button>
                    <button
                      className={styles.viewDetailsItem}
                      onClick={() => handleViewDetails("previous")}
                    >
                      <FiLayers className={styles.viewDetailsIcon} />
                      Previous Program
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.searchContainer}>
              <FiSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={handleSearchChange}
                className={styles.searchInput}
              />
            </div>

            <div className={styles.programListContainer}>
              <div className={styles.programList}>
                {programs.length ? (
                  programs.slice(0, 4).map(
                    (
                      program // Show only first 4 programs
                    ) => (
                      <div
                        key={program.id}
                        className={`${styles.programItem} ${
                          selectedProgram?.id === program.id
                            ? styles.active
                            : ""
                        }`}
                        onClick={() => handleSelectProgram(program)}
                      >
                        <div className={styles.programItemContent}>
                          <FiBookOpen className={styles.programIcon} />
                          <div className={styles.programDetails}>
                            <span className={styles.programName}>
                              {program.programName}
                            </span>
                            <div className={styles.programBadges}>
                              <span className={styles.badge}>
                                <FiCalendar className={styles.badgeIcon} />
                                {program.durationMonths} months
                              </span>
                              {program.affiliatedTo && (
                                <span className={styles.badge}>
                                  <FiCheck className={styles.badgeIcon} />
                                  {program.affiliatedTo}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )
                ) : (
                  <div className={styles.noData}>
                    <FiAlertCircle className={styles.noDataIcon} />
                    <span>No programs found</span>
                  </div>
                )}
              </div>
            </div>

            {/* Move the add button to the container */}
            <div className={styles.addButtonContainer}>
              <button
                className={`${styles.addBtn} ${
                  !programs.length ? styles.highlightBtn : ""
                }`}
                onClick={() => setAddModalOpen(true)}
              >
                <FiPlus className={styles.btnIcon} />
                Add New Program
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            {selectedProgram ? (
              <div className={styles.detailsCard}>
                <div className={styles.cardHeader}>
                  <FiSettings className={styles.cardIcon} />
                  <h2>Program Details</h2>
                </div>

                {/* Scrollable form content */}
                <div className={styles.scrollableContent}>
                  {/* form grid below */}
                  <div className={styles.formGrid}>
                    <div className={styles.fieldGroup}>
                      <label>
                        <FiBookOpen className={styles.fieldIcon} />
                        Program Name
                      </label>
                      <input
                        type="text"
                        name="programName"
                        placeholder="e.g., BHM"
                        value={formData.programName}
                        onChange={handleChange}
                        className={`${styles.inputField} ${
                          errors.programName ? styles.inputError : ""
                        }`}
                      />
                      {errors.programName && (
                        <div className={styles.error}>
                          <FiAlertCircle className={styles.errorIcon} />
                          {errors.programName}
                        </div>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label>
                        <FiCalendar className={styles.fieldIcon} />
                        Duration (months)
                      </label>
                      <input
                        type="number"
                        name="durationMonths"
                        placeholder="e.g., 36"
                        value={formData.durationMonths}
                        onChange={handleChange}
                        className={`${styles.inputField} ${
                          errors.durationMonths ? styles.inputError : ""
                        }`}
                      />
                      {errors.durationMonths && (
                        <div className={styles.error}>
                          <FiAlertCircle className={styles.errorIcon} />
                          {errors.durationMonths}
                        </div>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label>
                        <FiLayers className={styles.fieldIcon} />
                        Previous Program
                      </label>
                      <select
                        name="previousProgramId"
                        value={formData.previousProgramId}
                        onChange={handleChange}
                        className={styles.selectInput}
                      >
                        {previousProgramOptions.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.programName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label>
                        <FiCheck className={styles.fieldIcon} />
                        Affiliated To
                      </label>
                      <input
                        type="text"
                        name="affiliatedTo"
                        placeholder="e.g., TU"
                        value={formData.affiliatedTo}
                        onChange={handleChange}
                        className={`${styles.inputField} ${
                          errors.affiliatedTo ? styles.inputError : ""
                        }`}
                      />
                      {errors.affiliatedTo && (
                        <div className={styles.error}>
                          <FiAlertCircle className={styles.errorIcon} />
                          {errors.affiliatedTo}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sticky save button */}
                <div className={styles.stickyActionButtons}>
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
                <h3>Select a Program</h3>
                <p>
                  Choose a program from the list to view and edit its details,
                  or add a new one
                </p>
              </div>
            )}
          </div>
        </div>

        {addModalOpen && (
          <AddProgramModal
            onClose={() => setAddModalOpen(false)}
            onAdd={handleAdd}
            previousProgramOptions={previousProgramOptions}
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

const AddProgramModal = ({ onClose, onAdd, previousProgramOptions }) => {
  const [data, setData] = useState({
    programName: "",
    durationMonths: "",
    previousProgramId: "",
    previousProgramName: "",
    affiliatedTo: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));

    if (name === "previousProgramId") {
      const selected = previousProgramOptions.find(
        (p) => String(p.id) === value
      );
      setData((prev) => ({
        ...prev,
        previousProgramName: selected ? selected.programName : "",
      }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!data.programName) newErrors.programName = "Program name required";
    if (!data.durationMonths) newErrors.durationMonths = "Duration required";
    if (!data.affiliatedTo) newErrors.affiliatedTo = "Affiliation required";
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
          <h3>Add New Program</h3>
          <button className={styles.modalCloseBtn} onClick={onClose}>
            <FiX />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.fieldGroup}>
            <label>
              <FiBookOpen className={styles.fieldIcon} />
              Program Name
            </label>
            <input
              type="text"
              name="programName"
              placeholder="e.g., BHM"
              value={data.programName}
              onChange={handleChange}
              className={`${styles.inputField} ${
                errors.programName ? styles.inputError : ""
              }`}
            />
            {errors.programName && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.programName}
              </div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>
              <FiCalendar className={styles.fieldIcon} />
              Duration (months)
            </label>
            <input
              type="number"
              name="durationMonths"
              placeholder="e.g., 36"
              value={data.durationMonths}
              onChange={handleChange}
              className={`${styles.inputField} ${
                errors.durationMonths ? styles.inputError : ""
              }`}
            />
            {errors.durationMonths && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.durationMonths}
              </div>
            )}
          </div>

          <div className={styles.fieldGroup}>
            <label>
              <FiLayers className={styles.fieldIcon} />
              Previous Program
            </label>
            <select
              name="previousProgramId"
              value={data.previousProgramId}
              onChange={handleChange}
              className={styles.selectInput}
            >
              {previousProgramOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.programName}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>
              <FiCheck className={styles.fieldIcon} />
              Affiliated To
            </label>
            <input
              type="text"
              name="affiliatedTo"
              placeholder="e.g., TU"
              value={data.affiliatedTo}
              onChange={handleChange}
              className={`${styles.inputField} ${
                errors.affiliatedTo ? styles.inputError : ""
              }`}
            />
            {errors.affiliatedTo && (
              <div className={styles.error}>
                <FiAlertCircle className={styles.errorIcon} />
                {errors.affiliatedTo}
              </div>
            )}
          </div>
        </div>
        <div className={styles.modalFooter}>
          <button onClick={handleSubmit} className={styles.saveBtn}>
            <FiPlus className={styles.btnIcon} />
            Add Program
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
export default ProgramCard;
