import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import DocumentDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom";
import styles from "./OwnerInfoForm.module.css";
import { submitOwnerInfo } from "@/hooks/ownerInfoApi";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import SelectUserType from "../SelectUserType/SelectUserType";

const OwnerInfoForm = () => {
  const [EditDetial, SetEditDetial] =useState(false);
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
    website: "",
    contactPerson: "",
    nagariktaNo: "",
    panNo: "",
    nagariktaPhoto: null,
    panPhoto: null,
    userId: "",
    userEmail: "",
    self: false,
    user: null, // ✅ important field for PUT or PATCH
  });

  // validation state for each section
  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    documentDetails: { isValid: false, errors: {} },
  });

  const [modalNotification, setModalNotification] = useState(null);

  // user type selection state
  const [userTypeSelection, setUserTypeSelection] = useState({
    type: "not-me", // default selection
    subType: "",
    selectedPerson: null,
  });

  // API context hooks
  const baseUrl = useBaseUrl();
  const { login, setToken } = useAuth();
  const [isFormValid, setIsFormValid] = useState(false);

  // ✅ validate form when sections change
  useEffect(() => {
    const allSectionsValid = Object.values(sectionValidations).every(
      (section) => section.isValid
    );
    setIsFormValid(allSectionsValid);
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

  // ✅ handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ handle file changes
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // ✅ handle user type (if enabled later)
  const handleUserTypeChange = (selection) => {
    console.log("User type selection changed:", selection);
    setUserTypeSelection(selection);

    setFormData((prev) => ({
      ...prev,
      self: selection.type === "self",
    }));
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

      const result = await submitOwnerInfo(
        formData,
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
        console.log("✅ Submitted data:", result.data);
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
      console.error("Unexpected error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv} onSubmit={handleSubmit}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Owner Information</h1>
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

            {/* Optional user selection */}
            {/* <SelectUserType
              onUserTypeChange={handleUserTypeChange}
              currentSelection={userTypeSelection}
            /> */}
          </div>

          <div className={styles.buttonContainer}>
            <button type="button" className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
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

export default OwnerInfoForm;
