import React, { useState } from 'react';
import './Policy.css';

export default function CreateForm() {
  const [formData, setFormData] = useState({
    formName: '',
    description: '',
    serialNo: '',
    category: '',
    isPrefilled: false,
    file: null,
  });

  const [categories, setCategories] = useState([]);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: '', code: '' });

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

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.code) {
      setCategories([...categories, newCategory]);
      setNewCategory({ name: '', code: '' });
    }
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
          <div className="category-select-container">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
            <button type="button" className="edit-btn" onClick={() => setShowCategoryModal(true)}>
              Edit Category
            </button>
          </div>
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

      {showCategoryModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Company Policy Category</h3>
            <input
              type="text"
              placeholder="Enter Category Name"
              value={newCategory.name}
              onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter Code"
              value={newCategory.code}
              onChange={(e) => setNewCategory({ ...newCategory, code: e.target.value })}
            />
            <button onClick={handleAddCategory}>+ Add Category</button>
            <ul>
              {categories.map((cat, i) => (
                <li key={i}>
                  {cat.name} ({cat.code}){' '}
                  <button onClick={() => setCategories(categories.filter((_, idx) => idx !== i))}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={() => setShowCategoryModal(false)}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
