import React, { useEffect, useState } from 'react';
import './Release  IT Declaration.css';

export default function EmployeeITDeclaration() {
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('release');
  const [selected, setSelected] = useState([]);
  const [statusFilter, setStatusFilter] = useState('LOCKED');

  useEffect(() => {
    // Replace with your API call
    fetch('/api/employees/it-declaration')
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((err) => console.error('Failed to fetch employees:', err));
  }, []);

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

  const handleAction = (type) => {
    alert(`${type} Selected: ${selected.join(', ')}`);
    // Add API call logic here based on `type`
  };

  return (
    <div className="declaration-container">
      <h2>Employee IT Declaration</h2>

      <div className="help-box">
        The IT Declarations must be released for employees to declare rent/savings.
        You can <strong>Release / Lock</strong> or <strong>Consider</strong> declarations here.
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

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={selected.length === employees.length}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Employee No</th>
              <th>Name</th>
              <th>Join Date</th>
              <th>Last Modified Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
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
                  <td>{emp.modifiedDate || '-'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">No declarations to display.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="actions">
        {activeTab === 'release' && (
          <>
            <button disabled>Send Reminder</button>
            <button disabled>Lock Selected</button>
            <button disabled>Lock All</button>
            <button
              disabled={selected.length === 0}
              onClick={() => handleAction('Release')}
            >
              Release Selected
            </button>
            <button onClick={() => handleAction('Release All')}>
              Release All
            </button>
          </>
        )}
        {activeTab === 'consider' && (
          <>
            <button
              disabled={selected.length === 0}
              onClick={() => handleAction('Consider')}
            >
              Consider Selected
            </button>
            <button onClick={() => handleAction('Consider All')}>
              Consider All
            </button>
            <button
              disabled={selected.length === 0}
              onClick={() => handleAction('Download')}
            >
              Download Selected
            </button>
            <button onClick={() => handleAction('Download All')}>
              Download All
            </button>
          </>
        )}
      </div>
    </div>
  );
}
