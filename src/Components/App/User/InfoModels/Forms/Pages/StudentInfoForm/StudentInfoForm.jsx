import React from "react";
import NavBar from "@/Components/App/NavBar/NavBar";
import PersonalDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import StudentSpecificForm from "@/Components/App/User/InfoModels/Forms/Components/FormSections/StudentSpecificForm/StudentSpecificForm";
import styles from "./StudentInfoForm.module.css";
import ModalNotification from "@/GlobalComponets/ModalNotification";
import useStudentForm from "./useStudentForm";

const StudentInfoForm = () => {
  const {
    formData,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    modalNotification,
    setModalNotification,
    isCheckingExisting,
    isEditing,
    hasChanges,
  } = useStudentForm();

  // Show loading while checking for existing student record
  if (isCheckingExisting) {
    return (
      <>
        <NavBar />
        <div className={styles.mainDiv}>
          <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loadingText}>
              Checking student information...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <form className={styles.mainDiv}>
        <div className={styles.scrollContainer}>
          <div className={styles.header}>
            <h1 className={styles.title}>
              {isEditing ? "Edit Student Information" : "Student Information"}
            </h1>
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
              {isEditing ? "Update Information" : "Submit"}
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
