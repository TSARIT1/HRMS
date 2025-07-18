import React, { useState } from "react";
import "./ShiftRoster.css";

const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019];
const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const getMonthDays = (year, monthIndex) => {
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  return Array.from({ length: totalDays }, (_, i) => ({
    date: i + 1,
    day: new Date(year, monthIndex, i + 1).toLocaleString("en-US", { weekday: "short" }),
  }));
};

const allEmployees = [
  { empNo: "1002", name: "Robert", designation: "CTO, Cochin", wd: 25, off: 5 },
  { empNo: "1003", name: "George", designation: "Sr Admin, Pune", wd: 25, off: 5 },
  { empNo: "1004", name: "Laxmi Rani", designation: "Sr Executive, Bangalore", wd: 25, off: 5 },
  { empNo: "1006", name: "Pooja Sharma", designation: "Junior Associate, Bangalore", wd: 25, off: 5 },
  { empNo: "1007", name: "Praveen Kumar", designation: "Junior Associate, Pune", wd: 25, off: 5 },
  { empNo: "1008", name: "Rajeev Dixit", designation: "UX Developer, Bhubaneswar", wd: 25, off: 5 },
  { empNo: "1009", name: "Ramesh Belludi", designation: "Content Writer, Pune", wd: 25, off: 5 },
  { empNo: "101", name: "Uday", designation: "", wd: 1, off: 1 },
];

export default function ShiftRoster() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [selectedMonth, setSelectedMonth] = useState(5); // June
  const [searchTerm, setSearchTerm] = useState("");

  const monthDays = getMonthDays(selectedYear, selectedMonth);

  const filteredEmployees = allEmployees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.empNo.includes(searchTerm)
  );

  return (
    <div className="shift-roster-container">
      <h2>Shift Roster</h2>

      <div className="header-controls">
        <div>
          <label>Year: </label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
            {years.map((year) => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>

        <div>
          <label>Month: </label>
          <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
            {months.map((m, i) => <option key={i} value={i}>{m} {selectedYear}</option>)}
          </select>
        </div>

        <select><option>Default Attendance Cycle</option></select>
        <select><option>Category: All</option></select>

        {/* Search Filter */}
        <input
          type="text"
          placeholder="Type employee name or number"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <button>Excel Export</button>
      </div>

      <div className="table-wrapper">
        <table className="roster-table">
          <thead>
            <tr>
              <th>Employee No</th>
              <th>Employee Name</th>
              <th>WD</th>
              <th>OFF</th>
              {monthDays.map((day) => (
                <th key={day.date}>
                  <div>{day.date}</div>
                  <div>{day.day}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((emp, idx) => (
              <tr key={idx}>
                <td>{emp.empNo}</td>
                <td>
                  <div>{emp.name}</div>
                  <div className="designation">{emp.designation}</div>
                </td>
                <td>{emp.wd}</td>
                <td>{emp.off}</td>
                {monthDays.map((_, i) => (
                  <td key={i}>{(i + idx) % 7 === 0 ? "OFF" : "GEN"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer-info">
        <span>Total Items: {filteredEmployees.length}</span>
        <span>OFF: 0</span>
        <span>GEN: 1</span>
      </div>
    </div>
  );
}
