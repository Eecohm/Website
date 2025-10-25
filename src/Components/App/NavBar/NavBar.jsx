import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../../../Context/AuthContext";
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
import logo from "../../../assets/logo.svg";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, verified } = useAuth();

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
      if (
        !event.target.closest(`.${styles.navBar}`) &&
        !event.target.closest(`.${styles.navBarToggle}`) &&
        !event.target.closest(`.${styles.settingsContainer}`)
      ) {
        setIsSidebarOpen(false);
        setIsSettingsOpen(false);
      }
    };

    if (isSidebarOpen || isSettingsOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isSidebarOpen, isSettingsOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
    setIsSettingsOpen(false);
  }, [location.pathname]);

  const toggleSidebar = (event) => {
    event.stopPropagation();
    setIsSidebarOpen(!isSidebarOpen);
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  const toggleSettings = (event) => {
    event.stopPropagation();
    setIsSettingsOpen(!isSettingsOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
    setIsSidebarOpen(false);
    setIsSettingsOpen(false);
  };

  const navItems = [
    { name: "Tasks", icon: faTasks, path: "/dashboard/tasks" },
    { name: "Admin", icon: faUserShield, path: "/dashboard/admin" },
    { name: "Academic", icon: faBookOpenReader, path: "/dashboard/academic" },
    { name: "Accounts", icon: faWallet, path: "/dashboard/accounts" },
    { name: "Inventory", icon: faBox, path: "/dashboard/inventory" },
    { name: "Teachers", icon: faChalkboardTeacher, path: "/dashboard/teachers" },
    { name: "Students", icon: faUsers, path: "/dashboard/students" },
    { name: "Reports", icon: faChartBar, path: "/dashboard/reports" },
  ];

  const settingsItems = [
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Preferences", path: "/dashboard/preferences" },
    { name: "Logout", action: () => setShowLogoutModal(true) },
  ];

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // 🔒 Check verification before navigation
  const handleNavItemClick = (path) => {
    if (!verified && path !== "/dashboard") {
      setShowVerifyModal(true);
      return;
    }
    navigate(path);
    setIsSidebarOpen(false);
  };

  const handleSettingsItemClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      navigate(item.path);
    }
    setIsSettingsOpen(false);
  };

  return (
    <div className={styles.mainNavDiv}>
      {/* Backdrop for mobile */}
      {(isSidebarOpen || showLogoutModal || showVerifyModal) && (
        <div
          className={styles.backdrop}
          onClick={() => {
            setIsSidebarOpen(false);
            setShowLogoutModal(false);
            setShowVerifyModal(false);
          }}
        />
      )}

      {/* 🔝 Top Bar */}
      <header className={styles.topBar}>
        <div className={styles.topBarContent}>
          <div className={styles.topBarLeft}>
            <div className={styles.navBarToggle} onClick={toggleSidebar}>
              <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
            </div>
            <img
              src={logo}
              alt="School Logo"
              className={styles.topBarLogo}
              onClick={handleLogoClick}
            />
          </div>
          <h1 className={styles.schoolName} onClick={handleLogoClick}>
            EECOHM Foundation
          </h1>
          <div className={styles.topBarInfoGroup}>
            <div className={styles.topBarInfo}>
              <span className={styles.dateSpan}>{today}</span>
              <span className={styles.timeSpan}>{currentTime}</span>
              <span className={styles.contactSpan}>Contact: 023-546392</span>
            </div>
            <div className={styles.settingsContainer} onClick={toggleSettings}>
              <FontAwesomeIcon icon={faCog} className={styles.settingsIcon} />
              {isSettingsOpen && (
                <ul className={styles.settingsMenu}>
                  {settingsItems.map((item, index) => (
                    <li
                      key={index}
                      className={styles.settingsItem}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSettingsItemClick(item);
                      }}
                    >
                      {item.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <nav className={`${styles.navBar} ${isSidebarOpen ? styles.open : ""}`}>
        <div className={styles.navBarHeader}>
          <img
            src={logo}
            alt="School Logo"
            className={styles.navBarLogo}
            onClick={handleLogoClick}
          />
        </div>
        <ul className={styles.navBarMenu}>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`${styles.navBarItem} ${
                location.pathname === item.path ? styles.active : ""
              }`}
              onClick={() => handleNavItemClick(item.path)}
            >
              <FontAwesomeIcon icon={item.icon} className={styles.navBarIcon} />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
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
          </div>
        </div>
      )}

      {/* 🚫 Verification Modal */}
      {showVerifyModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
