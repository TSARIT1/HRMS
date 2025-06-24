// LeaveDetailsView.js
import React from "react";
import "./LeaveDetailsView.css";

export default function LeaveDetailsView({ data, onClose }) {
  if (!data) return null;

  return (
    <div className="leave-details-container">
      <div className="leave-details-card">
        <div className="header">
          <h3>{data.name}</h3>
          <span className="emp-id">#{data.empNo}</span>
        </div>

        <div className="section">
          <div className="row">
            <label>From</label>
            <span>{data.from}</span>
            <label>To</label>
            <span>{data.to}</span>
          </div>

          <div className="row">
            <label>Leave Type</label>
            <span>{data.leaveType}</span>
            <label>Leave Balance</label>
            <span>{data.balance ?? "-"}</span>
          </div>

          <div className="row">
            <label>Days</label>
            <span>{data.days}</span>
          </div>

          <div className="row">
            <label>Reason</label>
            <span>{data.reason}</span>
          </div>
        </div>

        <div className="section">
          <label>Remarks</label>
          <div className="remarks-box">
            <p>{data.remarkHistory ?? "No previous remarks."}</p>
          </div>

          <textarea placeholder="Add remarks..." rows={3}></textarea>
          <input type="text" placeholder="CC (comma separated)" />

          <div className="action-buttons">
            <button className="accept">Accept</button>
            <button className="reject">Reject</button>
            <button className="back" onClick={onClose}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
