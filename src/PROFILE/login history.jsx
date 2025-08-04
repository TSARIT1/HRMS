import React from "react";
import "./login history.css";

export default function LoginHistory() {
  const loginMeta = {
    lastLogin: "2025-07-03 11:14:44",
    lastLoginFailure: "2025-05-19 16:53:09",
    passwordChanged: "2025-05-17 10:48:54",
  };

  const loginRecords = [
    { date: "2025-05-17 10:52:38", ip: "117.192.63.193" },
    { date: "2025-05-17 10:59:49", ip: "117.192.63.193" },
    { date: "2025-05-19 16:54:04", ip: "117.213.157.118" },
    { date: "2025-05-19 17:00:38", ip: "117.213.157.118" },
    { date: "2025-05-20 12:08:32", ip: "103.211.17.97" },
  ];

  return (
   
    <div className="login-history">
   
      <div className="meta-info">
        <p><strong>Last Login Date:</strong> {loginMeta.lastLogin}</p>
        <p><strong>Last Login Failure Date:</strong> {loginMeta.lastLoginFailure}</p>
        <p><strong>Password Changed Date:</strong> {loginMeta.passwordChanged}</p>
      </div>

      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>IP Address</th>
          </tr>
        </thead>
        <tbody>
          {loginRecords.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.ip}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <button>{"<<"}</button>
        <input type="text" value="1" readOnly />
        <button>{">>"}</button>
        <span>Total Items: 112</span>
      </div>
    </div>
  );
}
