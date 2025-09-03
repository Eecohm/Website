import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Students.module.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import FormSection from "./FormSection";
import FormField from "./FormField";
import PhotoUpload from "./PhotoUpload";
import ProgressBar from "./ProgressBar";
import formConfig from "./formConfig";

const Student = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

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
