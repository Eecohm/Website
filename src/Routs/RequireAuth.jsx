import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Components/App/Login/Auth/AuthContext";
import LoadingSpinner from "../Components/App/Kyc/LoadingSpinner ";

const RequireAuth = ({ children }) => {
  const { token, verified, kyc_status, isLoading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth status
  if (isLoading) return <LoadingSpinner />;

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is not verified, allow access only to dashboard
  // (which will show the verification notice)
  if (!verified && location.pathname !== "/dashboard") {
    return <Navigate to="/dashboard" replace />;
  }

  // If user is verified but KYC is not complete, allow access only to:
  // - Dashboard (which shows KYC verification card)
  // - KYC routes (form, status, details)
  if (verified && kyc_status !== "verified") {
    const allowedRoutes = [
      "/dashboard",
      "/kyc/form",
      "/kyc/status",
      "/kyc/details",
    ];

    const isAllowedRoute = allowedRoutes.some((route) =>
      location.pathname.startsWith(route)
    );

    if (!isAllowedRoute) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  // If everything is verified, allow access to all routes
  return children;
};

export default RequireAuth;
