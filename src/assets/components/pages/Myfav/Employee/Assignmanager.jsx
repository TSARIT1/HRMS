import React, { useState } from 'react';
import Select from 'react-select';
import './Assignmanager.css';

const employeeList = [
  { value: '1001', label: '1001 - John Doe' },
  { value: '1002', label: '1002 - Jane Smith' },
  { value: '1003', label: '1003 - Raj Kumar' },
  { value: '1004', label: '1004 - Priya Mehta' },
];

export default function AssignManager() {
  const [reportee, setReportee] = useState(null);
  const [manager, setManager] = useState(null);
  const [isOpen, setIsOpen] = useState(true);  

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reportee || !manager) {
      alert('Please select both Reportee and Manager.');
      return;
    }

     console.log('Assigned:', {
      reportee: reportee.value,
      manager: manager.value,
    });

    alert(`Assigned!\nReportee: ${reportee.label}\nManager: ${manager.label}`);

     setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;  

  return (
    <div className="assign-manager-backdrop">
      <div className="assign-manager-modal">
        <div className="modal-header">
          <h3>Assign Manager</h3>
          <button className="close-btn" onClick={handleCancel}>×</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            Select Reportee
            <Select
              options={employeeList}
              value={reportee}
              onChange={setReportee}
              placeholder="Search by Emp No / Name"
            />
          </label>

          <label>
            Select Manager
            <Select
              options={employeeList}
              value={manager}
              onChange={setManager}
              placeholder="Search by Emp No / Name"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
