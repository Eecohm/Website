//validate telephone number
export const isValidTelephone = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "Telephone number is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  // Remove any spaces, dashes, or other formatting
  const cleanPhone = value.replace(/[^0-9]/g, "");

  // Accept 1 to 10 numeric digits
  if (cleanPhone.length === 0) {
    return isRequired ? "Telephone number is required" : null;
  }

  if (cleanPhone.length > 10) {
    return "Telephone number must not exceed 10 digits";
  }

  return null;
};

// Required telephone validator
export const validateRequiredTelephone = (value) => {
  return isValidTelephone(value, true);
};

// Optional telephone validator
export const validateOptionalTelephone = (value) => {
  return isValidTelephone(value, false);
};

export const isValidPhone = (phone) => {
  const pattern = /^(98|97)\d{8}$/;
  return pattern.test(phone);
};

export const validateFile = (file, allowPngOnly = false) => {
  if (!file) return { valid: false, message: "No file selected" };

  const maxSize = 3 * 1024 * 1024; // 3MB
  const validTypes = allowPngOnly
    ? ["image/png"]
    : ["image/jpeg", "image/jpg", "image/png"];

  if (file.size > maxSize) {
    return { valid: false, message: "File must be under 3MB" };
  }

  if (!validTypes.includes(file.type)) {
    return {
      valid: false,
      message: allowPngOnly
        ? "Only PNG files are allowed"
        : "Only JPG, JPEG, or PNG files are allowed",
    };
  }

  return { valid: true };
};

// Validate integer input - no alphabets allowed
export const isValidInteger = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "This field is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  // Check if value contains any non-numeric characters (alphabets, special chars, etc.)
  const hasNonNumeric = /[^0-9\-]/.test(value);
  if (hasNonNumeric) {
    return "Only numbers are allowed. Alphabets and special characters are not permitted";
  }

  // Ensure it's a valid integer (can be negative)
  const numValue = parseInt(value, 10);
  if (isNaN(numValue)) {
    return "Please enter a valid integer";
  }

  return null; // Valid
};

// Validate positive integer only (no negative numbers)
export const isValidPositiveInteger = (value, isRequired = false) => {
  const error = isValidInteger(value, isRequired);
  if (error) return error;

  if (!value || value.trim() === "") return null;

  const numValue = parseInt(value, 10);
  if (numValue < 0) {
    return "Please enter a positive integer";
  }

  return null; // Valid
};

// Validate integer with max length
export const isValidIntegerWithMaxLength = (
  value,
  maxLength,
  isRequired = false
) => {
  const error = isValidInteger(value, isRequired);
  if (error) return error;

  if (!value || value.trim() === "") return null;

  if (value.length > maxLength) {
    return `Maximum ${maxLength} digits allowed`;
  }

  return null; // Valid
};
