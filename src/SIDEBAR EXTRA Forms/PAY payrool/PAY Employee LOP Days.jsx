import React, { useState, useEffect } from 'react';
import './PAY Employee LOP Days.css';
import { useNavigate, useLocation } from 'react-router-dom';

const PAYEmployeeLOPDays = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('All');
  const [showLOPForm, setShowLOPForm] = useState(false);

  const [newEmployee, setNewEmployee] = useState('');
  const [lopDays, setLopDays] = useState('');
  const [remarks, setRemarks] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('lopEntries')) || [];
    setEmployees(data);
  }, [location]);

  const handleRefresh = () => {
    const data = JSON.parse(localStorage.getItem('lopEntries')) || [];
    setEmployees(data);
  };

  const handleSaveLOP = () => {
    if (!newEmployee || !lopDays) {
      alert('Please enter employee and LOP days.');
      return;
    }

    const newEntry = {
      empNo: Math.floor(Math.random() * 10000), // You can handle employee number input properly if needed
      name: newEmployee,
      joinDate: new Date().toLocaleDateString('en-GB'),
      workDays: 0,
      lop: lopDays,
      remarks: remarks,
    };

    const updatedEmployees = [...employees, newEntry];
    setEmployees(updatedEmployees);
    localStorage.setItem('lopEntries', JSON.stringify(updatedEmployees));

    // Reset form
    setNewEmployee('');
    setLopDays('');
    setRemarks('');
    setShowLOPForm(false);
  };

  const filteredEmployees =
    filter === 'All'
      ? employees
      : employees.filter((emp) => emp.name === filter);

  return (
    <div className="lop-container">
      {/* Optional Form Section */}
      {showLOPForm && (
        <div className="lop-form-section">
          <h2>Enter LOP Details</h2>
          <input
            type="text"
            placeholder="Search by Emp No or Name"
            value={newEmployee}
            onChange={(e) => setNewEmployee(e.target.value)}
          />
          <input
            type="number"
            placeholder="LOP Days"
            value={lopDays}
            onChange={(e) => setLopDays(e.target.value)}
          />
          <textarea
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>
          <button onClick={handleSaveLOP} className="btn-primary">
            Save
          </button>
        </div>
      )}

      {/* Header */}
      <div className="lop-header">
        <div className="lop-filter">
          <label htmlFor="employeeSelect">Employee:</label>
          <select
            id="employeeSelect"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            {[...new Set(employees.map((emp) => emp.name))].map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', paddingTop: '1px' }}>
          <button onClick={handleRefresh} className="btn-outline">
            Refresh
          </button>
          <button
            onClick={() => setShowLOPForm(!showLOPForm)}
            className="btn-outline"
          >
            {showLOPForm ? 'Close LOP Form' : 'Add New LOP'}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="lop-table-container">
        <table className="lop-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee No</th>
              <th>Name</th>
              <th>Join Date</th>
              <th>Work Days</th>
              <th>LOP</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="7" className="no-data">
                  No data available.
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp, index) => (
                <tr key={`${emp.empNo}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{emp.empNo}</td>
                  <td>{emp.name}</td>
                  <td>{emp.joinDate}</td>
                  <td>{emp.workDays}</td>
                  <td>{emp.lop}</td>
                  <td>{emp.remarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="lop-footer">
        <span>Total Items: {filteredEmployees.length}</span>
      </div>

      <div className="lop-pagination">
        <button>{'|<'}</button>
        <button>{'<'}</button>
        <input type="text" value="1" readOnly />
        <button>{'>'}</button>
        <button>{'>|'}</button>
      </div>
    </div>
  );
};

export default PAYEmployeeLOPDays;
