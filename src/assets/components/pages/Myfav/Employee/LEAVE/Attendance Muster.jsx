import React, { useState } from "react";
import "./Attendance Muster.css";

/** ---------- demo datasource ---------- */
const employees = [
  {
    id: 6266,
    name: "Aadesh Hiralal Sonar",
    designation: "CEO, Bangalore",
    statusByDay: [
      "OFF",
      ...Array(30).fill("A"),          // 2‑31 Jun
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
      "-", "-", "-",              // 13‑15 Jun absent data
      ...Array(4).fill("A"),
      "-",                        // 20 Jun blank
      ...Array(10).fill("-"),
    ],
  },
  /* --- add more rows as you like --- */
];

/** ---------- helpers ---------- */
const monthDays = [...Array(30)].map((_, i) => i + 1);        // June 2025 → 30 days
const dayOfWeekLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const statusColours = {
  P: "var(--present)",
  A: "var(--absent)",
  L: "var(--leave)",
  H: "var(--holiday)",
  OFF: "var(--offday)",
  OD: "var(--onduty)",
};

/** ---------- main component ---------- */
export default function AttendanceStatusOverride() {
  /* simple state for the dropdowns – you can wire them to real data later */
  const [month, setMonth] = useState("June 2025");
  const [cycle, setCycle] = useState("Default Attendance Cycle");
  const [employeeFilter, setEmployeeFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  /* compute row totals (P/L/H/A/OFF/R/OD/?) */
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
      {/* ---------- top bar ---------- */}
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

      {/* ---------- grid wrapper (horizontal+vertical scroll) ---------- */}
      <div className="aso-grid-wrapper">
        <table className="aso-grid">
          {/* ====== header row (days) ====== */}
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

          {/* ====== body rows ====== */}
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

      {/* ---------- allow‑override + legend ---------- */}
      <div className="aso-legends">
        <div className="ao-section">
          <h4>Allow Override Status</h4>
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

/* ---------- small helper for legend cells ---------- */
function LegendItem({ label, className }) {
  return (
    <span className="legend-item">
      <span className={`legend-box ${className}`}></span> {label}
    </span>
  );
}
