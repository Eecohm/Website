import React, { useEffect, useState } from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./Students.module.css";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiHome,
  FiBook,
  FiUsers,
  FiChevronRight,
  FiChevronLeft,
  FiUpload,
  FiX,
} from "react-icons/fi";

const StudentForm = () => {
  const [currentPart, setCurrentPart] = useState(1);
  const [currentSection, setCurrentSection] = useState(1);
  const [formData, setFormData] = useState({
    // Part 1 - Personal Details
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    photo: null,
    photoPreview: "",

    // Part 1 - Contact Details
    contactNumber: "",
    address: "",
    email: "",
    gender: "",

    // Part 2 - Parents Details
    fatherName: "",
    motherName: "",
    fatherContact: "",
    motherContact: "",
    guardianName: "",
    gurdianContact: "",

    // Part 3 - Educational Details
    previousSchool: "",
    program: "",
    faculty: "",
    academicClass: "",
    emisCode: "",
    registrationNo: "",
    symbolNo: "",
  });

  useEffect(() => {
    document.body.classList.add("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, []);

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          photo: "Please select an image file",
        }));
        return;
      }

      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          photo: "Image size should be less than 2MB",
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          photo: file,
          photoPreview: e.target.result,
        }));
      };
      reader.readAsDataURL(file);

      // Clear photo error
      if (errors.photo) {
        setErrors((prev) => ({
          ...prev,
          photo: "",
        }));
      }
    }
  };

  const removePhoto = () => {
    setFormData((prev) => ({
      ...prev,
      photo: null,
      photoPreview: "",
    }));
  };

  const validateCurrentSection = () => {
    const newErrors = {};

    if (currentPart === 1 && currentSection === 1) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.dateOfBirth)
        newErrors.dateOfBirth = "Date of birth is required";
      if (!formData.photo) newErrors.photo = "Photo is required";
    }

    if (currentPart === 1 && currentSection === 2) {
      if (!formData.contactNumber)
        newErrors.contactNumber = "Contact number is required";
      if (!formData.address) newErrors.address = "Address is required";
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
      }
    }

    if (currentPart === 2 && currentSection === 1) {
      if (!formData.fatherName)
        newErrors.fatherName = "Father's name is required";
      if (!formData.motherName)
        newErrors.motherName = "Mother's name is required";
      if (!formData.fatherContact)
        newErrors.fatherContact = "Father's contact is required";
      if (!formData.motherContact)
        newErrors.motherContact = "Mother's contact is required";
    }

    if (currentPart === 3 && currentSection === 1) {
      if (!formData.previousSchool)
        newErrors.previousSchool = "Previous school is required";
      if (!formData.program) newErrors.program = "Program is required";
      if (!formData.faculty) newErrors.faculty = "Faculty is required";
      if (!formData.academicClass)
        newErrors.academicClass = "Academic class is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextSection = () => {
    if (validateCurrentSection()) {
      if (currentSection < getSectionsInPart(currentPart)) {
        setCurrentSection(currentSection + 1);
      } else if (currentPart < 3) {
        setCurrentPart(currentPart + 1);
        setCurrentSection(1);
      } else {
        handleSubmit();
      }
    }
  };

  const prevSection = () => {
    if (currentSection > 1) {
      setCurrentSection(currentSection - 1);
    } else if (currentPart > 1) {
      setCurrentPart(currentPart - 1);
      setCurrentSection(getSectionsInPart(currentPart - 1));
    }
  };

  const getSectionsInPart = (part) => {
    switch (part) {
      case 1:
        return 2;
      case 2:
        return 1;
      case 3:
        return 1;
      default:
        return 1;
    }
  };

  const handleSubmit = () => {
    if (validateCurrentSection()) {
      console.log("Form submitted:", formData);
      alert("Student registration completed successfully!");
      // Here you would typically send the data to your backend API
    }
  };

  const renderProgressBar = () => {
    let currentProgress = 0;

    if (currentPart === 1) {
      currentProgress = currentSection === 1 ? 25 : 50;
    } else if (currentPart === 2) {
      currentProgress = 75;
    } else if (currentPart === 3) {
      currentProgress = 100;
    }

    return (
      <div className={styles.progressContainer}>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${currentProgress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>
          Part {currentPart} of {currentPart}
        </div>
      </div>
    );
  };

  const renderPart1Section1 = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <FiUser className={styles.sectionIcon} />
        Personal Details
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label>First Name *</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={errors.firstName ? styles.inputError : ""}
          />
          {errors.firstName && (
            <span className={styles.error}>{errors.firstName}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Middle Name</label>
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Last Name *</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={errors.lastName ? styles.inputError : ""}
          />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Date of Birth *</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={errors.dateOfBirth ? styles.inputError : ""}
          />
          {errors.dateOfBirth && (
            <span className={styles.error}>{errors.dateOfBirth}</span>
          )}
        </div>

        <div className={`${styles.fieldGroup} ${styles.photoUpload}`}>
          <label>Passport Size Photo *</label>
          <div className={styles.photoContainer}>
            {formData.photoPreview ? (
              <div className={styles.photoPreview}>
                <img
                  src={formData.photoPreview}
                  alt="Preview"
                  onClick={() => setIsPhotoModalOpen(true)}
                />
                <button
                  type="button"
                  onClick={removePhoto}
                  className={styles.removePhoto}
                >
                  <FiX />
                </button>
              </div>
            ) : (
              <label className={styles.uploadArea}>
                <FiUpload className={styles.uploadIcon} />
                <span>Click to upload photo</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  style={{ display: "none" }}
                />
              </label>
            )}
          </div>
          {errors.photo && <span className={styles.error}>{errors.photo}</span>}
          <div className={styles.photoNote}>
            Please upload a passport-sized photo (max 2MB)
          </div>
        </div>
      </div>
    </div>
  );

  const renderPart1Section2 = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <FiPhone className={styles.sectionIcon} />
        Contact Details
      </h2>

      <div className={styles.parentsGrid}>
        <div className={styles.fieldGroup}>
          <label>Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            className={errors.contactNumber ? styles.inputError : ""}
          />
          {errors.contactNumber && (
            <span className={styles.error}>{errors.contactNumber}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>

        <div className={styles.fieldGroup}>
          <label>Address *</label>
          <input
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            rows="3"
            className={errors.address ? styles.inputError : ""}
          />
          {errors.address && (
            <span className={styles.error}>{errors.address}</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderPart2Section1 = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <FiUsers className={styles.sectionIcon} />
        Parents Details
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label>Father's Name *</label>
          <input
            type="text"
            name="fatherName"
            value={formData.fatherName}
            onChange={handleInputChange}
            className={errors.fatherName ? styles.inputError : ""}
          />
          {errors.fatherName && (
            <span className={styles.error}>{errors.fatherName}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Father's Contact Number *</label>
          <input
            type="tel"
            name="fatherContact"
            value={formData.fatherContact}
            onChange={handleInputChange}
            className={errors.fatherContact ? styles.inputError : ""}
          />
          {errors.fatherContact && (
            <span className={styles.error}>{errors.fatherContact}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Mother's Name *</label>
          <input
            type="text"
            name="motherName"
            value={formData.motherName}
            onChange={handleInputChange}
            className={errors.motherName ? styles.inputError : ""}
          />
          {errors.motherName && (
            <span className={styles.error}>{errors.motherName}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Mother's Contact Number *</label>
          <input
            type="tel"
            name="motherContact"
            value={formData.motherContact}
            onChange={handleInputChange}
            className={errors.motherContact ? styles.inputError : ""}
          />
          {errors.motherContact && (
            <span className={styles.error}>{errors.motherContact}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Guardian's Full Name (if different)</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Guardian's Contact (if different)</label>
          <input
            type="text"
            name="guardianCon"
            value={formData.guardianContact}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderPart3Section1 = () => (
    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>
        <FiBook className={styles.sectionIcon} />
        Educational Details
      </h2>

      <div className={styles.formGrid}>
        <div className={styles.fieldGroup}>
          <label>Previous School Name *</label>
          <input
            type="text"
            name="previousSchool"
            value={formData.previousSchool}
            onChange={handleInputChange}
            className={errors.previousSchool ? styles.inputError : ""}
          />
          {errors.previousSchool && (
            <span className={styles.error}>{errors.previousSchool}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Program *</label>
          <input
            type="text"
            name="program"
            value={formData.program}
            onChange={handleInputChange}
            className={errors.program ? styles.inputError : ""}
          />
          {errors.program && (
            <span className={styles.error}>{errors.program}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Faculty *</label>
          <input
            type="text"
            name="faculty"
            value={formData.faculty}
            onChange={handleInputChange}
            className={errors.faculty ? styles.inputError : ""}
          />
          {errors.faculty && (
            <span className={styles.error}>{errors.faculty}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>Academic Class *</label>
          <input
            type="text"
            name="academicClass"
            value={formData.academicClass}
            onChange={handleInputChange}
            className={errors.academicClass ? styles.inputError : ""}
          />
          {errors.academicClass && (
            <span className={styles.error}>{errors.academicClass}</span>
          )}
        </div>

        <div className={styles.fieldGroup}>
          <label>EMIS Code</label>
          <input
            type="text"
            name="emisCode"
            value={formData.emisCode}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Registration No.</label>
          <input
            type="text"
            name="registrationNo"
            value={formData.registrationNo}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label>Symbol No.</label>
          <input
            type="text"
            name="symbolNo"
            value={formData.symbolNo}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderCurrentSection = () => {
    if (currentPart === 1 && currentSection === 1) return renderPart1Section1();
    if (currentPart === 1 && currentSection === 2) return renderPart1Section2();
    if (currentPart === 2 && currentSection === 1) return renderPart2Section1();
    if (currentPart === 3 && currentSection === 1) return renderPart3Section1();
    return null;
  };

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        <div className={styles.formContainer}>
          {/* Header */}
          <div className={styles.header}>
            <h1>Student Registration</h1>
            <p>Complete all sections to register a new student</p>
            {renderProgressBar()}
          </div>

          {/* Scrollable Middle */}
          <div className={styles.formContent}>{renderCurrentSection()}</div>

          {/* Fixed Footer Navigation */}
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
              {currentPart === 3 && currentSection === 1 ? "Submit" : "Next"}{" "}
              <FiChevronRight />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForm;
