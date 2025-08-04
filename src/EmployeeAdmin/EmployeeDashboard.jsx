import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaBell, FaPowerOff, FaHome, FaCalendarAlt,
  FaClipboardList, FaUserAlt, FaLayerGroup,
  FaChevronDown, FaChevronUp, FaMoneyCheckAlt
} from "react-icons/fa";
import "./EmployeeDashboard.css";

const EMPDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [logo, setLogo] = useState("/logo.png");
  const fileInputRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

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
            accept="gettyimages-1674706748-612x612.jpg"
            onChange={handleLogoUpload}
            style={{ display: "none" }}
          />
          <h3>Your Logo</h3>
        </div>
        <div className="user-info">
          <FaUserAlt className="user-avatar" />
          <div>
            <p>Hi Ismail</p>
            <Link to="/profile">View My Info</Link>
          </div>
        </div>

        <nav className="sidebar-menu">
          <Link to="/" className="menu-item"><FaHome /> Home</Link>
          <Link to="/engage" className="menu-item"><FaLayerGroup /> Engage</Link>

          {/* My WorkLife */}
          <div className={`menu-group ${openDropdown === "worklife" ? "open" : ""}`}>
            <button className="menu-item dropdown-toggle" onClick={() => toggleDropdown("worklife")}>
              <FaClipboardList /> My WorkLife
              {openDropdown === "worklife" ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            <div className="submenu">
              <Link to="/kudos" className="submenu-item">Kudos</Link>
              <Link to="/feedback" className="submenu-item">Feedback</Link>
            </div>
          </div>

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
              <Link to="/payslips" className="submenu-item">Payslips</Link>
              <Link to="/ytd-reports" className="submenu-item">YTD Reports</Link>
              <Link to="/it-statement" className="submenu-item">IT Statement</Link>
              <Link to="/it-declaration" className="submenu-item">IT Declaration</Link>
              <Link to="/loans" className="submenu-item">Loans & Advances</Link>
              <Link to="/salary-revision" className="submenu-item">Salary Revision</Link>
            </div>
          </div>

          {/* Leave */}
          <div className={`menu-group ${openDropdown === "leave" ? "open" : ""}`}>
            <button className="menu-item dropdown-toggle" onClick={() => toggleDropdown("leave")}>
              <FaCalendarAlt /> Leave
              {openDropdown === "leave" ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            <div className="submenu">
              <Link to="/leave-apply" className="submenu-item">Leave Apply</Link>
              <Link to="/leave-balances" className="submenu-item">Leave Balances</Link>
              <Link to="/leave-calendar" className="submenu-item">Leave Calendar</Link>
              <Link to="/holiday-calendar" className="submenu-item">Holiday Calendar</Link>
            </div>
          </div>

          {/* Attendance */}
          <div className={`menu-group ${openDropdown === "attendance" ? "open" : ""}`}>
            <button className="menu-item dropdown-toggle" onClick={() => toggleDropdown("attendance")}>
              <FaCalendarAlt /> Attendance
              {openDropdown === "attendance" ? <FaChevronUp className="chevron" /> : <FaChevronDown className="chevron" />}
            </button>
            <div className="submenu">
              <Link to="/attendance-info" className="submenu-item">Attendance Info</Link>
              <Link to="/regularization" className="submenu-item">Regularization & Permission</Link>
            </div>
          </div>

          <Link to="/documents" className="menu-item"><FaLayerGroup /> Document Center</Link>
          <Link to="/requests" className="menu-item"><FaLayerGroup /> Request Hub</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content">
        <header className="header">
          <button className="menu-toggle" onClick={toggleSidebar}>☰</button>
          <div className="header-actions">
            <Link to="/QuickLinks"><span className="quick-links">Quick Links ▼</span></Link>
           <Link to="/Notifications"><FaBell className="icon" /></Link> 
           <Link to="/Logout"> <FaPowerOff className="icon" /></Link>
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
    </div>
  );
};

export default EMPDashboard;
