import React, { useState } from 'react';
import './ExitSettlementForm.css';

const employeeList = [
  { empNo: '1001', name: 'John Doe', type: 'Full-time' },
  { empNo: '1002', name: 'Alice Smith', type: 'Part-time' },
  { empNo: '1003', name: 'Ravi Kumar', type: 'Contract' },
];

export default function ExitSettlementForm() {
  const [step, setStep] = useState(1);
  const [selectedEmpIndex, setSelectedEmpIndex] = useState(0);
  const [employee, setEmployee] = useState(employeeList[0]);

  const [resignationDetails, setResignationDetails] = useState({
    submittedOn: '',
    leavingDate: '',
    reason: '',
    settlementDate: '31 May 2025',
  });

  const [noticePay, setNoticePay] = useState({
    noticeRequired: false,
    noticePeriod: 0,
    daysServed: 11,
    excessInNotice: 11,
    payrollMonth: 'Jun 2025',
    proratedExcess: 11,
  });

  const [workDaysData, setWorkDaysData] = useState([
    { month: 'Apr 2025', workDays: 30, daysWorked: 30 },
    { month: 'May 2025', workDays: 31, daysWorked: 31 },
    { month: 'Jun 2025', workDays: 30, daysWorked: 30 },
  ]);

  const [leaveEncashment, setLeaveEncashment] = useState([
    { leaveType: 'EL', balance: 0, encash: 140000 },
  ]);

  const [remarks, setRemarks] = useState('');

  const lastWorkingDate = '24 Jun 2025';

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  const handleEmployeeChange = (index) => {
    setSelectedEmpIndex(index);
    setEmployee(employeeList[index]);
  };

  const updateDaysWorked = (index, value) => {
    const updated = [...workDaysData];
    updated[index].daysWorked = Number(value);
    setWorkDaysData(updated);
  };

  const updateLeaveEncashment = (index, field, value) => {
    const updated = [...leaveEncashment];
    updated[index][field] = Number(value);
    setLeaveEncashment(updated);
  };

  const calculateTotalEncashment = () => {
    return leaveEncashment.reduce((total, leave) => total + (leave.encash || 0), 0);
  };

  return (
    <div className="exit-settlement-container">
      <div className="stepper">
        {['Employee', 'Resignation Details', 'Notice Pay', 'Work Days', 'Leave Encashment', 'Remarks'].map((label, index) => (
          <div 
            key={label} 
            className={`step ${step === index + 1 ? 'active' : ''} ${step > index + 1 ? 'completed' : ''}`}
            onClick={() => step > index + 1 && setStep(index + 1)}
          >
            <div className="step-circle">{index + 1}</div>
            <div className="step-label">{label}</div>
          </div>
        ))}
        <div className="stepper-progress" style={{ width: `${((step - 1) / 5) * 100}%` }}></div>
      </div>

      <div className={`form-content ${step === 1 ? 'fade-in' : ''}`}>
        {step === 1 && (
          <div className="step-content slide-in">
            <h2>Step 1: Employee</h2>
            <div className="form-group">
              <label>Select Employee: </label>
              <select
                value={selectedEmpIndex}
                onChange={(e) => handleEmployeeChange(+e.target.value)}
                className="search-input"
              >
                {employeeList.map((emp, i) => (
                  <option key={emp.empNo} value={i}>
                    {emp.empNo} - {emp.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="emp-info card">
              <p>Employee Type: <strong>{employee.type}</strong></p>
              <p>Employee Number: <strong>{employee.empNo}</strong></p>
              <p>Name: <strong>{employee.name}</strong></p>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content slide-in">
            <h2>Step 2: Resignation Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Resignation Submitted On:</label>
                <input
                  type="date"
                  value={resignationDetails.submittedOn}
                  onChange={(e) => setResignationDetails({ ...resignationDetails, submittedOn: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Leaving Date:</label>
                <input
                  type="date"
                  value={resignationDetails.leavingDate}
                  onChange={(e) => setResignationDetails({ ...resignationDetails, leavingDate: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Leaving Reason:</label>
                <select
                  value={resignationDetails.reason}
                  onChange={(e) => setResignationDetails({ ...resignationDetails, reason: e.target.value })}
                  className="form-input"
                >
                  <option value="">--Select--</option>
                  <option value="Personal">Personal</option>
                  <option value="Better Opportunity">Better Opportunity</option>
                  <option value="Health">Health</option>
                </select>
              </div>
              <div className="form-group">
                <label>Settlement Date:</label>
                <input 
                  type="text" 
                  value={resignationDetails.settlementDate} 
                  readOnly 
                  className="form-input"
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content slide-in">
            <h2>Step 3: Notice Pay</h2>
            <div className="form-grid">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={noticePay.noticeRequired}
                    onChange={(e) => setNoticePay({ ...noticePay, noticeRequired: e.target.checked })}
                  />
                  <span className="checkmark"></span>
                  Notice Required
                </label>
              </div>
              <div className="form-group">
                <label>Notice Period (days):</label>
                <input
                  type="number"
                  value={noticePay.noticePeriod}
                  onChange={(e) => setNoticePay({ ...noticePay, noticePeriod: +e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>No of Days Served:</label>
                <input
                  type="number"
                  value={noticePay.daysServed}
                  onChange={(e) => setNoticePay({ ...noticePay, daysServed: +e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>Excess in Notice:</label>
                <input
                  type="number"
                  value={noticePay.excessInNotice}
                  onChange={(e) => setNoticePay({ ...noticePay, excessInNotice: +e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            <table className="notice-table">
              <thead>
                <tr>
                  <th>Payroll Month</th>
                  <th>Excess in Notice</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{noticePay.payrollMonth}</td>
                  <td>{noticePay.excessInNotice} days</td>
                </tr>
              </tbody>
            </table>

            <div className="form-group">
              <label>Prorated Excess in Notice:</label>
              <input
                type="number"
                value={noticePay.proratedExcess}
                onChange={(e) => setNoticePay({ ...noticePay, proratedExcess: +e.target.value })}
                className="form-input"
              />
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content slide-in">
            <h2>Step 4: Work Days</h2>
            <div className="alert-box pulse">
              ⚠️ Based on leaving date workdays are updated.
            </div>
            <p className="last-working-day">Last working day: <strong>{lastWorkingDate}</strong></p>

            <table className="workdays-table">
              <thead>
                <tr>
                  <th>Payroll Month</th>
                  <th>Work Days</th>
                  <th>Days Worked</th>
                </tr>
              </thead>
              <tbody>
                {workDaysData.map((row, index) => (
                  <tr key={index}>
                    <td>{row.month}</td>
                    <td>{row.workDays}</td>
                    <td>
                      <input
                        type="number"
                        value={row.daysWorked}
                        onChange={(e) => updateDaysWorked(index, e.target.value)}
                        className="table-input"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {step === 5 && (
          <div className="step-content slide-in">
            <h2>Step 5: Leave Encashment</h2>
            <table className="leave-encashment-table">
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Balance</th>
                  <th>Encash</th>
                </tr>
              </thead>
              <tbody>
                {leaveEncashment.map((leave, index) => (
                  <tr key={index}>
                    <td>{leave.leaveType}</td>
                    <td>{leave.balance}</td>
                    <td>
                      <input
                        type="number"
                        value={leave.encash}
                        onChange={(e) => updateLeaveEncashment(index, 'encash', e.target.value)}
                        className="table-input"
                      />
                    </td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td>Total</td>
                  <td></td>
                  <td>{calculateTotalEncashment()}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {step === 6 && (
          <div className="step-content slide-in">
            <h2>Step 6: Remarks</h2>
            <div className="form-group">
              <label>Remarks:</label>
              <textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                className="form-input"
                rows={5}
                placeholder="Enter any final remarks related to exit settlement..."
              ></textarea>
            </div>
          </div>
        )}
      </div>

      <div className="form-actions">
        <button 
          onClick={handlePrev} 
          disabled={step === 1}
          className="btn btn-secondary"
        >
          Previous
        </button>
        {step < 6 ? (
          <button onClick={handleNext} className="btn btn-primary">
            Next
          </button>
        ) : (
          <button
            onClick={() => {
              console.log('Form Data:', {
                employee,
                resignationDetails,
                noticePay,
                workDaysData,
                leaveEncashment,
                remarks,
              });
              alert('Form submitted successfully!');
            }}
            className="btn btn-success"
          >
            Submit
          </button>
        )}
        <button onClick={() => window.location.reload()} className="btn btn-cancel">
          Cancel
        </button>
      </div>
    </div>
  );
}
