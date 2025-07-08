import React, { useState } from 'react';

const EmployeeManager = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Search Section */}
      <div className="mb-6">
        <label className="block text-lg text-gray-600 mb-2">Search Employee</label>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Emp No/ Name"
            className="w-full rounded-full px-4 py-2 border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="bg-white border border-blue-600 text-blue-600 rounded-full p-2 hover:bg-blue-100">
            🔍
          </button>
        </div>
        <div className="mt-4">
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            onClick={() => setShowForm(true)}
          >
            + Add Employee
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto mt-6 border rounded">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Relation</th>
              <th className="px-4 py-2">DOB</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Blood Group</th>
              <th className="px-4 py-2">Gender</th>
              <th className="px-4 py-2">Nationality</th>
              <th className="px-4 py-2">Profession</th>
              <th className="px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-400">No data available</td>
              </tr>
            ) : (
              employees.map((emp, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{emp.name}</td>
                  <td className="px-4 py-2">{emp.relation}</td>
                  <td className="px-4 py-2">{emp.dob}</td>
                  <td className="px-4 py-2">{emp.age}</td>
                  <td className="px-4 py-2">{emp.bloodGroup}</td>
                  <td className="px-4 py-2">{emp.gender}</td>
                  <td className="px-4 py-2">{emp.nationality}</td>
                  <td className="px-4 py-2">{emp.profession}</td>
                  <td className="px-4 py-2">{emp.remarks}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Conditional Form Section */}
      {showForm && (
        <>
          {/* Employee Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 bg-white p-6 rounded shadow">
            {/* Right Side First */}
            <div className="space-y-4 order-2 md:order-1">
              <Input label="Profession" />
              <Select label="Nationality" options={['Indian', 'American', 'Other']} />
              <div>
                <label className="block text-gray-600 mb-1">Remarks</label>
                <textarea
                  className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  rows={4}
                ></textarea>
              </div>
            </div>

            {/* Left Side Second */}
            <div className="space-y-4 order-1 md:order-2">
              <Input label="Name" />
              <Input label="DOB" type="date" />
              <Select label="Gender" options={['Male', 'Female', 'Other']} />
              <Select label="Blood Group" options={['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']} />
              <Select label="Relation" options={['Spouse', 'Child', 'Parent', 'Sibling']} />
              <div className="flex items-center gap-2">
                <input type="checkbox" className="accent-red-600" />
                <label className="text-sm text-gray-700">Address Same As employee</label>
              </div>
            </div>
          </div>

          {/* Copy Address & Buttons */}
          <div className="mt-6 flex flex-col md:flex-row md:items-center md:gap-6">
            <div className="mb-3 md:mb-0">
              <label className="block text-gray-600 mb-1">Copy Address From</label>
              <select className="border rounded px-4 py-2">
                <option>Present Address</option>
                <option>Permanent Address</option>
              </select>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
                Save
              </button>
              <button
                className="border border-blue-600 text-blue-600 px-5 py-2 rounded hover:bg-blue-100"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Reusable Input Component
const Input = ({ label, type = 'text' }) => (
  <div>
    <label className="block text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>
);

// Reusable Select Component
const Select = ({ label, options }) => (
  <div>
    <label className="block text-gray-600 mb-1">{label}</label>
    <select className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300">
      <option value="">Select</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default EmployeeManager;
