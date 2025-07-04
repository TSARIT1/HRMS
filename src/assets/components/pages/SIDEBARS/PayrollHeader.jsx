import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeHeader.css';
import { FaSearch, FaRupeeSign, FaUserCircle } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { FcHome, FcManager, FcLeave, FcWorkflow } from "react-icons/fc";
import { MdOutlineLocalOffer, MdReport } from "react-icons/md";
import { LuMessageCircleOff } from "react-icons/lu";
import { BsPersonFill } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { GrUserAdmin, GrSystem } from "react-icons/gr";
import { RiLogoutCircleLine } from "react-icons/ri";

const PayrollH = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logo, setLogo] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({});

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(prev => !prev);
  const toggleSettings = () => setSettingsOpen(prev => !prev);
  const toggleDropdown = (key) => {
    setOpenDropdowns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <>
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3 className="sidebar-title">Your Apps</h3>
          <button className="close-btn" onClick={toggleSidebar} aria-label="Close menu">
            <span className="close-icon" />
          </button>
        </div>

        <ul className="sidebar-menu">
          <li>
            <Link to="/" className="sidebar-link" onClick={toggleSidebar}>
              <span className="sidebar-icon"><FcHome /></span>Homepage
            </Link>
          </li>

          <li className={`dropdown-group ${openDropdowns.employee ? 'open' : ''}`}>
            <div className="sidebar-link dropdown-toggle" onClick={() => toggleDropdown("employee")}>
              <span className="sidebar-icon"><FcManager /></span>Employee
            </div>
             
          </li>

          <li><Link to="/payroll" className="sidebar-link" onClick={toggleSidebar}><span className="sidebar-icon"><FaRupeeSign /></span>Payroll</Link></li>
          <li><Link to="/leave" className="sidebar-link" onClick={toggleSidebar}><span className="sidebar-icon"><FcLeave /></span>Leave</Link></li>
          <li><Link to="/expense-claims" className="sidebar-link" onClick={toggleSidebar}><span className="sidebar-icon"><MdOutlineLocalOffer /></span>Expense Claims</Link></li>
          <li><Link to="/engage" className="sidebar-link" onClick={toggleSidebar}><span className="sidebar-icon"><LuMessageCircleOff /></span>Engage</Link></li>
          <li><Link to="/workflow" className="sidebar-link" onClick={toggleSidebar}><span className="sidebar-icon"><FcWorkflow /></span>Workflow</Link></li>
          <li><Link to="/reports" className="sidebar-link" onClick={toggleSidebar}><span className="sidebar-icon"><MdReport /></span>Reports</Link></li>
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

      <header className={`app-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <button className={`menu-btn ${sidebarOpen ? 'open' : ''}`} onClick={toggleSidebar} aria-label="Toggle menu">
            <span className="menu-line top"></span>
            <span className="menu-line middle"></span>
            <span className="menu-line bottom"></span>
          </button>

          {/* TOPNAV BAR MENU */}
          <nav className="topnav">
           
            <ul className="nav-menu">
<li className="nav-item">
                <Link to="/main">Payroll</Link>
                </li>
               <li className="nav-item dropdown">
                <Link to="#">Information</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/admin/users">Salary Revision History</Link></li>
                  <li><Link to="/admin/roles">Salary Revision Analatics </Link></li>

                </ul>
              </li>

<li className="nav-item dropdown">
                <Link to="#">Payroll Inputs</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/admin/users">Salary</Link></li>
                  <li><Link to="/admin/roles">Salary Revisions</Link></li>
                  <li><Link to="/admin/roles">Income Tax</Link></li>
                  <li><Link to="/lop">Employee LOP Deduction</Link></li>
                  <li><Link to="/admin/roles">Stop Salary Processing</Link></li>
                  <li><Link to="/admin/roles">Final Settlement</Link></li>

                </ul>
              </li>
<li className="nav-item dropdown">
                <Link to="#">Process</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/admin/users">Payroll Process</Link></li>

                </ul>
              </li>
<li className="nav-item dropdown">
                <Link to="#">Verify</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/sstatement">Quick Salary Statement</Link></li>
                  <li><Link to="/proll">Payroll Statement </Link></li>

                </ul>
              </li>
<li className="nav-item dropdown">
                <Link to="#">Payout</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/admin/users">Bank Transfer</Link></li>
                  <li><Link to="/pslip">Payslips </Link></li>

                </ul>
              </li>


<li className="nav-item dropdown">
                <Link to="#">Published Info</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/pslip">Payslip</Link></li>
                  <li><Link to="/bank">IT Statement</Link></li>
                  <li><Link to="/rit">IT Declaration</Link></li>


                </ul>
              </li>
              
<li className="nav-item dropdown">
                <Link to="#">Admin</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/rit">Employee IT Declaration</Link></li>
                  

                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link to="#">SetUp</Link>
                <ul className="dropdown-menu">
                  <li><Link to="/policy">Pay Item Group</Link></li>

                </ul>
              </li>
           
            </ul>
          </nav>

          <div className="logo-container" onClick={triggerFileInput} role="button" tabIndex={0}>
            <div className="logo-backdrop">
              {logo ? (
                <img src={logo} alt="Company Logo" className="logo-image" />
              ) : (
                <div className="logo-placeholder">
                  <span className="upload-icon"><FaUserCircle /></span>
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
              >
                <span className="icon-emoji"><CiSettings /></span>
                <span className="tooltip">Settings</span>
              </button>
              <div className={`dropdown-menu ${settingsOpen ? 'open' : ''}`}>
                <div className="dropdown-header">
                  <span className="settings-icon"><CiSettings /></span>
                  <h4>Settings Menu</h4>
                </div>
                {[
                  { path: "/profile", name: "My Profile", icon: <BsPersonFill /> },
                  { path: "/account", name: "Account Settings", icon: <IoSettingsOutline /> },
                  { path: "/notifications", name: "User Admin", icon: <GrUserAdmin /> },
                  { path: "/security", name: "System Settings", icon: <GrSystem /> },
                ].map(item => (
                  <Link key={item.path} to={item.path} className="dropdown-item">
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

export default PayrollH;
