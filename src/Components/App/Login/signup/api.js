export const registerUser = async (baseUrl, formData) => {
  return fetch(`${baseUrl}/user/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      role: formData.role,
    }),
  });
};

export const verifyOtp = async (baseUrl, formData) => {
  return fetch(`${baseUrl}/user/otp-verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      otp: formData.otp,
    }),
  });
};
