import React from "react";
import { FaUserCircle, FaPen } from "react-icons/fa";

const PositionHistory = () => {
  return (
    <div className="p-6 bg-white rounded shadow">
      {/* Header */}
      <div className="flex justify-between items-start flex-wrap">
        <div className="space-y-2 max-w-xl">
          <h2 className="text-xl font-semibold">
            Start searching to see specific employee details here
          </h2>

          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600 font-medium">Employee Type:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option>Current Employees</option>
              <option>Former Employees</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Search Employee</label>
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 w-full max-w-md bg-gray-100">
              <FaUserCircle className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by Emp No/ Name"
                className="bg-transparent outline-none flex-grow text-sm text-gray-700"
              />
              <button className="text-gray-400 hover:text-gray-600">&times;</button>
            </div>
          </div>
        </div>

        {/* Illustration placeholder */}
        <div className="mt-4 md:mt-0 md:ml-4">
          <img
            src="https://via.placeholder.com/200x150.png?text=Illustration"
            alt="Illustration"
            className="w-48 h-auto"
          />
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Card Template */}
        {[
          { label: "Designation", value: "Junior Associate" },
          { label: "Location", value: "Bangalore" },
          { label: "Department", value: "Product Department" },
        ].map((item, index) => (
          <div key={index} className="bg-gray-50 border rounded-lg p-4 relative shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-gray-700 font-semibold">{item.label}</h4>
              <button className="text-blue-600 border border-blue-600 px-2 py-1 text-sm rounded hover:bg-blue-50">
                Add
              </button>
            </div>
            <p className="text-green-600 font-medium">{item.value}</p>
            <div className="text-sm text-gray-400 mt-1">08 Oct 2020</div>
            <button className="absolute bottom-3 right-3 text-blue-600 hover:text-blue-800">
              <FaPen size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PositionHistory;
