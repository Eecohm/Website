import React from "react";
import styles from "../NavBar.module.css";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
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
  return (
    <header className={styles.topBar}>
      <div className={styles.topBarContent}>
        <div className={styles.topBarLeft}>
          <div
            className={styles.navBarToggle}
            onClick={(e) => {
              e.stopPropagation();
              toggleSidebar(e);
            }}
          >
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </div>
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
