import React, { useState } from 'react';
import './AnalyticsHub.css';
import { Link } from "react-router-dom";
const employeeData = [
  {
    id: '1002',
    name: 'Robert',
    doj: '01 Apr 2021',
    gender: 'Male',
    dob: '26 Dec 1984',
    email: 'Robert@dvfvd.com',
  },
  {
    id: '1003',
    name: 'George',
    doj: '08 Jul 2021',
    gender: 'Male',
    dob: '04 Mar 1992',
    email: 'George@vdfv.com',
  },
];

const AnalyticsHub = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmployees = employeeData.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
  
      <div>
      <div className="employee-section">
        <div className="section-header">
          <h2>All Employee Info</h2>
          <Link to="/addemployee">
               <button className="add-btn">Add Employee</button>
        </Link>
        </div>

        <div className="search-restore">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>🔍</button>
          </div>
          <button className="restore-btn">⟳ Restore</button>
        </div>

        <div className="employee-table">
          <table>
            <thead>
              <tr>
                <th>Emp ID</th>
                <th>Emp Name</th>
                <th>DOJ</th>
                <th>Gender</th>
                <th>DOB</th>
                <th>Email ID</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.id}</td>
                  <td className="link">{emp.name}</td>
                  <td>{emp.doj}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHub;
