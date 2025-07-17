import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PayrollProcess.css';

export default function PayrollProcess() {
  const [logs] = useState([
    {
      payroll: 'Nov 2027',
      description: 'Took 19.239 seconds for 13 employees.',
      processedOn: 'Processed on Today at 11:48 AM by info@tsaritservices.com',
      status: 'COMPLETED'
    },
    {
      payroll: 'Nov 2027',
      description: 'Took 16.294 seconds for 13 employees.',
      processedOn: 'Processed on Today at 11:48 AM by info@tsaritservices.com',
      status: 'COMPLETED'
    },
    {
      payroll: 'Nov 2027',
      description: 'Took 4.463 seconds for Aadesh Hiralal Sonar [6266].',
      processedOn: 'Processed on Last Tuesday at 12:13 PM by info@tsaritservices.com',
      status: 'COMPLETED'
    }
  ]);

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleQuickProcess = () => {
    setTimeout(() => {
      setShowPopup(true);
    }, 300); // Optional processing simulation
  };

  const handleViewSalaryStatement = () => {
    setShowPopup(false);
    navigate('/salary-statement');
  };

  return (
    <div className="payroll-process-container">
      <div className="button-group">
        <button className="process-btn">⚙️ Process Payroll</button>
        <button className="quick-process-btn" onClick={handleQuickProcess}>
          ⚡ Quick Process
        </button>
      </div>

      <div className="process-log">
        <h4>Last {logs.length} process log</h4>
        <table className="process-table">
          <thead>
            <tr>
              <th>Payroll</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => (
              <tr key={index}>
                <td>{log.payroll}</td>
                <td>
                  {log.description}
                  <br />
                  <small className="processed-on">{log.processedOn}</small>
                </td>
                <td className="status-column">
                  <span role="img" aria-label="completed">👍</span> {log.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            <h3>Confirmation</h3>
            <p>Payroll processed successfully!</p>
            <div className="popup-buttons">
              <button className="primary-btn" onClick={handleViewSalaryStatement}>
                View Salary Statement
              </button>
              <button className="secondary-btn" onClick={() => setShowPopup(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
