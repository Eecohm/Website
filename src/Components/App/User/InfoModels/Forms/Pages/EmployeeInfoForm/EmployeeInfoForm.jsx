import React, { useEffect, useState } from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import DocumentDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom";
import EmployeeSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/EmployeeSpecificForm/EmployeeSpecificForm";
import styles from "@/Components/App/User/InfoModels/Forms/Pages/EmployeeInfoForm/EmployeeInfoForm.module.css";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import useEmployeeForm from "@/Components/App/User/InfoModels/Forms/Pages/EmployeeInfoForm/useEmployeeForm";

const EmployeeInfoForm = () => {
  const {
    formData,
    setFormData,
    modalNotification,
    setModalNotification,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    isFormValid,
    isSubmitting,
  } = useEmployeeForm();

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
