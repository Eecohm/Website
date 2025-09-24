//this ensures inputs are correct before making api calls

export const validateForm = (formData, isOtpSent) => {
  const errors = {};
  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  if (!emailRegex.test(formData.email)) {
    errors.email = "Please enter a valid email";
  }
  if (!formData.password || formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  if (!formData.role) {
    errors.role = "Please select a role";
  }
  if (isOtpSent && (!formData.otp || formData.otp.length !== 6)) {
    errors.otp = "OTP must be 6 digits";
  }

  return errors;
};
