import React, { useState } from 'react';
import './PAY Stop Salary Processing.css';

const StopSalaryProcessing = () => {
  const [searchValue, setSearchValue] = useState('');
  const [employee, setEmployee] = useState(null);
  const [reason, setReason] = useState('');

  const handleSearch = () => {
    if (searchValue.trim() !== '') {
      // Simulate API response with static employee data
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

  const handleSave = () => {
    if (!reason.trim()) {
      alert('Please enter reason.');
      return;
    }

    fetch('/api/stop-salary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        employeeId: employee.id,
        reason: reason,
      }),
    })
      .then((res) => {
        if (res.ok) {
          alert('Salary process stopped successfully.');
          setEmployee(null);
          setReason('');
          setSearchValue('');
        } else {
          alert('Failed to stop salary process.');
        }
      })
      .catch(() => {
        alert('API error.');
      });
  };

  return (
    <div className="stop-salary-container">
      <h2>Stop Salary Processing</h2>

      <div className="employee-search-section">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search Employee Name or ID..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {employee && (
        <>
          <table className="employee-details-table">
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

          <div className="reason-box">
            <label>Reason for stopping salary process</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Enter reason..."
            />
          </div>

          <div className="button-group">
            <button onClick={handleSave} className="save-btn">Save</button>
            <button onClick={() => setEmployee(null)} className="cancel-btn">Cancel</button>
          </div>
        </>
      )}
    </div>
  );
};

export default StopSalaryProcessing;
