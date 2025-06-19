import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { FaSearch } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { FaPersonCane } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FcHome } from "react-icons/fc";
import { FcManager } from "react-icons/fc";
import { FaRupeeSign } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { MdOutlineLocalOffer } from "react-icons/md";
import { LuMessageCircleOff } from "react-icons/lu";
import { FcWorkflow } from "react-icons/fc";
import { MdReport } from "react-icons/md";
import { BsPersonFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { GrUserAdmin } from "react-icons/gr";
import { GrSystem } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";
const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Add scroll effect on header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleSettings = () => setSettingsOpen(prev => !prev);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Your Apps</h3>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close menu">
            <span className="close-icon" />
          </button>
        </div>
        <ul className="sidebar-menu">
          {[
            { path: "/", name: "Homepage", icon:<FcHome /> },
            { path: "/profile", name: "Employee", icon:<FcManager /> },
            { path: "/payroll", name: "Payroll", icon:<FaRupeeSign/>},
            { path: "/leave", name: "Leave", icon:<FcLeave />},
            { path: "/expense-claims", name: "Expense Claims", icon: <MdOutlineLocalOffer />},
            { path: "/engage", name: "Engage", icon: <LuMessageCircleOff />},
            { path: "/workflow", name: "Workflow", icon:<FcWorkflow />},
            { path: "/reports", name: "Reports", icon: <MdReport />}
          ].map(item => (
            <li key={item.path}>
              <Link to={item.path} className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="profile-avatar"><CgProfile /></div>
            <div className="profile-info">
              <span className="profile-name">John Doe</span>
              <span className="profile-role">Administrator</span>
            </div>
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div className="sidebar-overlay visible" onClick={toggleSidebar} />
      )}

      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <button className={`menu-btn ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar} aria-label="Toggle menu">
            <span className="menu-line top"></span>
            <span className="menu-line middle"></span>
            <span className="menu-line bottom"></span>
          </button>

          <div className="logo-container" onClick={triggerFileInput} role="button" tabIndex={0} onKeyPress={(e) => (e.key === 'Enter' || e.key === ' ') && triggerFileInput()}>
            <div className="logo-backdrop">
              {logo ? (
                <img src={logo} alt="Company Logo" className="logo-image" />
              ) : (
                <div className="logo-placeholder">
                  <span className="upload-icon"><FaPersonCane /></span>
                  <span className="placeholder-text">Upload Logo</span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
                accept="image/*"
              />
            </div>
          </div>

          <nav className="main-nav">
            <button className="nav-icon search-btn" aria-label="Search">
              <span className="icon-emoji"><FaSearch /></span>
              <span className="tooltip">Search</span>
            </button>

            <div className="dropdown-container" ref={dropdownRef}>
              <button
                className={`nav-icon settings-btn ${settingsOpen ? 'active' : ''}`}
                onClick={toggleSettings}
                aria-label="Settings"
                aria-haspopup="true"
                aria-expanded={settingsOpen}
              >
                <span className="icon-emoji"><CiSettings /></span>
                <span className="tooltip">Settings</span>
              </button>
              <div className={`dropdown-menu ${settingsOpen ? 'open' : ''}`} role="menu">
                <div className="dropdown-header">
                  <span className="settings-icon"><CiSettings /></span>
                  <h4>Settings Menu</h4>
                </div>
                {[
                  { path:"/profile", name: "My Profile", icon: <BsPersonFill /> },
                  { path: "/account", name: "Account Settings", icon: <IoSettingsOutline />},
                  { path: "/notifications", name: "User Admin", icon: <GrUserAdmin /> },
                  { path: "/security", name: "System Settings", icon:<GrSystem /> }
                ].map(item => (
                  <Link key={item.path} to={item.path} className="dropdown-item" role="menuitem">
                    <span className="item-icon">{item.icon}</span>
                    <span className="item-text">{item.name}</span>
                    <span className="item-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>

           

            <button className="nav-icon logout-btn" aria-label="Logout">
              <span className="icon-emoji"><RiLogoutCircleLine /></span>
              <span className="tooltip">Logout</span>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
