import React from 'react';
import './ITSTAT.css'; // Assuming you're reusing the same styles

function ITDEC() {
  return (
    <div className="itstat-container">
      <h1 className="itstat-title">IT Declaration</h1>
      
      <div className="button-wrapper">
        <button className="tax-button">My Tax Planner</button>
      </div>
      
      <div className="itstat-image-wrapper">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6013/6013828.png"
          alt="IT Declaration"
          className="itstat-image"
        />
      </div>
    </div>
  );
}

export default ITDEC;
