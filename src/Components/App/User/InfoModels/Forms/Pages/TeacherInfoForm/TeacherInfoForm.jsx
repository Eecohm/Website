import React from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components//FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import DocumentDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom";
import TeacherSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/TeacherSpecificForm/TeacherSpecificForm";
import styles from "@/Components/App/User/InfoModels/Forms/Pages/TeacherInfoForm/TeacherInfoForm.module.css";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import useTeacherForm from "@/Components/App/User/InfoModels/Forms/Pages/TeacherInfoForm/useTeacherForm";

const TeacherInfoForm = () => {
  const {
    formData,
    modalNotification,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitting,
    setModalNotification,
  } = useTeacherForm();

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv} onSubmit={handleSubmit}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>Teacher Information</h1>
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
            <TeacherSpecificForm
              formData={formData}
              handleChange={handleChange}
              handleFileChange={handleFileChange}
              onValidationChange={(isValid, errors) =>
                updateSectionValidation("teacherDetails", isValid, errors)
              }
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

export default TeacherInfoForm;
