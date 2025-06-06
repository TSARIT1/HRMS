import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div style={{ padding: "30px" }}>
      <h2>Enter LOP Details</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        {/* Searchable Employee Input */}
        <div style={{ position: "relative" }}>
          <label>Employee</label><br />
          <input
            type="text"
            value={employee}
            onChange={handleSearchChange}
            placeholder="Search by Emp No or Name"
            style={{ width: "300px", padding: "10px" }}
          />
          {employee && filteredEmployees.length > 0 && (
            <ul
              style={{
                position: "absolute",
                backgroundColor: "white",
                border: "1px solid #ccc",
                width: "300px",
                listStyle: "none",
                padding: "0",
                marginTop: "2px",
                zIndex: 1,
              }}
            >
              {filteredEmployees.map((emp, index) => (
                <li
                  key={index}
                  onClick={() => handleSelectSuggestion(emp)}
                  style={{
                    padding: "8px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                >
                  {emp}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label>LOP Days</label><br />
          <input
            type="number"
            value={lopDays}
            onChange={(e) => setLopDays(e.target.value)}
            style={{ padding: "10px", width: "300px" }}
          />
        </div>

        <div>
          <label>Remarks</label><br />
          <textarea
            rows={3}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            style={{ padding: "10px", width: "300px" }}
          />
        </div>

        <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>
          Save
        </button>
      </form>
    </div>
  );
};

export default LopFormPage;
