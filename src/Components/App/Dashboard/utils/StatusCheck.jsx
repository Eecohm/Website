// utils/StatusCheck.js
import { useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/Context/Auth/Cookies";

export const useStatusCheck = (baseUrl, token, onUnverified) => {
  useEffect(() => {
    const checkStatus = async () => {
      if (!token) return;

      try {
        const id = getCookie("id");
        const response = await axios.get(`${baseUrl}/user/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = response.data;

        if (!data.verified && data.kyc_status === "unverified") {
          // trigger callback to show modal
          onUnverified(data.role);
        }
      } catch (error) {
        console.error("Status check failed:", error);
      }
    };

    checkStatus();
  }, [baseUrl, token, onUnverified]);
};
