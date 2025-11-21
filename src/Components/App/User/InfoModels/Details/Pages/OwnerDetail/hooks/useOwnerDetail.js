import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useBaseUrl } from "@/Context/BaseUrlContext";
import { useAuth } from "@/Context/AuthContext";
import { normalizeUserData } from "@/utils/normalizeUserData";
import styles from "@/Components/App/User/InfoModels/Details/Pages/DetailCard.module.css";

export const useOwnerDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = useBaseUrl();
  const { token } = useAuth();
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("id");

  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState({ show: false, url: null });

  useEffect(() => {
    // First, try to use user data from state (passed from UserCard)
    if (location.state?.user) {
      console.log("Using owner data from state:", location.state.user);
      const normalizedOwner = normalizeUserData(location.state.user);
      setOwner(normalizedOwner);
      setLoading(false);
      return;
    }

    // If no state data, fetch from backend
    fetchOwnerData();
  }, [userId, location.state]);

  const fetchOwnerData = async () => {
    try {
      const endpoint = userId
        ? `${baseUrl}/user/owners/${userId}/`
        : `${baseUrl}/user/owners/me/`;

      console.log("Fetching owner from:", endpoint);

      const response = await fetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Owner response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Owner fetch error response:", errorText);
        throw new Error(`Failed to fetch owner data: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Owner data fetched:", data);
      const normalizedOwner = normalizeUserData(data);
      console.log("Owner data normalized:", normalizedOwner);
      setOwner(normalizedOwner);
    } catch (err) {
      console.error("Owner fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate("/dashboard/users/info/owner/form", {
      state: { owner, isEditMode: true },
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
    owner,
    loading,
    error,
    showModal,
    handleEdit,
    handleViewDocument,
    handleCloseModal,
    getKycStatusClass,
  };
};
