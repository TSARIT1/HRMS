import React, { useState } from "react";
import './Leave Calender.css'
const CalendarApp = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const getStartDay = (month, year) => new Date(year, month, 1).getDay();

  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  const startDay = getStartDay(currentMonth, currentYear);

  const calendarCells = [];
  for (let i = 0; i < startDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  const handlePrev = () => {
    setCurrentMonth((prev) => {
      if (prev === 0) {
        setCurrentYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentMonth((prev) => {
      if (prev === 11) {
        setCurrentYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDate(null);
  };

  const handleDateClick = (day) => {
    if (day !== null) {
      const fullDate = new Date(currentYear, currentMonth, day);
      setSelectedDate(fullDate);
    }
  };

  // Sample holidays and leave entries
  const holidays = ["2025-06-21", "2025-06-28"];
  const leaves = {
    "2025-06-24": [{ name: "John Doe", empNo: "EMP001", details: "Sick Leave" }],
    "2025-06-25": [{ name: "Jane Smith", empNo: "EMP002", details: "Work From Home" }],
  };

  const formatDate = (date) => date.toISOString().split("T")[0];
  const todayStr = formatDate(new Date());

  const selectedStr = selectedDate ? formatDate(selectedDate) : "";

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="bg-white p-4 rounded shadow grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Calendar Panel */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              {months[currentMonth]} {currentYear}
            </h2>
            <div className="space-x-2">
              <button onClick={handleToday} className="text-sm border px-3 py-1 rounded">Today</button>
              <button onClick={handlePrev} className="text-sm border px-2 py-1 rounded">◀</button>
              <button onClick={handleNext} className="text-sm border px-2 py-1 rounded">▶</button>
            </div>
          </div>

          <div className="grid grid-cols-7 text-center text-sm font-medium bg-gray-100 border">
            {days.map((day) => (
              <div key={day} className="border p-2">{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 text-center border border-t-0">
            {calendarCells.map((day, idx) => {
              const dateStr = formatDate(new Date(currentYear, currentMonth, day || 1));
              const isToday = dateStr === todayStr;
              const isHoliday = holidays.includes(dateStr);
              const isLeave = Object.keys(leaves).includes(dateStr);
              const isSelected = dateStr === selectedStr;

              return (
                <div
                  key={idx}
                  className={`border h-20 flex justify-end items-start p-1 text-sm cursor-pointer relative 
                    ${isToday ? "bg-yellow-100 font-bold" : ""}
                    ${isHoliday ? "bg-red-100" : ""}
                    ${isLeave ? "bg-blue-100" : ""}
                    ${isSelected ? "ring-2 ring-blue-500" : ""}
                  `}
                  onClick={() => handleDateClick(day)}
                >
                  <span>{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leave Details Panel */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600 text-sm">
              {selectedDate ? selectedDate.toDateString() : "No date selected"}
            </span>
            <select className="border px-2 py-1 text-sm rounded">
              <option>Category: All</option>
            </select>
            <button className="text-sm text-blue-600 border px-3 py-1 rounded">
              Export To Excel
            </button>
          </div>

          <table className="w-full text-sm border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">Name</th>
                <th className="border px-2 py-1 text-left">Employee No</th>
                <th className="border px-2 py-1 text-left">Details</th>
              </tr>
            </thead>
            <tbody>
              {selectedStr && leaves[selectedStr] ? (
                leaves[selectedStr].map((entry, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1">{entry.name}</td>
                    <td className="border px-2 py-1">{entry.empNo}</td>
                    <td className="border px-2 py-1">{entry.details}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500 py-4">
                    No leaves on this date.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CalendarApp;
