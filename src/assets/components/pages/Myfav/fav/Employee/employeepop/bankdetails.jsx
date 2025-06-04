import React, { useState } from 'react';
import './bank.css'; 

const bankBranches = {
  'SBI': ['Hyderabad', 'Mumbai', 'Delhi'],
  'HDFC Bank': ['Banjara Hills', 'Chennai', 'Bangalore'],
  'Axis Bank': ['Kolkata', 'Nagpur', 'Jaipur'],
};

const BankDetailsForm = () => {
  const [form, setForm] = useState({
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
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel?")) {
      setForm({
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
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Details saved successfully!");
    console.log(form);
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Bank Account</h2>
      <div className="form-grid">
        <div>
          <label>Bank Name:<br />
            <select name="bankName" value={form.bankName} onChange={handleChange}>
              <option value="">-- Select Bank --</option>
              {Object.keys(bankBranches).map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </label>

          <label>Bank Branch:<br />
            <select name="bankBranch" value={form.bankBranch} onChange={handleChange}>
              <option value="">-- Select Branch --</option>
              {(bankBranches[form.bankName] || []).map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
          </label>

          <label>Bank Account Number:<br />
            <input type="text" name="accountNumber" value={form.accountNumber} onChange={handleChange} />
          </label>

          <label>IFSC Code:<br />
            <input type="text" name="ifsc" value={form.ifsc} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>Name as per Bank Records:<br />
            <input type="text" name="nameAsPerBank" value={form.nameAsPerBank} onChange={handleChange} />
          </label>

          <label>Account Type:<br />
            <select name="accountType" value={form.accountType} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="Savings">Savings</option>
              <option value="Current">Current</option>
            </select>
          </label>

          <label>Payment Type:<br />
            <select name="paymentType" value={form.paymentType} onChange={handleChange}>
              <option value="Cash">Cash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </label>
        </div>
      </div>

      <h2>ESI Account</h2>
      <div className="form-grid">
        <div>
          <label>ESI Number:<br />
            <input type="text" name="esiNumber" value={form.esiNumber} onChange={handleChange} />
          </label>
        </div>
      </div>

      <h2>PF Account</h2>
      <div className="form-grid">
        <div>
          <label>UAN:<br />
            <input type="text" name="uan" value={form.uan} onChange={handleChange} />
          </label>

          <label>PF Number:<br />
            <input type="text" name="pfNumber" value={form.pfNumber} onChange={handleChange} />
          </label>

          <label>PF Join Date:<br />
            <input type="date" name="pfJoinDate" value={form.pfJoinDate} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>Family PF Number:<br />
            <input type="text" name="familyPfNumber" value={form.familyPfNumber} onChange={handleChange} />
          </label>

          <label>
            <input type="checkbox" name="isEpfMember" checked={form.isEpfMember} onChange={handleChange} />
            Existing member of EPF
          </label>

          <label>
            <input type="checkbox" name="epfExcess" checked={form.epfExcess} onChange={handleChange} />
            Allow EPF Excess Contribution
          </label>

          <label>
            <input type="checkbox" name="epsExcess" checked={form.epsExcess} onChange={handleChange} />
            Allow EPS Excess Contribution
          </label>

          <label>Scheme Type:<br />
            <select name="schemeType" value={form.schemeType} onChange={handleChange}>
              <option value="">-- Select --</option>
              <option value="Pension">Pension</option>
              <option value="PF Only">PF Only</option>
            </select>
          </label>
        </div>
      </div>

      <h2>Labour Welfare Fund</h2>
      <div>
        <label>
          <input type="checkbox" name="isLwfCovered" checked={form.isLwfCovered} onChange={handleChange} />
          Employee is covered under LWF
        </label>
      </div>

      <div className="form-actions">
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </form>
  );
};

export default BankDetailsForm;
