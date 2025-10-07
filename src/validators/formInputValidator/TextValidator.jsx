export const isOnlyAlphabets = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
}

export const isValidString = (str) => {
  return /^[A-Za-z0-9\s\-,]+$/.test(str);
}

export const validateAlphabetOnly = (value) => {
  if (!value) return null; // Not required, so empty is fine
  const nameRegex = /^[A-Za-z]+$/;
  if (!nameRegex.test(value)) {
    return "Only alphabets are allowed";
  }
  return null;
};
