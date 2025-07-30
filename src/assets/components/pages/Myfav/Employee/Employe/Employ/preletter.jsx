import React, { useState } from "react";
import './preletter.css';

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
We are pleased to offer you the position of [Position] at TSAR IT PVT LTD...

Regards,
[Authorized Signatory]`,

      experience: `
To Whomsoever It May Concern

This is to certify that Mr.[Employee Name] Emp.No: [EmployeeNum] worked in our Company TSAR IT PVT LTD as Role [Position].

Regards,
[Authorized Signatory]`,

      termination: `
To Whomsoever It May Concern

This is to certify that Mr.[Employee Name] Emp.No: [EmployeeNum] worked in our Company TSAR IT PVT LTD as Role [Position] and has been relieved.

Regards,
[Authorized Signatory]`,
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
          .replace(/\[Position\]/g, emp.position)
          .replace(/\[Authorized Signatory\]/g, formData.general.authorizedSignatory);
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
    if (currentStep === 1 && !formData.general.letterTemplate) {
      newErrors.letterTemplate = "Please select a letter template.";
    }
    if (currentStep === 2 && formData.employees.selectedEmployees.length === 0) {
      newErrors.selectedEmployees = "Please select at least one employee.";
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
    }, 400);
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
    <div className="letter-container">
      <h2 className="title">Generate Letters</h2>

      <div className="step-indicator">
        {steps.map(({ id, title }) => (
          <div key={id} className={`step ${currentStep === id ? "active-step" : ""}`}>
            {title}
          </div>
        ))}
      </div>

      <div className={`stepper-wrapper ${animating ? "animating" : ""}`}>
        {currentStep === 1 && (
          <div className="step-panel">
            <label>Letter Template*</label>
            <select
              name="letterTemplate"
              value={formData.general.letterTemplate}
              onChange={(e) => handleChange("general", e)}
            >
              <option value="">Select Template</option>
              <option value="offer">Offer Letter</option>
              <option value="experience">Experience Letter</option>
              <option value="termination">Termination Letter</option>
            </select>
            {errors.letterTemplate && <p className="error">{errors.letterTemplate}</p>}

            <label>Remarks</label>
            <textarea
              name="remarks"
              value={formData.general.remarks}
              onChange={(e) => handleChange("general", e)}
              placeholder="Any remarks..."
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="step-panel">
            <h3>Add New Employee</h3>
            <div className="add-employee">
              <input
                placeholder="Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              />
              <input
                placeholder="Employee No"
                value={newEmployee.employeeNum}
                onChange={(e) => setNewEmployee({ ...newEmployee, employeeNum: e.target.value })}
              />
              <input
                placeholder="Position"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
              />
              <button onClick={handleAddEmployee} className="btn green">Add</button>
            </div>

            <h3>Select Employees</h3>
            {employees.map((emp) => (
              <label key={emp.id} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={formData.employees.selectedEmployees.includes(emp.id)}
                  onChange={() => toggleEmployeeSelection(emp.id)}
                />
                {emp.name} ({emp.employeeNum}) - {emp.position}
              </label>
            ))}
            {errors.selectedEmployees && <p className="error">{errors.selectedEmployees}</p>}
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-panel">
            <h3>Letter Preview & Edit</h3>
            {formData.employees.selectedEmployees.length === 0 && (
              <p>No employees selected.</p>
            )}
            {formData.employees.selectedEmployees.map((id) => {
              const emp = employees.find((e) => e.id === id);
              return (
                <div key={id} className="preview-box">
                  <label>{emp?.name}'s Letter:</label>
                  <textarea
                    value={formData.general.generatedContent[id] || ""}
                    onChange={(e) => handleContentEdit(id, e.target.value)}
                  />
                </div>
              );
            })}

            <label>Authorized Signatory</label>
            <select
              name="authorizedSignatory"
              value={formData.general.authorizedSignatory}
              onChange={(e) => handleChange("general", e)}
            >
              <option>Rakesh (CEO)</option>
              <option>Jabi (HR Manager)</option>
              <option>Rakesh (Director)</option>
            </select>
          </div>
        )}
      </div>

      <div className="button-group">
        <div className="left-buttons">
          <button
            onClick={handlePreviousAnimated}
            disabled={currentStep === 1 || animating}
            className={`btn ${currentStep === 1 ? "disabled" : "gray"}`}
          >
            ← Back
          </button>
        </div>
        <div className="right-buttons">
          <button onClick={handleCancel} className="btn red">
            Cancel
          </button>
          {currentStep < steps.length && (
            <button onClick={handleNextAnimated} className="btn blue">
              Next →
            </button>
          )}
          {currentStep === steps.length && (
            <button onClick={handleSubmit} className="btn green">
              Generate Letters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateLetter;
