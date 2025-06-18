import React, { useState } from 'react';
import './Release  IT Declaration.css';

const employees = [
  { empNo: '1003', name: 'George', joinDate: '08 Jul 2021' },
  { empNo: '1004', name: 'Laxmi Rani', joinDate: '01 Apr 2021' },
  { empNo: '1007', name: 'Praveen Kumar', joinDate: '12 Aug 2021' },
  { empNo: '1002', name: 'Robert', joinDate: '01 Apr 2021' },
];

export default function EmployeeITDeclaration() {
  const [activeTab, setActiveTab] = useState('release');
  const [selected, setSelected] = useState([]);
  const [statusFilter, setStatusFilter] = useState('LOCKED');

  const toggleSelect = (empNo) => {
    setSelected((prev) =>
      prev.includes(empNo) ? prev.filter((id) => id !== empNo) : [...prev, empNo]
    );
  };

  const handleSelectAll = () => {
    if (selected.length === employees.length) {
      setSelected([]);
    } else {
      setSelected(employees.map((e) => e.empNo));
    }
  };

  return (
    <div className="declaration-container">
      <h2>Employee IT Declaration</h2>

      <div className="help-box">
        The Employee IT Declaration page eases your supervision of the IT Declarations
        submitted by employees. The Income Tax (IT) Declarations must be released to
        the employees to declare their rent and savings. You can <strong>Release / Lock</strong> and
        <strong> Consider</strong> declarations from here.
      </div>

      <div className="tabs">
        <button
          className={activeTab === 'release' ? 'active' : ''}
          onClick={() => setActiveTab('release')}
        >
          Release / Lock
        </button>
        <button
          className={activeTab === 'consider' ? 'active' : ''}
          onClick={() => setActiveTab('consider')}
        >
          Consider Declarations
        </button>
      </div>

      <div className="filters">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="LOCKED">Status: LOCKED</option>
          <option value="RELEASED">Status: RELEASED</option>
        </select>
        <select><option>Employee: All</option></select>
        <select><option>Employee Filter: All</option></select>
        <select><option>Declaration Status: All</option></select>
        <select><option>Join Date: All</option></select>
      </div>

      <table className="employee-table">
        <thead>
          <tr>
            <th>
              {(activeTab === 'release' || activeTab === 'consider') && (
                <input
                  type="checkbox"
                  checked={selected.length === employees.length}
                  onChange={handleSelectAll}
                />
              )}
            </th>
            <th>Employee No</th>
            <th>Name</th>
            <th>Join Date</th>
            <th>Last Modified Date</th>
          </tr>
        </thead>
        <tbody>
          {(activeTab === 'release' || activeTab === 'consider') && employees.length > 0 ? (
            employees.map((emp) => (
              <tr key={emp.empNo}>
                <td>
                  <input
                    type="checkbox"
                    checked={selected.includes(emp.empNo)}
                    onChange={() => toggleSelect(emp.empNo)}
                  />
                </td>
                <td>{emp.empNo}</td>
                <td>{emp.name}</td>
                <td>{emp.joinDate}</td>
                <td>-</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', color: '#888' }}>
                No declarations to display.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {activeTab === 'release' && (
        <div className="actions">
          <button disabled>Send Reminder</button>
          <button disabled>Lock Selected</button>
          <button disabled>Lock All</button>
          <button
            onClick={() => alert(`Released: ${selected.join(', ')}`)}
            disabled={selected.length === 0}
          >
            Release Selected
          </button>
          <button onClick={() => alert('All Declarations Released')}>Release All</button>
        </div>
      )}

      {activeTab === 'consider' && (
        <div className="actions">
          <button
            disabled={selected.length === 0}
            onClick={() => alert(`Considered Selected: ${selected.join(', ')}`)}
          >
            Consider Selected
          </button>
          <button onClick={() => alert('All Considered')}>Consider All</button>
          <button
            disabled={selected.length === 0}
            onClick={() => alert(`Download Selected: ${selected.join(', ')}`)}
          >
            Download Selected
          </button>
          <button onClick={() => alert('All Downloads Triggered')}>Download All</button>
        </div>
      )}
    </div>
  );
}
