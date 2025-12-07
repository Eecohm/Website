import React, { useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import styles from "@/Components/App/Acadamic/Academic.module.css";
import formStyles from "@/Components/App/Acadamic/AcademicStudents.module.css"; // Assuming we create this

const AcademicStudents = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    subjectDescription: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send to API
    console.log("Form Data:", formData);
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}> Manage student subjects</h1>
        </div>
        <div className={formStyles.formContainer}>
          <form onSubmit={handleSubmit} className={formStyles.form}>
            <div className={formStyles.inputGroup}>
              <label htmlFor="subjectName" className={formStyles.label}>
                Subject Name
              </label>
              <input
                type="text"
                id="subjectName"
                name="subjectName"
                value={formData.subjectName}
                onChange={handleChange}
                className={formStyles.input}
                placeholder="Enter subject name"
                required
              />
            </div>
            <div className={formStyles.inputGroup}>
              <label htmlFor="subjectCode" className={formStyles.label}>
                Subject Code
              </label>
              <input
                type="text"
                id="subjectCode"
                name="subjectCode"
                value={formData.subjectCode}
                onChange={handleChange}
                className={formStyles.input}
                placeholder="Enter subject code"
                required
              />
            </div>
            <div className={formStyles.inputGroup}>
              <label htmlFor="subjectDescription" className={formStyles.label}>
                Subject Description
              </label>
              <textarea
                id="subjectDescription"
                name="subjectDescription"
                value={formData.subjectDescription}
                onChange={handleChange}
                className={formStyles.textarea}
                placeholder="Enter subject description"
                rows="4"
                required
              />
            </div>
            <button type="submit" className={formStyles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AcademicStudents;
