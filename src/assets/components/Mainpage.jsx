import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mainpage.css';

import { BsPersonFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { FaSearch, FaRupeeSign, FaUser } from "react-icons/fa";
import { FcAdvance, FcHome, FcLeave, FcManager, FcWorkflow } from "react-icons/fc";
import { GrSystem, GrUserAdmin } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { LuMessageCircleOff } from "react-icons/lu";
import { MdOutlineAdd, MdOutlineLocalOffer, MdReport } from "react-icons/md";
import { RiLogoutCircleLine } from "react-icons/ri";

const DashboardPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [greeting, setGreeting] = useState('');
  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSettingsOpen(false);
    };
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleSettings = () => setSettingsOpen(prev => !prev);
  const triggerFileInput = () => fileInputRef.current?.click();

  const sidebarItems = [
    { path: "/", name: "Homepage", icon: <FcHome /> },
    { path: "/employe", name: "Employee", icon: <FcManager /> },
    { path: "/payroll", name: "Payroll", icon: <FaRupeeSign /> },
    { path: "/leavehe", name: "Leave", icon: <FcLeave /> },
    { path: "/workflow", name: "Workflow", icon: <FcWorkflow /> },
  ];

  const settingsItems = [
    { path: "/profilesetting", name: "My Profile", icon: <BsPersonFill /> },
    { path: "/account", name: "Account Settings", icon: <IoSettingsOutline /> },
    { path: "/notifications", name: "User Admin", icon: <GrUserAdmin /> },
    { path: "/security", name: "System Settings", icon: <GrSystem /> },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Your Apps</h3>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close menu">
            <span className="close-icon" aria-hidden="true" />
          </button>
        </div>
        <nav>
          <ul className="sidebar-menu">
            {sidebarItems.map(({ path, name, icon }) => (
              <li key={name}>
                <Link to={path} className="sidebar-link" onClick={toggleSidebar}>
                  <span className="sidebar-icon">{icon}</span>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          <div className="user-profile">
            <div className="profile-avatar" aria-hidden="true"><CgProfile /></div>
            <div className="profile-info">
              <span className="profile-name">John Doe</span>
              <span className="profile-role">Administrator</span>
            </div>
          </div>
        </div>
      </aside>
      {sidebarOpen && <div className="sidebar-overlay visible" onClick={toggleSidebar} />}

      {/* Header */}
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <button 
            className={`menu-btn ${sidebarOpen ? 'open' : ''}`} 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <span className="menu-line top" aria-hidden="true"></span>
            <span className="menu-line middle" aria-hidden="true"></span>
            <span className="menu-line bottom" aria-hidden="true"></span>
          </button>

          <div
            className="logo-container"
            onClick={triggerFileInput}
            role="button"
            tabIndex={0}
            aria-label="Upload company logo"
          >
            <div className="logo-backdrop">
              {logo ? (
                <img src={logo} alt="Company Logo" className="logo-image" />
              ) : (
                <div className="logo-placeholder">
                  <span className="upload-icon" aria-hidden="true"><FaUser /></span>
                  <span className="placeholder-text">Upload Logo</span>
                </div>
              )}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleLogoUpload}
                style={{ display: 'none' }}
                accept="image/*"
                aria-hidden="true"
              />
            </div>
          </div>

          <nav className="main-nav">
            <button className="nav-icon search-btn" aria-label="Search">
              <FaSearch aria-hidden="true" />
              <span className="tooltip">Search</span>
            </button>

            <div className="dropdown-container" ref={dropdownRef}>
              <button
                className={`nav-icon settings-btn ${settingsOpen ? 'active' : ''}`}
                onClick={toggleSettings}
                aria-label="Settings"
                aria-expanded={settingsOpen}
              >
                <CiSettings aria-hidden="true" />
                <span className="tooltip">Settings</span>
              </button>
                            <div className={`dropdown-menu ${settingsOpen ? 'open' : ''}`} role="menu">

                  <div className="dropdown-header">
                    <CiSettings aria-hidden="true" />
                    <h4>Settings Menu</h4>
                  </div>
                  {settingsItems.map(({ path, name, icon }) => (
                    <Link 
                      key={name} 
                      to={path} 
                      className="dropdown-item" 
                      role="menuitem"
                      onClick={() => setSettingsOpen(false)}
                    >
                      <span className="item-icon" aria-hidden="true">{icon}</span>
                      <span className="item-text">{name}</span>
                      <span className="item-arrow" aria-hidden="true"><FcAdvance /></span>
                    </Link>
                  ))}
                </div>
              
            </div>

            <button className="nav-icon logout-btn" aria-label="Logout">
              <RiLogoutCircleLine aria-hidden="true" />
              <span className="tooltip">Logout</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-wrapper">
        <div className="navigation-buttons">
          <Link to="/" className="nav-btn">Welcome</Link>
          <Link to="/dashboard" className="nav-btn">Dashboard</Link>
        </div>

        <section>
          <div className="top-section">
            <div className="text-content">
              <h1>{greeting},</h1>
              <p>Let's do great things together.</p>
            </div>
            <div className="skyline">
              <img src="/blue.png" alt="City skyline illustration" className="skyline-img" />
              <img src="/sun.webp" alt="Sun illustration" className="sun" />
            </div>
          </div>
        </section>

        <section>
          <h2>My Favourites</h2>
          <div className="favourites-grid">
            <Link to="/popup" className="favourite-card add-card" aria-label="Add new favorite">
              <MdOutlineAdd className="add-icon" aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section>
          <h2>Help Links</h2>
          <div className="help-links">
            <Link to="/community" className="btn-link">TSar It Community</Link>
            <Link to="/compliances" className="btn-link">Statutory Compliances</Link>
            <Link to="/knowledge" className="btn-link">TSar It Knowledge Centre</Link>
            <Link to="/resources" className="btn-link">Resource Centre</Link>
            <Link to="/videos" className="btn-link">How to Videos</Link>
            <Link to="/academy" className="btn-link">TSar It Academy</Link>
            <Link to="/fm" className="btn-link">TSar It FM</Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;