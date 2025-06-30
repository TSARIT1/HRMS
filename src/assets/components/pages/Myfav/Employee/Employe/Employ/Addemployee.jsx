import React, { useState } from 'react';

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
    alert('Employee saved!');
    handleCancel();
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border">
      <h2 className="text-2xl font-semibold mb-6">Add New Employee</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField label="Name *" name="name" value={formData.name} onChange={handleChange} />
          <InputField label="Number *" name="number" value={formData.number} onChange={handleChange} />
          <InputField label="Date of Joining *" name="doj" type="date" value={formData.doj} onChange={handleChange} />
          <InputField label="Email *" name="email" type="email" value={formData.email} onChange={handleChange} />
        </div>

        <div>
          <label className="block font-medium">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full mt-1 border border-gray-300 rounded p-2"
          >
            <option value="">Select</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
          </select>
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-400 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

const InputField = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="block font-medium">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full mt-1 border border-gray-300 rounded p-2"
    />
  </div>
);
