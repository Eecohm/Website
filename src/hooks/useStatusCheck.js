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
        const response = await axios.get(`${baseUrl}/user/me/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = response.data;
        if (!data.verified) {
          // trigger callback to show modal
          console.log(data.id);
          onUnverified(data.role, data.kyc_status, data.id);

        }
      } catch (error) {
        console.error("Status check failed:", error);
      }
    };

    checkStatus();
  }, [baseUrl, token, onUnverified]);
};
