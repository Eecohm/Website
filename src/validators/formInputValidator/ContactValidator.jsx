export const isValidTelephone = (phone) => {
  // Only allow digits, +, and -
  return /^[\d+-]+$/.test(phone);
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