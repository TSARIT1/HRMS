import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import "./Attendance Muster.css";

const employees = [
  {
    id: 6266,
    name: "Aadesh Hiralal Sonar",
    designation: "CEO, Bangalore",
    statusByDay: ["OFF", ...Array(30).fill("A")],
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
  P: "#c6f6d5",   // green
  A: "#fed7d7",   // red
  L: "#fbd38d",   // orange
  H: "#bee3f8",   // blue
  OFF: "#e2e8f0", // gray
  OD: "#f6ad55",  // brownish
};

export default function AttendanceStatusOverride() {
  const [month, setMonth] = useState("June 2025");

  const calcTotals = (statuses) => {
    const tally = { P: 0, L: 0, H: 0, A: 0, OFF: 0, R: 0, OD: 0, "?": 0 };
    statuses.forEach((s) => {
      if (tally[s] !== undefined) tally[s] += 1;
      else if (s === "-") tally["?"] += 1;
    });
    return tally;
  };

  const handleExportExcel = () => {
    const wb = XLSX.utils.book_new();

    const headers = ["Employee ID", "Name", "Designation", ...monthDays.map(d => `Day ${d}`)];
    const data = employees.map((emp) => [
      emp.id,
      emp.name,
      emp.designation,
      ...emp.statusByDay.slice(1) // skip the first OFF
    ]);

    const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");

    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), `Attendance_Muster_${month.replace(" ", "_")}.xlsx`);
  };

  return (
    <div className="aso-container">
      <div className="aso-toolbar">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          {["Jan", "Feb", "Mar", "Apr", "May", "June 2025"].map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
        <button className="export-btn" onClick={handleExportExcel}>Export Excel</button>
      </div>

      <div className="aso-grid-wrapper">
        <table className="aso-grid">
          <thead>
            <tr>
              <th className="sticky-col emp-col">Employee</th>
              {monthDays.map((d) => (
                <th key={d}>
                  {d}
                  <br />
                  <span className="dow">{dayOfWeekLabels[(d + 5) % 7]}</span>
                </th>
              ))}
              {["P", "L", "H", "A", "OFF", "R", "OD", "?"].map((s) => (
                <th key={s} className="summary-col">{s}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => {
              const t = calcTotals(emp.statusByDay);
              return (
                <tr key={emp.id}>
                  <td className="sticky-col emp-col">
                    <div className="emp-name">
                      {emp.name} <span className="emp-id">[{emp.id}]</span>
                    </div>
                    <div className="emp-desg">{emp.designation}</div>
                  </td>

                  {emp.statusByDay.map((code, idx) => (
                    <td
                      key={idx}
                      style={{ backgroundColor: statusColours[code] || "inherit" }}
                    >
                      {code !== "-" ? code : ""}
                    </td>
                  ))}

                  {["P", "L", "H", "A", "OFF", "R", "OD", "?"].map((s) => (
                    <td key={s} className="summary-col">{t[s]}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
