import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './NavBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  faCog
} from '@fortawesome/free-solid-svg-icons';
import logo from '../../../assets/logo.svg';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' })
      );
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (isSettingsOpen) setIsSettingsOpen(false);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const handleLogoClick = () => {
    if (location.pathname === '/dashboard') {
      window.location.reload();
    } else {
      navigate('/dashboard');
    }
    setIsSidebarOpen(false);
    setIsSettingsOpen(false);
  };

  const navItems = [
    { name: 'Tasks', icon: faTasks, path: '/tasks' },
    { name: 'Admin', icon: faUserShield, path: '/admin' },
    { name: 'Accounts', icon: faWallet, path: '/accounts' },
    { name: 'Inventory', icon: faBox, path: '/inventory' },
    { name: 'Teachers', icon: faChalkboardTeacher, path: '/teachers' },
    { name: 'Students', icon: faUsers, path: '/students' },
    { name: 'Reports', icon: faChartBar, path: '/reports' },
  ];

  const settingsItems = [
    { name: 'Profile', path: '/profile' },
    { name: 'Preferences', path: '/preferences' },
    { name: 'Logout', action: () => setShowLogoutModal(true) },
  ];

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className={styles.mainNavDiv}>
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
          <h1 className={styles.schoolName} onClick={handleLogoClick}>EECOHM Foundation</h1>
          <div className={styles.topBarInfoGroup}>
            <div className={styles.topBarInfo}>
              <span>{today}</span>
              <span>{currentTime}</span>
              <span>Contact: 023-546392</span>
            </div>
            <div className={styles.settingsContainer}>
              <FontAwesomeIcon icon={faCog} className={styles.settingsIcon} onClick={toggleSettings} />
              {isSettingsOpen && (
                <ul className={styles.settingsMenu}>
                  {settingsItems.map((item, index) => (
                    <li
                      key={index}
                      className={styles.settingsItem}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          navigate(item.path);
                        }
                        setIsSettingsOpen(false);
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

      <nav className={`${styles.navBar} ${isSidebarOpen ? styles.open : ''}`}>
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
              className={`${styles.navBarItem} ${location.pathname === item.path ? styles.active : ''}`}
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
            >
              <FontAwesomeIcon icon={item.icon} className={styles.navBarIcon} />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>

      {showLogoutModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBox}>
            <h3>Do you want to logout?</h3>
            <div className={styles.modalButtons}>
              <button className={styles.logoutButton} onClick={handleLogout}>Yes, Logout</button>
              <button className={styles.cancelButton} onClick={() => setShowLogoutModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
