import React, { useState } from 'react';
import './LCalender.css';

function LeaveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState('organization');
  const [selectedDate, setSelectedDate] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = Array(firstDay).fill(null).concat(
    Array.from({ length: daysInMonth }, (_, i) => i + 1)
  );

  const handlePrev = () => setCurrentDate(new Date(year, month - 1));
  const handleNext = () => setCurrentDate(new Date(year, month + 1));

  return (
    <div className="leave-calendar-container">
      
      <div className="calendar-section">
        <h2>Leave Calendar</h2>

        <div className="filter">
          <label>Filter Type</label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="organization">My Organization</option>
            <option value="team">My Team</option>
            <option value="me">Me</option>
          </select>
        </div>

        <div className="calendar-header">
          <button onClick={handlePrev}>Prev</button>
          <span>
            {currentDate.toLocaleString('default', { month: 'long' })} {year}
          </span>
          <button onClick={handleNext}>Next</button>
          <button>Download</button>
        </div>

        <div className="calendar-grid">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="day-header">{day}</div>
          ))}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              className={`day-cell ${day === new Date().getDate() && month === new Date().getMonth() ? 'today' : ''} ${selectedDate === day ? 'selected' : ''}`}
              onClick={() => day && setSelectedDate(day)}
            >
              {day || ''}
            </div>
          ))}
        </div>
      </div>

      <div className="transactions-section">
        <div className="search-bar">
          <input type="text" placeholder="Search Employee" />
        </div>
        <div className="transactions">
          <h3>Leave Transactions (0)</h3>
          <div className="empty-state">
            <p>No Employees are on leave</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaveCalendar;
