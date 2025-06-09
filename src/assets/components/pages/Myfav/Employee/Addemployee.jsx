import React, { useState } from 'react';
import './Addemployee.css';

export default function EmployeeQuickAdd() {
  const [formData, setFormData] = useState({
    name: '',
    number: '',
    doj: '',
    location: '',
    email: '',
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    console.log('Employee Data:', formData);
    // Submit API logic here
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log('Selected file:', e.target.files[0]);
    // Add file upload API logic here
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border">
      {/* Bulk Upload Section */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Quickly add employee to the company!</h2>
        <p className="text-sm text-gray-600 mb-3">
          Add an employee by filling the form or add a bunch of employees by clicking bulk upload.
        </p>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileChange}
            className="block"
          />
         
        </div>
      </div>

      {/* Single Employee Add Form */}
      <h2 className="text-xl font-semibold mb-4">Add details of an employee</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-medium">Employee Name *</label>
            <input
              name="name"
              type="text"
              placeholder="Enter Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Employee Number *</label>
            <input
              name="number"
              type="text"
              placeholder="Enter Number"
              value={formData.number}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded p-2"
            />
          </div>

          <div>
            <label className="block font-medium">Date Of Joining *</label>
            <input
              name="doj"
              type="date"
              value={formData.doj}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

          <div>
            <label className="block font-medium">Email ID *</label>
            <input
              name="email"
              type="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 border border-gray-300 rounded p-2"
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          After saving, the onboarding process will start and employee will receive a Welcome Email with the link to set his password.
        </p>

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

      {/* Recently Added and Related Actions */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Recently Added</h3>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-800 font-bold">
              UV
            </div>
            <div>
              <button className="text-blue-600 underline">Click here to see all employees</button>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
}
