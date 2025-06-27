import React, { useState, useEffect } from "react";
import "./Regenerate password.css";

const mockEmployees = [
  {
    id: 6266,
    name: "Aadesh Hiralal Sonar",
    joinDate: "2021-04-01",
    email: "aadesh@fsd.com",
  },
  {
    id: 1023,
    name: "Sneha Patil",
    joinDate: "2022-05-15",
    email: "sneha.patil@fsd.com",
  },
  {
    id: 3055,
    name: "Rahul Mehta",
    joinDate: "2020-11-20",
    email: "rahul.mehta@fsd.com",
  },
];

export default function GenerateEmployeePassword() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editableData, setEditableData] = useState({ joinDate: "", email: "" });

  useEffect(() => {
    const defaultEmp = mockEmployees[0];
    setSelectedEmployee(defaultEmp);
    setEditableData({ joinDate: defaultEmp.joinDate, email: defaultEmp.email });
  }, []);

  const handleSearch = () => {
    const term = searchTerm.trim().toLowerCase();
    const match = mockEmployees.find((emp) =>
      emp.id.toString() === term ||
      emp.name.toLowerCase().includes(term) ||
      emp.email.toLowerCase() === term ||
      emp.joinDate === term
    );

    if (match) {
      setSelectedEmployee(match);
      setEditableData({ joinDate: match.joinDate, email: match.email });
    } else {
      alert("Employee not found.");
      setSelectedEmployee(null);
      setEditableData({ joinDate: "", email: "" });
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setSelectedEmployee(null);
    setEditableData({ joinDate: "", email: "" });
  };

  const handleUpdate = () => {
    if (!editableData.joinDate || !editableData.email) {
      alert("Please fill in both fields.");
      return;
    }

    setSelectedEmployee((prev) => ({
      ...prev,
      joinDate: editableData.joinDate,
      email: editableData.email,
    }));

    alert("Employee details updated.");
  };

  const handleGenerateView = () => {
    alert(`Password for ${selectedEmployee.name}: Abc@123`);
  };

  const handleGenerateMail = () => {
    alert(`Password sent to: ${selectedEmployee.email}`);
  };

  const handleCancel = () => {
    handleClear();
  };

  return (
    <div className="password-container">
      <h2>Generate Employee Password</h2>
      <p className="info-text">
        Search by <strong>ID, Name, Email, or Join Date</strong>
      </p>

      <div className="search-area">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Search</button>
        <button onClick={handleClear}>✖ Clear</button>
      </div>

      {selectedEmployee && (
        <>
          <div className="employee-card">
            <div className="employee-info">
              <div className="avatar-placeholder">👤</div>
              <div>
                <div className="emp-name">{selectedEmployee.name}</div>
                <div className="emp-id">#{selectedEmployee.id}</div>
              </div>
            </div>
          </div>

          <div className="employee-details">
            <div>
              <label>Joined Date</label>
              <input
                type="date"
                value={editableData.joinDate}
                onChange={(e) =>
                  setEditableData({ ...editableData, joinDate: e.target.value })
                }
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                value={editableData.email}
                onChange={(e) =>
                  setEditableData({ ...editableData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="bottom-buttons">
            <button onClick={handleUpdate}>✅ Update</button>
            <button onClick={handleGenerateView}>🔁 Generate & View</button>
            <button onClick={handleGenerateMail}>📧 Generate & Mail</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
