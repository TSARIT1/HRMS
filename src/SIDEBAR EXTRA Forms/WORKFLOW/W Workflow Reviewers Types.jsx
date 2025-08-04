import React, { useState } from 'react';
import './W Workflow Reviewers Types.css';

export default function WorkflowReviewerTypes() {
  const [reviewers, setReviewers] = useState([
    {
      id: 1,
      title: 'Reimbursement Reviewer',
      assignmentType: 'Named User',
      createdOn: '17 Feb 2017 • 10:25 pm',
      status: 'ACTIVE',
      email: 'info@tsaritservices.com',
    },
    {
      id: 2,
      title: 'IT Admin',
      assignmentType: 'Named User',
      createdOn: '05 Mar 2019 • 2:45 pm',
      status: 'ACTIVE',
      email: 'itadmin@company.com',
    },
    {
      id: 3,
      title: 'HR Admin',
      assignmentType: 'Named User',
      createdOn: '01 Jan 2021 • 9:00 am',
      status: 'ACTIVE',
      email: 'hradmin@company.com',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [showDetails, setShowDetails] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('');

  const assignmentOptions = [
    'Category Based Employee Group',
    'All Employees',
    'Manager',
    "Manager's Manager",
    'Named User',
  ];

  const handleAddReviewer = () => {
    if (newTitle.trim() && newType.trim()) {
      const newReviewer = {
        id: reviewers.length + 1,
        title: newTitle,
        assignmentType: newType,
        createdOn: new Date().toLocaleDateString() + ' • ' + new Date().toLocaleTimeString(),
        status: 'ACTIVE',
        email: 'user' + (reviewers.length + 1) + '@company.com', // Default email
      };
      setReviewers([newReviewer, ...reviewers]);
      setShowModal(false);
      setNewTitle('');
      setNewType('');
    }
  };

  const toggleStatus = (id) => {
    setReviewers((prev) =>
      prev.map((reviewer) =>
        reviewer.id === id
          ? { ...reviewer, status: reviewer.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : reviewer
      )
    );
  };

  return (
    <div className="reviewers-page">
      <h2>Workflow Reviewers Types</h2>
      <button className="add-button" onClick={() => setShowModal(true)}>
        Add Reviewer Type
      </button>

      {reviewers.map((reviewer) => (
        <div className="reviewer-card full-card" key={reviewer.id}>
          <div className="card-header">
            <div>
              <p className="title">{reviewer.title}</p>
              <p className="type">{reviewer.assignmentType}</p>
            </div>
            <span className={reviewer.status === 'ACTIVE' ? 'status-badge active' : 'status-badge inactive'}>
              {reviewer.status}
            </span>
          </div>

          <div className="card-footer">
            <div>
              <p className="created-on-label">Created On</p>
              <p className="created-on-value">{reviewer.createdOn}</p>
            </div>
            <div className="actions">
              <button className="details-btn" onClick={() => setShowDetails(reviewer)}>
                View Details
              </button>
              <button className="deactivate-btn" onClick={() => toggleStatus(reviewer.id)}>
                {reviewer.status === 'ACTIVE' ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Add Reviewer Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Add Reviewer Type</h3>

            <div className="form-group">
              <label>Title<span className="required">*</span></label>
              <input
                type="text"
                placeholder="Enter Title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Assignment Type<span className="required">*</span></label>
              <select value={newType} onChange={(e) => setNewType(e.target.value)}>
                <option value="">Select</option>
                {assignmentOptions.map((opt, index) => (
                  <option key={index} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleAddReviewer} className="save-btn">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetails && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Reviewer Details</h3>

            <div className="form-group">
              <label>Title</label>
              <input type="text" value={showDetails.title} readOnly />
            </div>

            <div className="form-group">
              <label>Assignment Type</label>
              <input type="text" value={showDetails.assignmentType} readOnly />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="text" value={showDetails.email} readOnly />
            </div>

            <div className="form-group">
              <label>Created On</label>
              <input type="text" value={showDetails.createdOn} readOnly />
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowDetails(null)} className="cancel-btn">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
