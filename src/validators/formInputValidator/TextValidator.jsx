export const isOnlyAlphabets = (str) => {
    return /^[A-Za-z\s]+$/.test(str);
}

export const isValidString = (str) => {
  return /^[A-Za-z0-9\s\-,]+$/.test(str);
}