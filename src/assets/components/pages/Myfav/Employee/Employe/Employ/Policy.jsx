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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, key === 'file' ? value : String(value));
    });

    try {
      const res = await fetch('/api/forms/create', {
        method: 'POST',
        body: payload,
      });

      if (res.ok) {
        alert('Form submitted successfully!');
        setFormData({
          formName: '',
          description: '',
          serialNo: '',
          category: '',
          isPrefilled: false,
          file: null,
        });
      } else {
        alert('Failed to submit form.');
      }
    } catch (error) {
      alert('Submission error.');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.name && newCategory.code) {
      setCategories([...categories, newCategory]);
      setNewCategory({ name: '', code: '' });
    }
  };

  const handleRemoveCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
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
            {categories.map((cat, idx) => (
              <option key={idx} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label className="checkbox-group">
          <input
            type="checkbox"
            name="isPrefilled"
            checked={formData.isPrefilled}
            onChange={handleChange}
          />
          <span>Create Prefilled Form Template</span>
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
          <button
            type="button"
            className="manage-category-btn"
            onClick={() => setShowCategoryModal(true)}
          >
            Manage Categories
          </button>

          <button type="button" onClick={() => window.location.reload()}>
            Cancel
          </button>

          <button type="submit">Submit</button>
        </div>
      </form>

      {showCategoryModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Manage Categories</h3>
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Category Code"
              value={newCategory.code}
              onChange={(e) =>
                setNewCategory({ ...newCategory, code: e.target.value })
              }
            />
            <button onClick={handleAddCategory}>+ Add Category</button>

            <ul>
              {categories.map((cat, i) => (
                <li key={i}>
                  {cat.name} ({cat.code}){' '}
                  <button onClick={() => handleRemoveCategory(i)}>Remove</button>
                </li>
              ))}
            </ul>

            <button onClick={() => setShowCategoryModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
