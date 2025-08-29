import React from 'react';
import './LBalance.css'; // Create this file for styling

function LBalance() {
  return (
    <div className="leave-balance-container">
      <h1>Leave Balances</h1>

      <div className="actions">
        <button>Apply</button>
        <button>▼</button>
        <input type="date" />
      </div>

      <div className="grid">
        <div className="igrid">

            <h>Earned Leave</h> Granted:0
            <p>0</p></div>
        <div className="igrid">
            <h>Sick Leave</h> Granted:0
            <p>0</p></div>
        <div className="igrid">
            <h>Casual Leave</h> Granted:0
            <p>0</p></div>
      </div>
    </div>
  );
}

export default LBalance;
