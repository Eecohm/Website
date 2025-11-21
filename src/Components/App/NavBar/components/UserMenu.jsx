import React from "react";
import styles from "@/Components/App/NavBar/NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";

const UserMenu = ({
  isSettingsOpen,
  toggleSettings,
  settingsItems = [],
  handleSettingsItemClick,
}) => {
  return (
    <div
      className={styles.settingsContainer}
      onClick={(e) => {
        e.stopPropagation();
        toggleSettings(e);
      }}
    >
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
  );
};

export default UserMenu;
