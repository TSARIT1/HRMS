import React, { useState } from 'react';
import './Policy.css'; // optional custom styles

export default function CreateForm() {
  const [formData, setFormData] = useState({
    formName: '',
    description: '',
    serialNo: '',
    category: '',
    isPrefilled: false,
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
    alert('Form submitted successfully!');
  };

  return (
    <div className="create-form-container">
      <h2>Create Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Form Name *
          <input
            type="text"
            name="formName"
            value={formData.formName}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description *
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Serial No *
          <input
            type="text"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Form Category *
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="IT">IT</option>
          </select>
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="isPrefilled"
            checked={formData.isPrefilled}
            onChange={handleChange}
          />
          Create Prefilled Form Template
        </label>

        <label>
          Upload Form Template *
          <input
            type="file"
            name="file"
            accept=".doc,.docx,.odt,.pdf,.xls,.xlsx,.txt,.ppt,.pptx"
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-buttons">
          <button type="button" onClick={() => window.location.reload()}>
            Cancel
          </button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
