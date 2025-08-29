import React from 'react';
import './paysli.css';

function Payslipp() {
  return (
    <div className="payslip-container">
      <h1>PaySlips</h1>

      <div className="button-container">
        <button className="btn">Download PaySlip</button>
      </div>

      <div className="image-container">
        <img 
          src="https://img1.pnghut.com/15/16/22/EpYwvyEmBf/brand-material-yellow-logo-text.jpg" 
          alt="Payslip Banner"
        />
      </div>
    </div>
  );
}

export default Payslipp;
