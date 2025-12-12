import React, { useState } from "react";
import { FileText } from "lucide-react";
import FormSection from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/FormSection/FormSection";
import GlassInput from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/GlassInput/GlassInput";
import GlassFileUpload from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/GlassFileUpload/GlassFileUpload";
import { validatePhoto } from "@/validators/formInputValidator/ValidatePhoto";
const DocumentDetailsForm = ({
  formData,
  handleChange,
  handleFileChange,
  onValidationChange,
}) => {
  const [validFields, setValidFields] = useState(new Set());

  const handleFieldValidation = (fieldName, isValid) => {
    console.log(
      `🔧 DocumentDetails - Field: ${fieldName}, isValid: ${isValid}`
    );

    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
        console.log(`✅ Added ${fieldName} to validFields`);
      } else {
        updated.delete(fieldName);
        console.log(`❌ Removed ${fieldName} from validFields`);
      }

      console.log(`🔍 Current validFields:`, Array.from(updated));

      const requiredFields = [
        "nagariktaNo",
        "panNo",
        "nagariktaPhoto",
        "panPhoto",
      ];
      const allValid = requiredFields.every((field) => updated.has(field));

      console.log(
        `🔍 Required fields check:`,
        requiredFields.map((field) => ({
          field,
          hasField: updated.has(field),
          value: formData[field],
        }))
      );

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
        // validate={validateRequiredNagarikta}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="PAN Number"
        name="panNo"
        value={formData.panNo}
        onChange={handleChange}
        required={true}
        placeholder="PAN No."
        // validate={validateRequiredPAN}
        onValidate={handleFieldValidation}
      />
      <GlassFileUpload
        label="Nagarikta Photo"
        name="nagariktaPhoto"
        onChange={handleFileChange}
        accept="image/*"
        required={true}
        validate={validatePhoto}
        onValidate={handleFieldValidation}
      />
      <GlassFileUpload
        label="PAN Photo"
        name="panPhoto"
        onChange={handleFileChange}
        accept="image/*"
        required={true}
        validate={validatePhoto}
        onValidate={handleFieldValidation}
      />
    </FormSection>
  );
};

export default DocumentDetailsForm;
