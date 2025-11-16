import { useState, useEffect } from "react";

export function useAdminDetail() {
  // Dummy data for demonstration
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState({ show: false, url: "" });

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setAdmin({
        id: 1,
        name: "Admin User",
        email: "admin@example.com",
        status: "approved",
        profileImage: "",
        kycStatus: "verified",
        documents: [],
      });
      setLoading(false);
    }, 500);
  }, []);

  function handleEdit() {
    // Implement edit logic
    alert("Edit admin");
  }

  function handleViewDocument(url) {
    setShowModal({ show: true, url });
  }

  function handleCloseModal() {
    setShowModal({ show: false, url: "" });
  }

  function getKycStatusClass(status) {
    switch (status) {
      case "verified":
        return "kycVerified";
      case "pending":
        return "kycPending";
      case "rejected":
        return "kycRejected";
      default:
        return "kycUnknown";
    }
  }

  return {
    admin,
    loading,
    error,
    showModal,
    handleEdit,
    handleViewDocument,
    handleCloseModal,
    getKycStatusClass,
  };
}
