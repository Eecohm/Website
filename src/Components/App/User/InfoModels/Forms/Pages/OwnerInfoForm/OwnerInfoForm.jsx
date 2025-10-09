import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import DocumentDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom";
import styles from "./OwnerInfoForm.module.css";

const OwnerInfoForm = () => {
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
  });

  //validation state for each section
  const [sectionValidations, setSectionValidations] = useState({
    personalDetails: { isValid: false, errors: {} },
    addressDetails: { isValid: false, errors: {} },
    contactDetails: { isValid: false, errors: {} },
    documentDetails: { isValid: false, errors: {} },
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allSectionsValid = Object.values(sectionValidations).every(
      (section) => section.isValid
    );

    setIsFormValid(allSectionsValid);
  }, [sectionValidations]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Debug: Check validation state
    console.log("DEBUG - Form validation check:");
    console.log("isFormValid:", isFormValid);
    console.log("Section validations:", sectionValidations);

    // Debug: Check each section
    Object.entries(sectionValidations).forEach(([sectionName, validation]) => {
      console.log(
        `${sectionName}:`,
        validation.isValid,
        "errors:",
        validation.errors
      );
    });

    if (!isFormValid) {
      alert("Please fix all validation errors before submitting");
      return;
    }
    alert("✅ Form submitted successfully! All validation passed.");
  };

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv}>
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
          </div>

          <div className={styles.buttonContainer}>
            <button className={styles.cancelButton}>Cancel</button>
            <button onClick={handleSubmit} className={styles.submitButton}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default OwnerInfoForm;
