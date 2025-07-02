import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Mainpage.css';

// Icons
import { FcAdvance, FcHome, FcManager, FcLeave, FcWorkflow } from "react-icons/fc";
import { FaSearch, FaRupeeSign } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { FaPersonCane } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLocalOffer, MdReport, MdOutlineAdd } from "react-icons/md";
import { LuMessageCircleOff } from "react-icons/lu";
import { BsPersonFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { GrUserAdmin, GrSystem } from "react-icons/gr";
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
    { path: "/EmployeeH", name: "Employee", icon: <FcManager /> },
    { path: "/PayrollH", name: "Payroll", icon: <FaRupeeSign /> },
    { path: "/LeaveH", name: "Leave", icon: <FcLeave /> },
    { path: "/WorkflowH", name: "Workflow", icon: <FcWorkflow /> },
    { path: "/EngageH", name: "Engage", icon: <LuMessageCircleOff /> },
    { path: "/ReportH", name: "Reports", icon: <MdReport /> },
    { path: "/expense-claims", name: "Unite Marketplace", icon: <MdOutlineLocalOffer /> },
  ];

  const settingsItems = [
    { path: "/profile", name: "My Profile", icon: <BsPersonFill /> },
    { path: "/account", name: "Account Settings", icon: <IoSettingsOutline /> },
    { path: "/notifications", name: "User Admin", icon: <GrUserAdmin /> },
    { path: "/security", name: "System Settings", icon: <GrSystem /> },
  ];

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Your Apps</h3>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close menu">
            <span className="close-icon" />
          </button>
        </div>
        <ul className="sidebar-menu">
          {sidebarItems.map(({ path, name, icon }) => (
            <li key={path}>
              <Link to={path} className="sidebar-link" onClick={toggleSidebar}>
                <span className="sidebar-icon">{icon}</span>
                {name}
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
      {sidebarOpen && <div className="sidebar-overlay visible" onClick={toggleSidebar} />}

      {/* Header */}
      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <button className={`menu-btn ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar}>
            <span className="menu-line top"></span>
            <span className="menu-line middle"></span>
            <span className="menu-line bottom"></span>
          </button>

          <div
            className="logo-container"
            onClick={triggerFileInput}
            role="button"
            tabIndex={0}
          >
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
              <FaSearch />
              <span className="tooltip">Search</span>
            </button>

            <div className="dropdown-container" ref={dropdownRef}>
              <button
                className={`nav-icon settings-btn ${settingsOpen ? 'active' : ''}`}
                onClick={toggleSettings}
                aria-label="Settings"
              >
                <CiSettings />
                <span className="tooltip">Settings</span>
              </button>
              <div className={`dropdown-menu ${settingsOpen ? 'open' : ''}`} role="menu">
                <div className="dropdown-header">
                  <CiSettings />
                  <h4>Settings Menu</h4>
                </div>
                {settingsItems.map(({ path, name, icon }) => (
                  <Link key={path} to={path} className="dropdown-item" role="menuitem">
                    <span className="item-icon">{icon}</span>
                    <span className="item-text">{name}</span>
                    <span className="item-arrow"><FcAdvance /></span>
                  </Link>
                ))}
              </div>
            </div>

            <button className="nav-icon logout-btn" aria-label="Logout">
              <RiLogoutCircleLine />
              <span className="tooltip">Logout</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Body */}
      <div className="dashboard-wrapper">
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
            <img src="/blue.png" alt="Skyline" className="skyline-img" />
            <img src="/sun.webp" alt="Sun" className="sun" />
          </div>
        </div>
</section>
        <section>
           <h2>My Favourites</h2>
        <div className="favourites-grid">
         
          <Link to="/Actionpopup" className="favourite-card add-card">
            <MdOutlineAdd className="add-icon" />
          </Link>
        </div>
</section>
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
      </div>
    </>
  );
};

export default DashboardPage;
