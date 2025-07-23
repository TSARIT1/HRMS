import React, { useState } from 'react';
import './ProcessAttendance.css';

const employeeList = [
  { id: 1, name: 'Aadesh Hiralal Sonar', empNo: '6266' },
  { id: 2, name: 'George', empNo: '1003' },
  { id: 3, name: 'Harshit Patel', empNo: '566' },
  { id: 4, name: 'Laxmi Rani', empNo: '1004' },
];

const ProcessAttendance = () => {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [tab, setTab] = useState('All');
  const [fromDate, setFromDate] = useState('2025-07-22');
  const [toDate, setToDate] = useState('2025-07-22');

  const toggleSelection = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isAllSelected = () => {
    const filteredList = getFilteredEmployees();
    return filteredList.length > 0 && filteredList.every(emp => selected.includes(emp.id));
  };

  const toggleSelectAll = () => {
    const filteredList = getFilteredEmployees();
    if (isAllSelected()) {
      setSelected(prev => prev.filter(id => !filteredList.map(emp => emp.id).includes(id)));
    } else {
      const newSelections = filteredList.map(emp => emp.id);
      setSelected(prev => Array.from(new Set([...prev, ...newSelections])));
    }
  };

  const getFilteredEmployees = () => {
    return tab === 'Selected'
      ? employeeList.filter(emp => selected.includes(emp.id))
      : employeeList;
  };

  return (
    <div className="attendance-container">
      <div className="header">
        <button className="process-btn" onClick={() => setShowModal(true)}>
          ⚙️ Process Attendance
        </button>
      </div>

      <div className="history-table">
        <h3>Attendance Process History</h3>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Processed For</th>
              <th>Processed On</th>
              <th>Attendance Period</th>
              <th>Selected Date</th>
              <th>Status</th>
              <th>Attendance Cycle</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>2 Employee(s)<br /><span>By info@tsaritservices.com</span></td>
              <td>23 Jul 2025<br /><span>11:45 & took 0 mins</span></td>
              <td>31 Jul 2025<br /><span>01 Jul 2025 to 31 Jul 2025</span></td>
              <td>22 Jul 2025 to 22 Jul 2025<br />1 Day(s)</td>
              <td>DONE</td>
              <td>Default Attendance Cycle<br />Start Date - 01</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Process Attendance</h2>
            <div className="date-section">
              <label>
                From Date
                <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
              </label>
              <label>
                To Date
                <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
              </label>
            </div>

            <div className="radio-group">
              <label><input type="radio" name="empSelect" defaultChecked /> All Employees</label>
              <label><input type="radio" name="empSelect" /> Selected Employees</label>
            </div>

            <div className="filter-bar">
              <select>
                <option>Employee Filters: All</option>
              </select>
              <div className="tabs">
                <button onClick={() => setTab('All')} className={tab === 'All' ? 'active' : ''}>All</button>
                <button onClick={() => setTab('Selected')} className={tab === 'Selected' ? 'active' : ''}>Selected</button>
              </div>
            </div>

            <div className="employee-table">
              <table>
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        checked={isAllSelected()}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Employee Name</th>
                    <th>Employee No</th>
                  </tr>
                </thead>
                <tbody>
                  {getFilteredEmployees().map(emp => (
                    <tr key={emp.id}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selected.includes(emp.id)}
                          onChange={() => toggleSelection(emp.id)}
                        />
                      </td>
                      <td>{emp.name}</td>
                      <td>{emp.empNo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="modal-actions">
              <button className="btn-process" onClick={() => alert('Processing...')}>Process</button>
              <button className="btn-close" onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessAttendance;
