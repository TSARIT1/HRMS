import React, { useState } from 'react';

const initialData = [
  { id: 1, employeeNumber: '6266', employeeName: 'Aadesh Hiralal Sonar', revisedDate: '09 Mar 2022', effectiveDate: '01 Feb 2022', arrearDate: '28 Feb 2022', payoutDate: '28 Feb 2022', revisedSalary: '20000', percentage: 33, status: 'APPROVED' },
  { id: 2, employeeNumber: '1003', employeeName: 'George', revisedDate: '09 Mar 2022', effectiveDate: '08 Jul 2021', arrearDate: '31 Jul 2021', payoutDate: '31 Jul 2021', revisedSalary: '14000', percentage: 100, status: 'APPROVED' },
  { id: 3, employeeNumber: '566', employeeName: 'Harshit Patel', revisedDate: '09 Mar 2022', effectiveDate: '01 Apr 2021', arrearDate: '30 Apr 2021', payoutDate: '30 Apr 2021', revisedSalary: '16000', percentage: 0, status: 'PENDING' },
  { id: 4, employeeNumber: '1004', employeeName: 'Laxmi Rani', revisedDate: '09 Mar 2022', effectiveDate: '01 Feb 2022', arrearDate: '28 Feb 2022', payoutDate: '28 Feb 2022', revisedSalary: '50000', percentage: 25, status: 'PENDING' },
  { id: 5, employeeNumber: '101', employeeName: 'Uday', revisedDate: '13 Jun 2025', effectiveDate: '01 Jan 2024', arrearDate: '31 Mar 2024', payoutDate: '31 Mar 2024', revisedSalary: '57500', percentage: 100, status: 'APPROVED' },
];

const SalaryRevisionTable = () => {
  const [data, setData] = useState(initialData);
  const [selectedIds, setSelectedIds] = useState([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [employeeFilter, setEmployeeFilter] = useState('All');

  const employeeNames = ['All', ...new Set(data.map(d => d.employeeName))];

  const filteredData = data.filter(row => {
    const statusMatch = statusFilter === 'All' || row.status === statusFilter;
    const employeeMatch = employeeFilter === 'All' || row.employeeName === employeeFilter;
    return statusMatch && employeeMatch;
  });

  const toggleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAction = (newStatus) => {
    setData(prev =>
      prev.map(row =>
        selectedIds.includes(row.id) ? { ...row, status: newStatus } : row
      )
    );
    setSelectedIds([]);
  };

  return (
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold mb-4">Salary Revision Table</h2>

      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="mr-2 font-semibold">Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            <option>All</option>
            <option>APPROVED</option>
            <option>REJECTED</option>
            <option>PENDING</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-semibold">Employee:</label>
          <select
            value={employeeFilter}
            onChange={(e) => setEmployeeFilter(e.target.value)}
            className="border px-3 py-1 rounded"
          >
            {employeeNames.map((name, index) => (
              <option key={index}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border rounded shadow">
        <table className="table-auto w-full text-sm text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2">Select</th>
              <th>#</th>
              <th>Employee Number</th>
              <th>Employee Name</th>
              <th>Revised Date</th>
              <th>Effective Date</th>
              <th>Arrear Date</th>
              <th>Payout Date</th>
              <th>Revised Salary</th>
              <th>%</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={row.id} className="border-t hover:bg-gray-100">
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(row.id)}
                    onChange={() => toggleSelect(row.id)}
                  />
                </td>
                <td>{index + 1}</td>
                <td>{row.employeeNumber}</td>
                <td>{row.employeeName}</td>
                <td>{row.revisedDate}</td>
                <td>{row.effectiveDate}</td>
                <td>{row.arrearDate}</td>
                <td>{row.payoutDate}</td>
                <td>Rs {parseFloat(row.revisedSalary).toLocaleString()}</td>
                <td>{row.percentage}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      row.status === 'APPROVED'
                        ? 'bg-green-200 text-green-800'
                        : row.status === 'REJECTED'
                        ? 'bg-red-200 text-red-800'
                        : 'bg-yellow-200 text-yellow-800'
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => handleAction('APPROVED')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Approve
        </button>
        <button
          onClick={() => handleAction('REJECTED')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default SalaryRevisionTable;
