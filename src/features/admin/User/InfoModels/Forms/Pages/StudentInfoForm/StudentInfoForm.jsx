import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaPhone, FaUserGraduate } from "react-icons/fa";
import NavBar from "@/features/admin/NavBar/NavBar";
import PersonalDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import StudentSpecificForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/StudentSpecificForm/StudentSpecificForm";
import styles from "@/features/admin/User/InfoModels/Forms/Pages/StudentInfoForm/StudentInfoForm.module.css";
import ModalNotification from "@/components/common/ModalNotification";
import useStudentForm from "@/features/admin/User/InfoModels/Forms/Pages/StudentInfoForm/useStudentForm";
import MultiStepForm from "@/components/common/MultiStepForm/MultiStepForm";

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
    isSubmitting
  } = useStudentForm();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { key: "personal", label: "Personal Info", icon: <FaUser /> },
    { key: "address", label: "Address", icon: <FaMapMarkerAlt /> },
    { key: "contact", label: "Contact", icon: <FaPhone /> },
    { key: "student", label: "Student Details", icon: <FaUserGraduate /> },
  ];

  const getCurrentStepValidation = () => {
    switch (currentStep) {
      case 0:
        return sectionValidations.personalDetails.isValid;
      case 1:
        return sectionValidations.addressDetails.isValid;
      case 2:
        return sectionValidations.contactDetails.isValid;
      case 3:
        // Currently disabling validation check for studentDetails as noted in hook
        // return sectionValidations.studentDetails.isValid; 
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalDetailsForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onValidationChange={(isValid, errors) =>
              updateSectionValidation("personalDetails", isValid, errors)
            }
          />
        );
      case 1:
        return (
          <AddressDetailsForm
            formData={formData}
            handleChange={handleChange}
            onValidationChange={(isValid, errors) =>
              updateSectionValidation("addressDetails", isValid, errors)
            }
          />
        );
      case 2:
        return (
          <ContactDetailsForm
            formData={formData}
            handleChange={handleChange}
            onValidationChange={(isValid, errors) =>
              updateSectionValidation("contactDetails", isValid, errors)
            }
          />
        );
      case 3:
        return (
          <StudentSpecificForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onValidationChange={(isValid, errors) =>
              updateSectionValidation("studentDetails", isValid, errors)
            }
          />
        );
      default:
        return null;
    }
  };

  // Show loading while checking for existing student record
  if (isCheckingExisting) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p className={styles.loadingText}>Checking student information...</p>
      </div>
    );
  }

  // ...
  return (
    <>
      <NavBar />
      <div className="main-content-with-sidebar">
        <MultiStepForm
          steps={steps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
          onNext={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
          onPrev={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          title={isEditing ? "Edit Student Information" : "Student Registration"}
          isStepValid={getCurrentStepValidation()}
        >
          {renderStepContent()}
        </MultiStepForm>
      </div>

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
