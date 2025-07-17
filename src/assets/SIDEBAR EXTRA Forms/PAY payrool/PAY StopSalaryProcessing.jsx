import React, { useState } from 'react';
import './PAY StopSalaryProcessing.css';

const StopSalaryProcessing = () => {
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [reason, setReason] = useState('');

  const [searchText, setSearchText] = useState('');
  const employeeOptions = [
    { empNo: '6266', name: 'Aadesh Hiralal Sonar', joinDate: '01 Apr 2021', location: 'Bangalore', payrollMonth: 'Nov 2027', department: 'Core Department' },
    { empNo: '1025', name: 'Sita Reddy', joinDate: '15 Jun 2020', location: 'Hyderabad', payrollMonth: 'Nov 2027', department: 'Finance' },
    { empNo: '2048', name: 'Rajesh Kumar', joinDate: '05 May 2019', location: 'Chennai', payrollMonth: 'Nov 2027', department: 'HR' },
    { empNo: '3123', name: 'Meena Gupta', joinDate: '10 Aug 2018', location: 'Delhi', payrollMonth: 'Nov 2027', department: 'Operations' }
  ];

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleAddClick = () => {
    setReason('');
    setSelectedEmployee(null);
    setSearchText('');
    setShowForm(true);
  };

  const handleSaveForm = () => {
    if (!selectedEmployee) {
      alert('Please select an employee.');
      return;
    }
    if (!reason.trim()) {
      alert('Please provide a reason.');
      return;
    }
    const newEntry = {
      ...selectedEmployee,
      remarks: reason
    };
    setEmployees([...employees, newEntry]);
    setShowForm(false);
  };

  const handleDeleteRow = (index) => {
    const updated = [...employees];
    updated.splice(index, 1);
    setEmployees(updated);
  };

  const handleDeleteAll = () => {
    setEmployees([]);
  };

  const filteredEmployees = employeeOptions.filter(emp =>
    emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.empNo.includes(searchText)
  );

  return (
    <div className="stop-salary-processing">
      {!showForm ? (
        <>
          <button className="add-btn" onClick={handleAddClick}>Add Stop Salary Processing</button>

          <table className="employee-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Employee No</th>
                <th>Name</th>
                <th>Remarks</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{emp.empNo}</td>
                  <td>{emp.name}</td>
                  <td>{emp.remarks}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDeleteRow(index)}>🗑️</button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="no-records">No records found.</td>
                </tr>
              )}
            </tbody>
          </table>

          {employees.length > 0 && (
            <div className="delete-all-section">
              <button className="delete-all-btn" onClick={handleDeleteAll}>Delete All</button>
            </div>
          )}
        </>
      ) : (
        <div className="stop-salary-form">
          <h3>Stop Salary Processing</h3>

          <label>Search Employee:</label>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by name or employee no."
            className="search-input"
          />

          {filteredEmployees.length > 0 && (
            <div className="search-results">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.empNo}
                  className={`search-result-item ${selectedEmployee && selectedEmployee.empNo === emp.empNo ? 'selected' : ''}`}
                  onClick={() => setSelectedEmployee(emp)}
                >
                  {emp.name} #{emp.empNo}
                </div>
              ))}
            </div>
          )}

          {selectedEmployee && (
            <div className="employee-summary">
              <p><b>{selectedEmployee.name}</b> #{selectedEmployee.empNo}</p>
              <p>Join Date: {selectedEmployee.joinDate}</p>
              <p>Location: {selectedEmployee.location}</p>
              <p>Payroll Month: {selectedEmployee.payrollMonth}</p>
              <p>Department: {selectedEmployee.department}</p>
            </div>
          )}

          <label>Reason for stopping salary process:</label>
          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason here..."
            className="reason-input"
          />

          <div className="form-buttons">
            <button className="save-btn" onClick={handleSaveForm}>Save</button>
            <button className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StopSalaryProcessing;
