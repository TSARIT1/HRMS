import React, { useState } from "react";
import "./Approve Leave Cancel.css";

const LeaveCancelMonitor = () => {
  const [employee, setEmployee] = useState("All");
  const [listStatus, setListStatus] = useState("Active");
  const [searchText, setSearchText] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Mock data
  const employees = [
    { id: 1, name: "John Doe", status: "Active", date: "2025-06-01" },
    { id: 2, name: "Jane Smith", status: "Inactive", date: "2025-05-25" },
    { id: 3, name: "Alice Johnson", status: "Active", date: "2025-06-15" },
  ];

  // Filter logic
  const filteredEmployees = employees.filter((emp) => {
    const matchesStatus = listStatus === "All" || emp.status === listStatus;
    const matchesSearch =
      emp.name.toLowerCase().includes(searchText.toLowerCase()) ||
      emp.id.toString().includes(searchText);

    const empDate = new Date(emp.date);
    const fromDate = dateFrom ? new Date(dateFrom) : null;
    const toDate = dateTo ? new Date(dateTo) : null;

    const matchesDate =
      (!fromDate || empDate >= fromDate) &&
      (!toDate || empDate <= toDate);

    return matchesStatus && matchesSearch && matchesDate;
  });

  return (
    <div className="container">
      <h2 className="breadcrumb">Home &gt; Leave</h2>

      <div className="info-box">
        <p>
          The <strong>Monitor: Leave Cancel</strong> page lets you view the workflow Leave Cancel
          transactions that are underway or completed. Use the drop-downs to sort out the
          employees. Click <strong>Detailed View</strong> to get additional information on a
          transaction. Click <strong>Export Excel</strong> to download the Leave Cancel data in an
          Excel file.
        </p>
      </div>

      <div className="filters">
        <select value={employee} onChange={(e) => setEmployee(e.target.value)}>
          <option value="All">Employee: All</option>
        </select>

        <select value={listStatus} onChange={(e) => setListStatus(e.target.value)}>
          <option value="All">List: All</option>
          <option value="Active">List: Active</option>
          <option value="Inactive">List: Inactive</option>
        </select>
<h>Applied Date Range:FROM</h>

        <input
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
          title="From Date"
        />
        <p>TO:</p>
        <input
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
          title="To Date"
        />

        <input
          type="text"
          placeholder="type employee name or number"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button className="export-btn">Export Excel</button>
      </div>

      {filteredEmployees.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>Emp ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Applied Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.id}</td>
                <td>{emp.name}</td>
                <td>{emp.status}</td>
                <td>{emp.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-items">There are no items under this category.</div>
      )}
    </div>
  );
};

export default LeaveCancelMonitor;
