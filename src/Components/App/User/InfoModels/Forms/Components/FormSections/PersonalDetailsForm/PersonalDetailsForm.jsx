import React, { useRef, useState } from "react";
import { User } from "lucide-react";
import FormSection from "../../FormComponents/FormSection/FormSection";
import GlassInput from "../../FormComponents/GlassInput/GlassInput";
import GlassSelect from "../../FormComponents/GlassSelect/GlassSelect";
import GlassFileUpload from "../../FormComponents/GlassFileUpload/GlassFileUpload";
import {
  validateRequiredName,
  validateOptionalName,
} from "@/validators/formInputValidator/TextValidator";
import { validateDateOfBirth } from "@/validators/formInputValidator/DateValidator";
import { validateFile } from "@/validators/formInputValidator/ContactValidator";
const PersonalDetailsForm = ({
  formData,
  handleChange,
  handleFileChange,
  onValidationChange,
}) => {
  //state to track which fields are valid. set stores unique values only
  const [validFields, setValidFields] = useState(new Set());
  const [photoError, setPhotoError] = useState("");
  const photoInputRef = useRef(null);

  const handleFieldValidation = (fieldName, isValid) => {
    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
      } else {
        updated.delete(fieldName);
      }

      //required fields that must be valid for a section to pass
      const requiredFields = ["firstName", "lastName", "dateOfBirth", "gender"];

      //check if all req fields are valid
      const allValid = requiredFields.every((field) => updated.has(field));

      // Call the parent validation callback - but defer it to avoid state update during render
      if (onValidationChange) {
        setTimeout(() => {
          const errors = {};
          requiredFields.forEach((field) => {
            if (!updated.has(field)) {
              errors[field] = `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } is required`;
            }
          });

          onValidationChange(allValid, errors);
        }, 0);
      }

      return updated;
    });
  };

  const handlePhotoValidation = async (file) => {
    if (!file) {
      handleFieldValidation("photo", true);
      setPhotoError("");
      return;
    }
    try {
      const result = await validateFile(file, false, "passport");

      if (result.valid) {
        handleFieldValidation("photo", true);
      } else {
        handleFieldValidation("photo", false);
        setPhotoError("Passport size photo is needed");

        // Clear the file input using ref
        if (photoInputRef.current) {
          photoInputRef.current.value = "";
        }

        // Clear from form data
        handleFileChange({ target: { name: "photo", files: [] } });
        alert(result.message);
      }
    } catch (error) {
      handleFieldValidation("photo", false);
      setPhotoError("Error validating photo. Please try again.");

      // Clear the file input
      if (photoInputRef.current) {
        photoInputRef.current.value = "";
      }
      alert("Error validating file: " + error.message);
    }
  };

  return (
    <FormSection title="Personal Details" icon={User}>
      <GlassInput
        label="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required={true}
        placeholder="First name"
        validate={validateRequiredName}
        onValidate={handleFieldValidation}
      />

      <GlassInput
        label="Middle Name"
        name="middleName"
        value={formData.middleName}
        onChange={handleChange}
        placeholder="Middle name"
        required={false}
        validate={validateOptionalName}
        onValidate={handleFieldValidation}
      />

      <GlassInput
        label="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required={true}
        placeholder="Last name"
        validate={validateRequiredName}
        onValidate={handleFieldValidation}
      />

      <GlassInput
        label="Date of Birth"
        name="dateOfBirth"
        type="date"
        value={formData.dateOfBirth}
        onChange={handleChange}
        required={true}
        validate={validateDateOfBirth}
        onValidate={handleFieldValidation}
      />

      <GlassSelect
        label="Gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required={true}
        options={[
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
        ]}
        onValidate={handleFieldValidation}
      />

      <GlassFileUpload
        ref={photoInputRef}
        label="Passport Photo"
        name="photo"
        onChange={(e) => {
          setPhotoError("");
          handleFileChange(e);

          if (e.target.files && e.target.files[0]) {
            handlePhotoValidation(e.target.files[0]);
          }
        }}
        accept="image/*"
        required={false}
        error={photoError}
      />
    </FormSection>
  );
};

export default PersonalDetailsForm;
