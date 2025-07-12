import React, { useState } from 'react';
import { RefreshCcw, Trash2 } from 'lucide-react';

const EmployeeTaxInfo = () => {
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('Income');

  const [incomeTax, setIncomeTax] = useState(45850);
  const [surcharge, setSurcharge] = useState(0);
  const [eduCess, setEduCess] = useState(0);

  const [employee, setEmployee] = useState({
    name: 'Aadesh Hiralal Sonar',
    id: '6266',
    joinDate: '01 Apr 2021',
    dob: '02 Sep 1990',
    gender: 'Male',
    location: 'Bangalore',
    taxRegime: 'NEW TAX REGIME',
    processedTime: 'Today at 4:09 PM',
    totalIncome: '₹2,29,250.00',
  });

  const handleSearch = () => alert(`Searching for: ${search}`);
  const handleEditToggle = () => setEditing(!editing);

  const tabs = [
    'Income',
    'Income From Previous Employer',
    'Exemptions',
    'Perquisite',
    'Deductions',
    'Others',
    'House Property Income',
    'Regime',
    'Result',
  ];

  const incomeFromPreviousEmployer = [
    {
      month: 'Aug',
      incomeAfterExemptions: 12,
      professionalTax: 233,
      pf: 33,
      nps: 44,
      totalTax: 112,
      incomeTax: 55,
      surcharge: 55,
      cess: 2,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      {/* Search */}
      <div className="flex items-center mb-6 gap-2">
        <input
          type="text"
          className="border border-gray-300 rounded px-3 py-2 w-64"
          placeholder="Search employee..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Search
        </button>
        <button onClick={handleEditToggle} className="ml-auto bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
          {editing ? 'Save' : 'Edit Info'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-4 border-b mb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`py-2 px-3 text-blue-500 hover:text-blue-700 border-b-2 ${
              activeTab === tab ? 'border-blue-500 font-semibold' : 'border-transparent'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-blue-100 p-4 rounded mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-gray-300 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg">
              👤
            </div>
            <div>
              <div className="text-lg font-bold text-blue-900">{employee.name}</div>
              <div className="text-sm text-blue-700">#{employee.id}</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-4 sm:mt-0 text-sm text-blue-900">
            <div><strong>Join Date:</strong><br />{employee.joinDate}</div>
            <div><strong>DOB:</strong><br />{editing ? <input className="border rounded px-1" value={employee.dob} onChange={(e) => setEmployee({ ...employee, dob: e.target.value })} /> : employee.dob}</div>
            <div><strong>Gender:</strong><br />{employee.gender}</div>
            <div><strong>Location:</strong><br />{editing ? <input className="border rounded px-1" value={employee.location} onChange={(e) => setEmployee({ ...employee, location: e.target.value })} /> : employee.location}</div>
            <div><strong>Processed:</strong><br />{employee.processedTime}</div>
            <div><strong>Tax Regime:</strong><br /><span className="text-green-600">{employee.taxRegime}</span></div>
          </div>
        </div>
      </div>

      {/* Income Summary */}
      <div className="text-xl font-semibold mb-4">
        Total Income : <span className="text-gray-800">{employee.totalIncome}</span>
      </div>

      {/* Tab Contents */}
      <div className="bg-gray-50 p-4 rounded shadow-sm">
        {activeTab === 'Income From Previous Employer' ? (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm border border-gray-300">
                <thead className="bg-blue-100 text-gray-700 font-semibold">
                  <tr>
                    <th className="px-3 py-2">Month</th>
                    <th className="px-3 py-2">Income After Exemptions</th>
                    <th className="px-3 py-2">Professional Tax</th>
                    <th className="px-3 py-2">PF</th>
                    <th className="px-3 py-2">Employer NPS</th>
                    <th className="px-3 py-2">Total Tax</th>
                    <th className="px-3 py-2">Income Tax</th>
                    <th className="px-3 py-2">Surcharge</th>
                    <th className="px-3 py-2">Cess</th>
                    <th className="px-3 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {incomeFromPreviousEmployer.map((row, idx) => (
                    <tr key={idx} className="bg-white border-t">
                      <td className="px-3 py-2">{row.month}</td>
                      <td className="px-3 py-2">₹{row.incomeAfterExemptions.toFixed(2)}</td>
                      <td className="px-3 py-2">₹{row.professionalTax.toFixed(2)}</td>
                      <td className="px-3 py-2">₹{row.pf.toFixed(2)}</td>
                      <td className="px-3 py-2">₹{row.nps.toFixed(2)}</td>
                      <td className="px-3 py-2">₹{row.totalTax.toFixed(2)}</td>
                      <td className="px-3 py-2">₹{row.incomeTax.toFixed(2)}</td>
                      <td className="px-3 py-2">₹{row.surcharge.toFixed(2)}</td>
                      <td className="px-3 py-2">₹{row.cess.toFixed(2)}</td>
                      <td className="px-3 py-2 flex gap-2">
                        <button className="text-red-600 hover:text-red-800"><Trash2 size={16} /></button>
                        <button className="text-blue-600 hover:text-blue-800"><RefreshCcw size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Back To Salary</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Save</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Preview</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Download</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Recalculate</button>
            </div>
          </>
        ) : activeTab === 'Result' ? (
          <>
            {/* Tax Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <label className="flex flex-col text-sm font-medium">
                Income Tax
                <input
                  type="number"
                  className="border px-2 py-1 rounded"
                  value={incomeTax}
                  onChange={(e) => setIncomeTax(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col text-sm font-medium">
                Surcharge
                <input
                  type="number"
                  className="border px-2 py-1 rounded"
                  value={surcharge}
                  onChange={(e) => setSurcharge(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col text-sm font-medium">
                Education Cess
                <input
                  type="number"
                  className="border px-2 py-1 rounded"
                  value={eduCess}
                  onChange={(e) => setEduCess(Number(e.target.value))}
                />
              </label>
              <label className="flex flex-col text-sm font-medium">
                Total
                <input
                  type="number"
                  className="border px-2 py-1 rounded bg-gray-100"
                  value={incomeTax + surcharge + eduCess}
                  readOnly
                />
              </label>
            </div>

            {/* Tax Summary Table */}
            <div className="overflow-auto border border-gray-300 mb-4">
              <table className="w-full text-sm">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2 text-right">Income Tax</th>
                    <th className="px-4 py-2 text-right">Surcharge</th>
                    <th className="px-4 py-2 text-right">Edu. Cess</th>
                    <th className="px-4 py-2 text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    'Paid Till Date',
                    'Deduction Through Payroll',
                    'Direct TDS',
                    'Previous Employment',
                    'Total',
                    'Annual Tax Balance',
                    'Monthly Tax to be Paid',
                  ].map((label, idx) => (
                    <tr key={label} className="border-t">
                      <td className="px-4 py-2 font-medium">{label}</td>
                      <td className="px-4 py-2 text-right">₹0.00</td>
                      <td className="px-4 py-2 text-right">₹0.00</td>
                      <td className="px-4 py-2 text-right">₹0.00</td>
                      <td className="px-4 py-2 text-right">
                        ₹{idx === 4 ? (incomeTax + surcharge + eduCess).toLocaleString() : '0.00'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pt-2 font-semibold">Remaining Months: 4</div>

            {/* Footer Buttons */}
            <div className="flex flex-wrap gap-4 justify-center mt-6">
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Back To Salary</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Save</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Preview</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Download</button>
              <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded">Recalculate</button>
            </div>
          </>
        ) : (
          <p className="text-gray-600">You are viewing: <strong>{activeTab}</strong></p>
        )}
      </div>
    </div>
  );
};

export default EmployeeTaxInfo;
