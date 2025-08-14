import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useBaseUrl } from "../../../../BaseUrlContext";
import { useAuth } from "../../Login/Auth/AuthContext";
import styles from "../styles/AcademicYear.module.css";

const AcademicYearCard = () => {
  const navigate = useNavigate();
  const baseUrl = useBaseUrl();
  const token = useAuth();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    programName: "",
    durationMonths: "",
    previousProgramId: "",
    affiliatedTo: "",
  });
  const [academicYears, setAcademicYears] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAcademicYears = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/academic-years`, {
          headers: { Authorization: `Bearer ${token.token}` },
        });
        setAcademicYears(response.data);
      } catch (err) {
        console.error("Failed to fetch academic years:", err);
      }
    };
    fetchAcademicYears();
  }, [baseUrl, token]);

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "startDate":
      case "endDate":
        if (!value) error = "Date is required.";
        break;
      case "programName":
        if (!value) error = "Program name is required.";
        else if (value.length < 2) error = "Program name must be at least 2 characters.";
        break;
      case "durationMonths":
        if (!value) error = "Duration is required.";
        else if (isNaN(value) || value <= 0) error = "Duration must be a positive number.";
        break;
      case "affiliatedTo":
        if (!value) error = "Affiliation is required.";
        else if (value.length < 2) error = "Affiliation must be at least 2 characters.";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length === 0) {
      navigate("/dashboard/academic/academic-year/academic-data", {
        state: { data: formData },
      });
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.backButton}
        onClick={() => navigate("/dashboard/academic")}
      >
        ← Back
      </button>

      <div className={styles.twoColumnLayout}>
        <div className={styles.formColumn}>
          <div className={styles.centeredCard}>
            <h2>Academic Year & Program</h2>
            <form onSubmit={handleSubmit}>
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className={errors.startDate ? styles.errorInput : ""}
                required
              />
              {errors.startDate && <p className={styles.error}>{errors.startDate}</p>}

              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className={errors.endDate ? styles.errorInput : ""}
                required
              />
              {errors.endDate && <p className={styles.error}>{errors.endDate}</p>}

              <label>Program Name</label>
              <input
                type="text"
                name="programName"
                value={formData.programName}
                onChange={handleChange}
                className={errors.programName ? styles.errorInput : ""}
                required
              />
              {errors.programName && <p className={styles.error}>{errors.programName}</p>}

              <label>Duration (Months)</label>
              <input
                type="number"
                name="durationMonths"
                value={formData.durationMonths}
                onChange={handleChange}
                className={errors.durationMonths ? styles.errorInput : ""}
                required
              />
              {errors.durationMonths && <p className={styles.error}>{errors.durationMonths}</p>}

              <label>Previous Program ID</label>
              <input
                type="text"
                name="previousProgramId"
                value={formData.previousProgramId}
                onChange={handleChange}
                className={errors.previousProgramId ? styles.errorInput : ""}
              />
              {errors.previousProgramId && <p className={styles.error}>{errors.previousProgramId}</p>}

              <label>Affiliated To</label>
              <input
                type="text"
                name="affiliatedTo"
                value={formData.affiliatedTo}
                onChange={handleChange}
                className={errors.affiliatedTo ? styles.errorInput : ""}
                required
              />
              {errors.affiliatedTo && <p className={styles.error}>{errors.affiliatedTo}</p>}

              <button type="submit">Save</button>
            </form>
          </div>
        </div>

        <div className={styles.cardColumn}>
          <div className={styles.cardGrid}>
            {academicYears.map((year) => (
              <div key={year.id} className={styles.card}>
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>
                    {year.startDate} - {year.endDate}
                  </h3>
                  <p className={styles.cardDescription}>
                    Program: {year.programName} | Duration: {year.durationMonths} months
                  </p>
                  <p className={styles.cardDescription}>
                    Affiliated: {year.affiliatedTo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademicYearCard;