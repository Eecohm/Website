export const validateDateOfBirth = (dateString) => {
  if (!dateString || dateString.trim() === "") {
    return "Date of birth is required";
  }

  const date = new Date(dateString);
  const today = new Date();

  // Check if date is valid
  if (isNaN(date.getTime())) {
    return "Please enter a valid date";
  }

  // Check if date is not in the future
  if (date > today) {
    return "Date of birth cannot be in the future";
  }

  // Check if person is too young (less than 3 years old)
  const minAge = 2;
  const maxDate = new Date();
  maxDate.setFullYear(today.getFullYear() - minAge);

  if (date > maxDate) {
    return "Person must be at least 2 years old";
  }

  // Check if person is not too old (more than 100 years old)
  const maxAge = 100;
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - maxAge);

  if (date < minDate) {
    return "Please enter a valid date of birth";
  }

  return null; // Valid
};
