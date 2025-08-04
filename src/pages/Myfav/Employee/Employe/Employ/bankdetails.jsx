import React, { useState } from 'react';
import './bank_details.css';

const bankBranches = {
  'SBI': ['Hyderabad', 'Mumbai', 'Delhi'],
  'HDFC Bank': ['Banjara Hills', 'Chennai', 'Bangalore'],
  'Axis Bank': ['Kolkata', 'Nagpur', 'Jaipur'],
};

const BankDetailsForm = () => {
  const initialState = {
    bankName: '',
    bankBranch: '',
    accountNumber: '',
    ifsc: '',
    nameAsPerBank: '',
    accountType: '',
    paymentType: 'Cash',
    esiNumber: '',
    uan: '',
    pfNumber: '',
    pfJoinDate: '',
    familyPfNumber: '',
    isEpfMember: false,
    epfExcess: false,
    epsExcess: false,
    schemeType: '',
    isLwfCovered: false,
  };

  const [form, setForm] = useState(initialState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      setForm(initialState);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Details saved successfully!");
    console.log(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Bank Details</h2>

      <div className="form-grid">
        {/* Left Column */}
        <div className="form-column">
          <label>Bank Name</label>
          <select name="bankName" value={form.bankName} onChange={handleChange}>
            <option value="">-- Select Bank --</option>
            {Object.keys(bankBranches).map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>

          <label>Bank Branch</label>
          <select name="bankBranch" value={form.bankBranch} onChange={handleChange}>
            <option value="">-- Select Branch --</option>
            {(bankBranches[form.bankName] || []).map((branch) => (
              <option key={branch} value={branch}>{branch}</option>
            ))}
          </select>

          <div className="triple-field-group">
            <div className="field-block">
              <label>Account Number</label>
              <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} />
            </div>
            <div className="field-block">
              <label>IFSC Code</label>
              <input type="text" name="ifsc" value={form.ifsc} onChange={handleChange} />
            </div>
            <div className="field-block">
              <label>ESI Number</label>
              <input type="text" name="esiNumber" value={form.esiNumber} onChange={handleChange} />
            </div>
          </div>

          <div className="triple-field-group">
            <div className="field-block">
              <label>Name as per Bank</label>
              <input type="text" name="nameAsPerBank" value={form.nameAsPerBank} onChange={handleChange} />
            </div>
            <div className="field-block">
              <label>PF Number</label>
              <input type="text" name="pfNumber" value={form.pfNumber} onChange={handleChange} />
            </div>
            <div className="field-block">
              <label>UAN</label>
              <input type="text" name="uan" value={form.uan} onChange={handleChange} />
            </div>
          </div>

          <div className="triple-field-group">
            <div className="field-block">
              <label>PF Join Date</label>
              <input type="date" name="pfJoinDate" value={form.pfJoinDate} onChange={handleChange} />
            </div>
            <div className="field-block">
              <label>Family PF Number</label>
              <input type="text" name="familyPfNumber" value={form.familyPfNumber} onChange={handleChange} />
            </div>
            <div className="field-block"></div> {/* Empty for alignment */}
          </div>
        </div>

        {/* Right Column */}
        <div className="form-column">
          <label>Account Type</label>
          <select name="accountType" value={form.accountType} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="Savings">Savings</option>
            <option value="Current">Current</option>
          </select>

          <label>Payment Type</label>
          <select name="paymentType" value={form.paymentType} onChange={handleChange}>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>

          <label>Scheme Type</label>
          <select name="schemeType" value={form.schemeType} onChange={handleChange}>
            <option value="">-- Select --</option>
            <option value="Pension">Pension</option>
            <option value="PF Only">PF Only</option>
          </select>

          <div className="checkbox-section">
            <label><input type="checkbox" name="isEpfMember" checked={form.isEpfMember} onChange={handleChange} /> EPF Member</label>
            <label><input type="checkbox" name="epfExcess" checked={form.epfExcess} onChange={handleChange} /> EPF Excess</label>
            <label><input type="checkbox" name="epsExcess" checked={form.epsExcess} onChange={handleChange} /> EPS Excess</label>
            <label><input type="checkbox" name="isLwfCovered" checked={form.isLwfCovered} onChange={handleChange} /> Covered under LWF</label>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </div>
    </form>
  );
};

export default BankDetailsForm;
