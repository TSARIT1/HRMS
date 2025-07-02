// LeaveMonitor.js
import React, { useState } from "react";
import LeaveDetailsView from "./LeaveDetailsView";
import "./LeaveApproval.css";
import "./LeaveMonitorAnimations.css";

const leaveData = [
  {
    id: 1,
    empNo: "1009",
    name: "Ramesh Belludi",
    leaveType: "Earned Leave",
    days: 1,
    from: "24 Feb 2022 - Session 1",
    to: "24 Feb 2022 - Session 2",
    reason: "Went to relative place",
    currentlyWith: "Aadesh Hiralal Sonar",
    appliedBy: "#ghr-sanjith",
  },
  {
    id: 2,
    empNo: "1009",
    name: "Ramesh Belludi",
    leaveType: "Earned Leave",
    days: 1,
    from: "08 Feb 2022",
    to: "08 Feb 2022",
    reason: "—",
    currentlyWith: "Aadesh Hiralal Sonar",
    appliedBy: "#ghr-sanjith",
  },
  {
    id: 3,
    empNo: "1004",
    name: "Laxmi Rani",
    leaveType: "Earned Leave",
    days: 3,
    from: "04 Jan 2022",
    to: "06 Jan 2022",
    reason: "—",
    currentlyWith: "Aadesh Hiralal Sonar",
    appliedBy: "Laxmi Rani (1004)",
  },
  {
    id: 4,
    empNo: "1004",
    name: "Laxmi Rani",
    leaveType: "Earned Leave",
    days: 1,
    from: "01 Feb 2022",
    to: "01 Feb 2022",
    reason: "—",
    currentlyWith: "Aadesh Hiralal Sonar",
    appliedBy: "Laxmi Rani (1004)",
  },
];

export default function LeaveApproval() {
  const [expandedId, setExpandedId] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="leave-monitor-container fade-in">
      <h2>Leave Monitor</h2>

      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="type employee name or number"
        />
        <select>
          <option>Employee: All</option>
        </select>
        <select>
          <option>List: Active</option>
          <option>List: Completed</option>
        </select>
        <div className="date-range">
          <label>Between:</label>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          <label>And</label>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
          <button className="ok-btn">OK</button>
        </div>
        <button className="export-btn">Export Excel</button>
      </div>

      {leaveData.map((item) => (
        <div key={item.id} className={`leave-card ${expandedId === item.id ? 'expanded' : ''}`}>
          <div className="summary" onClick={() => handleExpand(item.id)}>
            <strong>{item.name}</strong> &nbsp; #{item.empNo} &nbsp;
            <span className="el">EL : {item.days} day{item.days > 1 ? "s" : ""}</span> &nbsp;
            <span className="dates">{item.from} to {item.to}</span>
            <div className="right">
              <span>Currently With : {item.currentlyWith}</span> &nbsp;
              <span>Applied By : {item.appliedBy}</span>
            </div>
          </div>

          {expandedId === item.id && (
            <div className="details slide-down">
              <div className="row">
                <label>Leave Type:</label> <span>{item.leaveType}</span>
                <label>Days:</label> <span>{item.days}</span>
              </div>
              <div className="row">
                <label>From:</label> <span>{item.from}</span>
                <label>To:</label> <span>{item.to}</span>
              </div>
              <div className="row">
                <label>Reason:</label> <span>{item.reason}</span>
              </div>
              <div className="row">
                <label>Remarks:</label>
                <textarea placeholder="Enter remarks..."></textarea>
              </div>
              <div className="actions">
                <button className="btn accept">Accept</button>
                <button className="btn reject">Reject</button>
                <button
                  className="btn detail"
                  onClick={() => {
                    setSelectedLeave(item);
                    setShowDetails(true);
                  }}
                >
                  Detailed View »
                </button>
              </div>
            </div>
          )}
        </div>
      ))}

      <div className="pagination">
        <button disabled>{'«'}</button>
        <button className="active">1</button>
        <button disabled>{'»'}</button>
      </div>

      {showDetails && selectedLeave && (
        <div className="modal fade-in">
          <LeaveDetailsView
            data={selectedLeave}
            onClose={() => setShowDetails(false)}
          />
        </div>
      )}
    </div>
  );
}
