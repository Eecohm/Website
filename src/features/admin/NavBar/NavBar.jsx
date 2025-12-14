import React from "react";
import styles from "@/features/admin/NavBar/NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useNavBarState from "@/features/admin/NavBar/useNavBarState";
import {
  faTasks,
  faUserShield,
  faWallet,
  faBox,
  faChalkboardTeacher,
  faUsers,
  faChartBar,
  faBars,
  faTimes,
  faCog,
  faBookOpenReader,
} from "@fortawesome/free-solid-svg-icons";

import TopBar from "./components/TopBar";
import Sidebar from "./components/Sidebar";
import Backdrop from "./components/Backdrop";
import ModalOverlay from "./components/ModalOverlay";

const NavBar = () => {
  const {
    isSidebarOpen,
    isSettingsOpen,
    showLogoutModal,
    showVerifyModal,
    currentTime,
    today,
    toggleSidebar,
    toggleSettings,
    handleLogoClick,
    handleLogout,
    handleNavItemClick,
    handleSettingsItemClick,
    setShowLogoutModal,
    setShowVerifyModal,
    location,
    navItems: rawNavItems,
  } = useNavBarState();

  const iconMap = {
    tasks: faTasks,
    admin: faUserShield,
    academic: faBookOpenReader,
    accounts: faWallet,
    inventory: faBox,
    teachers: faChalkboardTeacher,
    students: faUsers,
    reports: faChartBar,
  };

  const navItems = rawNavItems.map((item) => ({
    ...item,
    icon: iconMap[item.icon] || faTasks, // Fallback if icon not found
  }));

  const settingsItems = [
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Preferences", path: "/dashboard/preferences" },
    { name: "Logout", action: () => setShowLogoutModal(true) },
  ];

  return (
    <div className={styles.mainNavDiv}>
      {/* Backdrop for mobile */}
      <Backdrop
        visible={isSidebarOpen || showLogoutModal || showVerifyModal}
        onClose={() => {
          setIsSidebarOpen(false);
          setShowLogoutModal(false);
          setShowVerifyModal(false);
        }}
      />

      <TopBar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        handleLogoClick={handleLogoClick}
        today={today}
        currentTime={currentTime}
        isSettingsOpen={isSettingsOpen}
        toggleSettings={toggleSettings}
        settingsItems={settingsItems}
        handleSettingsItemClick={handleSettingsItemClick}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        navItems={navItems}
        handleNavItemClick={handleNavItemClick}
        handleLogoClick={handleLogoClick}
        location={location}
      />

      {/* Logout Modal */}
      {showLogoutModal && (
        <ModalOverlay>
          <h3>Do you want to logout?</h3>
          <div className={styles.modalButtons}>
            <button className={styles.logoutButton} onClick={handleLogout}>
              Yes, Logout
            </button>
            <button
              className={styles.cancelButton}
              onClick={() => setShowLogoutModal(false)}
            >
              Cancel
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* 🚫 Verification Modal */}
      {showVerifyModal && (
        <ModalOverlay>
          <h3>User not verified</h3>
          <p>Please verify your account to access this section.</p>
          <div className={styles.modalButtons}>
            <button
              className={styles.cancelButton}
              onClick={() => setShowVerifyModal(false)}
            >
              OK
            </button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
};

export default NavBar;
