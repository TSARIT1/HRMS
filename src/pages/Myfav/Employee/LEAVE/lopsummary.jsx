import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./lopSummary.css";

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
    <div className="lop-summary-container">
      <div className="header-row">
        <h2>LOP Summary</h2>
        <button className="add-btn" onClick={() => navigate("/lop")}>
          + Add New LOP
        </button>
      </div>

      <div className="table-wrapper">
        <table className="lop-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Employee No</th>
              <th>Name</th>
              <th>Join Date</th>
              <th>Work Days</th>
              <th>LOP</th>
              <th>Remarks</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {entries.length > 0 ? (
                entries.map((entry, i) => (
                  <motion.tr
                    key={entry.empNo + i}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td>{i + 1}</td>
                    <td>{entry.empNo}</td>
                    <td>{entry.name}</td>
                    <td>{entry.joinDate}</td>
                    <td>{entry.workDays}</td>
                    <td>{entry.lop}</td>
                    <td>{entry.remarks}</td>
                    <td>
                      <button className="delete-btn" onClick={() => handleDelete(i)}>
                        🗑
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td colSpan="8" className="no-data">
                    No LOP data available
                  </td>
                </motion.tr>
              )}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LopSummaryPage;
