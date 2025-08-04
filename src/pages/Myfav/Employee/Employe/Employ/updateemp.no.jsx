import React, { useState } from "react";
import "./updateemp.no.css";

const EmployeSearch= () => {
  const mockEmployeeData = {
    id: 1,
    name: "Aadesh Verma",
    employeeNum: "1001",
    department: "Development",
    location: "Hyderabad",
    joinDate: "2023-04-01",
    changedBy: "Jabi",
    changedOn: "2024-11-10",
    previousEmpNo: "TSR-001",
    empNo: "1001",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [employee, setEmployee] = useState(null);
  const [newSeries, setNewSeries] = useState("");
  const [revisedEmpNo, setRevisedEmpNo] = useState("");
  const [reason, setReason] = useState("");

  const handleSearch = () => {
    if (
      searchTerm === "1001" ||
      searchTerm.toLowerCase().includes("aadesh")
    ) {
      setEmployee(mockEmployeeData);
    } else {
      setEmployee(null);
      alert("Employee not found.");
    }
  };

  const handleSave = () => {
    if (!newSeries || !revisedEmpNo || !reason) {
      alert("Please fill in all fields before saving.");
      return;
    }

    alert(`Saved:
    Series: ${newSeries}
    New Emp No: ${revisedEmpNo}
    Reason: ${reason}`);

    setEmployee((prev) => ({
      ...prev,
      empNo: revisedEmpNo,
      previousEmpNo: prev.employeeNum,
      employeeNum: revisedEmpNo,
    }));

    setNewSeries("");
    setRevisedEmpNo("");
    setReason("");
  };

  const handleCancel = () => {
    setEmployee(null);
    setSearchTerm("");
    setNewSeries("");
    setRevisedEmpNo("");
    setReason("");
  };

  return (
    <div className="emp-container">
      {!employee ? (
        <div className="search-section slide-down">
          <h2>Search Employee Details</h2>
          <div className="search-row">
            <input
              type="text"
              placeholder="Search by Emp No / Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      ) : (
        <div className="result-section fade-in">
          <h3>Search Result</h3>
          <div className="emp-details">
            <div><strong>Name:</strong> {employee.name}</div>
            <div><strong>Employee No:</strong> {employee.employeeNum}</div>
            <div><strong>Department:</strong> {employee.department}</div>
            <div><strong>Location:</strong> {employee.location}</div>
            <div><strong>Join Date:</strong> {employee.joinDate}</div>
          </div>

          <h4>Change History</h4>
          <div>Changed by: {employee.changedBy}</div>
          <div>On: {employee.changedOn}</div>
          <div>From {employee.previousEmpNo} to {employee.empNo}</div>

          <h4>Modify Employee Number</h4>
          <select
            value={newSeries}
            onChange={(e) => setNewSeries(e.target.value)}
          >
            <option value="">Select Series</option>
            <option value="Manual Entry">Manual Entry</option>
          </select>

          <input
            type="text"
            value={revisedEmpNo}
            onChange={(e) => setRevisedEmpNo(e.target.value)}
            placeholder="Revised Employee Number"
          />

          <textarea
            rows={3}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason"
          ></textarea>

          <div className="button-row">
            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeSearch;
