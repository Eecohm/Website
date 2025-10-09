import React, { useState } from "react";
import { MapPin } from "lucide-react";
import FormSection from "../../FormComponents/FormSection/FormSection";
import GlassInput from "../../FormComponents/GlassInput/GlassInput";
import {
  validateRequiredName,
  validateRequiredString,
  validateOptionalString,
} from "@/validators/formInputValidator/TextValidator";

const AddressDetailsForm = ({ formData, handleChange, onValidationChange }) => {
  const [validFields, setValidFields] = useState(new Set());

  const handleFieldValidation = (fieldName, isValid) => {
    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
      } else {
        updated.delete(fieldName);
      }

      const requiredFields = [
        "country",
        "province",
        "municipality",
        "ward",
        "tole",
      ];
      const allValid = requiredFields.every((field) => updated.has(field));

      // Call the parent validation callback - defer to avoid state update during render
      if (onValidationChange) {
        setTimeout(() => {
          // Create proper errors object - only include invalid fields with error messages
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

  return (
    <FormSection title="Address Details" icon={MapPin}>
      <GlassInput
        label="Country"
        name="country"
        value={formData.country}
        onChange={handleChange}
        required={true}
        placeholder="Country"
        validate={validateRequiredName}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Province"
        name="province"
        value={formData.province}
        onChange={handleChange}
        required={true}
        placeholder="Province"
        validate={validateRequiredName}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Municipality"
        name="municipality"
        value={formData.municipality}
        onChange={handleChange}
        required={true}
        placeholder="Municipality"
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Ward"
        name="ward"
        value={formData.ward}
        onChange={handleChange}
        required={true}
        placeholder="Ward"
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Tole"
        name="tole"
        value={formData.tole}
        onChange={handleChange}
        required={true}
        placeholder="Tole/Area"
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Pin Point"
        name="pinPoint"
        type="url"
        value={formData.pinPoint}
        onChange={handleChange}
        required={false}
        placeholder="Map URL (Optional)"
        validate={validateOptionalString}
        onValidate={handleFieldValidation}
      />
    </FormSection>
  );
};

export default AddressDetailsForm;
