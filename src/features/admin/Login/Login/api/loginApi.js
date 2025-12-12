export const loginUser = async (email, password, baseUrl) => {
  const response = await fetch(`${baseUrl}/user/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }), // Use email, password (not loginEmail)
  });

  if (!response.ok) {
    let errorMessage = "Login failed";
    try {
      const errorData = await response.json();
      // Adjust keys based on your backend (e.g., 'message', 'detail', 'error')
      errorMessage = errorData.message || errorData.detail || errorData.error || "Login failed";
    } catch (e) {
      // Could not parse JSON, use status text
      errorMessage = response.statusText ? `Error: ${response.statusText}` : "Login failed";
    }

    const error = new Error(errorMessage);
    error.status = response.status;
    throw error;
  }

  return response.json(); // ONLY return data
};

export const handleForgotPassword = async (
  forgotEmail,
  baseUrl,
  setResetError,
  setResetStep
) => {
  setResetError("");

  if (!forgotEmail) {
    setResetError("Please enter your email");
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/user/forgot-password/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: forgotEmail }),
    });

    if (res.ok) {
      setResetStep(2);
      setResetError("");
    } else {
      const errorData = await res.json();
      setResetError(errorData.message || "Email not found");
    }
  } catch (error) {
    console.error("Forgot password error:", error);
    setResetError("Error sending email. Please try again.");
  }
};

export const handleVerifyOtpAndSetPassword = async (
  otp,
  newPassword,
  confirmPassword,
  forgotEmail,
  baseUrl,
  setResetError,
  login,
  navigate,
  rememberMe,
  setShowForgotModal
) => {
  if (!otp || !newPassword || !confirmPassword) {
    setResetError("Please fill in all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    setResetError("Passwords don't match");
    return;
  }

  if (newPassword.length < 6) {
    setResetError("Password must be at least 6 characters long");
    return;
  }

  try {
    const res = await fetch(`${baseUrl}/user/otp-verify/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: forgotEmail,
        otp: otp,
        new_password: newPassword,
      }),
    });

    if (res.ok) {
      const data = await res.json();

      // Use AuthContext login method
      login(data, rememberMe);

      // Close modal and redirect
      setShowForgotModal(false);
      navigate("/dashboard");
    } else {
      const errorData = await res.json();
      setResetError(errorData.message || "Reset failed. Please try again.");
    }
  } catch (error) {
    console.error("Password reset error:", error);
    setResetError("Server error. Please try again.");
  }
};
