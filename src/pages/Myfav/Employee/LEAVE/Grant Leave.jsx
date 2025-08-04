import React, { useState } from 'react';
import './Grant Leave.css';
import { FaRegTrashCan } from "react-icons/fa6";
const LeaveGranter = () => {
  const [grantFor, setGrantFor] = useState('all');
  const [periodicity, setPeriodicity] = useState('Monthly');
  const [period, setPeriod] = useState('');
  const [scheme, setScheme] = useState('General');
  const [selectedYearRange, setSelectedYearRange] = useState('Jan 2025 - Dec 2025');

  const yearRanges = [
    'Jan 2022 - Dec 2022',
    'Jan 2023 - Dec 2023',
    'Jan 2024 - Dec 2024',
    'Jan 2025 - Dec 2025',
    'Jan 2026 - Dec 2026',
  ];

  const [leaveTypes, setLeaveTypes] = useState([
    { name: 'Sick Leave', granted: 1, selected: false },
    { name: 'Earned Leave', granted: 1, selected: false },
  ]);

  const [grantSummary, setGrantSummary] = useState([]);

  const employees = [
    { empNo: '1002', name: 'Robert', status: 'Confirmed', doj: '01 Apr 2021' },
    { empNo: '1009', name: 'Ramesh Belludi', status: 'Consultant', doj: '16 Aug 2019' },
    { empNo: '1010', name: 'Rose', status: 'Consultant', doj: '08 Feb 2019' },
    { empNo: '1006', name: 'Pooja Sharma', status: 'Probation', doj: '08 Oct 2020' },
    { empNo: '6266', name: 'Aadesh Hiralal Sonar', status: 'Confirmed', doj: '01 Apr 2021' },
  ];

  const handleLeaveSelection = (index) => {
    const updated = [...leaveTypes];
    updated[index].selected = !updated[index].selected;
    setLeaveTypes(updated);
  };

  const handleGrant = () => {
    const selectedLeave = leaveTypes.find((l) => l.selected);
    if (!selectedLeave) return alert('Please select a leave type');

    const batchId = Math.floor(Math.random() * 1000);
    const now = new Date().toLocaleString();

    const summary = employees.map((emp, index) => ({
      id: index + 1,
      empNo: emp.empNo,
      name: emp.name,
      status: emp.status,
      doj: emp.doj,
      days: selectedLeave.granted,
      leaveType: selectedLeave.name,
      period,
      frequency: periodicity,
      scheme,
      grantedOn: now,
      batchId,
    }));

    setGrantSummary(summary);
  };

  const handleDelete = (id) => {
    setGrantSummary((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div className="leave-granter-container">
      <div className="top-bar">
        <select
          value={selectedYearRange}
          onChange={(e) => setSelectedYearRange(e.target.value)}
          className="year-range-dropdown"
        >
          {yearRanges.map((range) => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      <h2>Grant Leaves</h2>

      <div className="radio-group">
        <label>
          <input
            type="radio"
            checked={grantFor === 'all'}
            onChange={() => setGrantFor('all')}
          /> Grant for all employees
        </label>
        <label>
          <input
            type="radio"
            checked={grantFor === 'new'}
            onChange={() => setGrantFor('new')}
          /> Grant for newly joined employees
        </label>
      </div>

      <div className="form-row">
        <label>Periodicity:</label>
        <select value={periodicity} onChange={(e) => setPeriodicity(e.target.value)}>
          <option>Monthly</option>
          <option>Quarterly</option>
          <option>Yearly</option>
        </select>
      </div>

      <div className="form-row">
        <label>Period:</label>
        <input
          type="text"
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          placeholder="e.g. Apr 2025"
        />
      </div>

      <div className="form-row">
        <label>Leave Scheme:</label>
        <select value={scheme} onChange={(e) => setScheme(e.target.value)}>
          <option>General</option>
          <option>Contract</option>
        </select>
      </div>

      <table className="leave-table">
        <thead>
          <tr>
            <th></th>
            <th>Leave Types</th>
            <th>Upcoming Auto Grant Date</th>
            <th>Maximum Leaves Granted</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes.map((leave, index) => (
            <tr key={index}>
              <td>
                <input
                  type="checkbox"
                  checked={leave.selected}
                  onChange={() => handleLeaveSelection(index)}
                />
              </td>
              <td>{leave.name}</td>
              <td>-</td>
              <td>{leave.granted}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="buttons">
        <button className="grant" onClick={handleGrant}>Grant</button>
        <button className="cancel" onClick={() => alert('Cancelled')}>Cancel</button>
      </div>

      {grantSummary.length > 0 && (
        <div className="summary-section">
          <h3>Grant Summary</h3>
          <p>
            <strong>Batch ID:</strong> {grantSummary[0].batchId} <br />
            <strong>Granted On:</strong> {grantSummary[0].grantedOn} <br />
            <strong>Period:</strong> {grantSummary[0].period} |
            <strong> Frequency:</strong> {grantSummary[0].frequency} |
            <strong> Leave Type:</strong> {grantSummary[0].leaveType} |
            <strong> Scheme:</strong> {grantSummary[0].scheme}
          </p>

          <table className="summary-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee No</th>
                <th>Employee Name</th>
                <th>Status</th>
                <th>Joining Date</th>
                <th>Days</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {grantSummary.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.empNo}</td>
                  <td>{item.name}</td>
                  <td>{item.status}</td>
                  <td>{item.doj}</td>
                  <td>{item.days}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}><FaRegTrashCan /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeaveGranter;
