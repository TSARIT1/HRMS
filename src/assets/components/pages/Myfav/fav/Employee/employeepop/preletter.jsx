import React, { useState } from "react";
import './preletter.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const GenerateLetter = () => {
  const steps = [
    { id: 1, title: "General" },
    { id: 2, title: "Select Employees" },
    { id: 3, title: "Preview & Edit" },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [animStep, setAnimStep] = useState(1);
  const [animDirection, setAnimDirection] = useState(null);
  const [animating, setAnimating] = useState(false);

  const [formData, setFormData] = useState({
    general: {
      letterTemplate: "",
      authorizedSignatory: "Rakesh (CEO)",
      remarks: "",
      generatedContent: {},
    },
    employees: {
      selectedEmployees: [],
    },
  });
  const [errors, setErrors] = useState({});
  const [employees, setEmployees] = useState([
    { id: 1, name: "Verma", employeeNum: "EMP001", position: "Developer" },
    { id: 2, name: "Jabi", employeeNum: "EMP002", position: "Designer" },
    { id: 3, name: "Rakesh", employeeNum: "EMP003", position: "Manager" },
  ]);
  const [newEmployee, setNewEmployee] = useState({ name: "", employeeNum: "", position: "" });

  const getTemplateContent = (templateKey) => {
    const templates = {
      offer: `
Dear [Employee Name],
We are pleased to offer you the position of [Position] at TSAR IT PVT LTD, based on the recent interviews and
discussions. We believe your skills and experience will be a great asset to our company, and we are excited 
to welcome you aboard.

 Position Details: 
•	Job Title: XXXXX
•	Employment Type: XXXXX
•	Reporting To: XXXXX
•	Start Date: XXXXX

 Job Responsibilities: 
Your responsibilities as an XXXXX will include but are not limited to:
•	XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.
•	XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.
•	XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.
•	xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.
•	XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.

 Other Benefits: 
•	XXXXXXXXXXXXXXXXXXXXXXXXXXXX.
•	XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.
•	XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX.

 Compensation :
•	Annual Salary: ₹XXXX LPA, paid on a monthly basis.
•	Bonus: You may be eligible for performance-based bonuses as per the company policy.

 Terms & Conditions: 

•	This offer is contingent upon the completion of background checks, as per company policy.
•	Your employment with TSAR IT PVT LTD is at-will, meaning either you or the company can terminate the employment relationship at any time, with or without cause, and with or without notice.
We are confident that you will have a rewarding experience working with us and look forward to seeing the positive impact you will have on TSAR IT PVT LTD.
If you have any questions or require further clarification, please do not hesitate to contact us.
Please review this offer carefully and indicate your acceptance by signing and returning a copy of this letter.

Warm regards,`,
      experience: ` To Whomsoever It May Concern 
This is to certify that Mr.[Employee Name] Emp.No: [EmployeeNum] worked in our Company TSAR IT PVT LTD as Role [Position] from XXXXXX  to XXXXXX.
We found him sincere, hardworking and technically sound and result oriented during his tenure. He has a friendly, outgoing personality, a good sense of humor and works well as part of a team.
We thank his for his contribution and wish him success in his future endeavors.`,
      termination: `To Whomsoever It May Concern 
This is to certify that Mr.[Employee Name] Emp. No: [EmployeeNum] worked in our Company TSAR IT PVT LTD as Role [Position] from XXXXXX  to XXXXXX.
We found him sincere, hardworking and technically sound and result oriented during his tenure. He has a friendly, outgoing personality, a good sense of humor and works well as part of a team.
We thank his for his contribution and wish him success in his future endeavors.`,
    };
    return templates[templateKey] || "";
  };

  const generateContent = (selectedIds, templateKey) => {
    const contentMap = {};
    selectedIds.forEach((id) => {
      const emp = employees.find((e) => e.id === id);
      if (emp) {
        contentMap[id] = getTemplateContent(templateKey)
          .replace(/\[Employee Name\]/g, emp.name)
          .replace(/\[EmployeeNum\]/g, emp.employeeNum)
          .replace(/\[Position\]/g, emp.position);
      }
    });
    return contentMap;
  };

  const handleChange = (section, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = {
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      };

      if (section === "general" && name === "letterTemplate") {
        updated.general.generatedContent = generateContent(
          prev.employees.selectedEmployees,
          value
        );
      }

      if (errors[name]) {
        const newErrors = { ...errors };
        delete newErrors[name];
        setErrors(newErrors);
      }
      return updated;
    });
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 1) {
      if (!formData.general.letterTemplate) {
        newErrors.letterTemplate = "Please select a letter template.";
      }
    } else if (currentStep === 2) {
      if (formData.employees.selectedEmployees.length === 0) {
        newErrors.selectedEmployees = "Please select at least one employee.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 
  const changeStep = (newStep) => {
    if (animating || newStep === currentStep) return;

    setAnimDirection(newStep > currentStep ? "right" : "left");
    setAnimating(true);

    setTimeout(() => {
      setCurrentStep(newStep);
      setAnimStep(newStep);
      setAnimating(false);
    }, 500);
  };

  const handleNextAnimated = () => {
    if (!validateStep()) return;
    if (currentStep < steps.length) changeStep(currentStep + 1);
  };

  const handlePreviousAnimated = () => {
    if (currentStep > 1) changeStep(currentStep - 1);
  };

  const handleCancel = () => {
    setCurrentStep(1);
    setAnimStep(1);
    setFormData({
      general: {
        letterTemplate: "",
        authorizedSignatory: "Rakesh (CEO)",
        remarks: "",
        generatedContent: {},
      },
      employees: {
        selectedEmployees: [],
      },
    });
    setErrors({});
    setNewEmployee({ name: "", employeeNum: "", position: "" });
  };

  const toggleEmployeeSelection = (id) => {
    setFormData((prev) => {
      const selected = prev.employees.selectedEmployees.includes(id)
        ? prev.employees.selectedEmployees.filter((eid) => eid !== id)
        : [...prev.employees.selectedEmployees, id];

      return {
        ...prev,
        employees: { selectedEmployees: selected },
        general: {
          ...prev.general,
          generatedContent: generateContent(selected, prev.general.letterTemplate),
        },
      };
    });
  };

  const handleContentEdit = (id, newText) => {
    setFormData((prev) => ({
      ...prev,
      general: {
        ...prev.general,
        generatedContent: {
          ...prev.general.generatedContent,
          [id]: newText,
        },
      },
    }));
  };

  const handleAddEmployee = () => {
    const { name, employeeNum, position } = newEmployee;
    if (!name || !employeeNum || !position) return;

    setEmployees((prev) => [
      ...prev,
      { id: prev.length + 1, name, employeeNum, position },
    ]);
    setNewEmployee({ name: "", employeeNum: "", position: "" });
  };

  const handleSubmit = () => {
    let output = Object.entries(formData.general.generatedContent)
      .map(([id, content]) => {
        const emp = employees.find((e) => e.id === Number(id));
        return `Letter for ${emp?.name} (${emp?.employeeNum}):\n${content}`;
      })
      .join("\n\n");

    alert("Letters Generated:\n\n" + output);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Generate Letters</h2>

  
      <div className="mb-6 flex justify-between">
        {steps.map(({ id, title }) => (
          <div
            key={id}
            className={`font-semibold ${currentStep === id ? "text-blue-600" : "text-gray-500"}`}
          >
            {title}
          </div>
        ))}
      </div>

   
      <div className="stepper-wrapper">
        <div
          className={`step-content ${
            animating
              ? animDirection === "right"
                ? "fade-out-left"
                : "fade-out-right"
              : animStep === currentStep
              ? animDirection === "right"
                ? "fade-in-right"
                : "fade-in-left"
              : ""
          }`}
        >
          {currentStep === 1 && (
            <div>
              <label className="block font-medium mb-2">Letter Template*</label>
              <select
                name="letterTemplate"
                value={formData.general.letterTemplate}
                onChange={(e) => handleChange("general", e)}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="">Select Template</option>
                <option value="offer">Offer Letter</option>
                <option value="experience">Experience Letter</option>
                <option value="termination">Termination Letter</option>
              </select>
              {errors.letterTemplate && (
                <p className="text-red-500 mb-2">{errors.letterTemplate}</p>
              )}

              <label className="block font-medium mb-2">Remarks</label>
              <textarea
                name="remarks"
                value={formData.general.remarks}
                onChange={(e) => handleChange("general", e)}
                className="w-full p-2 border rounded"
                placeholder="Any remarks"
              />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h3 className="font-semibold mb-4">Add New Employee</h3>
              <div className="flex gap-2 mb-4">
                <input
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                  className="border p-2 rounded flex-1"
                />
                <input
                  placeholder="Employee No"
                  value={newEmployee.employeeNum}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, employeeNum: e.target.value })
                  }
                  className="border p-2 rounded flex-1"
                />
                <input
                  placeholder="Position"
                  value={newEmployee.position}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, position: e.target.value })
                  }
                  className="border p-2 rounded flex-1"
                />
                <button
                  onClick={handleAddEmployee}
                  className="bg-green-600 text-white px-4 rounded"
                >
                  Add
                </button>
              </div>

              <h3 className="font-semibold mb-2">Select Employees</h3>
              {employees.map((emp) => (
                <label key={emp.id} className="block mb-1 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.employees.selectedEmployees.includes(emp.id)}
                    onChange={() => toggleEmployeeSelection(emp.id)}
                    className="mr-2"
                  />
                  {emp.name} ({emp.employeeNum}) - {emp.position}
                </label>
              ))}
              {errors.selectedEmployees && (
                <p className="text-red-500">{errors.selectedEmployees}</p>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h3 className="font-semibold mb-4">Letter Preview & Edit</h3>
              {formData.employees.selectedEmployees.length === 0 && (
                <p>No employees selected.</p>
              )}
              {formData.employees.selectedEmployees.map((id) => {
                const emp = employees.find((e) => e.id === id);
                return (
                  <div key={id} className="mb-4">
                    <label className="block font-semibold mb-1">
                      {emp?.name}'s Letter:
                    </label>
                    <textarea
                      value={formData.general.generatedContent[id] || ""}
                      onChange={(e) => handleContentEdit(id, e.target.value)}
                      className="w-full p-2 border rounded h-60" 
                    />
                  </div>
                );
              })}
              <div className="mt-4">
                <label className="block font-medium mb-1">Authorized Signatory</label>
                <select
                  name="authorizedSignatory"
                  value={formData.general.authorizedSignatory}
                  onChange={(e) => handleChange("general", e)}
                  className="w-full p-2 border rounded"
                >
                  <option>Rakesh (CEO)</option>
                  <option>Jabi (HR Manager)</option>
                  <option>Rakesh (Director)</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

     
      <div className="flex justify-between mt-6">
        <button
          onClick={handlePreviousAnimated}
          disabled={currentStep === 1 || animating}
          className={`px-4 py-2 rounded ${
            currentStep === 1 || animating ? "bg-gray-300" : "bg-gray-700 text-white"
          }`}
        >
          Previous
        </button>

        <div className="space-x-2">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded bg-red-600 text-white"
          >
            Cancel
          </button>

          {currentStep < steps.length && (
            <button
              onClick={handleNextAnimated}
              disabled={animating}
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Next
            </button>
          )}

          {currentStep === steps.length && (
            <button
              onClick={handleSubmit}
              className="px-4 py-2 rounded bg-green-600 text-white"
            >
              Generate Letters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateLetter;
