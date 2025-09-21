import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useBaseUrl } from "../../../../BaseUrlContext";

/**
 * Custom hook to manage user verification status
 * Returns user verification data and loading state
 */
export const useUserVerification = () => {
  const [userStatus, setUserStatus] = useState({
    verified: null,
    kyc_status: null,
    role: null,
    loading: true,
    error: null,
  });

  const { token, isAuthenticated } = useAuth();
  const baseUrl = useBaseUrl();

  useEffect(() => {
    const fetchUserStatus = async () => {
      // If not authenticated, don't fetch
      if (!isAuthenticated() || !token) {
        setUserStatus({
          verified: false,
          kyc_status: "unverified",
          role: null,
          loading: false,
          error: null,
        });
        return;
      }

      try {
        setUserStatus((prev) => ({ ...prev, loading: true, error: null }));

        const response = await fetch(`${baseUrl}/user/me/`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Authentication failed");
          }
          throw new Error(`Failed to fetch user status: ${response.status}`);
        }

        const data = await response.json();
        setUserStatus({
          verified: data.verified,
          kyc_status: data.kyc_status,
          role: data.role,
          loading: false,
          error: null,
        });
      } catch (error) {
        console.error("Error fetching user verification status:", error);
        setUserStatus((prev) => ({
          ...prev,
          loading: false,
          error: error.message,
        }));
      }
    };

    fetchUserStatus();
  }, [token, baseUrl, isAuthenticated]);

  /**
   * Check if user has full access to dashboard features
   * @returns {boolean} true if verified = True and kyc_status = "verified"
   */
  const hasFullAccess = () => {
    return userStatus.verified === true && userStatus.kyc_status === "verified";
  };

  /**
   * Check if user verification is pending admin approval
   * @returns {boolean} true if kyc_status is "pending"
   */
  const isPending = () => {
    return userStatus.kyc_status === "pending";
  };

  /**
   * Check if user needs to complete KYC forms
   * @returns {boolean} true if kyc_status is "unverified"
   */
  const needsKyc = () => {
    return userStatus.kyc_status === "unverified";
  };

  /**
   * Check if user verification was rejected
   * @returns {boolean} true if kyc_status is "rejected"
   */
  const isRejected = () => {
    return userStatus.kyc_status === "rejected";
  };

  /**
   * Check if user is verified but KYC is not complete
   * @returns {boolean} true if verified = True but kyc_status != "verified"
   */
  const isVerifiedButKycIncomplete = () => {
    return userStatus.verified === true && userStatus.kyc_status !== "verified";
  };

  /**
   * Check if user is not verified
   * @returns {boolean} true if verified = False
   */
  const isNotVerified = () => {
    return userStatus.verified === false;
  };

  /**
   * Get user verification status message
   * @returns {string} Human readable status message
   */
  const getStatusMessage = () => {
    if (userStatus.loading) return "Loading verification status...";
    if (userStatus.error) return "Error loading verification status";

    // Handle all possible combinations
    if (hasFullAccess()) {
      return "Your account is verified and active. You have full access to all features.";
    }

    // KYC Status specific messages
    if (isRejected()) {
      return "Your KYC verification has been rejected. Please contact support for assistance.";
    }

    if (needsKyc()) {
      return "Please complete your KYC registration forms to access dashboard features.";
    }

    if (isPending()) {
      if (userStatus.verified === true) {
        return "Your KYC submission is pending admin approval. You are verified but waiting for KYC approval.";
      } else {
        return "Your KYC submission is pending approval. Please wait for admin confirmation.";
      }
    }

    // Handle case where verified = True but kyc_status = "verified" (shouldn't happen but just in case)
    if (isVerifiedButKycIncomplete()) {
      return "Your account is verified but KYC process is incomplete. Please contact support.";
    }

    // Handle case where verified = False
    if (isNotVerified()) {
      return "Your account verification is incomplete. Please complete the verification process.";
    }

    return "Verification status unknown. Please contact support.";
  };

  /**
   * Get the appropriate action for current status
   * @returns {object} Action object with text and path
   */
  const getStatusAction = () => {
    // For pending users - show KYC form directly
    if (isPending()) {
      return {
        text: "View Details",
        path: "/dashboard/kyc/form",
        type: "action",
      };
    }

    // For unverified users - show KYC detail view first
    if (needsKyc()) {
      return {
        text: "Complete KYC Form",
        path: "/dashboard/kyc/form",
        type: "action",
      };
    }

    // For rejected users - show KYC form to resubmit
    if (isRejected()) {
      return {
        text: "View Details",
        path: "/dashboard/kyc/form",
        type: "action",
      };
    }

    if (isVerifiedButKycIncomplete()) {
      return {
        text: "Contact Support",
        path: "/contact",
        type: "support",
      };
    }

    if (isNotVerified()) {
      return {
        text: "Complete Verification",
        path: "/dashboard/register",
        type: "action",
      };
    }

    return null;
  };

  return {
    ...userStatus,
    hasFullAccess,
    isPending,
    needsKyc,
    isRejected,
    isVerifiedButKycIncomplete,
    isNotVerified,
    getStatusMessage,
    getStatusAction,
    refetch: () => {
      setUserStatus((prev) => ({ ...prev, loading: true }));
      // Trigger useEffect by updating a dependency
    },
  };
};
