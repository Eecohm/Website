import React, { useState, useRef } from "react";
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
import { validatePhoto } from "@/validators/formInputValidator/ValidatePhoto";

const PersonalDetailsForm = ({
  formData,
  handleChange,
  handleFileChange,
  onValidationChange,
}) => {
  const [validFields, setValidFields] = useState(new Set());
  const lastErrorsStringRef = useRef("");

  const handleFieldValidation = (fieldName, isValid) => {
    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
      } else {
        updated.delete(fieldName);
      }

      const requiredFields = [
        "firstName",
        "lastName",
        "dateOfBirth",
        "gender",
        "photo",
        "country",
        "province",
        "municipality",
        "ward",
        "tole",
        "phone",
        "userId",
        // "nagariktaNo",
        "panNo",
        // "nagariktaPhoto",
        "panPhoto",
        "userId",
        "academicQualification",
        "academicClassId",
        "academicClassName",
        "subjectIds",
        "subjectNames",
        // "jobApplication",
        // "hiringLetter",
        // "resumeCv",
        // "skillCertifications",
      ];
      const allValid = requiredFields.every((field) => updated.has(field));

      // Call the parent validation callback
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

          // Convert errors to string for comparison
          const errorsString = JSON.stringify(errors);

          // Compare with ref value (no state update)
          if (errorsString !== lastErrorsStringRef.current) {
            onValidationChange(allValid, errors);
          } else {
          }
        }, 0);
      }

      return updated;
    });
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
        label="Photo"
        name="photo"
        onChange={handleFileChange}
        accept="image/*"
        required={true}
        validate={validatePhoto}
        onValidate={handleFieldValidation}
      />
    </FormSection>
  );
};

export default PersonalDetailsForm;
