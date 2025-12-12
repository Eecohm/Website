import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import { normalizeUserData } from "@/utils/normalizeUserData";
import styles from "@/features/admin/User/InfoModels/Details/Pages/DetailCard.module.css";

export const useGuardianDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [guardian, setGuardian] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState({ show: false, url: null });

  useEffect(() => {
    // First, try to use user data from state (passed from UserCard)
    if (location.state?.user) {
      const normalizedGuardian = normalizeUserData(location.state.user);
      setGuardian(normalizedGuardian);

      setLoading(false);
      return;
    }

    // If no state data, fetch from backend
    fetchGuardianData();
  }, [userId, location.state]);

  const fetchGuardianData = async () => {
    try {
      const endpoint = userId
        ? `${baseUrl}/user/guardians/${userId}/`
        : `${baseUrl}/user/guardians/me/`;

      console.log("Fetching guardian from:", endpoint);

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Guardian response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Guardian fetch error response:", errorText);
        throw new Error(
          `Failed to fetch guardian data: ${response.statusText}`
        );
      }
      console.log("Guardian fetch successful", response);

      const data = await response.json();
      console.log("Guardian data fetched:", data);
      const normalizedGuardian = normalizeUserData(data);
      console.log("Guardian data normalized:", normalizedGuardian);
      setGuardian(normalizedGuardian);
    } catch (err) {
      console.error("Guardian fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/dashboard/users/info/guardian/form", {
      state: { guardian, isEditMode: true },
    });
  };

  const handleViewDocument = (url) => {
    setShowModal({ show: true, url });
  };

  const handleCloseModal = () => {
    setShowModal({ show: false, url: null });
  };

  const getKycStatusClass = (status) => {
    switch (status) {
      case "verified":
        return styles.statusVerified;
      case "pending":
        return styles.statusPending;
      default:
        return styles.statusUnverified;
    }
  };

  return {
    guardian,
    loading,
    error,
    showModal,
    handleEdit,
    handleViewDocument,
    handleCloseModal,
    getKycStatusClass,
  };
};
