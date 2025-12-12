import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import { normalizeUserData } from "@/utils/normalizeUserData";
import styles from "@/features/admin/User/InfoModels/Details/Pages/GlobalComponents/BasicInfoCard.module.css";

export const useEmployeeDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState({ show: false, url: null });

  useEffect(() => {
    // First, try to use employee data from state: passed from UserCard
    if (location.state?.user) {
      const normalizedEmployee = normalizeUserData(location.state.user);
      setEmployee(normalizedEmployee);
      setLoading(false);
      return;
    }

    // If no state data, fetch from backend
    fetchEmployeeData();
  }, [userId, location.state]);

  const fetchEmployeeData = async () => {
    try {
      const endpoint = userId
        ? `${baseUrl}/user/employees/${userId}/`
        : `${baseUrl}/user/employees/me/`;

      console.log("Fetching employee from:", endpoint);

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Employee response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Employee fetch error response:", errorText);
        throw new Error(
          `Failed to fetch employee data: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("Employee data fetched:", data);
      const normalizedEmployee = normalizeUserData(data);
      setEmployee(normalizedEmployee);
      setLoading(false);
    } catch (err) {
      console.error("Employee fetch error:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/dashboard/users/detail/employee/edit/${userId}`, {
      state: { user: employee },
    });
  };

  const handleViewDocument = (url) => {
    setShowModal({ show: true, url });
  };

  const handleCloseModal = () => {
    setShowModal({ show: false, url: null });
  };

  const getKycStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "verified":
        return styles.statusVerified;
      case "pending":
        return styles.statusPending;
      //   case "rejected":
      //     return styles.statusRejected;
      default:
        return styles.statusUnverified;
    }
  };

  return {
    employee,
    loading,
    error,
    showModal,
    handleEdit,
    handleViewDocument,
    handleCloseModal,
    getKycStatusClass,
  };
};
