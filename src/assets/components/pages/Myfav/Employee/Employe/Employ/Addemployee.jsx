import React, { useState } from 'react';
import './Addemployee.css'
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save employee.');

      alert('Employee saved successfully!');
      console.log('Saved data:', formData);
      handleCancel();
    } catch (error) {
      alert('Error saving employee.');
      console.error(error);
    }
  };

  return (
    <div className="employee-form">
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        <InputField label="Name *" name="name" value={formData.name} onChange={handleChange} />
        <InputField label="Number *" name="number" value={formData.number} onChange={handleChange} />
        <InputField label="Date of Joining *" name="doj" type="date" value={formData.doj} onChange={handleChange} />
        <InputField label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} />

        <div className="form-field-full">
          <label>Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="button" onClick={handleCancel} className="btn btn-secondary">Cancel</button>
          <button type="submit" className="btn btn-primary">Save</button>
        </div>
      </form>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div className="form-field">
    <label>{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);
