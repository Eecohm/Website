import React from "react";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useNavBarState from "./useNavBarState";
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
  } = useNavBarState();

  const navItems = [
    { name: "Tasks", icon: faTasks, path: "/dashboard/tasks" },
    { name: "Admin", icon: faUserShield, path: "/dashboard/admin" },
    { name: "Academic", icon: faBookOpenReader, path: "/dashboard/academic" },
    { name: "Accounts", icon: faWallet, path: "/dashboard/accounts" },
    { name: "Inventory", icon: faBox, path: "/dashboard/inventory" },
    {
      name: "Teachers",
      icon: faChalkboardTeacher,
      path: "/dashboard/teachers",
    },
    { name: "Students", icon: faUsers, path: "/dashboard/students" },
    { name: "Reports", icon: faChartBar, path: "/dashboard/reports" },
  ];

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
