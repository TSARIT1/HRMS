import React from 'react';
import './QuickSalaryStatement.css';

export default function SalaryStatement() {
  const handleExport = () => {
    const link = document.createElement('a');
    link.href = '/SalaryStatementJun2026.xls'; // Ensure file exists in /public
    link.download = 'QuickSalaryStatement-Jun2026.xls';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="salary-container">
      <div className="salary-header">
        <h2>Quick Salary Statement</h2>
        <p>After the Payroll for the selected month is run.</p>
      </div>

      <div className="salary-filters">
        <select>
          <option>Employee Filter: All</option>
        </select>
        <select>
          <option>Category: All</option>
          <option>Category: Probation</option>
          <option>Category: Confirmed Consultant</option>
          <option>Category: Consultant</option>
        </select>
        <select>
          <option>Employment Status: All</option>
          <option>Employment Status: Current Employee</option>
          <option>Employment Status: Past Employee</option>
        </select>
      </div>

      <div className="salary-table-wrapper">
        <table className="salary-table">
          <thead>
            <tr>
              <th>#</th>
              <th>EMPLOYEE NO</th>
              <th>NAME</th>
              <th>JOIN DATE</th>
              <th>BASIC</th>
              <th>BASIC ARREARS</th>
              <th>BASIC REVERSAL</th>
              <th>DA</th>
              <th>DA ARREARS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="9" className="no-data">No Rows To Show</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="export-btn-wrapper">
        <button className="export-button" onClick={handleExport}>
          Export to Excel
        </button>
      </div>
    </div>
  );
}
