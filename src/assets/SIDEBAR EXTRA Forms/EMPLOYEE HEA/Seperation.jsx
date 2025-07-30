import React, { useState } from "react";

export default function EmployeeExitForm() {
  const employees = [
    { id: 566, name: "Harshit Patel", type: "Resigned Employees" },
    { id: 6266, name: "Aadesh Hiralal Sonar", type: "Current Employees" },
    { id: 7301, name: "Priya Sharma", type: "Resigned Employees" },
    { id: 8420, name: "Ravi Kumar", type: "Current Employees" }
  ];

  const [employeeType, setEmployeeType] = useState("Resigned Employees");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    separationMode: "RESIGNED",
    resignationDate: "12 Jun 2025",
    reason: "EXPIRED",
    noticeRequired: "No",
    noticePeriod: "0 days",
    shortfall: "0",
    tentativeDate: "-",
    excludeSettlement: "No",
    resignationRemarks: "-",
    interviewDate: "-",
    notes: "-",
    leavingDate: "21 Jun 2025",
    settledOn: "31 May 2025",
    hasLeft: true,
    noticeServed: "No",
    rehired: "No",
    alternateEmail: "-",
    alternateMobile: "-"
  });

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 0) {
      const filtered = employees.filter(
        (emp) =>
          emp.name.toLowerCase().includes(value.toLowerCase()) &&
          emp.type === employeeType
      );
      setFilteredEmployees(filtered);
    } else {
      setFilteredEmployees([]);
    }
  };

  const handleSelectEmployee = (emp) => {
    setSelectedEmployee(emp);
    setSearchTerm(`${emp.name} #${emp.id}`);
    setFilteredEmployees([]);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="p-6 bg-white rounded-md shadow space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">
            Start searching to see specific employee details here
          </h2>
          <p className="text-sm text-gray-600">
            Employee Type:
            <select
              className="ml-2 border border-gray-300 rounded px-2 py-1"
              value={employeeType}
              onChange={(e) => {
                setEmployeeType(e.target.value);
                setSelectedEmployee(null);
                setSearchTerm("");
                setFilteredEmployees([]);
              }}
            >
              <option value="Current Employees">Current Employees</option>
              <option value="Resigned Employees">Resigned Employees</option>
            </select>
          </p>

          {/* Search Input */}
          <div className="relative mt-4 w-80">
            <input
              type="text"
              placeholder="Search Employee"
              value={searchTerm}
              onChange={handleSearch}
              className="w-full border border-blue-500 rounded px-3 py-2"
            />
            {filteredEmployees.length > 0 && (
              <ul className="absolute z-10 bg-white border border-gray-300 w-full mt-1 rounded shadow">
                {filteredEmployees.map((emp) => (
                  <li
                    key={emp.id}
                    onClick={() => handleSelectEmployee(emp)}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    {emp.name} #{emp.id}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <img
          src="https://tse2.mm.bing.net/th/id/OIP.iv6c4IKoJqFUW36lRkkLtAHaHN?pid=Api&P=0&h=180"
          alt="Employee Illustration"
          className="w-40 h-40 object-contain"
        />
      </div>

      {/* Conditional Details */}
      {selectedEmployee && (
        <>
          <div className="text-gray-700 space-y-1">
            <h3 className="text-lg font-semibold text-green-600">Employee Details</h3>
            <p><strong>ID:</strong> #{selectedEmployee.id}</p>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>Status:</strong> {employeeType}</p>
          </div>

          {/* Resigned Employee Section */}
          {employeeType === "Resigned Employees" && (
            <>
              {/* Separation Mode */}
              <div>
                <h3 className="text-lg font-semibold text-red-500">Resignation Status</h3>
                <label className="block text-sm mt-2">Separation Mode</label>
                <select
                  value={formData.separationMode}
                  onChange={(e) => handleInputChange("separationMode", e.target.value)}
                  className="w-64 border border-gray-300 rounded px-3 py-2"
                >
                  <option value="RESIGNED">RESIGNED</option>
                  <option value="ABSCONDING">ABSCONDING</option>
                  <option value="TERMINATED">TERMINATED</option>
                  <option value="RETIRED">RETIRED</option>
                </select>
              </div>

              {/* Resignation Details */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">Resignation Details</h3>
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div>
                    <label>Resignation Submitted On</label>
                    <input
                      value={formData.resignationDate}
                      onChange={(e) => handleInputChange("resignationDate", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label>Reason For Leaving</label>
                    <input
                      value={formData.reason}
                      onChange={(e) => handleInputChange("reason", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label>Notice Required</label>
                    <select
                      value={formData.noticeRequired}
                      onChange={(e) => handleInputChange("noticeRequired", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label>Notice Period</label>
                    <input
                      value={formData.noticePeriod}
                      onChange={(e) => handleInputChange("noticePeriod", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label>Short Fall</label>
                    <input
                      value={formData.shortfall}
                      onChange={(e) => handleInputChange("shortfall", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label>Tentative Leaving Date</label>
                    <input
                      value={formData.tentativeDate}
                      onChange={(e) => handleInputChange("tentativeDate", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label>Exclude from Final Settlement</label>
                    <select
                      value={formData.excludeSettlement}
                      onChange={(e) => handleInputChange("excludeSettlement", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label>Remarks</label>
                    <input
                      value={formData.resignationRemarks}
                      onChange={(e) => handleInputChange("resignationRemarks", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>

              {/* Exit Interview */}
              <div className="border-t pt-4">
                <h3 className="text-lg font-semibold mb-2">📋 Exit Interview</h3>
                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <label>Interview Date</label>
                    <input
                      value={formData.interviewDate}
                      onChange={(e) => handleInputChange("interviewDate", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                  <div>
                    <label>Notes</label>
                    <input
                      value={formData.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Exit Details (for all) */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-2">📝 Exit Details</h3>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div>
                <label>Leaving Date</label>
                <input
                  value={formData.leavingDate}
                  onChange={(e) => handleInputChange("leavingDate", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label>Settled On</label>
                <input
                  value={formData.settledOn}
                  onChange={(e) => handleInputChange("settledOn", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label>Employee has left</label>
                <select
                  value={formData.hasLeft ? "Yes" : "No"}
                  onChange={(e) => handleInputChange("hasLeft", e.target.value === "Yes")}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label>Notice Served</label>
                <input
                  value={formData.noticeServed}
                  onChange={(e) => handleInputChange("noticeServed", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label>Fit to be rehired</label>
                <select
                  value={formData.rehired}
                  onChange={(e) => handleInputChange("rehired", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label>Alternate Email</label>
                <input
                  value={formData.alternateEmail}
                  onChange={(e) => handleInputChange("alternateEmail", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
              <div>
                <label>Alternate Mobile No</label>
                <input
                  value={formData.alternateMobile}
                  onChange={(e) => handleInputChange("alternateMobile", e.target.value)}
                  className="w-full border px-2 py-1 rounded"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
