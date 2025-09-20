import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { useBaseUrl } from "../../../../BaseUrlContext";
import { useAuth } from "../Auth/AuthContext";
import PersonalDetailForm from "./PersonalDetailForm";
import AddressDetailForm from "./AddressDetailForm";
import ContactDetailForm from "./ContactDetailForm";

const StudentForm = () => {
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [grades, setGrades] = useState([]);
  const [submissionError, setSubmissionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await fetch(`${baseUrl}/sadmin/classes`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch grades");
        const data = await response.json();
        setGrades(data);
      } catch (error) {
        console.error("Error fetching grades:", error);
        setErrors((prev) => ({ ...prev, grade: "Failed to load grades." }));
      }
    };
    if (token) fetchGrades();
    else navigate("/login");
  }, [baseUrl, token, navigate]);

  const validateName = (value, field) => {
    if (!value || !value.trim())
      return `${field.replace("_", " ")} is required.`;
    if (value.length < 2)
      return `${field.replace("_", " ")} must be at least 2 characters long.`;
    if (!/^[a-zA-Z\s]+$/.test(value))
      return `${field.replace("_", " ")} can only contain letters and spaces.`;
    return "";
  };

  const validateRequiredField = (value, field) => {
    if (!value || !value.trim())
      return `${field.replace("_", " ")} is required.`;
    return "";
  };

  const validateContact = (value, field) => {
    if (!value && field === "phone") return "Phone is required";
    if (value && !/^(97|98)\d{8}$/.test(value))
      return `${field.replace(
        "_",
        " "
      )} must be 10 digits starting with 97 or 98`;
    return "";
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File size exceeds 5MB limit.",
      }));
      setFormData((prev) => ({ ...prev, [field]: null }));
      e.target.value = "";
    } else {
      setErrors((prev) => ({
        ...prev,
        [field]: file ? "" : "This field is required.",
      }));
      setFormData((prev) => ({ ...prev, [field]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionError("");
    setSuccessMessage("");
    const newErrors = {};

    newErrors.mother_name = validateName(formData.mother_name, "mother_name");
    newErrors.father_name = validateName(formData.father_name, "father_name");
    newErrors.guardian_contact = validateContact(
      formData.guardian_contact,
      "guardian_contact"
    );
    newErrors.grade = formData.grade ? "" : "Grade is required";

    if (
      Object.values(newErrors).some((error) => error) ||
      Object.values(errors).some((error) => error)
    ) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      setSubmissionError("Please correct the errors in the form.");
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      if (formData[key]) formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch(`${baseUrl}/user/students/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      if (response.status === 201) {
        setSuccessMessage(
          "Registration form submitted correctly. Please wait while your form is verified."
        );
        // Optional: Redirect after 5 seconds
        setTimeout(() => navigate("/dashboard"), 5000);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        setErrors(errorData);
        setSubmissionError("Please correct the errors in the form.");
        throw new Error("Failed to submit student data");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmissionError("An error occurred while submitting the form.");
    }
  };

  const handleCloseSuccess = () => {
    setSuccessMessage("");
    navigate("/dashboard");
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2>Student Registration</h2>
      {submissionError && <p className={styles.error}>{submissionError}</p>}

      <PersonalDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateName={validateName}
      />
      <AddressDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateField={validateRequiredField}
      />
      <ContactDetailForm
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        setErrors={setErrors}
        validateContact={validateContact}
      />
      <div className={styles.formSection}>
        <h3>Student Details</h3>
        <div className={styles.formGrid}>
          <div>
            <label htmlFor="mother_name">
              Mother's Name <span className={styles.required}>*</span>
            </label>
            <input
              id="mother_name"
              type="text"
              value={formData.mother_name || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, mother_name: value }));
                setErrors((prev) => ({
                  ...prev,
                  mother_name: validateName(value, "mother_name"),
                }));
              }}
              onBlur={(e) =>
                setErrors((prev) => ({
                  ...prev,
                  mother_name: validateName(e.target.value, "mother_name"),
                }))
              }
              className={errors.mother_name ? styles.errorInput : ""}
              aria-invalid={!!errors.mother_name}
              aria-describedby={
                errors.mother_name ? "mother_name-error" : undefined
              }
              required
            />
            {errors.mother_name && (
              <p id="mother_name-error" className={styles.error}>
                {errors.mother_name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="father_name">
              Father's Name <span className={styles.required}>*</span>
            </label>
            <input
              id="father_name"
              type="text"
              value={formData.father_name || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, father_name: value }));
                setErrors((prev) => ({
                  ...prev,
                  father_name: validateName(value, "father_name"),
                }));
              }}
              onBlur={(e) =>
                setErrors((prev) => ({
                  ...prev,
                  father_name: validateName(e.target.value, "father_name"),
                }))
              }
              className={errors.father_name ? styles.errorInput : ""}
              aria-invalid={!!errors.father_name}
              aria-describedby={
                errors.father_name ? "father_name-error" : undefined
              }
              required
            />
            {errors.father_name && (
              <p id="father_name-error" className={styles.error}>
                {errors.father_name}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="guardian_contact">Guardian Contact</label>
            <input
              id="guardian_contact"
              type="text"
              value={formData.guardian_contact || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, guardian_contact: value }));
                setErrors((prev) => ({
                  ...prev,
                  guardian_contact: validateContact(value, "guardian_contact"),
                }));
              }}
              onBlur={(e) =>
                setErrors((prev) => ({
                  ...prev,
                  guardian_contact: validateContact(
                    e.target.value,
                    "guardian_contact"
                  ),
                }))
              }
              className={errors.guardian_contact ? styles.errorInput : ""}
              aria-invalid={!!errors.guardian_contact}
              aria-describedby={
                errors.guardian_contact ? "guardian_contact-error" : undefined
              }
            />
            {errors.guardian_contact && (
              <p id="guardian_contact-error" className={styles.error}>
                {errors.guardian_contact}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="birth_certificate_photo">
              Birth Certificate Photo <span className={styles.required}>*</span>
            </label>
            <input
              id="birth_certificate_photo"
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, "birth_certificate_photo")}
              className={
                errors.birth_certificate_photo ? styles.errorInput : ""
              }
              aria-invalid={!!errors.birth_certificate_photo}
              aria-describedby={
                errors.birth_certificate_photo
                  ? "birth_certificate_photo-error"
                  : undefined
              }
              required
            />
            {errors.birth_certificate_photo && (
              <p id="birth_certificate_photo-error" className={styles.error}>
                {errors.birth_certificate_photo}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="grade">
              Grade <span className={styles.required}>*</span>
            </label>
            <select
              id="grade"
              value={formData.grade || ""}
              onChange={(e) => {
                const value = e.target.value;
                setFormData((prev) => ({ ...prev, grade: value }));
                setErrors((prev) => ({
                  ...prev,
                  grade: value ? "" : "Grade is required",
                }));
              }}
              className={errors.grade ? styles.errorInput : ""}
              aria-invalid={!!errors.grade}
              aria-describedby={errors.grade ? "grade-error" : undefined}
              required
            >
              <option value="">Select Grade</option>
              {grades.map((grade) => (
                <option key={grade.id} value={grade.id}>
                  {grade.grade_name} ({grade.section})
                </option>
              ))}
            </select>
            {errors.grade && (
              <p id="grade-error" className={styles.error}>
                {errors.grade}
              </p>
            )}
          </div>
          <div>
            <label htmlFor="rollno">Roll Number</label>
            <input
              id="rollno"
              type="number"
              value={formData.rollno || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, rollno: e.target.value }))
              }
            />
          </div>
          <div>
            <label htmlFor="symbol_number">Symbol Number</label>
            <input
              id="symbol_number"
              type="text"
              value={formData.symbol_number || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  symbol_number: e.target.value,
                }))
              }
            />
          </div>
          <div>
            <label htmlFor="iemis_code">IEMIS Code</label>
            <input
              id="iemis_code"
              type="text"
              value={formData.iemis_code || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, iemis_code: e.target.value }))
              }
            />
          </div>
        </div>
      </div>
      <button type="submit" disabled={successMessage}>
        Submit
      </button>
      {successMessage && (
        <div className={styles.successAlert} aria-live="polite">
          <span className={styles.alertSymbol}>✅</span>
          <p className={styles.successText}>{successMessage}</p>
          <button className={styles.dismissButton} onClick={handleCloseSuccess}>
            OK
          </button>
        </div>
      )}
    </form>
  );
};

export default StudentForm;
