import { useState, useEffect, useCallback } from "react";
import {
  validateUserId,
  validateAcademicClassId,
  validateAcademicClassName,
  validateCreatedByAdmin,
  validateIdCardFile,
  validateTransferCertificate,
  validateClass10Marksheet,
  validateClassIdAndName,
} from "@/validators/formInputValidator/StudentValidator";

export const useStudentValidation = (formData, onValidationChange) => {
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {};

    // Validate each field
    const userIdError = validateUserId(formData.userId);
    if (userIdError) newErrors.userId = userIdError;

    const classIdError = validateAcademicClassId(formData.academicClassId);
    if (classIdError) newErrors.academicClassId = classIdError;

    const classNameError = validateAcademicClassName(
      formData.academicClassName
    );
    if (classNameError) newErrors.academicClassName = classNameError;

    const adminError = validateCreatedByAdmin(formData.createdByAdmin);
    if (adminError) newErrors.createdByAdmin = adminError;

    // File validations
    const idCardError = validateIdCardFile(formData.idCard);
    if (idCardError) newErrors.idCard = idCardError;

    const transferError = validateTransferCertificate(
      formData.transferCertificate,
      formData.isTransferStudent
    );
    if (transferError) newErrors.transferCertificate = transferError;

    const marksheetError = validateClass10Marksheet(
      formData.class10Marksheet,
      formData.currentGrade
    );
    if (marksheetError) newErrors.class10Marksheet = marksheetError;

    // Cross validation
    const crossValidationError = validateClassIdAndName(
      formData.academicClassId,
      formData.academicClassName
    );
    if (crossValidationError) {
      newErrors.classMatch = crossValidationError;
    }

    setErrors(newErrors);
    const formIsValid = Object.keys(newErrors).length === 0;
    setIsValid(formIsValid);

    // Notify parent component
    if (onValidationChange) {
      onValidationChange(formIsValid, newErrors);
    }
  }, [
    formData.userId,
    formData.academicClassId,
    formData.academicClassName,
    formData.createdByAdmin,
    formData.idCard,
    formData.transferCertificate,
    formData.class10Marksheet,
    formData.isTransferStudent,
    formData.currentGrade,
    onValidationChange,
  ]);

  useEffect(() => {
    validateForm();
  }, [validateForm]);

  return {
    errors,
    isValid,
    validateForm,
  };
};
