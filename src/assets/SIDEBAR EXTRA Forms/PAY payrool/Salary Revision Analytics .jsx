import React, { useState } from 'react';
import './Salary Revision Analytics.css';

export default function SalaryRevisionAnalytics() {
  const [revisionRange, setRevisionRange] = useState({ min: 1, max: 19 });

  const handleRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setRevisionRange(prev => ({
      ...prev,
      max: value > prev.min ? value : prev.min + 1
    }));
  };

  return (
    <div className="revision-monitor-container">
      <div className="revision-header">
        <div className="revision-title">
          <strong>Revision not done between </strong>
          <span className="highlighted">{revisionRange.min} to {revisionRange.max} months</span>
        </div>

        <div className="slider-wrapper">
          <div className="slider-track">
            <div className="slider-circle left" />
            <input
              type="range"
              min="1"
              max="24"
              value={revisionRange.max}
              onChange={handleRangeChange}
              className="slider-bar-range"
            />
            <div className="slider-circle right" />
          </div>
          <div className="slider-controls">
            <button className="slider-btn">&#x21B5;</button>
            <button className="slider-btn">&#9881;</button>
          </div>
        </div>

        <div className="revision-metrics">
          <div className="metric-box">
            <span>Longest Revision <span className="tooltip">ℹ</span></span>
            <strong>0 months</strong>
          </div>
          <div className="metric-box">
            <span>Median Revision <span className="tooltip">ℹ</span></span>
            <strong>0 months</strong>
          </div>
        </div>
      </div>

      <div className="revision-table">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Employee Number</th>
              <th>Name</th>
              <th>Experience</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Revised Salary</th>
              <th>Prior Salary</th>
              <th>Difference</th>
              <th>Percent</th>
            </tr>
          </thead>
          <tbody>
            {/* Dynamic data to be inserted here */}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Total Items: 0</span>
          <button className="export-btn">Export Excel</button>
        </div>

        <div className="pagination-controls">
          <button className="pagination-btn">{'|<'}</button>
          <button className="pagination-btn">{'<'}</button>
          <input type="text" value="1" readOnly />
          <button className="pagination-btn">{'>'}</button>
          <button className="pagination-btn">{'>|'}</button>
        </div>
      </div>
    </div>
  );
}
