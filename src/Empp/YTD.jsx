import React from 'react';
import './YTD.css';

function YTD() {
  return (
    <div className='ytd-container'>
      <h1 className='ytd-heading'>YTD Report</h1>
      
      <div className='ytd-button-container'>
        <button className='ytd-download-btn'>Download</button>
      </div>
    </div>
  );
}

export default YTD;
