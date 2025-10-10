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

  // Check length - Nepal landline numbers are 8 digits
  if (cleanPhone.length < 8) {
    return "Telephone number must be exactly 8 digits long";
  }

  if (cleanPhone.length > 8) {
    return "Telephone number must be exactly 8 digits long";
  }

  // Check if it starts with valid Nepal area codes
  // Common Nepal area codes: 01, 02, 03, 04, 05, 06, 07, 08, 09
  const validAreaCodes = ["01", "02", "03", "04", "05", "06", "07", "08", "09"];
  const areaCode = cleanPhone.substring(0, 2);

  if (!validAreaCodes.includes(areaCode)) {
    return "Telephone number must start with a valid area code (01, 02, 03, 04, 05, 06, 07, 08, 09)";
  }

  return null; // Valid
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
  const pattern = /^(98|97|91)\d{8}$/;
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
