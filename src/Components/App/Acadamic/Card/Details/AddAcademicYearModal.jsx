import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import styles from "@/Components/App/Acadamic/Card/Details/AcademicYearCard.module.css";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import NavBar from "@/Components/App/Card/NavBar/NavBar";
import NewYearData from "@/Components/App/Acadamic/Cards/modal/NewyearData";
import { FiPlus } from "react-icons/fi";

// Import the new components
import AcademicYearList from "./Details/AcademicYearList";
import AcademicYearDetails from "./Details/AcademicYearDetails";
import AddAcademicYearModal from "./Details/AddAcademicYearModal";

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
        <div className={styles.wholeDiv}>
          {/* Left Panel */}
          <AcademicYearList
            academicYears={academicYears}
            selectedYear={selectedYear}
            onSelectYear={handleSelectYear}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onViewDetails={() => {
              if (selectedYear) {
                setDetailsModalOpen(true);
              }
            }}
          />

          {/* Add Button Container */}
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

          {/* Right Panel */}
          <div className={styles.rightPanel}>
            <AcademicYearDetails
              selectedYear={selectedYear}
              formData={formData}
              errors={errors}
              loading={loading}
              onChange={handleChange}
              onSave={handleSave}
            />
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

export default AcademicYearCard;
