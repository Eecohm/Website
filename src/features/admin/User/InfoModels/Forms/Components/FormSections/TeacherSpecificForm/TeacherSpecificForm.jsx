import React from "react";
import { BookOpen } from "lucide-react";
import FormSection from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/FormSection/FormSection";
import GlassInput from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/GlassInput/GlassInput";
import GlassFileUpload from "@/features/admin/User/InfoModels/Forms/Components/FormComponents/GlassFileUpload/GlassFileUpload";
import { validateRequiredString } from "@/validators/formInputValidator/TextValidator";
import { useState, useRef } from "react";

const TeacherSpecificForm = ({
  formData,
  handleChange,
  handleFileChange,
  onValidationChange,
}) => {
  const [validFields, setValidFields] = useState(new Set());
  const lastErrorsStringRef = useRef("");

  const handleFieldValidation = (fieldName, isValid) => {
    console.log(`TeacherSpecificForm: Field ${fieldName} validation:`, isValid);
    setValidFields((prev) => {
      const updated = new Set(prev);
      if (isValid) {
        updated.add(fieldName);
      } else {
        updated.delete(fieldName);
      }

      const requiredFields = [
        "academicQualification",
        "academicClassId",
        "academicClassName",
        "subjectIds",
        "subjectNames",
      ];
      const allValid = requiredFields.every((field) => updated.has(field));
      console.log(`TeacherSpecificForm: Required fields:`, requiredFields);
      console.log(`TeacherSpecificForm: Valid fields:`, Array.from(updated));
      console.log(`TeacherSpecificForm: All valid:`, allValid);

      // Call the parent validation callback
      if (onValidationChange) {
        setTimeout(() => {
          const errors = {};
          requiredFields.forEach((field) => {
            if (!updated.has(field)) {
              errors[field] = `${
                field.charAt(0).toUpperCase() +
                field.slice(1).replace(/([A-Z])/g, " $1")
              } is required`;
            }
          });

          // Convert errors to string for comparison
          const errorsString = JSON.stringify(errors);

          // Compare with ref value (no state update)
          if (errorsString !== lastErrorsStringRef.current) {
            lastErrorsStringRef.current = errorsString;
            onValidationChange(allValid, errors);
          }
        }, 0);
      }
      return updated;
    });
  };
  return (
    <FormSection title="Teacher Details" icon={BookOpen}>
      <GlassInput
        label="User ID"
        name="userId"
        value={formData.userId || ""}
        onChange={handleChange}
        placeholder="User ID"
        disabled={true} // Disabled since not required for submission
        // validate={validateRequiredString}
        // onValidate={handleFieldValidation}
      />
      <GlassInput
        label="User Email"
        name="userEmail"
        value={formData.userEmail || ""}
        onChange={handleChange}
        type="email"
        placeholder="Email (read-only)"
        disabled={true}
        // validate={validateRequiredString}
        // onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Academic Qualification"
        name="academicQualification"
        value={formData.academicQualification || ""}
        onChange={handleChange}
        placeholder="Qualification"
        required={true}
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Academic Class ID"
        name="academicClassId"
        value={formData.academicClassId || ""}
        onChange={handleChange}
        placeholder="Class ID"
        required={true}
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Academic Class Name"
        name="academicClassName"
        value={formData.academicClassName || ""}
        onChange={handleChange}
        placeholder="Class Name"
        required={true}
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Subject IDs (comma-separated)"
        name="subjectIds"
        value={formData.subjectIds || ""}
        onChange={handleChange}
        placeholder="e.g., 1, 2, 3"
        required={true}
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassInput
        label="Subject Names (comma-separated)"
        name="subjectNames"
        value={formData.subjectNames || ""}
        onChange={handleChange}
        placeholder="e.g., Math, Science"
        required={true}
        validate={validateRequiredString}
        onValidate={handleFieldValidation}
      />
      <GlassFileUpload
        label="Job Application"
        name="jobApplication"
        onChange={handleFileChange}
        accept="application/pdf,image/*"
        // onValidate={handleFieldValidation}
        // required={true}
        // validate={(file) => (file ? null : "Job application is required")}
      />
      <GlassFileUpload
        label="Hiring Letter"
        name="hiringLetter"
        onChange={handleFileChange}
        accept="application/pdf,image/*"
        // onValidate={handleFieldValidation}
        // validate={(file) => (file ? null : "Hiring letter is required")}
        // required={true}
      />
      <GlassFileUpload
        label="Resume/CV"
        name="resumeCv"
        onChange={handleFileChange}
        accept="application/pdf"
        // onValidate={handleFieldValidation}
        // validate={(file) => (file ? null : "Resume/CV is required")}
        // required={true}
      />
      <GlassFileUpload
        label="Skill Certifications"
        name="skillCertifications"
        onChange={handleFileChange}
        accept="application/pdf,image/*"
        // onValidate={handleFieldValidation}
        // validate={(file) => (file ? null : "Skill certifications are required")}
        // required={true}
      />
    </FormSection>
  );
};

export default TeacherSpecificForm;
