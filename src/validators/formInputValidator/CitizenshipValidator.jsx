//citizenship number validation
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
  if (
    value.replace(/[^0-9]/g, "").length !== 14 &&
    value.replace(/[^0-9]/g, "").length !== 16
  ) {
    return "Citizenship number must be exactly 14 or 16 digits";
  }
  return null;
};

// Required citizenship validator
export const validateRequiredNagarikta = (value) => {
  return validateNagariktaNo(value, true);
};
