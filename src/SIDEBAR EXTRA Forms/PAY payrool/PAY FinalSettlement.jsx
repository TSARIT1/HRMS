import React, { useState, useEffect } from 'react';
import './PAY FinalSettlement.css';

const FinalSettlement = () => {
  const [monthFilter, setMonthFilter] = useState('Nov 2027');
  const [employeeFilter, setEmployeeFilter] = useState('All');
  const [data, setData] = useState([]);
  const [showSettleForm, setShowSettleForm] = useState(false);
  const [formData, setFormData] = useState({ empId: '', netPay: '' });

  const fetchUrl = 'https://your-backend-api.com/api/final-settlements';

  useEffect(() => {
    fetch(fetchUrl)
      .then(response => response.json())
      .then(result => setData(result))
      .catch(error => console.error('Fetch error:', error));
  }, []);

 const handleSettleEmployee = () => {
  navigate('/proll');  // Navigate to the payroll page
};

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = () => {
    console.log('Settlement Submitted:', formData);
    setShowSettleForm(false);
    setFormData({ empId: '', netPay: '' });
  };

  const filteredData = data.filter(emp =>
    (monthFilter === emp.payoutMonth) &&
    (employeeFilter === 'All' || emp.empName === employeeFilter)
  );

  return (
    <div className="final-settlement-page">

      {!showSettleForm && (
        <>
          <div className="filters">
            <select value={monthFilter} onChange={e => setMonthFilter(e.target.value)}>
              <option>Nov 2027</option>
              <option>Dec 2027</option>
            </select>

            <select value={employeeFilter} onChange={e => setEmployeeFilter(e.target.value)}>
              <option value="All">All</option>
              {data.map(emp => (
                <option key={emp.empId} value={emp.empName}>{emp.empName}</option>
              ))}
            </select>

            <button className="settle-button" onClick={handleSettleEmployee}>
              Settle Employee
            </button>
          </div>

          <table className="settlement-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Payout Month</th>
                <th>Serial No</th>
                <th>Emp ID</th>
                <th>Employee Name</th>
                <th>Leaving Date</th>
                <th>Settlement Date</th>
                <th>Net Pay</th>
                <th>Processed On</th>
                <th>Lock/Unlock</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((emp, index) => (
                  <tr key={emp.empId}>
                    <td>{index + 1}</td>
                    <td>{emp.payoutMonth}</td>
                    <td>{emp.serialNo}</td>
                    <td>{emp.empId}</td>
                    <td>{emp.empName}</td>
                    <td>{emp.leavingDate}</td>
                    <td>{emp.settlementDate}</td>
                    <td>{emp.netPay}</td>
                    <td>{emp.processedOn}</td>
                    <td>{emp.locked ? 'Locked' : 'Unlocked'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" style={{ textAlign: 'center' }}>
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <p className="total-items">Total Items: {filteredData.length}</p>
        </>
      )}

      {showSettleForm && (
        <div className="settle-form">
          <h3>Settle Employee Form</h3>
          <label>
            Employee ID:
            <input
              type="text"
              name="empId"
              value={formData.empId}
              onChange={handleFormChange}
              placeholder="Enter Employee ID"
            />
          </label>
          <label>
            Net Pay:
            <input
              type="number"
              name="netPay"
              value={formData.netPay}
              onChange={handleFormChange}
              placeholder="Enter Net Pay"
            />
          </label>
          <button onClick={handleFormSubmit}>Submit & Close</button>
        </div>
      )}

    </div>
  );
};

export default FinalSettlement;
