import React, { useEffect, useState } from 'react';
import './PAY ITStatement.css';

const ITStatement = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Replace API
  const apiUrl = 'https://api.example.com/employee/it-statement/6266';

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        setEmployeeData(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="it-statement">Loading...</div>;
  }

  if (!employeeData) {
    return (
      <div className="it-statement">
        <div className="info-box">
          Income tax statement for the month is not available.
        </div>
      </div>
    );
  }

  return (
    <div className="it-statement">
      <div className="header">
        <div className="profile-icon">👤</div>
        <div>
          <div className="employee-name">{employeeData.name}</div>
          <div className="employee-id">#{employeeData.employeeNo}</div>
        </div>
        <div className="action-buttons">
          <button className="expand-btn">+ Expand All</button>
          <button className="collapse-btn">- Collapse All</button>
          <button className="pdf-btn">⬇ Download As PDF</button>
        </div>
      </div>

      <div className="info-table">
        <div className="row">
          <div className="label">Name</div>
          <div className="value">{employeeData.name}</div>
          <div className="label">Employee No</div>
          <div className="value">{employeeData.employeeNo}</div>
        </div>
        <div className="row">
          <div className="label">Joining Date</div>
          <div className="value">{employeeData.joiningDate || '-'}</div>
          <div className="label">Bank Name</div>
          <div className="value">{employeeData.bankName || '-'}</div>
        </div>
        <div className="row">
          <div className="label">Designation</div>
          <div className="value">{employeeData.designation || '-'}</div>
          <div className="label">Bank Account No</div>
          <div className="value">{employeeData.bankAccountNo || '-'}</div>
        </div>
        <div className="row">
          <div className="label">Department</div>
          <div className="value">{employeeData.department || '-'}</div>
          <div className="label">PAN Number</div>
          <div className="value">{employeeData.panNumber || '-'}</div>
        </div>
        <div className="row">
          <div className="label">Location</div>
          <div className="value">{employeeData.location || '-'}</div>
          <div className="label">PF No</div>
          <div className="value">{employeeData.pfNo || '-'}</div>
        </div>
        <div className="row">
          <div className="label">Effective Work Days</div>
          <div className="value">{employeeData.effectiveWorkDays || '-'}</div>
          <div className="label">PF UAN</div>
          <div className="value">{employeeData.pfUan || '-'}</div>
        </div>
        <div className="row">
          <div className="label">LOP</div>
          <div className="value">{employeeData.lop || '-'}</div>
        </div>
      </div>

      <div className="info-box">
        Income tax statement for the month is not available.
      </div>
    </div>
  );
};

export default ITStatement;
