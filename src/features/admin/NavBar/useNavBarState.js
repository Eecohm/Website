import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/Context/AuthContext";
import styles from "./NavBar.module.css";

export default function useNavBarState() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, verified, role } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour12: true,
      hour: "numeric",
      minute: "2-digit",
    })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Close sidebar/settings when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const target = event.target;

      // Check if click is outside all interactive elements
      const isClickOutsideSidebar = !target.closest(`.${styles.navBar}`);
      const isClickOutsideToggle = !target.closest(`.${styles.navBarToggle}`);
      const isClickOutsideSettings = !target.closest(
        `.${styles.settingsContainer}`
      );
      const isClickOnBackdrop = target.classList.contains(styles.backdrop);

      if (isClickOnBackdrop) {
        // Backdrop clicked - close everything
        setIsSidebarOpen(false);
        setIsSettingsOpen(false);
      } else if (
        isClickOutsideSidebar &&
        isClickOutsideToggle &&
        isClickOutsideSettings
      ) {
        // Clicked outside all menus
        setIsSidebarOpen(false);
        setIsSettingsOpen(false);
      }
    };

    const handleTouchOutside = (event) => {
      // Handle touch events the same way as clicks
      handleOutsideClick(event);
    };

    if (isSidebarOpen || isSettingsOpen) {
      document.addEventListener("click", handleOutsideClick);
      document.addEventListener("touchend", handleTouchOutside);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
      document.removeEventListener("touchend", handleTouchOutside);
    };
  }, [isSidebarOpen, isSettingsOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSettingsOpen(false);
  }, [location.pathname]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((s) => !s);
    setIsSettingsOpen(false);
  }, []);

  const toggleSettings = useCallback(
    (event) => {
      if (event && event.stopPropagation) event.stopPropagation();
      setIsSettingsOpen((s) => !s);
      if (isSidebarOpen) setIsSidebarOpen(false);
    },
    [isSidebarOpen]
  );

  const handleLogoClick = useCallback(() => {
    navigate("/dashboard");
    setIsSidebarOpen(false);
    setIsSettingsOpen(false);
  }, [navigate]);

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [logout, navigate]);

  // nav and settings items are static; keep them here so NavBar can stay presentational
  const allNavItems = [
    { name: "Tasks", icon: "tasks", path: "/dashboard/tasks" },
    { name: "Admin", icon: "admin", path: "/dashboard/admin" },
    { name: "Academic", icon: "academic", path: "/dashboard/academic" },
    { name: "Accounts", icon: "accounts", path: "/dashboard/accounts" },
    { name: "Inventory", icon: "inventory", path: "/dashboard/inventory" },
    { name: "Teachers", icon: "teachers", path: "/dashboard/teachers" },
    { name: "Students", icon: "students", path: "/dashboard/students" },
    { name: "Reports", icon: "reports", path: "/dashboard/reports" },
  ];

  // Filter nav items based on role
  // Only Admin and Owner can see the "Admin" tab
  const getNavItems = useCallback(() => {
    return allNavItems.filter(item => {
      if (item.name === "Admin") {
        return role === 'admin' || role === 'owner';
      }
      return true;
    });
  }, [role, verified]);

  const navItems = getNavItems();

  const settingsItems = [
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Preferences", path: "/dashboard/preferences" },
    { name: "Logout", action: () => setShowLogoutModal(true) },
  ];

  // Check verification before navigation
  const handleNavItemClick = useCallback(
    (path) => {
      if (!verified && path !== "/dashboard") {
        setShowVerifyModal(true);
        return;
      }
      navigate(path);
      setIsSidebarOpen(false);
    },
    [navigate, verified]
  );

  const handleSettingsItemClick = useCallback(
    (item) => {
      if (item.action) {
        item.action();
      } else {
        navigate(item.path);
      }
      setIsSettingsOpen(false);
    },
    [navigate]
  );

  return {
    // state
    isSidebarOpen,
    isSettingsOpen,
    showLogoutModal,
    showVerifyModal,
    currentTime,
    today,
    // handlers
    toggleSidebar,
    toggleSettings,
    handleLogoClick,
    handleLogout,
    handleNavItemClick,
    handleSettingsItemClick,
    // setters for external control
    setShowLogoutModal,
    setShowVerifyModal,
    // data
    navItems,
    settingsItems,
    location,
  };
}
