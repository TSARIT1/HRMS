import React, { useState } from "react";
import "./Employee Position.css";






const categoryList = [
  'Designation',
  'Location',
  'Department',
  'Division',
  'Cost Center',
  'Grade',
];

const initialData = {
  Designation: ['CEO', 'CTO', 'Content Writer', 'Junior Associate', 'Sr Admin', 'Sr Executive', 'UX Developer'],
  Location: ['Ahmedabad', 'Bangalore', 'Bhubaneshwar', 'Calicut', 'Chennai', 'Cochin', 'Cuttack', 'Delhi'],
  Department: [],
  Division: [],
  'Cost Center': [],
  Grade: [],
};

export default function EmployeeCategories() {
  const [selectedCategory, setSelectedCategory] = useState('Designation');
  const [categoryData, setCategoryData] = useState(initialData);
  const [inputValue, setInputValue] = useState('');
  const [sortOrder, setSortOrder] = useState(0);
  const [enabled, setEnabled] = useState(false);
  const [mandatory, setMandatory] = useState(false);

  const handleSave = () => {
    if (!inputValue.trim()) return;
    const updatedList = [...(categoryData[selectedCategory] || []), inputValue.trim()];
    setCategoryData({ ...categoryData, [selectedCategory]: updatedList });
    setInputValue('');
    setSortOrder(0);
    setEnabled(false);
    setMandatory(false);
  };

  const handleDelete = (item) => {
    const updatedList = categoryData[selectedCategory].filter(i => i !== item);
    setCategoryData({ ...categoryData, [selectedCategory]: updatedList });
  };

  const isAdvanced = ['Division', 'Cost Center'].includes(selectedCategory);

  return (
    <div style={{ display: 'flex', padding: '1rem', fontFamily: 'sans-serif' }}>
      {/* Left Panel */}
      <div style={{ width: '220px', borderRight: '1px solid #ccc', paddingRight: '1rem' }}>
        {categoryList.map((cat) => (
          <div
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '0.5rem',
              backgroundColor: selectedCategory === cat ? '#e0e0ff' : 'transparent',
              fontWeight: selectedCategory === cat ? 'bold' : 'normal',
              cursor: 'pointer',
              borderRadius: '4px',
              marginBottom: '0.5rem',
            }}
          >
            {cat}
          </div>
        ))}
        <button style={{ marginTop: '1rem', padding: '0.5rem', width: '100%', background: '#3344dd', color: 'white', border: 'none' }}>
          + Add New Category
        </button>
      </div>

      {/* Right Panel */}
      <div style={{ flex: 1, paddingLeft: '2rem' }}>
        <h3>{selectedCategory} List</h3>

        {/* Input Fields */}
        <div style={{ marginBottom: '1rem' }}>
          <input
            placeholder={`Enter ${selectedCategory}`}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ padding: '0.5rem', width: '50%', marginBottom: '0.5rem' }}
          />

          {isAdvanced && (
            <>
              <div style={{ marginTop: '0.5rem' }}>
                <label>Sort Order: </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  style={{ width: '80px', marginLeft: '0.5rem' }}
                />
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                <label>
                  <input type="checkbox" checked={enabled} onChange={() => setEnabled(!enabled)} /> Enabled
                </label>
                <label style={{ marginLeft: '1rem' }}>
                  <input type="checkbox" checked={mandatory} onChange={() => setMandatory(!mandatory)} /> Mandatory
                </label>
              </div>
            </>
          )}

          <div style={{ marginTop: '0.5rem' }}>
            <button onClick={handleSave} style={{ padding: '0.4rem 1rem', marginRight: '0.5rem' }}>Save</button>
            <button onClick={() => setInputValue('')} style={{ padding: '0.4rem 1rem' }}>Cancel</button>
          </div>
        </div>

        {/* Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f0f0f0' }}>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Code</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Active</th>
              <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {categoryData[selectedCategory]?.map((item, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{item}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{item.slice(0, 3).toUpperCase() + index}</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Yes</td>
                <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  <button onClick={() => handleDelete(item)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#5555ff', color: 'white', border: 'none' }}>
          Export to Excel
        </button>
      </div>
    </div>
  );
}
