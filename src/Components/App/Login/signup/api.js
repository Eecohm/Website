//the two functions below make api calls to backend

export const registerUser = async (baseUrl, formData) => {
  return fetch(`${baseUrl}/user/register/`, {
    //used to send data
    method: "POST",

    //tells server expect JSON in the request body.
    headers: { "Content-Type": "application/json" },

    //converts the registration data into json string before sending it
    body: JSON.stringify({
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      role: formData.role,
    }),
  });
};
//tries to create a new user account on the backend

export const verifyOtp = async (baseUrl, formData) => {
  //calls the backend api
  return fetch(`${baseUrl}/user/otp-verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: formData.email,
      otp: formData.otp,
    }),
  });
};
//tries to verify users identity by checking if the otp is valid
