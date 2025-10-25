import React, { useState } from "react";
import { FileText } from "lucide-react";
import FormSection from "../../FormComponents/FormSection/FormSection";
import GlassInput from "../../FormComponents/GlassInput/GlassInput";
import GlassFileUpload from "../../FormComponents/GlassFileUpload/GlassFileUpload";
import { validateRequiredPAN } from "@/validators/formInputValidator/TextValidator";
import { validateRequiredNagarikta } from "@/validators/formInputValidator/CitizenshipValidator";
const DocumentDetailsForm = ({
  formData,
  handleChange,
  handleFileChange,
  onValidationChange,
}) => {
  const [validFields, setValidFields] = useState(new Set());

  const handleFieldValidation = (fieldName, isValid) => {
    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
      } else {
        updated.delete(fieldName);
      }

      const requiredFields = ["nagariktaNo", "panNo"];
      const allValid = requiredFields.every((field) => updated.has(field));

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

  return (
    <FormSection title="Document Details" icon={FileText}>
      <GlassInput
        label="Nagarikta Number"
        name="nagariktaNo"
        value={formData.nagariktaNo}
        onChange={handleChange}
        required={true}
        placeholder="Citizenship No."
        validate={validateRequiredNagarikta}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="PAN Number"
        name="panNo"
        value={formData.panNo}
        onChange={handleChange}
        required={true}
        placeholder="PAN No."
        validate={validateRequiredPAN}
        onValidate={handleFieldValidation}
      />
      <GlassFileUpload
        label="Nagarikta Photo"
        name="nagariktaPhoto"
        onChange={handleFileChange}
        accept="image/*"
        required={true}
      />
      <GlassFileUpload
        label="PAN Photo"
        name="panPhoto"
        onChange={handleFileChange}
        accept="image/*"
        required={true}
      />
    </FormSection>
  );
};

export default DocumentDetailsForm;
