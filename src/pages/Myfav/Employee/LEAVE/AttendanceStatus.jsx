import React, { useState } from "react";
import "./AttendanceStatus.css";

const employees = [
  { empNo: "1010", name: "Rose", designation: "Content Writer", department: "Marketing", location: "Bangalore" },
  { empNo: "1009", name: "Ramesh Belludi", designation: "Content Writer", department: "Marketing", location: "Pune" },
  { empNo: "1008", name: "Rajeev Dixit", designation: "UX Developer", department: "Design", location: "Bhubaneswar" },
  { empNo: "1006", name: "Pooja Sharma", designation: "Junior Associate", department: "HR", location: "Bangalore" },
  { empNo: "1004", name: "Laxmi Rani", designation: "Sr Executive", department: "HR", location: "Bangalore" },
  { empNo: "1002", name: "Robert", designation: "CTO", department: "Tech", location: "Cochin" },
  { empNo: "6266", name: "Aadesh Hiralal Sonar", designation: "CEO", department: "Management", location: "Bangalore" },
  { empNo: "1003", name: "George", designation: "Sr Admin", department: "Admin", location: "Pune" },
];

// Unique lists
const designations = [...new Set(employees.map(e => e.designation))];
const locations = [...new Set(employees.map(e => e.location))];
const departments = [...new Set(employees.map(e => e.department))];

export default function AttendanceStatus() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [designationFilter, setDesignationFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const filteredEmployees = employees.filter(emp => {
    const desMatch = designationFilter === "All" || emp.designation === designationFilter;
    const locMatch = locationFilter === "All" || emp.location === locationFilter;
    const depMatch = departmentFilter === "All" || emp.department === departmentFilter;
    return desMatch && locMatch && depMatch;
  });

  return (
    <div className="attendance-container">
      <div className="filters">
        <label>
          Date:
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </label>

        <label>
          Designation:
          <select
            value={designationFilter}
            onChange={(e) => setDesignationFilter(e.target.value)}
          >
            <option>All</option>
            {designations.map((desig, idx) => (
              <option key={idx} value={desig}>{desig}</option>
            ))}
          </select>
        </label>

        <label>
          Location:
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option>All</option>
            {locations.map((loc, idx) => (
              <option key={idx} value={loc}>{loc}</option>
            ))}
          </select>
        </label>

        <label>
          Department:
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option>All</option>
            {departments.map((dep, idx) => (
              <option key={idx} value={dep}>{dep}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="summary">
        <p><strong>Employees Information for {new Date(selectedDate).toDateString()}, All Filters</strong></p>
        <div className="summary-box">
          <span>100%<br />Employees Are Not Yet In</span>
          <span>0%<br />Employees Are On-Time</span>
          <span>0%<br />Employees Are On-Leave</span>
        </div>
      </div>

      <div className="table-actions">
        <button>Export to Excel</button>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Sl.No</th>
            <th>Employee No</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Department</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp, index) => (
            <tr key={emp.empNo}>
              <td>{index + 1}</td>
              <td>{emp.empNo}</td>
              <td>{emp.name}</td>
              <td>{emp.designation}</td>
              <td>{emp.department}</td>
              <td>{emp.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
