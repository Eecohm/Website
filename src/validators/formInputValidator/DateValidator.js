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

  //check if date is to less
  if (date < 3) {
    return "Date of birth should be above 3 years";
  }

  // Check if date is not in the future
  if (date > today) {
    return "Date of birth cannot be in the future";
  }

  // Check if person is not too old
  const maxAge = 80;
  const minDate = new Date();
  minDate.setFullYear(today.getFullYear() - maxAge);

  if (date < minDate) {
    return "Please enter a valid date of birth";
  }

  return null; // Valid
};
