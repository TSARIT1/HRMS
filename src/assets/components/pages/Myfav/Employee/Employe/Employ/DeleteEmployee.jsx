import React, { useState } from "react";
import "./DeleteEmployee.css";

const employees = [
  {
    id: 1001,
    name: "Aadesh Hiralal Sonar",
    joinDate: "2021-04-01",
    email: "Aadesh@fsd.com",
    department: "Core Department",
    location: "Bangalore",
    leave: { granted: 4, lapsed: 1 },
    reports: 5,
  },
  {
    id: 1023,
    name: "Sneha Patil",
    joinDate: "2022-05-15",
    email: "sneha.patil@fsd.com",
    department: "HR",
    location: "Mumbai",
    leave: { granted: 3, lapsed: 0 },
    reports: 0,
  },
  {
    id: 3055,
    name: "Rahul Mehta",
    joinDate: "2020-11-20",
    email: "rahul.mehta@fsd.com",
    department: "Finance",
    location: "Delhi",
    leave: { granted: 2, lapsed: 1 },
    reports: 0,
  },
];

const DeleteEmployee = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase().trim();
    const emp = employees.find(
      (e) =>
        e.id.toString() === term ||
        e.name.toLowerCase().includes(term) ||
        e.email.toLowerCase() === term
    );

    if (emp) {
      setSelectedEmployee(emp);
    } else {
      alert("Employee not found.");
      setSelectedEmployee(null);
    }
  };

  const handleDelete = () => {
    if (selectedEmployee.reports > 0) {
      alert(
        `Cannot delete ${selectedEmployee.name}. Please reassign ${selectedEmployee.reports} direct reports.`
      );
    } else {
      alert(`Employee ${selectedEmployee.name} deleted successfully.`);
      setSelectedEmployee(null);
      setSearchTerm("");
    }
  };

  const handleCancel = () => {
    setSelectedEmployee(null);
    setSearchTerm("");
  };

  return (
    <div className="delete-employee-container">
      <h2>🗑 Delete Employee</h2>
      <p className="sub-text">Search by ID, Name, or Email</p>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter ID, name, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>🔍 Search</button>
        <button onClick={handleCancel}>❌ Clear</button>
      </div>

      {selectedEmployee ? (
        <div className="emp-card">
          <div className="emp-header">
            <div className="emp-avatar">👤</div>
            <div>
              <div className="emp-name">{selectedEmployee.name}</div>
              <div className="emp-id">#{selectedEmployee.id}</div>
            </div>
          </div>

          <div className="emp-details">
            <p><strong>Joined On:</strong> {selectedEmployee.joinDate}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <p><strong>Department:</strong> {selectedEmployee.department}</p>
            <p><strong>Location:</strong> {selectedEmployee.location}</p>
            <p>
              <strong>Leave:</strong> Granted - {selectedEmployee.leave.granted}, Lapsed -{" "}
              {selectedEmployee.leave.lapsed}
            </p>
          </div>


          <div className="btn-group">
            <button onClick={handleDelete}>🗑 Delete</button>
            <button onClick={handleCancel}>❌ Cancel</button>
          </div>
        </div>
      ) : (
        <p className="no-selection">No employee selected.</p>
      )}
    </div>
  );
};

export default DeleteEmployee;
