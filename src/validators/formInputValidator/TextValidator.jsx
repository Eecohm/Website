export const isOnlyAlphabets = (str) => {
  return /^[A-Za-z\s]+$/.test(str);
};

export const isValidString = (str) => {
  return /^[A-Za-z0-9\s\-,]+$/.test(str);
};

export const validateAlphabetOnly = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "This field is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  // Check for alphabet-only pattern
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(value)) {
    return "Only alphabets and spaces are allowed";
  }
  return null;
};

// Required name validator
export const validateRequiredName = (value) => {
  return validateAlphabetOnly(value, true);
};

// Optional name validator
export const validateOptionalName = (value) => {
  return validateAlphabetOnly(value, false);
};

export const validateValidString = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "This field is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  if (!isValidString(value)) {
    return "Please enter a valid value (letters, numbers, spaces, hyphens, commas allowed)";
  }
  return null;
};

// Required string validator
export const validateRequiredString = (value) => {
  return validateValidString(value, true);
};

// Optional string validator
export const validateOptionalString = (value) => {
  return validateValidString(value, false);
};

//for ward validation
export const validateRequiredWardNo = (value, isRequired) => {
  if (isRequired && (!value || value.trim() === "")) {
    return "Ward number is required";
  }

  //if not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  //value should be number only
  const wardNoRegex = /^[0-9]+$/;
  if (!wardNoRegex.test(value)) {
    return "Ward number should contain only numbers";
  }
};

export const validateRequiredWard = (value) => {
  return validateRequiredWardNo(value, true);
};

//for phone number validation
export const validatePhoneNumber = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "Phone number is required";
  }

  //if not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  // Remove any spaces, dashes, or other formatting
  const cleanPhone = value.replace(/[^0-9]/g, "");

  // Check length
  if (cleanPhone.length < 10) {
    return "Mobile number must be exactly 10 digits long";
  }

  if (cleanPhone.length > 10) {
    return "Mobile number must be exactly 10 digits long";
  }

  // Check if it starts with 98 or 97
  if (!cleanPhone.startsWith("98") && !cleanPhone.startsWith("97")) {
    return "Mobile number must start with 98 or 97";
  }

  return null; // Valid
};

// Required phone validator
export const validateRequiredPhone = (value) => {
  return validatePhoneNumber(value, true);
};

// Optional phone validator
export const validateOptionalPhone = (value) => {
  return validatePhoneNumber(value, false);
};

export const validateURL = (value) => {
  if (!value) return null; // Not required, so empty is fine
  try {
    new URL(value);
    return null;
  } catch {
    return "Please enter a valid URL";
  }
};

export const validatePANNo = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "PAN number is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  // Remove dashes before validation
  const cleanValue = value.replace(/-/g, "");

  const panRegex = /^[0-9]+$/;
  if (!panRegex.test(cleanValue)) {
    return "PAN number can't be a string, it must be an integer only";
  }
  return null;
};

// Required PAN validator
export const validateRequiredPAN = (value) => {
  return validatePANNo(value, true);
};
