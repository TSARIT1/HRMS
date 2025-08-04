// PayrollSAL.jsx
import React, { useState } from "react";
import "./PAY Salary.css";



const employees = [
  {
    name: "Aadesh Hiralal Sonar",
    empId: "#6266",
    joinDate: "01 Apr 2021",
    dob: "02 Sep 1990",
    age: "34 Yrs 10 Months",
    location: "Bangalore",
    payroll: {
      processedAt: "Today at 3:01 PM",
      netPay: 44178.0,
      gross: 60850.0,
      deductions: -16672.0,
      salaryMaster: 65152.0,
    },
  },
  {
    name: "Sneha Kulkarni",
    empId: "#6312",
    joinDate: "15 Mar 2022",
    dob: "10 Jan 1995",
    age: "29 Yrs 6 Months",
    location: "Pune",
    payroll: {
      processedAt: "Today at 3:01 PM",
      netPay: 38500.0,
      gross: 55000.0,
      deductions: -16500.0,
      salaryMaster: 63000.0,
    },
  },
  {
    name: "Rohan Desai",
    empId: "#6110",
    joinDate: "10 Jan 2020",
    dob: "05 Jun 1988",
    age: "37 Yrs 1 Month",
    location: "Mumbai",
    payroll: {
      processedAt: "Today at 3:01 PM",
      netPay: 49000.0,
      gross: 68000.0,
      deductions: -19000.0,
      salaryMaster: 71000.0,
    },
  },
];

const PayrollSAL = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployee, setFilteredEmployee] = useState(employees[0]);

  const componentGroups = [
    "NET PAY",
    "GROSS",
    "TOTAL DEDUCTIONS",
    "SALARY MASTER",
    "CALCULATION FIELDS",
    "CTC ITEMS",
    "PF RELATED ITEMS",
    "ESI RELATED ITEMS",
    "PROF TAX RELATED ITEMS",
    "INCOME TAX RELATED ITEMS",
    "PERQUISITE ITEMS",
    "EXEMPTION ITEMS",
  ];

  const handleSearch = () => {
    const match = employees.find((emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployee(match || null);
  };

  const handleEmployeeClick = (emp) => {
    setFilteredEmployee(emp);
    setSearchTerm("");
  };

  const filteredList = searchTerm
    ? employees.filter((emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="payroll-container">
      <div className="payroll-main">
        <div className="payroll-header">
          <div>
            <p className="label">
              Employee Type: <span className="blue-text">Current Employees</span>
            </p>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search employee..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="search-btn" onClick={handleSearch}>
                🔍 Search
              </button>
            </div>

            {filteredList.length > 0 && (
              <ul className="employee-search-list">
                {filteredList.map((emp) => (
                  <li
                    key={emp.empId}
                    className="employee-link"
                    onClick={() => handleEmployeeClick(emp)}
                  >
                    {emp.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <p className="label">Payroll Processed On</p>
            <p className="timestamp">{filteredEmployee?.payroll.processedAt}</p>
          </div>

          <div className="button-group">
            <button className="primary-btn">Preview Payslip</button>
            <button className="outline-btn">Update Salary</button>
            <button className="primary-btn">Process Payroll</button>
          </div>
        </div>

        {filteredEmployee ? (
          <>
            <div className="employee-chip">
              <div className="avatar">👤</div>
              <p>
                {filteredEmployee.name}{" "}
                <span className="muted">{filteredEmployee.empId}</span>
              </p>
            </div>

            <div className="component-list">
              {componentGroups.map((group, i) => (
                <details key={i} className="component-item">
                  <summary>{group}</summary>
                  <div className="component-value">Value: ₹0.00</div>
                </details>
              ))}
            </div>
          </>
        ) : (
          <p>No employee found with that name.</p>
        )}
      </div>

      {filteredEmployee && (
        <div className="payroll-details">
          <h2>Details</h2>
          <p>
            <strong>Join Date:</strong> {filteredEmployee.joinDate}
          </p>
          <p>
            <strong>Date of Birth:</strong> {filteredEmployee.dob} ({filteredEmployee.age})
          </p>
          <p>
            <strong>Location:</strong> {filteredEmployee.location}
          </p>
        </div>
      )}
    </div>
  );
};

export default PayrollSAL;
