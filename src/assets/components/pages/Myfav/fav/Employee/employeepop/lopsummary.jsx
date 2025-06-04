import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LopSummaryPage = () => {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("lopEntries")) || [];
    setEntries(data);
  }, []);

  const handleDelete = (index) => {
    const updated = [...entries];
    updated.splice(index, 1);
    setEntries(updated);
    localStorage.setItem("lopEntries", JSON.stringify(updated));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>LOP Summary</h2>
      <button onClick={() => navigate("/")}>Add New LOP</button>

      <table border="1" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#eee" }}>
            <th>#</th>
            <th>Employee No</th>
            <th>Name</th>
            <th>Join Date</th>
            <th>Work Days</th>
            <th>LOP</th>
            <th>Remarks</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{entry.empNo}</td>
              <td>{entry.name}</td>
              <td>{entry.joinDate}</td>
              <td>{entry.workDays}</td>
              <td>{entry.lop}</td>
              <td>{entry.remarks}</td>
              <td>
                <button style={{ color: "red" }} onClick={() => handleDelete(i)}>🗑</button>
              </td>
            </tr>
          ))}
          {entries.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center" }}>No LOP data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LopSummaryPage;
