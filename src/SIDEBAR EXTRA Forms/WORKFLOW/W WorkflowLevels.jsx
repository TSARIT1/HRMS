import React, { useState } from 'react';
import './W WorkflowLevels.css';
export default function WorkflowLevels() {
  const [workflowLevels, setWorkflowLevels] = useState([
    {
      id: 1,
      levelName: 'Regularization',
      workflowType: 'Regularization & Permission',
      reviewerLevel: 2,
      updatedOn: '2024-03-27',
      status: 'ACTIVE',
      description: '',
      permissionType: 'Regularization',
      employeeFilter: 'All Current Employees'
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);

  const [newLevel, setNewLevel] = useState({
    levelName: '',
    workflowType: '',
    reviewerLevel: '',
  });

  const handleAddWorkflowLevel = () => {
    const newEntry = {
      id: workflowLevels.length + 1,
      levelName: newLevel.levelName,
      workflowType: newLevel.workflowType,
      reviewerLevel: parseInt(newLevel.reviewerLevel),
      updatedOn: new Date().toISOString().split('T')[0],
      status: 'ACTIVE',
      description: '',
      permissionType: 'Regularization',
      employeeFilter: 'All Current Employees'
    };
    setWorkflowLevels([newEntry, ...workflowLevels]);
    setShowAddModal(false);
    setNewLevel({ levelName: '', workflowType: '', reviewerLevel: '' });
  };

  const openDetailsModal = (level) => {
    setSelectedLevel(level);
    setShowDetailsModal(true);
  };

  const toggleStatus = (id) => {
    setWorkflowLevels(prev =>
      prev.map(level =>
        level.id === id
          ? { ...level, status: level.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' }
          : level
      )
    );
  };

  return (
    <div className="workflow-page">
      <div className="page-header">
        <h2 className="page-title">Workflow Levels</h2>
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          Add Workflow Level ➔
        </button>
      </div>

      {workflowLevels.map(level => (
        <div className="workflow-card" key={level.id}>
          <div className="card-header">
            <div className="info-row">
              <div>
                <div className="label">Workflow Level Name</div>
                <div className="value">{level.levelName}</div>
              </div>
              <div>
                <div className="label">Workflow Type</div>
                <div className="value">{level.workflowType}</div>
              </div>
              <div>
                <div className="label">Reviewer Level</div>
                <div className="value">{level.reviewerLevel}</div>
              </div>
              <div>
                <div className="label">Date Updated</div>
                <div className="value">{level.updatedOn}</div>
              </div>
            </div>
            <span className={`status-badge ${level.status.toLowerCase()}`}>
              {level.status}
            </span>
          </div>

          <div className="divider"></div>

          <div className="actions">
            <button className="view-btn" onClick={() => openDetailsModal(level)}>
              View Details
            </button>
            <button className="disable-btn" onClick={() => toggleStatus(level.id)}>
              {level.status === 'ACTIVE' ? 'Inactive' : 'Enable'}
            </button>
          </div>
        </div>
      ))}

      {/* Add Workflow Modal */}
      {showAddModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Add Workflow Level</h3>

            <div className="form-group">
              <label>Workflow Level Name<span className="required">*</span></label>
              <input
                type="text"
                value={newLevel.levelName}
                onChange={(e) => setNewLevel({ ...newLevel, levelName: e.target.value })}
                placeholder="Enter Level Name"
              />
            </div>

            <div className="form-group">
              <label>Workflow Type<span className="required">*</span></label>
              <input
                type="text"
                value={newLevel.workflowType}
                onChange={(e) => setNewLevel({ ...newLevel, workflowType: e.target.value })}
                placeholder="Enter Workflow Type"
              />
            </div>

            <div className="form-group">
              <label>Reviewer Level<span className="required">*</span></label>
              <input
                type="number"
                value={newLevel.reviewerLevel}
                onChange={(e) => setNewLevel({ ...newLevel, reviewerLevel: e.target.value })}
                placeholder="Enter Reviewer Level"
              />
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowAddModal(false)} className="cancel-btn">Cancel</button>
              <button onClick={handleAddWorkflowLevel} className="save-btn">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {showDetailsModal && selectedLevel && (
        <div className="modal-backdrop">
          <div className="modal-box large">
            <h3>Workflow Level Details</h3>

            <div className="details-summary">
              <div><strong>Workflow Type:</strong> {selectedLevel.workflowType}</div>
              <div><strong>Policy Name:</strong> {selectedLevel.levelName}</div>
              <div><strong>Employee Filter:</strong> {selectedLevel.employeeFilter}</div>
              <div><strong>Permission Type:</strong> {selectedLevel.permissionType}</div>
              <div><strong>Policy Description:</strong> {selectedLevel.description || '-'}</div>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowDetailsModal(false)} className="cancel-btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
