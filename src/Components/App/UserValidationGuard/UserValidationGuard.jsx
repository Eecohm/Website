import React from "react";
import { useUserVerification } from "../Login/Auth/useUserVerification";
import VerificationBlockedScreen from "../VerificationBlockedScreen/VerificationBlockedScreen";

/**
 * UserValidationGuard - A reusable component that protects dashboard routes
 * Only allows access to children components if user is fully verified
 *
 * @param {React.ReactNode} children - Components to render if user has access
 * @param {boolean} allowPending - Whether to allow pending users (default: false)
 * @param {boolean} allowIncomplete - Whether to allow users with incomplete KYC (default: false)
 * @param {string} fallbackMessage - Custom message when access is denied
 */
const UserValidationGuard = ({
  children,
  allowPending = false,
  allowIncomplete = false,
  fallbackMessage = null,
}) => {
  const {
    loading,
    error,
    hasFullAccess,
    isPending,
    needsKyc,
    isRejected,
    getStatusMessage,
    getStatusAction,
  } = useUserVerification();

  // Show loading state while checking verification
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          fontSize: "1.2rem",
          color: "#666",
        }}
      >
        <div>
          <div style={{ marginBottom: "10px" }}>🔍</div>
          Checking verification status...
        </div>
      </div>
    );
  }

  // Show error state if verification check failed
  if (error) {
    return (
      <VerificationBlockedScreen
        status="error"
        message={
          fallbackMessage ||
          "Unable to verify your account status. Please try again."
        }
        action={{
          text: "Retry",
          path: window.location.pathname,
          type: "action",
        }}
      />
    );
  }

  // Check if user has the required access level
  const shouldBlockAccess = () => {
    // Always block rejected users
    if (isRejected()) return true;

    // Block users with incomplete KYC unless allowed
    if (needsKyc() && !allowIncomplete) return true;

    // Block pending users unless allowed
    if (isPending() && !allowPending) return true;

    // Allow users with full access
    if (hasFullAccess()) return false;

    // Block by default for unknown states
    return true;
  };

  if (shouldBlockAccess()) {
    // Determine the appropriate status for display
    let displayStatus = "restricted";
    if (isRejected()) displayStatus = "rejected";
    else if (needsKyc()) displayStatus = "incomplete";
    else if (isPending()) displayStatus = "pending";

    return (
      <VerificationBlockedScreen
        status={displayStatus}
        message={fallbackMessage || getStatusMessage()}
        action={getStatusAction()}
      />
    );
  }

  // User has sufficient access, render the protected content
  return <>{children}</>;
};

/**
 * Higher-order component version for wrapping routes
 */
export const withUserValidation = (Component, validationProps = {}) => {
  return (props) => (
    <UserValidationGuard {...validationProps}>
      <Component {...props} />
    </UserValidationGuard>
  );
};

/**
 * Hook version for conditional rendering within components
 */
export const useUserValidationCheck = (options = {}) => {
  const verification = useUserVerification();
  const { allowPending = false, allowIncomplete = false } = options;

  const shouldBlockAccess = () => {
    if (verification.loading) return false; // Don't block while loading
    if (verification.isRejected()) return true;
    if (verification.needsKyc() && !allowIncomplete) return true;
    if (verification.isPending() && !allowPending) return true;
    if (verification.hasFullAccess()) return false;
    return true;
  };

  return {
    ...verification,
    shouldBlockAccess: shouldBlockAccess(),
    canAccess: !shouldBlockAccess(),
  };
};

export default UserValidationGuard;
