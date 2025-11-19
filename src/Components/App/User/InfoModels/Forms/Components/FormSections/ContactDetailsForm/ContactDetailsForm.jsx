import React, { useState } from "react";
import { FiPhone } from "react-icons/fi";
import FormSection from "../../FormComponents/FormSection/FormSection";
import GlassInput from "../../FormComponents/GlassInput/GlassInput";
import {
  validateRequiredPhone,
  validateOptionalPhone,
  validateURL,
  validateOptionalName,
} from "@/validators/formInputValidator/TextValidator";
import { validateOptionalTelephone } from "@/validators/formInputValidator/ContactValidator";

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
    <FormSection title="Contact Details" icon={FiPhone}>
      <GlassInput
        label="Telephone"
        name="tellPhone"
        value={formData.tellPhone}
        onChange={(e) => {
          // Ensure only digits and limit to 10 characters
          const raw = e.target.value || "";
          const clean = raw.replace(/\D/g, "").slice(0, 10);
          // Normalize event shape expected by parent handler
          handleChange({ target: { name: e.target.name, value: clean } });
        }}
        required={false}
        placeholder="Telephone (Optional)"
        validate={validateOptionalTelephone}
        onValidate={handleFieldValidation}
        type="tel"
        inputMode="numeric"
        maxLength={10}
      />
      <GlassInput
        label="Mobile Phone"
        name="phone"
        value={formData.phone}
        onChange={(e) => {
          const raw = e.target.value || "";
          const clean = raw.replace(/\D/g, "").slice(0, 10);
          handleChange({ target: { name: e.target.name, value: clean } });
        }}
        required={true}
        placeholder="Mobile"
        validate={validateRequiredPhone}
        onValidate={handleFieldValidation}
        type="tel"
        inputMode="numeric"
        maxLength={10}
      />
      <GlassInput
        label="Alternate Phone"
        name="alternatePhone"
        value={formData.alternatePhone}
        onChange={(e) => {
          const raw = e.target.value || "";
          const clean = raw.replace(/\D/g, "").slice(0, 10);
          handleChange({ target: { name: e.target.name, value: clean } });
        }}
        required={false}
        placeholder="Alternate (Optional)"
        validate={validateOptionalPhone}
        onValidate={handleFieldValidation}
        type="tel"
        inputMode="numeric"
        maxLength={10}
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
