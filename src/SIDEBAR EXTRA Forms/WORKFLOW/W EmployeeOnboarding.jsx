import React, { useState } from 'react';
import './W EmployeeOnboarding.css';

const employeeData = [
  {
    id: '#1003',
    name: 'George',
    joinedOn: '08 JUL 2021',
    submittedOn: '-',
    details: 'Aadesh Hiralal Sonar (Reporting to), IT Department (Department), Sr Admin (Designation), Pune (Location)',
    initiatedOn: '09 MAR 2022',
    submitted: false,
  },
  {
    id: '#1004',
    name: 'Laxmi Rani',
    joinedOn: '15 AUG 2021',
    submittedOn: '10 MAR 2022',
    details: 'Suresh Kumar (Reporting to), HR Department, Manager, Delhi',
    initiatedOn: '10 MAR 2022',
    submitted: true,
  },
  {
    id: '#1005',
    name: 'Pooja Sharma',
    joinedOn: '01 JAN 2022',
    submittedOn: '-',
    details: 'Neha Verma (Reporting to), Finance Department, Accountant, Mumbai',
    initiatedOn: '12 MAR 2022',
    submitted: false,
  },
  {
    id: '#1006',
    name: 'Ravi Kumar',
    joinedOn: '22 FEB 2022',
    submittedOn: '15 MAR 2022',
    details: 'Rajesh Sharma (Reporting to), IT Department, Developer, Bangalore',
    initiatedOn: '15 MAR 2022',
    submitted: true,
  },
];

export default function EmployeeOnboarding() {
  const [employees] = useState(employeeData);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm) ||
      emp.id.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="employee-onboarding">
      <div className="header">
        <h2>Employee Onboarding</h2>
        <div className="filters">
          <select><option>Payroll Month: Dec'27</option></select>
          <select><option>All</option></select>
        </div>
      </div>

      <div className="tabs">
        <button className="tab active">Active ({employees.length})</button>
        <button className="tab">Closed (1)</button>
      </div>

      <input
        className="search-input"
        type="text"
        placeholder="Search by Name or ID"
        value={searchTerm}
        onChange={handleSearchChange}
      />

      {filteredEmployees.length > 0 ? (
        filteredEmployees.map((emp) => (
          <div key={emp.id} className="employee-card">
            <div className="employee-header">
              <div>
                <div className="emp-name">{emp.name}</div>
                <div className="emp-id">{emp.id}</div>
              </div>
              <div className="submitted-on">
                <span>Submitted On </span>
                <strong>{emp.submittedOn}</strong>
              </div>
            </div>

            <div className="employee-body">
              <p><strong>Joined On:</strong> {emp.joinedOn}</p>
              <p><strong>Details:</strong> {emp.details}</p>
              <p><strong>Initiated On:</strong> {emp.initiatedOn}</p>
            </div>

            <div className="action-buttons">
              <button className="btn withdraw">Withdraw</button>
              <button className="btn remind">Remind</button>
            </div>
          </div>
        ))
      ) : (
        <div className="no-results">No employees found.</div>
      )}
    </div>
  );
}
