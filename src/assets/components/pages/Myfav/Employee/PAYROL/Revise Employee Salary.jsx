import React, { useState } from "react";
import './Revise Employee Salary.css';
const employeesList = [
  {
    id: "1007",
    name: "Praveen Kumar",
    joinDate: "2021-08-12",
    experience: "3.8 Years",
    designation: "Junior Associate",
    department: "Product Department",
  },
  {
    id: "1008",
    name: "Anjali Sharma",
    joinDate: "2022-01-10",
    experience: "2.4 Years",
    designation: "Software Engineer",
    department: "Engineering",
  },
  {
    id: "1009",
    name: "Rajesh Mehra",
    joinDate: "2020-06-15",
    experience: "4.9 Years",
    designation: "Team Lead",
    department: "Product Department",
  },
];

const defaultSalaryItems = [
  { name: "MONTHLY BASIC", revised: 6000 },
  { name: "MONTHLY DA", revised: 0 },
  { name: "MONTHLY HRA", revised: 6000 },
  { name: "MONTHLY CONVEYANCE", revised: 1600 },
  { name: "MONTHLY SPECIAL ALLOWANCE", revised: 150 },
  { name: "MONTHLY MEDICAL ALLOWANCE", revised: 1250 },
  { name: "MONTHLY CONSULTANCY FEES", revised: 0 },
  { name: "ANNUAL CTC", revised: 18000 },
];

export default function SalaryRevisionForm() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employee, setEmployee] = useState(null);
  const [salaryItems, setSalaryItems] = useState(defaultSalaryItems);
  const [effectiveFrom, setEffectiveFrom] = useState("2021-08-12");
  const [payoutMonth, setPayoutMonth] = useState("2025-04");
  const [remarks, setRemarks] = useState("");
  const [notes, setNotes] = useState("");

  const handleEmployeeSearch = () => {
    const found = employeesList.find(
      (emp) =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.id === searchTerm
    );
    if (found) {
      setEmployee(found);
    } else {
      alert("Employee not found");
    }
  };

  const handleChange = (index, value) => {
    const updated = [...salaryItems];
    updated[index].revised = parseFloat(value || 0);
    setSalaryItems(updated);
  };

  const handleSave = () => {
    if (!employee) {
      alert("Please select an employee first.");
      return;
    }
    console.log("Saved Data:", {
      employee,
      salaryItems,
      effectiveFrom,
      payoutMonth,
      remarks,
      notes,
    });
    alert("Revision saved!");
  };

  const handleDelete = () => {
    if (window.confirm("Delete the revision?")) {
      setSalaryItems(defaultSalaryItems.map(item => ({ ...item, revised: 0 })));
    }
  };

  return (
    <div className="salary-revision-container">
      <h2>Salary Revision</h2>

      {/* 🔍 Employee Search */}
      <div className="employee-search">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleEmployeeSearch}>Search</button>
      </div>

      {/* 🧾 Show only if employee is selected */}
      {employee && (
        <>
          <div className="employee-info">
            <p><strong>{employee.name}</strong> &nbsp; #{employee.id}</p>
            <p>Join Date: {employee.joinDate}</p>
            <p>Experience: {employee.experience}</p>
            <p>Designation: {employee.designation}</p>
            <p>Department: {employee.department}</p>
          </div>

          <table className="salary-table">
            <thead>
              <tr>
                <th>Salary Item</th>
                <th>Previous Salary</th>
                <th>Revised Salary</th>
                <th>Revision %</th>
              </tr>
            </thead>
            <tbody>
              {salaryItems.map((item, i) => {
                const revised = item.revised;
                const previous = 0;
                const percent = previous === 0 ? (revised > 0 ? 100 : 0) : ((revised - previous) / previous) * 100;

                return (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>₹0.00</td>
                    <td>
                      <input
                        type="number"
                        value={item.revised}
                        onChange={(e) => handleChange(i, e.target.value)}
                      />
                    </td>
                    <td>{percent.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="bottom-section">
            <div>
              <label>Effective From</label>
              <input type="date" value={effectiveFrom} onChange={(e) => setEffectiveFrom(e.target.value)} />
            </div>
            <div>
              <label>Payout Month</label>
              <input type="month" value={payoutMonth} onChange={(e) => setPayoutMonth(e.target.value)} />
            </div>
          </div>

          <div className="text-areas">
            <div>
              <label>Employee Remarks</label>
              <textarea placeholder="This will be visible to employee." value={remarks} onChange={(e) => setRemarks(e.target.value)} />
            </div>
            <div>
              <label>Notes</label>
              <textarea placeholder="This will not be visible to employee." value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
          </div>

          <div className="button-row">
            <button onClick={handleSave}>Save</button>
            <button onClick={handleDelete}>Delete Revision</button>
          </div>
        </>
      )}
    </div>
  );
}
