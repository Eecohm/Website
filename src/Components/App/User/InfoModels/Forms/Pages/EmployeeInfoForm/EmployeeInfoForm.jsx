import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import DocumentDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom";
import EmployeeSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/EmployeeSpecificForm/EmployeeSpecificForm";
import styles from "./EmployeeInfoForm.module.css";
import { useEmployeeInfoSubmission } from "@/hooks/EmployeeApi/useEmployeeInfoSubmission";
import ModalNotification from "@/GlobalComponets/ModalNotification";

const EmployeeInfoForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    photo: null,
    country: "",
    province: "",
    municipality: "",
    ward: "",
    tole: "",
    pinPoint: "",
    tellPhone: "",
    phone: "",
    alternatePhone: "",
    contactPerson: "",
    nagariktaNo: "",
    panNo: "",
    nagariktaPhoto: null,
    panPhoto: null,
    userId: "",
    userEmail: "",
    academicQualification: "",
    jobApplication: null,
    hiringLetter: null,
    resumeCv: null,
  });

  // modal notification
  const [modalNotification, setModalNotification] = useState(null);

  // per-section validation
  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    documentDetails: { isValid: false, errors: {} },
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const { isSubmitting, submitForm } = useEmployeeInfoSubmission();

  useEffect(() => {
    const allValid = Object.values(sectionValidations).every((s) => s.isValid);
    setIsFormValid(allValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
    sectionValidations.documentDetails.isValid,
  ]);

  const updateSectionValidation = (sectionName, isValid, errors = {}) => {
    setSectionValidations((prev) => ({
      ...prev,
      [sectionName]: { isValid, errors },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    // standard file input event: access name and files from target
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((p) => ({ ...p, [name]: files[0] }));
    } else {
      // if user cleared the file input, remove the file from state
      setFormData((p) => ({ ...p, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    // quick client check
    if (!isFormValid) {
      setModalNotification({
        type: "warning",
        message: "Please fix all validation errors before submitting.",
      });
      return;
    }

    const toSend = { ...formData };
    // explicitly mark userId as null for semantics — employee creation should not be tied to an existing user
    toSend.userId = null;
    // disable email for now: send empty to indicate none (owner used empty string)
    toSend.userEmail = "";

    try {
      const result = await submitForm(toSend, "POST");

      if (result && result.success) {
        setModalNotification({
          type: "pending",
          message:
            "Application Status: PENDING - Your employee information is being reviewed. You will be notified once verification is complete.",
        });
      } else {
        setModalNotification({
          type: "error",
          message: `Submission failed: ${result?.error || "Unknown error"}`,
        });
      }
    } catch (err) {
      setModalNotification({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
      console.error("Unexpected error on employee submit:", err);
    }
  };

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv} onSubmit={handleSubmit}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Employee Information</h1>
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
            />
            <ContactDetailsForm
              formData={formData}
              handleChange={handleChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("contactDetails", isValid, errors)
              }
            />
            <DocumentDetailsForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("documentDetails", isValid, errors)
              }
            />
            <EmployeeSpecificForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
            />
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelButton}>
              Cancel
            </button>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
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

export default EmployeeInfoForm;
