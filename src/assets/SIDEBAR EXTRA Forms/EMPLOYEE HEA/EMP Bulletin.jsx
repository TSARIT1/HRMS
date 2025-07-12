import React, { useState } from 'react';
import './EMP Bulletin.css';

const Bulletin = () => {
  const [formData, setFormData] = useState({
    category: '',
    rank: '',
    startDate: '',
    endDate: '',
    title: '',
    content: '',
    file: null,
    employeeFilter: 'All Employees'
  });

  const categories = ['General', 'HR', 'Finance', 'IT', 'Other'];
  const employeeFilters = ['All Employees', 'Department A', 'Department B', 'Management'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="bulletin-container">
      <h1 className="form-title">Create New Bulletin</h1>
      
      <form onSubmit={handleSubmit} className="bulletin-form">
        <div className="form-columns">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-group">
              <label>Category *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Rank *</label>
              <input
                type="number"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Employee Filter *</label>
              <select
                name="employeeFilter"
                value={formData.employeeFilter}
                onChange={handleChange}
                required
              >
                {employeeFilters.map(filter => (
                  <option key={filter} value={filter}>{filter}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Attachments</label>
              <div className="file-upload-wrapper">
                <label className="file-upload-label">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.ppt,.pptx,.gif,.jpg,.png"
                  />
                  <span className="file-upload-button">Choose File</span>
                  <span className="file-name">
                    {formData.file ? formData.file.name : 'No file chosen'}
                  </span>
                </label>
                <p className="file-types">
                  Accepted: PDF, XLS, XLSX, DOC, DOCX, TXT, PPT, PPTX, GIF, JPG, PNG
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">Save Bulletin</button>
          <button type="button" className="close-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default Bulletin;