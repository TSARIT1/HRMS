import React, { useState } from 'react';
import './EMP MassCommunication.css';

const MassCommunication = () => {
  const [communications, setCommunications] = useState([]);
  const [showCompose, setShowCompose] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    type: '',
    date: new Date().toISOString().split('T')[0],
    content: '',
    attachment: null
  });

  const categories = ['General', 'Other'];
  const types = ['All Employee', 'All Current Employee', 'All Past Employee','Partially Vaccinated Employee'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, attachment: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCommunication = {
      ...formData,
      id: Date.now()
    };
    setCommunications([...communications, newCommunication]);
    setShowCompose(false);
    setFormData({
      category: '',
      subject: '',
      type: '',
      date: new Date().toISOString().split('T')[0],
      content: '',
      attachment: null
    });
  };

  return (
    <div className="mass-communication">
      <div className="header">
        <h1>Mass Communications</h1>
        <button 
          className="compose-button"
          onClick={() => setShowCompose(true)}
        >
          COMPOSE
        </button>
      </div>

      <div className="communication-table">
        <div className="table-header">
          <div className="header-cell">Category</div>
          <div className="header-cell">Subject</div>
          <div className="header-cell">Type</div>
          <div className="header-cell">Date</div>
        </div>

        {communications.length === 0 ? (
          <div className="empty-table">
            No communications found
          </div>
        ) : (
          communications.map(comm => (
            <div key={comm.id} className="table-row">
              <div className="table-cell">{comm.category}</div>
              <div className="table-cell">{comm.subject}</div>
              <div className="table-cell">{comm.type}</div>
              <div className="table-cell">{comm.date}</div>
            </div>
          ))
        )}
      </div>

      <div className="footer">
        Total Items: {communications.length}
      </div>

      {showCompose && (
        <div className="compose-modal">
          <div className="modal-content">
            <h2>New Communication</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Content</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Attachment</label>
                <div className="file-upload">
                  <label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.xls,.xlsx,.doc,.docx,.txt,.ppt,.pptx,.gif,.jpg,.png"
                    />
                    <span className="upload-button">Upload File</span>
                  </label>
                  {formData.attachment && (
                    <span className="file-name">{formData.attachment.name}</span>
                  )}
                  <p className="file-types">
                    Only PDF, XLS, XLSX, DOC, DOCX, TXT, PPT, PPTX, GIF, JPG, PNG files are accepted.
                  </p>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="send-button">Send</button>
                <button 
                  type="button" 
                  className="cancel-button"
                  onClick={() => setShowCompose(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MassCommunication;