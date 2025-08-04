import React from 'react';
import './StatusTable.css';

const StatusTable = () => {
  return (
    <div className="status-container">
      <h1 className="status-title">Status: Open</h1>
      
      <table className="status-table">
        <thead>
          <tr className="table-header-row">
            <th className="table-header">Category</th>
            <th className="table-header">Title</th>
            <th className="table-header">Posted date</th>
            <th className="table-header">Rank</th>
          </tr>
        </thead>
        <tbody>
          {/* Table rows would go here */}
        </tbody>
      </table>
      
      <div className="divider" />
      
      <div className="status-footer">
        <strong>Total Items: 0</strong>
      </div>
    </div>
  );
};

export default StatusTable;