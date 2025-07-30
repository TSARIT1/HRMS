import React, { useState } from 'react';
import './Addemployee.css';
import { FcApproval } from "react-icons/fc";

export default function EmployeeQuickAdd() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    doj: '',
    location: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      number: '',
      doj: '',
      location: '',
      email: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('<FcApproval /> Employee saved!');
    handleCancel();
  };

  return (
    <div className="employee-form-container">
      <h2 className="form-heading">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-row">
          <InputField label="Name *" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Number *" name="number" value={formData.number} onChange={handleChange} />
        </div>
        <div className="form-row">
          <InputField label="Date of Joining *" name="doj" type="date" value={formData.doj} onChange={handleChange} />
          <InputField label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div className="form-group full-width">
          <label className="form-label">Location *</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="button" onClick={handleCancel} className="btn cancel-btn">Cancel</button>
          <button type="submit" className="btn save-btn">Save</button>
        </div>
      </form>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="form-input"
    />
  </div>
);
