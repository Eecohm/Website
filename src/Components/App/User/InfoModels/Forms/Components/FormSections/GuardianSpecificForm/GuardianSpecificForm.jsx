import React, { useState } from "react";
import { Users } from "lucide-react";
import FormSection from "@/Components/App/User/InfoModels/Forms/Components/FormComponents/FormSection/FormSection";
import GlassInput from "@/Components/App/User/InfoModels/Forms/Components/FormComponents/GlassInput/GlassInput";
import { validateRequiredString } from "@/validators/formInputValidator/TextValidator";

const GuardianSpecificForm = ({
  formData,
  handleChange,
  onValidationChange,
  allowEmptyGuardianIds = false,
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

      const requiredFields = allowEmptyGuardianIds
        ? []
        : ["userId", "studentIds"]; // Define what's required
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
    <FormSection title="Guardian Details" icon={Users}>
      <GlassInput
        label="User ID"
        name="userId"
        value={formData.userId}
        onChange={handleChange}
        placeholder="User ID"
        required={true}
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="User Email"
        name="userEmail"
        value={formData.userEmail}
        onChange={handleChange}
        type="email"
        placeholder="Email (read-only)"
        disabled={true}
        required={false}
      />
      <div style={{ gridColumn: "1 / -1" }}>
        <GlassInput
          label="Student IDs (comma-separated)"
          name="studentIds"
          value={formData.studentIds}
          onChange={handleChange}
          placeholder="e.g., 101, 102, 103"
          required={true}
          validate={validateRequiredString}
          onValidate={handleFieldValidation}
        />
      </div>
    </FormSection>
  );
};

export default GuardianSpecificForm;
