import React, { useState } from 'react';
import './Relese Pay Slip.css';
import * as XLSX from 'xlsx';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const years = [2025, 2026, 2027, 2028, 2029];

const defaultCards = [
  'Negative Salary',
  'Stop Salary Processing',
  'Settled Employees',
  'Hold Salary Payout',
  'Payout Pending',
  'Locations Without PT State',
];

const records = {
  'Apr 2027': [
    { title: 'Negative Salary', value: 'No Records' },
    { title: 'Stop Salary Processing', value: 'No Records' },
    { title: 'Settled Employees', value: 'No Records' },
    { title: 'Hold Salary Payout', value: 'No Records' },
    { title: 'Payout Pending', value: 'No Records' },
    { title: 'Locations Without PT State', value: 'No Records' },
  ]
};

const today = new Date();
const defaultMonth = months[today.getMonth()];
const defaultYear = today.getFullYear();

export default function PayrollDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedYear, setSelectedYear] = useState(defaultYear);
  const [searchText, setSearchText] = useState('');

  const selectedPeriod = `${selectedMonth} ${selectedYear}`;
  const data = records[selectedPeriod] || [];

  const fullCardData = defaultCards.map((title) => {
    const match = data.find((item) =>
      item.title.toLowerCase() === title.toLowerCase()
    );
    return {
      title,
      value: match ? match.value : 'No Records',
    };
  });

  const filteredData = fullCardData.filter((item) =>
    item.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, selectedPeriod);
    XLSX.writeFile(wb, `Payroll_${selectedPeriod}.xlsx`);
  };

  return (
    <div className="payroll-container">
      <div className="scroll-wrapper">
        <div className="scroll-list">
          {months.map((month) => (
            <button
              key={month}
              className={`scroll-btn ${month === selectedMonth ? 'active' : ''}`}
              onClick={() => setSelectedMonth(month)}
            >
              {month}
            </button>
          ))}
        </div>
      </div>

      <div className="scroll-wrapper">
        <div className="scroll-list">
          {years.map((year) => (
            <button
              key={year}
              className={`scroll-btn ${year === selectedYear ? 'active' : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>

      <div className="top-controls">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="export-btn" onClick={handleExport}>
          Export to Excel
        </button>
      </div>

      <div className="cutoff-label">
        <strong>{selectedMonth} {selectedYear}</strong><br />
        Cutoff from 01 {selectedMonth} {selectedYear} to 30 {selectedMonth} 2057
      </div>

      <div className="grid-container">
        <div className="grid-card">
          <h3>Payout Details</h3>
          <p>Net Pay: <strong>Rs 0.00</strong></p>
          <p>Gross Pay: Rs 0.00</p>
          <p>Deductions: Rs 0.00</p>
          <p>Work Days: 30</p>
        </div>

        <div className="grid-card">
          <h3>Employee Details</h3>
          <p>Total Employees: <strong>0</strong></p>
          <p>Addition: 00</p>
          <p>Settlements: 00</p>
          <p>Exclusion: 00</p>
          <p>Separation: 00</p>
        </div>

        <div className="grid-card actions">
          <h3>Actions</h3>
          <div>
            Payroll Inputs:
            <button className="lock">Lock</button>
                        <button className="lock">UnLock</button>

          </div>
          <div>
            Employee View Release:
            <button className="release">Release</button>
                        <button className="lock">Hold</button>

          </div>
          <div>
            IT Statement Employee:
            <button className="release">Release</button>
                        <button className="relese">Hold</button>

          </div>
          <div>
            Payroll:
            <button className="lock">Lock</button>
                        <button className="lock">Release</button>

          </div>
        </div>
      </div>

      <h2 className="selected-period">{selectedPeriod}</h2>

      {filteredData.length > 0 ? (
        <div className="card-grid">
          {filteredData.map((item, index) => (
            <div key={index} className="card">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-records-image">
          <img src="/no-data.png" alt="No Data Found" />
          <p>No matching data found for this period.</p>
        </div>
      )}
    </div>
  );
}