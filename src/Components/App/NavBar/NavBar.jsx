import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks, faUserShield, faWallet, faBox, faChalkboardTeacher, faUsers, faChartBar, faBars, faTimes, faCog } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', { hour12: true, hour: 'numeric', minute: '2-digit' }));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
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
    { name: 'Logout', path: '/logout' },
  ];

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <>
      <header className="topbar">
        <div className="topbar-content">
          <h1 className="school-name">EECOHM Foundation</h1>
          <div className="topbar-info">
            <span>{today}</span>
            <span>{currentTime}</span>
            <span>Contact: 023-546392</span>
            <div className="settings-container">
              <FontAwesomeIcon icon={faCog} className="settings-icon" onClick={toggleSettings} />
              {isSettingsOpen && (
                <ul className="settings-menu">
                  {settingsItems.map((item, index) => (
                    <li
                      key={index}
                      className="settings-item"
                      onClick={() => {
                        navigate(item.path);
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
      <nav className={`navbar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="navbar-header">
          <img
            src="/src/assets/logo.svg"
            alt="School Logo"
            className="navbar-logo"
            onClick={() => {
              navigate('/dashboard');
              setIsSidebarOpen(false);
            }}
          />
          <div className="navbar-toggle" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </div>
        </div>
        <ul className="navbar-menu">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="navbar-item"
              onClick={() => {
                navigate(item.path);
                setIsSidebarOpen(false);
              }}
            >
              <FontAwesomeIcon icon={item.icon} className="navbar-icon" />
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;