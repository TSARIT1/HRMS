import React from 'react';
import './Loans.css'; // optional, if you're adding styles

function Loans() {
  return (
    <div className="loans-container">
      <h1 className="loans-title">Loans and Advances</h1>
      <h2>Loans</h2>
      <div className="loans-image-wrapper">
        <img
          src="https://www.financialexpress.com/wp-content/uploads/2021/10/1-140.jpg"
          alt="Loans and Advances"
          className="loans-image"
        />
      </div>
    </div>
  );
}

export default Loans;
