import React, { useState } from 'react';
import './PAY StopSalaryProcessing.css';

const StopSalaryProcessing = () => {
  const [searchValue, setSearchValue] = useState('');
  const [employee, setEmployee] = useState(null);
  const [reason, setReason] = useState('');

  const handleSearch = async () => {
    if (!searchValue.trim()) return;

    try {
      // TODO: Replace with real API call
      const res = await fetch(`/api/employees/${searchValue.trim()}`);
      if (!res.ok) throw new Error('Employee not found');
      const data = await res.json();
      setEmployee(data);
    } catch {
      // Fallback demo data
      setEmployee({
        name: 'Pooja Sharma',
        id: '#1006',
        joinDate: '08 Oct 2020',
        payrollMonth: 'Nov 2027',
        location: 'Bangalore',
        department: 'Product Department',
      });
    }
  };

  const handleSave = async () => {
    if (!reason.trim()) {
      alert('Please enter a reason.');
      return;
    }

    try {
      const res = await fetch('/api/stop-salary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employeeId: employee.id,
          reason,
        }),
      });

      if (res.ok) {
        alert('Salary process stopped successfully.');
        setSearchValue('');
        setEmployee(null);
        setReason('');
      } else {
        alert('Failed to stop salary process.');
      }
    } catch {
      alert('API error.');
    }
  };

  return (
    <div className="stop-salary-container">
      <h2>Stop Salary Processing</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Employee Name or ID..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {employee && (
        <div className="employee-details-card">
          <table>
            <tbody>
              <tr>
                <th>Employee Name</th>
                <td>{employee.name}</td>
                <th>Employee ID</th>
                <td>{employee.id}</td>
              </tr>
              <tr>
                <th>Join Date</th>
                <td>{employee.joinDate}</td>
                <th>Location</th>
                <td>{employee.location}</td>
              </tr>
              <tr>
                <th>Payroll Month</th>
                <td>{employee.payrollMonth}</td>
                <th>Department</th>
                <td>{employee.department}</td>
              </tr>
            </tbody>
          </table>

          <div className="reason-section">
            <label>Reason for Stopping Salary</label>
            <textarea
              placeholder="Enter reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div className="action-buttons">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setEmployee(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StopSalaryProcessing;
