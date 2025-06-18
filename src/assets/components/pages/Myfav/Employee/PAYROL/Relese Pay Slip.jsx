import React, { useState } from 'react';
import './Relese Pay Slip.css';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const years = [2025, 2026, 2027, 2028, 2029];

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

  const selectedPeriod = `${selectedMonth} ${selectedYear}`;
  const data = records[selectedPeriod] || [];

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

      <h2 className="selected-period">{selectedPeriod}</h2>

      <div className="card-grid">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div key={index} className="card">
              <h3>{item.title}</h3>
              <p>{item.value}</p>
            </div>
          ))
        ) : (
          <p className="no-records">No data for this period.</p>
        )}
      </div>
    </div>
  );
}
