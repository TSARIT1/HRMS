import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./profilesetting.css";

export default function ProfileSettings() {
  const location = useLocation();

  return (
    <ul className="nav-tabs">
      <li>
        <Link to="/profile" className={location.pathname === "/profile" ? "active" : ""}>
          Profile
        </Link>
      </li>
      <li>
        <Link to="/password" className={location.pathname === "/password" ? "active" : ""}>
          Password
        </Link>
      </li>
      <li>
        <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>
          Login History
        </Link>
      </li>
    </ul>
  );
}
