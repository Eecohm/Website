import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaPhone, FaFileAlt, FaBriefcase } from "react-icons/fa";
import NavBar from "@/features/admin/NavBar/NavBar";
import PersonalDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import DocumentDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/DocumentDetailsForm/DocumentDetailsFrom";
import EmployeeSpecificForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/EmployeeSpecificForm/EmployeeSpecificForm";
import styles from "@/features/admin/User/InfoModels/Forms/Pages/EmployeeInfoForm/EmployeeInfoForm.module.css";
import ModalNotification from "@/components/common/ModalNotification";
import useEmployeeForm from "@/features/admin/User/InfoModels/Forms/Pages/EmployeeInfoForm/useEmployeeForm";
import MultiStepForm from "@/components/common/MultiStepForm/MultiStepForm";

const EmployeeInfoForm = () => {
  const {
    formData,
    modalNotification,
    setModalNotification,
    sectionValidations,
    updateSectionValidation,
    handleChange,
    handleFileChange,
    handleSubmit,
    isSubmitting,
  } = useEmployeeForm();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { key: "personal", label: "Personal", icon: <FaUser /> },
    { key: "address", label: "Address", icon: <FaMapMarkerAlt /> },
    { key: "contact", label: "Contact", icon: <FaPhone /> },
    { key: "documents", label: "Documents", icon: <FaFileAlt /> },
    { key: "employee", label: "Employee Details", icon: <FaBriefcase /> },
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
        return sectionValidations.documentDetails.isValid;
      case 4:
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
          <DocumentDetailsForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onValidationChange={(isValid, errors) =>
              updateSectionValidation("documentDetails", isValid, errors)
            }
          />
        );
      case 4:
        return (
          <EmployeeSpecificForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
          />
        );
      default:
        return null;
    }
  };

  // ... imports

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
          title="Employee Registration"
          isStepValid={getCurrentStepValidation()}
        >
          {renderStepContent()}
        </MultiStepForm>
      </div>

// ...
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

