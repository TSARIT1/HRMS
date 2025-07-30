import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Deduct LOP.css";

const employeesList = [
  "1007 - Praveen Kumar",
  "566 - Harshit Patel",
  "6266 - Aadesh Hiralal Sonar",
];

const LopFormPage = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState("");
  const [lopDays, setLopDays] = useState("");
  const [remarks, setRemarks] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employeesList);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setEmployee(value);
    const filtered = employeesList.filter((emp) =>
      emp.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const handleSelectSuggestion = (suggestion) => {
    setEmployee(suggestion);
    setFilteredEmployees([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!employee || !lopDays) {
      alert("Fill all fields");
      return;
    }

    const [empNo, name] = employee.split(" - ");
    const entry = {
      empNo,
      name,
      joinDate: "01 Apr 2021",
      workDays: 0,
      lop: parseInt(lopDays),
      remarks,
    };

    const prevEntries = JSON.parse(localStorage.getItem("lopEntries")) || [];
    localStorage.setItem("lopEntries", JSON.stringify([...prevEntries, entry]));

    navigate("/summary");
  };

  return (
    <div className="lop-form-wrapper">
      <div className="lop-form-container">
        <h2>Enter LOP Details</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="form-group" style={{ position: "relative" }}>
            <label>Employee</label>
            <input
              type="text"
              value={employee}
              onChange={handleSearchChange}
              placeholder="Search by Emp No or Name"
            />
            {employee && filteredEmployees.length > 0 && (
              <ul className="autocomplete-list">
                {filteredEmployees.map((emp, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectSuggestion(emp)}
                  >
                    {emp}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="form-group">
            <label>LOP Days</label>
            <input
              type="number"
              value={lopDays}
              onChange={(e) => setLopDays(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Remarks</label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default LopFormPage;
