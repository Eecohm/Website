import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import GuardianSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/GuardianSpecificForm/GuardianSpecificForm";
import styles from "./GuardianInfoForm.module.css";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import { submitGuardianInfo } from "@/hooks/GuardianApi/guardianInfoApi";
import { useGuardianInfoSubmission } from "@/hooks/GuardianApi/useGuardianInfoSubmission";

const GuardianInfoForm = () => {
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
    userId: "",
    userEmail: "",
    studentIds: "",
  });

  const [modalNotification, setModalNotification] = useState(null);

  const [EditDetial, SetEditDetial] = useState(false);

  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    guardianDetails: { isValid: false, errors: {} },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const { isSubmitting, submitForm } = useGuardianInfoSubmission();

  const baseUrl = useBaseUrl();
  const { login, setToken } = useAuth();

  useEffect(() => {
    const allSectionsValid = Object.values(sectionValidations).every(
      (section) => section.isValid
    );
    setIsFormValid(allSectionsValid);
  }, [
    sectionValidations.personalDetails.isValid,
    sectionValidations.addressDetails.isValid,
    sectionValidations.contactDetails.isValid,
    sectionValidations.guardianDetails.isValid,
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

  // ✅ handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setModalNotification({
        type: "warning",
        message: "Please fix all validation errors before submitting.",
      });
      return;
    }

    try {
      // Auto-select method based on user existence
      const method = EditDetial ? "PUT" : "POST";

      // prepare data for submission
      const toSend = { ...formData };

      // Use JS null to mark your intent; service should translate to empty string in FormData for POST.
      toSend.userId = null; // mark as intentionally null (service will convert to "")
      toSend.studentIds = ""; // empty string will be appended so backend sees the key but empty
      toSend.userEmail = ""; // disabled — explicitly send empty string

      const result = await submitGuardianInfo(
        toSend,
        baseUrl,
        login,
        setToken,
        method
      );

      if (result.success) {
        setModalNotification({
          type: "pending",
          message:
            "Application Status: PENDING - Your owner information is being reviewed. You will be notified once verification is complete.",
        });
      } else {
        setModalNotification({
          type: "error",
          message: `Submission failed: ${result.error}`,
        });
        console.error("❌ Submission error:", result.error);
      }
    } catch (error) {
      setModalNotification({
        type: "error",
        message:
          "❌ An unexpected error occurred during submission. Please try again later.",
      });
    }
  };

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv} onSubmit={handleSubmit}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Guardian Information</h1>
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
            <GuardianSpecificForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("guardianDetails", isValid, errors)
              }
              allowEmptyGuardianIds={true} // allow submitting null/empty for user/student ids
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

export default GuardianInfoForm;
