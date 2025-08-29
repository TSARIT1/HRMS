import React, { useState } from 'react';
import './LeaveEMP.css';

function LeaveApply() {
  const [leaveType, setLeaveType] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [sessionFrom, setSessionFrom] = useState('Session 1');
  const [sessionTo, setSessionTo] = useState('Session 2');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');
  const [activePage, setActivePage] = useState('apply');

  const pendingImage =
    'https://thumbs.dreamstime.com/b/pending-approval-shown-conceptual-photo-using-wooden-blocks-267440716.jpg';
  const historyImage =
    'https://media.geeksforgeeks.org/wp-content/uploads/20231227161739/History-2-copy.webp';

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      leaveType,
      fromDate,
      toDate,
      sessionFrom,
      sessionTo,
      contact,
      reason,
    });
  };

  return (
    <div className="leave-container">
      <h1>Leave Apply</h1>

      <div className="tabs">
        <button
          className={activePage === 'apply' ? 'active' : ''}
          onClick={() => setActivePage('apply')}
        >
          Apply
        </button>
        <button
          className={activePage === 'pending' ? 'active' : ''}
          onClick={() => setActivePage('pending')}
        >
          Pending
        </button>
        <button
          className={activePage === 'history' ? 'active' : ''}
          onClick={() => setActivePage('history')}
        >
          History
        </button>
      </div>

      {activePage === 'apply' && (
        <form className="leave-form" onSubmit={handleSubmit}>
          <h2>Applying for Leave</h2>

          <div className="form-row">
            <label>
              Leave type <span className="required">*</span>
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
            >
              <option value="">Select type</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Paid Leave">Paid Leave</option>
            </select>
          </div>

          <div className="form-row two-columns">
            <div>
              <label>
                From date <span className="required">*</span>
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <label>Session</label>
              <select
                value={sessionFrom}
                onChange={(e) => setSessionFrom(e.target.value)}
              >
                <option>Session 1</option>
                <option>Session 2</option>
              </select>
            </div>
          </div>

          <div className="form-row two-columns">
            <div>
              <label>
                To date <span className="required">*</span>
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div>
              <label>Session</label>
              <select
                value={sessionTo}
                onChange={(e) => setSessionTo(e.target.value)}
              >
                <option>Session 1</option>
                <option>Session 2</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <label>Applying to</label>
            <input type="text" placeholder="Select approver" />
          </div>

          <div className="form-row">
            <label>CC to</label>
            <input type="text" placeholder="Add CC" />
          </div>

          <div className="form-row">
            <label>Contact details</label>
            <input
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter a reason"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}

      {activePage === 'pending' && (
        <div className="page">
          <h2>Pending Requests</h2>
          <img src={pendingImage} alt="Pending" className="page-image" />
          <p>No pending leave requests.</p>
        </div>
      )}

      {activePage === 'history' && (
        <div className="page">
          <h2>Leave History</h2>
          <img src={historyImage} alt="History" className="page-image" />
          <p>No leave history found.</p>
        </div>
      )}
    </div>
  );
}

export default LeaveApply;
