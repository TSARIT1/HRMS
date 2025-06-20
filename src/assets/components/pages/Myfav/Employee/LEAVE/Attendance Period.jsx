import React, { useState } from 'react';
import './Attendance Period.css';

const initialData = Array.from({ length: 11 }, (_, i) => ({
  id: i + 1,
  empNo: '1002',
  name: 'Robert',
  date: `${i + 2} Jun`,
  status: 'Pending',
  exception: 'Unauthorized Absence',
  deduction: '1.0 Day LOP',
}));

export default function LeavePeriodFinalization() {
  const [records, setRecords] = useState(initialData);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(records.map((r) => r.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleDeductAll = () => {
    const updated = records.map((row) => ({
      ...row,
      status: 'Deducted',
    }));
    setRecords(updated);
    setSelectedRows([]);
    alert('All records marked as Deducted');
  };

  const handleDeduct = () => {
    if (selectedRows.length === 0) return alert('No rows selected');
    const updated = records.map((row) =>
      selectedRows.includes(row.id) ? { ...row, status: 'Deducted' } : row
    );
    setRecords(updated);
    setSelectedRows([]);
    alert('Selected records marked as Deducted');
  };

  const handleIgnoreAll = () => {
    const updated = records.map((row) => ({
      ...row,
      status: 'Ignored',
    }));
    setRecords(updated);
    setSelectedRows([]);
    alert('All records marked as Ignored');
  };

  const handleIgnore = () => {
    if (selectedRows.length === 0) return alert('No rows selected');
    const updated = records.map((row) =>
      selectedRows.includes(row.id) ? { ...row, status: 'Ignored' } : row
    );
    setRecords(updated);
    setSelectedRows([]);
    alert('Selected records marked as Ignored');
  };

  return (
    <div className="leave-container">
      <h2>Leave Period Finalization</h2>
      <div className="filters">
        <select><option>June 2025</option></select>
        <select><option>Default Attendance Cycle</option></select>
        <select><option>Employee Filters: All</option></select>
        <select><option>Employee: All</option></select>
        <select><option>Conversion Status: Pending</option></select>
        <select><option>Applicable Dates: All</option></select>
        <button className="export-btn">Export Excel</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedRows.length === records.length}
                onChange={handleSelectAll}
              />
            </th>
            <th>#</th>
            <th>Employee No</th>
            <th>Employee Name</th>
            <th>Applicable Dates</th>
            <th>Status</th>
            <th>Exception Rule</th>
            <th>Deduction</th>
          </tr>
        </thead>
        <tbody>
          {records.map((row) => (
            <tr key={row.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
              </td>
              <td>{row.id}</td>
              <td>{row.empNo}</td>
              <td>{row.name}</td>
              <td>{row.date}</td>
              <td>{row.status}</td>
              <td>{row.exception}</td>
              <td>{row.deduction}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="actions">
        <button onClick={handleDeductAll}>Deduct All</button>
        <button onClick={handleDeduct}>Deduct</button>
        <button onClick={handleIgnoreAll}>Ignore All</button>
        <button onClick={handleIgnore}>Ignore</button>
      </div>

      <div className="footer-note">
        <p>Total Items: {records.length}</p>
        <p><small>Note: Drag the mouse pointer on the column header and click the “⇅” to filter data.</small></p>
      </div>
    </div>
  );
}
