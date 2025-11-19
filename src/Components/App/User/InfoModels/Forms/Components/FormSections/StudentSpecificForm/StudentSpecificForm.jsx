import React, { useState } from "react";
import { FiBookOpen } from "react-icons/fi";
import FormSection from "../../FormComponents/FormSection/FormSection";
import GlassInput from "../../FormComponents/GlassInput/GlassInput";
import GlassFileUpload from "../../FormComponents/GlassFileUpload/GlassFileUpload";
import {
  validateUserId,
  validateAcademicClassName,
  validateCreatedByAdmin,
  validateAcademicClassId,
  validateIdCardFile,
  validateTransferCertificate,
  validateClass10Marksheet,
} from "@/validators/formInputValidator/StudentValidator";

const StudentSpecificForm = ({
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

      const requiredFields = [
        "userId",
        "academicClassId",
        "academicClassName",
        "createdByAdmin",
        "idCard",
        "transferCertificate",
        "class10Marksheet",
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

          onValidationChange(allValid, errors);
        }, 0);
      }

      return updated;
    });
  };

  return (
    <FormSection title="Student Details" icon={FiBookOpen}>
      <GlassInput
        label="Imies Code"
        name="userId"
        value={formData.userId}
        placeholder="STU2024001"
        required={true}
        onChange={handleChange}
        validate={validateUserId}
        onValidate={handleFieldValidation}
        disabled={true}
      />

      <GlassInput
        label="Academic Class ID"
        name="academicClassId"
        value={formData.academicClassId}
        onChange={handleChange}
        placeholder="CLS2024-01"
        required={true}
        validate={validateAcademicClassId}
        onValidate={handleFieldValidation}
        disabled={true}
      />
      <GlassInput
        label="Academic Class Name"
        name="academicClassName"
        value={formData.academicClassName}
        onChange={handleChange}
        placeholder="Class 10-A"
        required={true}
        validate={validateAcademicClassName}
        onValidate={handleFieldValidation}
        disabled={true}
      />

      <GlassFileUpload
        label="ID Card"
        name="idCard"
        onChange={handleFileChange}
        accept="image/*"
        required={true}
        validate={validateIdCardFile}
        onValidate={handleFieldValidation}
        disabled={true}
      />
      <GlassFileUpload
        label="Transfer Certificate"
        name="transferCertificate"
        onChange={handleFileChange}
        accept="application/pdf,image/*"
        required={true}
        validate={validateTransferCertificate}
        onValidate={handleFieldValidation}
        disabled={true}
      />
      <GlassFileUpload
        label="Class 10 Marksheet"
        name="class10Marksheet"
        onChange={handleFileChange}
        accept="application/pdf,image/*"
        required={true}
        validate={validateClass10Marksheet}
        onValidate={handleFieldValidation}
        disabled={true}
      />
      <GlassInput
        label="Created By Admin"
        name="createdByAdmin"
        value={formData.createdByAdmin}
        onChange={handleChange}
        placeholder="ADM001"
        required={true}
        validate={validateCreatedByAdmin}
        onValidate={handleFieldValidation}
        disabled={true}
      />
    </FormSection>
  );
};

export default StudentSpecificForm;
