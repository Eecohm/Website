import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import StudentSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/StudentSpecificForm/StudentSpecificForm";
import styles from "./StudentInfoForm.module.css";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import { submitStudentInfo } from "@/hooks/studentInfoApi";

const StudentInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    country: "Nepal",
    province: "",
    municipality: "",
    ward: "",
    tole: "",
    pinPoint: "",
    tellPhone: "",
    phone: "",
    alternatePhone: "",
    contactPerson: "",
    userId: "",
    userEmail: "",
    academicClassId: "",
    academicClassName: "",
    idCard: null,
    transferCertificate: null,
    class10Marksheet: null,
    createdByAdmin: "",
  });

  //validation state for each section
  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    studentDetails: { isValid: false, errors: {} },
  });

  const [modalNotification, setModalNotification] = useState(null);

  const baseUrl = useBaseUrl();
  const { login, setToken } = useAuth();
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allSectionsValid = Object.values(sectionValidations).every(
      (section) => section.isValid
    );
    setIsFormValid(allSectionsValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
    sectionValidations.studentDetails.isValid,
  ]);

  const updateSectionValidation = (sectionName, isValid, errors = {}) => {
    setSectionValidations((prev) => ({
      ...prev,
      [sectionName]: { isValid, errors },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //  DEBUG: Add these lines temporarily
    console.log("=== SUBMIT DEBUG ===");
    console.log("isFormValid:", isFormValid);
    console.log("sectionValidations:", sectionValidations);
    console.log(
      "All sections:",
      Object.entries(sectionValidations).map(
        ([section, data]) => `${section}: ${data.isValid}`
      )
    );

    //  Debug the failing sections
    console.log(
      "❌ personalDetails errors:",
      sectionValidations.personalDetails.errors
    );
    console.log(
      "❌ studentDetails errors:",
      sectionValidations.studentDetails.errors
    );

    if (!isFormValid) {
      setModalNotification({
        type: "warning",
        message: "Please fix all validation errors before submitting",
      });
      return; // Stop execution here if validation fails
    }

    try {
      // Submit to API
      const result = await submitStudentInfo(
        formData,
        baseUrl,
        login,
        setToken
      );
      if (result.success) {
        setModalNotification({
          type: "pending",
          message:
            "Application Status: PENDING - Your student information is being reviewed. You will be notified once verification is complete.",
        });
      } else {
        setModalNotification({
          type: "error",
          message: `Submission failed: ${result.error}`,
        });
      }
    } catch (error) {
      setModalNotification({
        type: "error",
        message:
          "❌ An unexpected error occurred during submission. Please try again later.",
      });
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Student Information</h1>
          </div>

          <div className={styles.formContainer}>
            <PersonalDetailsForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("personalDetails", isValid, errors)
              }
            />
            <AddressDetailsForm
              formData={formData}
              handleChange={handleChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("addressDetails", isValid, errors)
              }
              // isPersonalDetailsComplete={isPersonalDetailsComplete}
            />
            <ContactDetailsForm
              formData={formData}
              handleChange={handleChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("contactDetails", isValid, errors)
              }
            />
            <StudentSpecificForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("studentDetails", isValid, errors)
              }
            />
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>Cancel</button>
            <button onClick={handleSubmit} className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </form>

      {modalNotification && (
        <ModalNotification
          type={modalNotification.type}
          message={modalNotification.message}
          onClose={() => setModalNotification(null)}
        />
      )}
    </>
  );
};

export default StudentInfoForm;

// //why setisPersonalDetailsComplete is not used? :
// const [isPersonalDetailsComplete, setIsPersonalDetailsComplete] =
//   useState(false);
