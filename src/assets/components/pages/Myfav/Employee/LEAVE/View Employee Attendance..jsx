import React, { useState, useEffect } from "react";
import "./View Employee Attendance.css";

const employees = [
  { id: 6266, name: "Aadesh Hiralal Sonar" },
  { id: 6270, name: "Ramesh Belludi" },
  { id: 6275, name: "Ritika Sharma" },
];

// Utility to generate June 2025 calendar data
const generateJune2025Data = () => {
  const daysInMonth = 30;
  const data = [];
  const statuses = ["A", "P", "L", "GEN"];
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(2025, 5, i); // June is month 5 (0-indexed)
    const dayShort = date.toLocaleDateString("en-US", { weekday: "short" }); // Mon, Tue...
    const formattedDate = date.toISOString().split("T")[0]; // yyyy-mm-dd
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    data.push({
      date: formattedDate,
      day: dayShort,
      status: randomStatus,
      shift: "GEN",
    });
  }
  return data;
};

export default function AttendanceInfo() {
  const [calendarData] = useState(generateJune2025Data());
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0]);
  const [search, setSearch] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [selectedDate, setSelectedDate] = useState("2025-06-24");

  useEffect(() => {
    const filtered = employees.filter((emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.id.toString().includes(search)
    );
    setFilteredEmployees(filtered);
  }, [search]);

  return (
    <div className="attendance-container">
      {/* Employee Search Section */}
      <div className="employee-search">
        <label>Employee Type:</label>
        <span style={{ marginLeft: 10, marginRight: 20 }}>Current Employees</span>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by name or ID"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <div className="dropdown">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  className="dropdown-item"
                  onClick={() => {
                    setSelectedEmployee(emp);
                    setSearch("");
                  }}
                >
                  {emp.name} ({emp.id})
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Selected Employee Display */}
      {selectedEmployee && (
        <div className="employee-box">
          <span className="avatar">{selectedEmployee.name?.charAt(0)}</span>
          <span>{selectedEmployee.name}</span>
          <span className="emp-id">#{selectedEmployee.id}</span>
        </div>
      )}

      {/* Attendance Calendar */}
      <h3>June 2025</h3>
      <div className="calendar-grid">
        {calendarData.map((day, i) => (
          <div
            key={i}
            className={`calendar-cell ${day.date === selectedDate ? "selected" : ""}`}
            onClick={() => setSelectedDate(day.date)}
          >
            <div className="day-label">{day.day}</div>
            <div className="status">{day.status}</div>
            {day.shift && <div className="shift">{day.shift}</div>}
          </div>
        ))}
      </div>

      {/* Selected Day Detail Panel */}
      <div className="daily-details">
        <h4>{selectedDate} - Details</h4>
        <div className="detail-box">
          <p><strong>Shift:</strong> 09:00 to 18:00</p>
          <p><strong>Processed on:</strong> 2nd Jun at 04:02</p>
          <p><strong>Status:</strong> -</p>
          <p><strong>Session 1:</strong> 09:00 - 13:00</p>
          <p><strong>Session 2:</strong> 13:01 - 18:00</p>
        </div>
      </div>
    </div>
  );
}
