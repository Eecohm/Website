import React, { useState } from "react";
import { Phone } from "lucide-react";
import FormSection from "../../FormComponents/FormSection/FormSection";
import GlassInput from "../../FormComponents/GlassInput/GlassInput";
import {
  validateRequiredPhone,
  validateOptionalPhone,
  validateURL,
  validateOptionalName,
} from "@/validators/formInputValidator/TextValidator";

const ContactDetailsForm = ({ formData, handleChange, onValidationChange }) => {
  const [validFields, setValidFields] = useState(new Set());

  const handleFieldValidation = (fieldName, isValid) => {
    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
      } else {
        updated.delete(fieldName);
      }

      const requiredFields = ["phone"]; // Only mobile phone is required
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
    <FormSection title="Contact Details" icon={Phone}>
      <GlassInput
        label="Telephone"
        name="tellPhone"
        value={formData.tellPhone}
        onChange={handleChange}
        required={false}
        placeholder="Telephone (Optional)"
        validate={validateOptionalPhone}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Mobile Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        required={true}
        placeholder="Mobile"
        validate={validateRequiredPhone}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Alternate Phone"
        name="alternatePhone"
        value={formData.alternatePhone}
        onChange={handleChange}
        required={false}
        placeholder="Alternate (Optional)"
        validate={validateOptionalPhone}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Website"
        name="website"
        type="url"
        value={formData.website}
        onChange={handleChange}
        required={false}
        placeholder="Website URL (Optional)"
        validate={validateURL}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Contact Person"
        name="contactPerson"
        value={formData.contactPerson}
        onChange={handleChange}
        required={false}
        placeholder="Contact person (Optional)"
        validate={validateOptionalName}
        onValidate={handleFieldValidation}
      />
    </FormSection>
  );
};

export default ContactDetailsForm;
