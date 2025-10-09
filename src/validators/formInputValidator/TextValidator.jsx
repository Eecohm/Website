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

export const validatePhoneNumber = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "Phone number is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  const phoneRegex = /^[0-9+\-\s()]+$/;
  if (!phoneRegex.test(value)) {
    return "Please enter a valid phone number";
  }
  if (value.replace(/[^0-9]/g, "").length < 10) {
    return "Phone number must be at least 10 digits";
  }
  return null;
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

export const validateNagariktaNo = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "Citizenship number is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  const nagariktaRegex = /^[0-9\-\/]+$/;
  if (!nagariktaRegex.test(value)) {
    return "Please enter a valid citizenship number";
  }
  if (value.replace(/[^0-9]/g, "").length < 8) {
    return "Citizenship number must be at least 8 digits";
  }
  return null;
};

// Required citizenship validator
export const validateRequiredNagarikta = (value) => {
  return validateNagariktaNo(value, true);
};

export const validatePANNo = (value, isRequired = false) => {
  // Check if field is required and empty
  if (isRequired && (!value || value.trim() === "")) {
    return "PAN number is required";
  }

  // If not required and empty, it's valid
  if (!value || value.trim() === "") return null;

  const panRegex = /^[0-9]+$/;
  if (!panRegex.test(value)) {
    return "PAN number should contain only numbers";
  }
  if (value.length !== 9) {
    return "PAN number must be exactly 9 digits";
  }
  return null;
};

// Required PAN validator
export const validateRequiredPAN = (value) => {
  return validatePANNo(value, true);
};
