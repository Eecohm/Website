export const loginUserApi = async (baseUrl, email, password) => {
  const res = await fetch(`${baseUrl}/user/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Invalid credentials");
  return res.json();
};

export const forgotPasswordApi = async (baseUrl, email) => {
  const res = await fetch(`${baseUrl}/user/forgot-password/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!res.ok) throw new Error("Email not found");
  return res.json();
};

export const verifyOtpApi = async (baseUrl, email, otp, newPassword) => {
  const res = await fetch(`${baseUrl}/user/otp-verify/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, otp, new_password: newPassword }),
  });
  if (!res.ok) throw new Error("OTP verification failed");
  return res.json();
};
