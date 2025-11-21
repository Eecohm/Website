import React from "react";
import styles from "@/Components/App/NavBar/NavBar.module.css";
import Logo from "@/Components/App/NavBar/components/Logo";
import UserMenu from "@/Components/App/NavBar/components/UserMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faBars } from "@fortawesome/free-solid-svg-icons";

const TopBar = ({
  isSidebarOpen,
  toggleSidebar,
  handleLogoClick,
  today,
  currentTime,
  isSettingsOpen,
  toggleSettings,
  settingsItems = [],
  handleSettingsItemClick,
}) => {
  const handleToggleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSidebar();
  };

  const handleTouchStart = (e) => {
    // Touch events may have slightly different handling
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchEnd = (e) => {
    // Trigger click on touch end for better mobile UX
    handleToggleClick(e);
  };

  return (
    <header className={styles.topBar}>
      <div className={styles.topBarContent}>
        <div className={styles.topBarLeft}>
          <button
            className={styles.navBarToggle}
            onClick={handleToggleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            type="button"
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={isSidebarOpen}
          >
            {isSidebarOpen ? (
              <FontAwesomeIcon icon={faTimes} />
            ) : (
              <FontAwesomeIcon icon={faBars} />
            )}
          </button>
          <Logo className={styles.topBarLogo} onClick={handleLogoClick} />
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
          <UserMenu
            isSettingsOpen={isSettingsOpen}
            toggleSettings={toggleSettings}
            settingsItems={settingsItems}
            handleSettingsItemClick={handleSettingsItemClick}
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
