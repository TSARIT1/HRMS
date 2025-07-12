import React, { useState } from 'react';

const SalaryRevisionDashboard = () => {
  const [monthRange, setMonthRange] = useState([1, 17]);
  const data = []; // Replace with actual API data

  return (
    <div className="p-6">
      <div className="flex items-center space-x-4">
        <span>Revisions done between</span>
        <span className="font-bold text-orange-500">{monthRange[0]} to {monthRange[1]} months</span>
        <input
          type="number"
          min="1"
          max="17"
          value={monthRange[0]}
          onChange={(e) => setMonthRange([+e.target.value, monthRange[1]])}
          className="border px-2 py-1 w-16"
        />
        <input
          type="range"
          min="1"
          max="17"
          value={monthRange[1]}
          onChange={(e) => setMonthRange([monthRange[0], +e.target.value])}
        />
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        <div className="text-sm">
          <p className="font-semibold">Longest Revision</p>
          <p>0 months</p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Median Revision</p>
          <p>0 months</p>
        </div>
      </div>

      <div className="mt-6 border rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Employee Number</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Experience</th>
              <th className="p-2 border">Designation</th>
              <th className="p-2 border">Department</th>
              <th className="p-2 border">Revised Salary</th>
              <th className="p-2 border">Prior Salary</th>
              <th className="p-2 border">Difference</th>
              <th className="p-2 border">Percent</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="10" className="text-center p-4">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={item.empId}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{item.empNumber}</td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.experience}</td>
                  <td className="border p-2">{item.designation}</td>
                  <td className="border p-2">{item.department}</td>
                  <td className="border p-2">{item.revisedSalary}</td>
                  <td className="border p-2">{item.priorSalary}</td>
                  <td className="border p-2">{item.difference}</td>
                  <td className="border p-2">{item.percent}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-between items-center">
        <p>Total Items: {data.length}</p>
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Export Excel</button>
      </div>
    </div>
  );
};

export default SalaryRevisionDashboard;
