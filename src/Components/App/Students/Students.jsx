import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Students.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import FormSection from "./FormSection";
import FormField from "./FormField";
import PhotoUpload from "./PhotoUpload";
import ProgressBar from "./ProgressBar";
import formConfig from "./formConfig";
import axios from "axios";
import { useBaseUrl } from "../../../BaseUrlContext";
import { useAuth } from "../../App/Login/Auth/AuthContext";

const Student = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const [programs, setPrograms] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [filteredFaculties, setFilteredFaculties] = useState([]);

  const { baseUrl } = useBaseUrl();
  const { token } = useAuth();

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  useEffect(() => {
    // Fetch programs & faculties safely
    axios
      .get(`${baseUrl}/academics/programs/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setPrograms(data);
      })
      .catch((err) => console.error("Error fetching programs", err));

    axios
      .get(`${baseUrl}/academics/faculties/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = Array.isArray(res.data)
          ? res.data
          : res.data.results || [];
        setFaculties(data);
      })
      .catch((err) => console.error("Error fetching faculties", err));
  }, [baseUrl, token]);

  const handleProgramChange = (e) => {
    const programId = e.target.value;
    setFormData((prev) => ({ ...prev, programId }));

    // Filter faculties for this program
    const relatedFaculties = faculties.filter(
      (f) => f.programId === parseInt(programId)
    );
    setFilteredFaculties(relatedFaculties);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handlePhotoChange = (file, preview, error) => {
    setFormData((prev) => ({ ...prev, photo: file, photoPreview: preview }));
    if (error) setErrors((prev) => ({ ...prev, photo: error }));
  };

  const removePhoto = () =>
    setFormData((prev) => ({ ...prev, photo: null, photoPreview: "" }));

  const getCurrentSectionConfig = () => {
    const part = formConfig.find((p) => p.part === currentPart);
    if (!part) return null;
    return part.sections.find((s) => s.id === currentSection);
  };

  const validateCurrentSection = () => {
    const section = getCurrentSectionConfig();
    if (!section) return true;
    const newErrors = {};
    section.fields.forEach((f) => {
      if (
        f.required &&
        (!formData[f.name] ||
          (f.type === "email" && !/\S+@\S+\.\S+/.test(formData[f.name])))
      ) {
        newErrors[f.name] =
          f.type === "email" && formData[f.name]
            ? "Email is invalid"
            : `${f.label} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextSection = () => {
    if (!validateCurrentSection()) return;
    const partConfig = formConfig.find((p) => p.part === currentPart);
    if (currentSection < partConfig.sections.length)
      setCurrentSection((prev) => prev + 1);
    else if (currentPart < formConfig.length) {
      setCurrentPart((prev) => prev + 1);
      setCurrentSection(1);
    } else handleSubmit();
  };

  const prevSection = () => {
    if (currentSection > 1) setCurrentSection((prev) => prev - 1);
    else if (currentPart > 1) {
      const prevPart = formConfig.find((p) => p.part === currentPart - 1);
      setCurrentPart(currentPart - 1);
      setCurrentSection(prevPart.sections.length);
    }
  };

  const handleSubmit = () => {
    if (validateCurrentSection()) {
      console.log("Form submitted:", formData);
      alert("Student registration completed successfully!");
    }
  };

  const renderCurrentSection = () => {
    const section = getCurrentSectionConfig();
    if (!section) return null;

    return (
      <FormSection icon={section.icon} title={section.title}>
        <div className={styles.formGrid}>
          {section.fields.map((field) =>
            field.type === "photo" ? (
              <PhotoUpload
                key={field.name}
                photo={formData.photo}
                photoPreview={formData.photoPreview}
                onChange={handlePhotoChange}
                onRemove={removePhoto}
                error={errors.photo}
              />
            ) : (
              <FormField
                key={field.name}
                label={field.label}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleInputChange}
                error={errors[field.name]}
              />
            )
          )}
        </div>

        {/* Extra UI for Contact Details → Map */}
        {section.title === "Contact Details" && (
          <div style={{ marginBottom: "16px" }}>
            <label>Exact Location</label>
            <input
              type="text"
              name="location"
              value={formData.location || ""}
              onChange={handleInputChange}
              placeholder="Enter address or coordinates"
              style={{ padding: "0.6rem", marginLeft: "10px" }}
            />
            <iframe
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                formData.location || "Kathmandu"
              )}&output=embed`}
              width="100%"
              height="250"
              style={{
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* Extra UI for Educational Details → Program & Faculty dropdowns */}
        {section.title === "Educational Details" && (
          <div
            className="row"
            style={{ display: "flex", gap: "16px", marginBottom: "16px" }}
          >
            <div style={{ flex: 1 }}>
              <label>Program</label>
              <select
                value={formData.programId || ""}
                onChange={handleProgramChange}
              >
                <option value="">Select Program</option>
                {programs.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.programName}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1 }}>
              <label>Faculty</label>
              <select
                value={formData.facultyId || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    facultyId: e.target.value,
                  }))
                }
              >
                <option value="">Select Faculty</option>
                {filteredFaculties.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.facultyName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </FormSection>
    );
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <div className={styles.header}>
            <h1>Student Registration</h1>
            <p>Complete all sections to register a new student</p>
            <ProgressBar
              currentPart={currentPart}
              currentSection={currentSection}
            />
          </div>
          <div className={styles.formContent}>{renderCurrentSection()}</div>
          <div className={styles.navigation}>
            <button
              type="button"
              onClick={prevSection}
              disabled={currentPart === 1 && currentSection === 1}
              className={styles.navButton}
            >
              <FiChevronLeft /> Previous
            </button>
            <button
              type="button"
              onClick={nextSection}
              className={styles.navButton}
            >
              {currentPart === formConfig.length &&
              currentSection === getCurrentSectionConfig().id
                ? "Submit"
                : "Next"}{" "}
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Student;
