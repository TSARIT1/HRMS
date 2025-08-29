import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaBell, FaPowerOff, FaHome, FaCalendarAlt,
  FaClipboardList, FaUserAlt, FaLayerGroup,
  FaChevronDown, FaChevronUp, FaMoneyCheckAlt
} from "react-icons/fa";
import "./EmployeeDashboard.css";
import "./EmployeeDashboard.css";
import { BsFillFileEarmarkPersonFill } from "react-icons/bs";


const EMPDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logo, setLogo] = useState("/logo.png");
  const [showNotifications, setShowNotifications] = useState(false);
  const fileInputRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = (menu) => setOpenDropdown(openDropdown === menu ? null : menu);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header" onClick={() => fileInputRef.current.click()}>
          <img src={logo} alt="Company Logo" className="logo" />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleLogoUpload}
            style={{ display: "none" }}
          />
        </div>
        <div className="user-info">
          <BsFillFileEarmarkPersonFill  className="user-avatar" />
          <div>
            <p>Hi Ismail</p>
            <Link to="/profile">View My Info</Link>
          </div>
        </div>

        <nav className="sidebar-menu">
          <Link to="/" className="menu-item"><FaHome /> Home</Link>

       

          {/* To Do */}
          <div className={`menu-group ${openDropdown === "todo" ? "open" : ""}`}>
            <button className="menu-item dropdown-toggle" onClick={() => toggleDropdown("todo")}>
              <FaClipboardList /> To Do
              {openDropdown === "todo" ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            <div className="submenu">
              <Link to="/review" className="submenu-item">Review</Link>
            </div>
          </div>

          {/* Salary */}
          <div className={`menu-group ${openDropdown === "salary" ? "open" : ""}`}>
            <button className="menu-item dropdown-toggle" onClick={() => toggleDropdown("salary")}>
              <FaMoneyCheckAlt /> Salary
              {openDropdown === "salary" ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            <div className="submenu">
              <Link to="/payslipsE" className="submenu-item">Payslips</Link>
              <Link to="/ytd-reportsE" className="submenu-item">YTD Reports</Link>
              <Link to="/it-statementE" className="submenu-item">IT Statement</Link>
              <Link to="/it-declarationE" className="submenu-item">IT Declaration</Link>
              <Link to="/loansE" className="submenu-item">Loans & Advances</Link>
              <Link to="/salary-revisionE" className="submenu-item">Salary Revision</Link>
            </div>
          </div>

          {/* Leave */}
          <div className={`menu-group ${openDropdown === "leave" ? "open" : ""}`}>
            <button className="menu-item dropdown-toggle" onClick={() => toggleDropdown("leave")}>
              <FaCalendarAlt /> Leave
              {openDropdown === "leave" ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            <div className="submenu">
              <Link to="/leave-applyE" className="submenu-item">Leave Apply</Link>
              <Link to="/leave-balancesE" className="submenu-item">Leave Balances</Link>
              <Link to="/leave-calendarE" className="submenu-item">Leave Calendar</Link>
              <Link to="/holiday-calendarE" className="submenu-item">Holiday Calendar</Link>
            </div>
          </div>

          {/* Attendance */}
          <div className={`menu-group ${openDropdown === "attendance" ? "open" : ""}`}>
            <button className="menu-item dropdown-toggle" onClick={() => toggleDropdown("attendance")}>
              <FaCalendarAlt /> Attendance
              {openDropdown === "attendance" ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            <div className="submenu">
              <Link to="/attendance-infoE" className="submenu-item">Attendance Info</Link>
              <Link to="/regularizationE" className="submenu-item">Regularization & Permission</Link>
            </div>
          </div>

         
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
          <div className="header-actions">
            <Link to="/QuickLinks"><span className="quick-links">Quick Links ▼</span></Link>
            <button className="icon-buttons" onClick={toggleNotifications}>
              <FaBell className="icon" />
            </button>
            <Link to="/LogoutE"><FaPowerOff className="icon" /></Link>
          </div>
        </header>

        <section className="greeting">
          <h1>Good Afternoon</h1>
          <p>Life is 10% what happens to us and 90% how we react to it. - Dennis P. Kimbro</p>
          <img src="man.jpg" alt="Illustration" className="illustration" />
        </section>

        <section className="cards">
          <div className="card"><h3>Review</h3><p>Hurrah! You've nothing to review.</p></div>
          <div className="card"><h3>4 August 2025</h3><p>You cannot "Sign in"<br />We couldn't find your shift details.</p></div>
          <div className="card"><h3>Upcoming Holidays</h3><p>Uh oh! No holidays to show.</p></div>
          <div className="card"><h3>Quick Access</h3><p>Use quick access to view important salary details.</p></div>
          <div className="card"><h3>Payslip</h3></div>
          <div className="card"><h3>IT Declaration</h3></div>
        </section>
      </div>

      {/* Notification Panel */}
      {showNotifications && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <button className="close-btn" onClick={toggleNotifications}>×</button>
          </div>
          <div className="notification-content">
            <p>Hurray! You are all caught up!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EMPDashboard;
