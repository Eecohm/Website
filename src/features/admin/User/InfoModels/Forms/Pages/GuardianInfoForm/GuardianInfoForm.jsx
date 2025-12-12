import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaPhone, FaUserShield } from "react-icons/fa";
import NavBar from "@/features/admin/NavBar/NavBar";
import PersonalDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/PersonalDetailsForm/PersonalDetailsForm";
import AddressDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/AddressDetailsForm/AddressDetailsForm";
import ContactDetailsForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/ContactDetailsForm/ContactDetailsForm";
import GuardianSpecificForm from "@/features/admin/User/InfoModels/Forms/Components/FormSections/GuardianSpecificForm/GuardianSpecificForm";
import styles from "@/features/admin/User/InfoModels/Forms/Pages/GuardianInfoForm/GuardianInfoForm.module.css";
import ModalNotification from "@/components/common/ModalNotification";
import useGuardianForm from "@/features/admin/User/InfoModels/Forms/Pages/GuardianInfoForm/useGuardianForm";
import MultiStepForm from "@/components/common/MultiStepForm/MultiStepForm";

const GuardianInfoForm = () => {
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
  } = useGuardianForm();

  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { key: "personal", label: "Personal", icon: <FaUser /> },
    { key: "address", label: "Address", icon: <FaMapMarkerAlt /> },
    { key: "contact", label: "Contact", icon: <FaPhone /> },
    { key: "guardian", label: "Guardian info", icon: <FaUserShield /> },
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
        return sectionValidations.guardianDetails.isValid;
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
          <GuardianSpecificForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            onValidationChange={(isValid, errors) =>
              updateSectionValidation("guardianDetails", isValid, errors)
            }
            allowEmptyGuardianIds={true}
          />
        );
      default:
        return null;
    }
  };

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
          title="Guardian Registration"
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

export default GuardianInfoForm;
