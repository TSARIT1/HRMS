import React, { useState } from 'react';
import { RefreshCcw, Trash2 } from 'lucide-react';
import './PAY Incometax.css';

const EmployeeTaxInfo = () => {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Income');
  const [incomeTax, setIncomeTax] = useState(45850);
  const [surcharge, setSurcharge] = useState(0);
  const [eduCess, setEduCess] = useState(0);

  const employeeList = [
    {
      name: 'Aadesh Hiralal Sonar',
      id: '6266',
      joinDate: '01 Apr 2021',
      dob: '02 Sep 1990',
      gender: 'Male',
      location: 'Bangalore',
      taxRegime: 'NEW TAX REGIME',
      processedTime: 'Today at 4:09 PM',
      totalIncome: '₹2,29,250.00',
    },
  ];

  const [employee, setEmployee] = useState(employeeList[0]);

  const handleSearch = () => {
    const match = employeeList.find(
      (emp) =>
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.id === search
    );
    match ? setEmployee(match) : alert('No employee found.');
  };

  const handleEditToggle = () => setEditing(!editing);

  const tabs = [
    'Income', 'Income From Previous Employer', 'Exemptions', 'Perquisite',
    'Deductions', 'Others', 'House Property Income', 'Regime', 'Result',
  ];

  const incomeFromPreviousEmployer = [
    {
      month: 'Aug', incomeAfterExemptions: 12000, professionalTax: 233,
      pf: 330, nps: 440, totalTax: 1120, incomeTax: 550,
      surcharge: 550, cess: 20,
    },
  ];

  return (
    <div className="tax-container">
      <div className="top-bar">
        <input
          type="text"
          className="input search-input"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="btn blue">Search</button>
        <button onClick={handleEditToggle} className="btn yellow">{editing ? 'Save' : 'Edit Info'}</button>
      </div>

      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab ${activeTab === tab ? 'active-tab' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="employee-card">
        <div className="employee-header">
          <div className="avatar">👤</div>
          <div>
            <div className="name">{employee.name}</div>
            <div className="id">#{employee.id}</div>
          </div>
        </div>
        <div className="employee-info">
          <div><strong>Join Date:</strong><br />{employee.joinDate}</div>
          <div>
            <strong>DOB:</strong><br />
            {editing ? (
              <input
                className="info-input"
                value={employee.dob}
                onChange={(e) => setEmployee({ ...employee, dob: e.target.value })}
              />
            ) : employee.dob}
          </div>
          <div><strong>Gender:</strong><br />{employee.gender}</div>
          <div>
            <strong>Location:</strong><br />
            {editing ? (
              <input
                className="info-input"
                value={employee.location}
                onChange={(e) => setEmployee({ ...employee, location: e.target.value })}
              />
            ) : employee.location}
          </div>
          <div><strong>Processed:</strong><br />{employee.processedTime}</div>
          <div><strong>Tax Regime:</strong><br /><span className="green">{employee.taxRegime}</span></div>
        </div>
      </div>

      <div className="total-income">Total Income: <span>{employee.totalIncome}</span></div>

      <div className="tab-content">
        {activeTab === 'Income From Previous Employer' && (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  {['Month', 'Income After Exemptions', 'Professional Tax', 'PF', 'Employer NPS', 'Total Tax', 'Income Tax', 'Surcharge', 'Cess', 'Actions'].map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {incomeFromPreviousEmployer.map((row, i) => (
                  <tr key={i}>
                    <td>{row.month}</td>
                    <td>₹{row.incomeAfterExemptions}</td>
                    <td>₹{row.professionalTax}</td>
                    <td>₹{row.pf}</td>
                    <td>₹{row.nps}</td>
                    <td>₹{row.totalTax}</td>
                    <td>₹{row.incomeTax}</td>
                    <td>₹{row.surcharge}</td>
                    <td>₹{row.cess}</td>
                    <td className="action-buttons">
                      <button className="icon-btn red"><Trash2 size={16} /></button>
                      <button className="icon-btn blue"><RefreshCcw size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="footer-buttons">
              {['Back To Salary', 'Save', 'Preview', 'Download', 'Recalculate'].map((label, i) => (
                <button key={i} className="btn border-blue">{label}</button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Result' && (
          <>
            <div className="result-inputs">
              <label>Income Tax
                <input type="number" value={incomeTax} onChange={(e) => setIncomeTax(Number(e.target.value))} />
              </label>
              <label>Surcharge
                <input type="number" value={surcharge} onChange={(e) => setSurcharge(Number(e.target.value))} />
              </label>
              <label>Education Cess
                <input type="number" value={eduCess} onChange={(e) => setEduCess(Number(e.target.value))} />
              </label>
              <label>Total
                <input type="number" readOnly value={incomeTax + surcharge + eduCess} />
              </label>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  {['Description', 'Income Tax', 'Surcharge', 'Edu. Cess', 'Total'].map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {["Paid Till Date", "Deduction Through Payroll", "Direct TDS", "Previous Employment", "Total", "Annual Tax Balance", "Monthly Tax to be Paid"].map((label, idx) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>₹0.00</td>
                    <td>₹0.00</td>
                    <td>₹0.00</td>
                    <td>₹{idx === 4 ? (incomeTax + surcharge + eduCess).toLocaleString() : '0.00'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="remaining">Remaining Months: 4</div>

            <div className="footer-buttons">
              {['Back To Salary', 'Save', 'Preview', 'Download', 'Recalculate'].map((label, i) => (
                <button key={i} className="btn border-blue">{label}</button>
              ))}
            </div>
          </>
        )}

        {(activeTab !== 'Income From Previous Employer' && activeTab !== 'Result') && (
          <p>You are viewing <strong>{activeTab}</strong> tab content.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaxInfo;
