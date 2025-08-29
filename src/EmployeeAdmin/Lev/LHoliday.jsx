import React from 'react';
import './LHoliday.css';

function LHoliday() {
  return (
    <div>
      <h1 className="head">Leave Holiday</h1>
      <div>
        <select className='container'>
          <option>2025</option>
          <option>2026</option>
          <option>2027</option>
          <option>2028</option>
          <option>2029</option>
          <option>2030</option>
          <option>2031</option>
        </select>
      </div>
      <div>
        <img 
          src='https://printablecalendar2024.net/wp-content/uploads/2024/12/calendar-2025-india-with-holidays-and-festivals-indian-calendar-2025-with-holidays-printable-1.png' 
          width="50%" 
          height="20%" 
          alt="2025 Calendar" 
        />
      </div>
    </div>
  );
}

export default LHoliday;
