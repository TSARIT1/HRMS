import React, { useState } from "react";
import "./Attendance Muster.css";

const employees = [
  {
    id: 6266,
    name: "Aadesh Hiralal Sonar",
    designation: "CEO, Bangalore",
    statusByDay: [
      "OFF",
      ...Array(30).fill("A"),         
    ],
  },
  {
    id: 1003,
    name: "George",
    designation: "Sr Admin, Pune",
    statusByDay: ["OFF", ...Array(30).fill("A")],
  },
  {
    id: 566,
    name: "Harshit Patel",
    designation: "Sr Executive, Chennai",
    statusByDay: [
      "OFF",
      ...Array(11).fill("A"),
      "-", "-", "-",              
      ...Array(4).fill("A"),
      "-",                        
      ...Array(10).fill("-"),
    ],
  },
];

const monthDays = [...Array(30)].map((_, i) => i + 1);       
const dayOfWeekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusColours = {
  P: "var(--present)",
  A: "var(--absent)",
  L: "var(--leave)",
  H: "var(--holiday)",
  OFF: "var(--offday)",
  OD: "var(--onduty)",
};

export default function AttendanceStatusOverride() {
  const [month, setMonth] = useState("June 2025");
  const [cycle, setCycle] = useState("Default Attendance Cycle");
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const calcTotals = (statuses) => {
    const tally = { P: 0, L: 0, H: 0, A: 0, OFF: 0, R: 0, OD: 0, "?": 0 };
    statuses.forEach((s) => {
      if (tally[s] !== undefined) tally[s] += 1;
      else if (s === "-") tally["?"] += 1;
    });
    return tally;
  };

  return (
    <div className="aso-container">
      <div className="aso-toolbar">
        <div className="aso-filter-row">
          <label>
            Select Month&nbsp;
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
              {["Jan", "Feb", "Mar", "Apr", "May", "June 2025"].map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>
          </label>

          <label>
            Select Attendance Cycle&nbsp;
            <select value={cycle} onChange={(e) => setCycle(e.target.value)}>
              <option>Default Attendance Cycle</option>
              <option>Night Shift</option>
            </select>
          </label>

          <label>
            Employee:&nbsp;
            <select
              value={employeeFilter}
              onChange={(e) => setEmployeeFilter(e.target.value)}
            >
              <option>All</option>
              <option>Confirmed</option>
              <option>Probation</option>
            </select>
          </label>

          <label>
            Category:&nbsp;
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option>All</option>
              <option>Consultant</option>
            </select>
          </label>
        </div>

        <button className="btn export">Export Excel</button>
      </div>

      <div className="aso-grid-wrapper">
        <table className="aso-grid">
          <thead>
            <tr>
              <th className="emp-col">Employee</th>
              {monthDays.map((d) => (
                <th key={d} className="day-col">
                  {d}
                  <br />
                  <span className="dow">{dayOfWeekLabels[(d + 5) % 7]}</span>
                </th>
              ))}
              <th className="summary-col">P</th>
              <th className="summary-col">L</th>
              <th className="summary-col">H</th>
              <th className="summary-col">A</th>
              <th className="summary-col">OFF</th>
              <th className="summary-col">R</th>
              <th className="summary-col">OD</th>
              <th className="summary-col">?</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => {
              const t = calcTotals(emp.statusByDay);
              return (
                <tr key={emp.id}>
                  <td className="emp-col">
                    <div className="emp-name">
                      {emp.name} <span className="emp-id">[{emp.id}]</span>
                    </div>
                    <div className="emp-desg">{emp.designation}</div>
                  </td>

                  {emp.statusByDay.map((code, idx) => (
                    <td
                      key={idx}
                      className={`status-cell ${code}`}
                      style={{ backgroundColor: statusColours[code] || "inherit" }}
                    >
                      {code !== "-" ? code : ""}
                    </td>
                  ))}

                  <td className="summary-col">{t.P}</td>
                  <td className="summary-col">{t.L}</td>
                  <td className="summary-col">{t.H}</td>
                  <td className="summary-col">{t.A}</td>
                  <td className="summary-col">{t.OFF}</td>
                  <td className="summary-col">{t.R}</td>
                  <td className="summary-col">{t.OD}</td>
                  <td className="summary-col">{t["?"]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="aso-legends">
        <div className="ao-section">
          <h4>Allow Override Status </h4>
          <LegendItem label="Absent : A" className="A" />
          <LegendItem label="Off Day : O" className="OFF" />
          <LegendItem label="Present : P" className="P" />
          <LegendItem label="Rest Day : R" className="R" />
        </div>

        <div className="legend-section">
          <h4>Legend</h4>
          <LegendItem label="Present : P" className="P" />
          <LegendItem label="Leave : L" className="L" />
          <LegendItem label="Holiday : H" className="H" />
          <LegendItem label="Absent : A" className="A" />
          <LegendItem label="Off Day : OFF" className="OFF" />
          <LegendItem label="Rest Day : R" className="R" />
          <LegendItem label="On duty : OD" className="OD" />
          <LegendItem label="Status unknown : ?" className="Q" />
        </div>
      </div>
    </div>
  );
}

function LegendItem({ label, className }) {
  return (
    <span className="legend-item">
      <span className={`legend-box ${className}`}></span> {label}
    </span>
  );
}
