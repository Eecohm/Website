import { clearAuthState } from "@/Context/Auth/clearAuthState";

export const logout = async (baseUrl, setToken, setVerified) => {
  try {
    await fetch(`${baseUrl}/user/logout/`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Logout API call failed:", error);
  }
  clearAuthState(setToken, setVerified);
};
