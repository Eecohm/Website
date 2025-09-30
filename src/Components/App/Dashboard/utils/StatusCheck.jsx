import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getCookie } from "@/Context/Auth/Cookies";

export const useStatusCheck = (baseUrl, token) => {
  const navigate = useNavigate();

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
          switch (data.role) {
            case "student":
              navigate("/dashboard/users/info/student/form");
              break;
            case "guardian":
              navigate("/dashboard/users/info/guardian/form");
              break;
            case "employee":
              navigate("/dashboard/users/info/employee/form");
              break;
            case "admin":
              navigate("/dashboard/users/info/employee/form");
              break;
            case "owner":
              navigate("/dashboard/users/info/owner/form");
              break;
            case "teacher":
              navigate("/dashboard/users/info/teacher/form");
              break;
            default:
              navigate("/dashboard");
          }
        }
      } catch (error) {
        console.error("Status check failed:", error);
      }
    };

    checkStatus();
  }, [baseUrl, token, navigate]);
};
