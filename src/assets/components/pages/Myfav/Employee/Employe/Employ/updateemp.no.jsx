import React, { useState } from "react";
import './updateemp.no.css'
const EmployeeSearch = () => {
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

  return (
    <div style={{ padding: "20px", fontFamily: "Segoe UI" }}>
      <style>
        {`
          .fade-in {
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .slide-down {
            animation: slideDown 0.6s ease-out;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {!employee ? (
        <>
          <h2 className="slide-down">Search Employee Details</h2>
          <input
            type="text"
            placeholder="Search by Emp No/ Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: "10px", width: "300px", marginRight: "10px" }}
          />
          <button onClick={handleSearch} style={{ padding: "10px 20px" }}>
            Search
          </button>
        </>
      ) : (
        <div
          className="fade-in"
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
            maxWidth: "600px",
          }}
        >
          <h3>Search Result</h3>
          <div><strong>Name:</strong> {employee.name}</div>
          <div><strong>Employee No:</strong> {employee.employeeNum}</div>
          <div><strong>Department:</strong> {employee.department}</div>
          <div><strong>Location:</strong> {employee.location}</div>
          <div><strong>Join Date:</strong> {employee.joinDate}</div>

          <h4 style={{ marginTop: "20px" }}>Change History</h4>
          <div>Changed by: {employee.changedBy}</div>
          <div>On: {employee.changedOn}</div>
          <div>From {employee.previousEmpNo} to {employee.empNo}</div>

          <h4 style={{ marginTop: "20px" }}>Modify Employee Number</h4>
          <div style={{ marginBottom: "10px" }}>
            <select
              value={newSeries}
              onChange={(e) => setNewSeries(e.target.value)}
              style={{ padding: "8px", width: "100%" }}
            >
              <option value="">Select Series</option>
              <option value="Manual Entry">Manual Entry</option>
            </select>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={revisedEmpNo}
              onChange={(e) => setRevisedEmpNo(e.target.value)}
              placeholder="Revised Employee Number"
              style={{ padding: "8px", width: "100%" }}
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Reason"
              style={{ padding: "8px", width: "100%" }}
            ></textarea>
          </div>
          <button onClick={handleSave} style={{ padding: "8px 16px", marginRight: "10px" }}>
            Save
          </button>
          <button
            onClick={() => {
              setEmployee(null);
              setSearchTerm("");
              setNewSeries("");
              setRevisedEmpNo("");
              setReason("");
            }}
            style={{ padding: "8px 16px" }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default EmployeeSearch;
