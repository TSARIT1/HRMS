import React, { useState } from 'react';
import './LeaveManagement.css';

export default function LeaveManagement() {
  const [rows, setRows] = useState([]);
  const [showMasterModal, setShowMasterModal] = useState(false);
  const [masterList] = useState([
    { occasion: 'New Year', date: '2025-01-01', day: 'Wednesday', state: 'All', restricted: true },
    { occasion: 'Republic Day', date: '2025-01-26', day: 'Sunday', state: 'All', restricted: false },
    { occasion: 'Independence Day', date: '2025-08-15', day: 'Friday', state: 'All', restricted: false },
  ]);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSave = () => {
    alert('Saved Successfully!');
  };

  const handleDelete = () => {
    setRows([]);
  };

  const toggleMasterModal = () => {
    setShowMasterModal(!showMasterModal);
  };

  const handleSelect = (index) => {
    const updated = [...selectedRows];
    if (updated.includes(index)) {
      updated.splice(updated.indexOf(index), 1);
    } else {
      updated.push(index);
    }
    setSelectedRows(updated);
  };

  const handleAddFromMaster = () => {
    const selectedHolidays = selectedRows.map(i => masterList[i]);

    const existingKeys = new Set(rows.map(r => r.occasion + r.date));
    const newHolidays = selectedHolidays.filter(
      r => !existingKeys.has(r.occasion + r.date)
    );

    setRows(prev => [...prev, ...newHolidays]);
    setSelectedRows([]);
    toggleMasterModal();
  };

  return (
    <div className="leave-container">
      <h3>Leave</h3>

      <a href="#" className="master-link" onClick={toggleMasterModal}>
        Add From Master List{selectedRows.length > 0 ? ` (${selectedRows.length} selected)` : ''}
      </a>

      <table className="leave-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Occasion</th>
            <th>Date</th>
            <th>Day</th>
            <th>Restricted Holiday <span title="Restricted holidays do not count as mandatory holidays">ⓘ</span></th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                <div className="empty-message">
                  <p>No holidays added yet.</p>
                  <button className="btn add-holiday" onClick={toggleMasterModal}>
                    Add Holidays{selectedRows.length > 0 ? ` (${selectedRows.length} selected)` : ''}
                  </button>
                </div>
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{row.occasion}</td>
                <td>{row.date}</td>
                <td>{row.day}</td>
                <td>{row.restricted ? 'Yes' : 'No'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <p className="note">Note: Edit or Copy/paste data from spreadsheet. Drag the mouse on the column header and click the "🔽" to filter data.</p>

      <div className="action-buttons">
        <button className="btn save" onClick={handleSave}>Save</button>
        <button className="btn delete" onClick={handleDelete}>Delete</button>
      </div>

      {showMasterModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>Holiday Master List for 2025</h4>
            <p>{selectedRows.length} Holidays Selected</p>
            <table className="leave-table">
              <thead>
                <tr>
                  <th></th>
                  <th>Occasion</th>
                  <th>Date</th>
                  <th>Day</th>
                  <th>State</th>
                </tr>
              </thead>
              <tbody>
                {masterList.length === 0 ? (
                  <tr><td colSpan="5" className="no-data">No Rows To Show</td></tr>
                ) : (
                  masterList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={() => handleSelect(index)}
                        />
                      </td>
                      <td>{item.occasion}</td>
                      <td>{item.date}</td>
                      <td>{item.day}</td>
                      <td>{item.state}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <p className="note">Note: Drag the mouse on the column header and click the "🔽" to filter data.</p>
            <div className="action-buttons">
              <button className="btn save" onClick={handleAddFromMaster}>Add</button>
              <button className="btn delete" onClick={toggleMasterModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
