import React, { useState } from 'react';
import './FAMILY DETAILS.css';

const EmployeeManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const initialFormState = {
    name: '',
    relation: '',
    dob: '',
    age: '',
    bloodGroup: '',
    gender: '',
    nationality: '',
    profession: '',
    remarks: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddEmployee = () => {
    setEmployees([...employees, { ...formData }]);
    setFormData(initialFormState);
    setShowForm(false);
  };

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.empNo?.toString().includes(searchQuery)
  );

  return (
    <div className="family-container">
      <div className="header-section">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by Emp No / Name"
          className="search-input"
        />
        <button
          className="reset-btn"
          onClick={() => setSearchQuery('')}
        >
          Reset
        </button>
        <button
          className="add-btn"
          onClick={() => setShowForm(true)}
        >
          + Add Member
        </button>
      </div>

      <div className="table-wrapper">
        <table className="employee-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Relation</th>
              <th>DOB</th>
              <th>Age</th>
              <th>Blood Group</th>
              <th>Gender</th>
              <th>Nationality</th>
              <th>Profession</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  No data available
                </td>
              </tr>
            ) : (
              filteredEmployees.map((emp, index) => (
                <tr key={index}>
                  <td>{emp.name}</td>
                  <td>{emp.relation}</td>
                  <td>{emp.dob}</td>
                  <td>{emp.age}</td>
                  <td>{emp.bloodGroup}</td>
                  <td>{emp.gender}</td>
                  <td>{emp.nationality}</td>
                  <td>{emp.profession}</td>
                  <td>{emp.remarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="form-wrapper">
          <div className="form-section">
            <Input label="Name" name="name" value={formData.name} onChange={handleInputChange} />
            <Input label="DOB" name="dob" type="date" value={formData.dob} onChange={handleInputChange} />
            <Input label="Age" name="age" value={formData.age} onChange={handleInputChange} />
            <Select label="Gender" name="gender" value={formData.gender} onChange={handleInputChange} options={['Male', 'Female', 'Other']} />
            <Select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} />
            <Select label="Relation" name="relation" value={formData.relation} onChange={handleInputChange} options={['Spouse', 'Child', 'Parent', 'Sibling']} />
          </div>

          <div className="form-section">
            <Input label="Profession" name="profession" value={formData.profession} onChange={handleInputChange} />
            <Select label="Nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} options={['Indian', 'American', 'Other']} />
            <div>
              <label>Remarks</label>
              <textarea
                name="remarks"
                value={formData.remarks}
                onChange={handleInputChange}
                rows={4}
              ></textarea>
            </div>
          </div>

          <div className="form-buttons">
            <button className="save-btn" onClick={handleAddEmployee}>Save</button>
            <button className="cancel-btn" onClick={() => { setShowForm(false); setFormData(initialFormState); }}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    />
  </div>
);

// Reusable Select Component
const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label>{label}</label>
    <select name={name} value={value} onChange={onChange}>
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default EmployeeManager;
