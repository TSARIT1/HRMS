import React, { useState } from 'react';
import { FaDownload, FaEye, FaSearch, FaChevronDown, FaFilePdf } from 'react-icons/fa';
import './EMP DOCUMENTS.css';

const EmployeeDetails = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [employeeType, setEmployeeType] = useState('Current Employees');
  const [activeTab, setActiveTab] = useState(null);

  // Employee database
  const employees = [
    {
      id: '6266',
      name: 'Addesh Hiralal Sonar',
      department: 'Engineering',
      position: 'Senior Software Engineer',
      joinDate: '15 Jan 2021',
      documents: [
        {
          id: 'doc-1',
          name: 'Confirmation Letter.pdf',
          type: 'Confirmation Letter',
          date: '09 Mar 2022 01:51:13 PM',
          size: '245 KB'
        },
        {
          id: 'doc-2',
          name: 'Payslip March 2022.pdf',
          type: 'Payslip',
          date: '31 Mar 2022 11:45:22 AM',
          size: '189 KB'
        }
      ],
      letters: [
        {
          id: 'letter-1',
          name: 'Appointment Letter.pdf',
          type: 'Appointment Letter',
          date: '15 Jan 2021 10:30:45 AM',
          size: '320 KB'
        },
        {
          id: 'letter-2',
          name: 'Promotion Letter.pdf',
          type: 'Promotion Letter',
          date: '01 Jun 2023 03:15:22 PM',
          size: '280 KB'
        }
      ]
    },
    {
      id: '4278',
      name: 'Priya Sharma',
      department: 'Human Resources',
      position: 'HR Manager',
      joinDate: '22 May 2019',
      documents: [
        {
          id: 'doc-3',
          name: 'Salary Revision.pdf',
          type: 'Payslip',
          date: '15 Apr 2023 02:30:00 PM',
          size: '210 KB'
        }
      ],
      letters: [
        {
          id: 'letter-3',
          name: 'Appointment Letter.pdf',
          type: 'Appointment Letter',
          date: '22 May 2019 09:15:00 AM',
          size: '310 KB'
        }
      ]
    },
    {
      id: '8931',
      name: 'Rahul Verma',
      department: 'Marketing',
      position: 'Marketing Head',
      joinDate: '10 Aug 2020',
      documents: [
        {
          id: 'doc-4',
          name: 'Q1 Performance Bonus.pdf',
          type: 'Payslip',
          date: '05 Jul 2023 03:45:00 PM',
          size: '195 KB'
        }
      ],
      letters: [
        {
          id: 'letter-4',
          name: 'Appointment Letter.pdf',
          type: 'Appointment Letter',
          date: '10 Aug 2020 11:00:00 AM',
          size: '305 KB'
        },
        {
          id: 'letter-5',
          name: 'Increment Letter.pdf',
          type: 'Promotion Letter',
          date: '01 Jan 2023 10:15:00 AM',
          size: '275 KB'
        }
      ]
    }
  ];

  // Filter employees based on search term
  const filteredEmployees = employees.filter(employee => 
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.id.includes(searchTerm)
  );

  const handleDownload = (docName) => {
    alert(`Download initiated for: ${docName}`);
  };

  const handleView = (docName) => {
    alert(`Opening document viewer for: ${docName}`);
  };

  const toggleTab = (tab) => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="employee-portal">
      <div className="search-panel">
        <p className="search-hint">Search by employee name or ID</p>
        
        <div className="employee-filter">
          <label className="radio-label">
            <input 
              type="radio" 
              value="Current Employees" 
              checked={employeeType === 'Current Employees'} 
              onChange={() => setEmployeeType('Current Employees')} 
              className="radio-input"
            />
            <span className="radio-custom"></span>
            Current Employees
          </label>
        </div>
        
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search Employee"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {searchTerm && filteredEmployees.length > 0 ? (
        filteredEmployees.map(employee => (
          <div key={employee.id} className="employee-profile">
            <div className="profile-header">
              <h2 className="employee-name">{employee.name}</h2>
              <div className="employee-meta">
                <span className="employee-id">ID: #{employee.id}</span>
                <span className="employee-dept">{employee.department}</span>
                <span className="employee-position">{employee.position}</span>
                <span className="employee-join">Joined: {employee.joinDate}</span>
              </div>
            </div>
            
            <div className="document-controls">
              <button 
                className={`control-btn ${activeTab === 'letters' ? 'active' : ''}`}
                onClick={() => toggleTab('letters')}
              >
                <span>Letters</span>
                <FaChevronDown className={`control-chevron ${activeTab === 'letters' ? 'open' : ''}`} />
              </button>
              <button 
                className={`control-btn ${activeTab === 'payslip' ? 'active' : ''}`}
                onClick={() => toggleTab('payslip')}
              >
                <span>Payslip</span>
                <FaChevronDown className={`control-chevron ${activeTab === 'payslip' ? 'open' : ''}`} />
              </button>
            </div>
            
            {activeTab === 'letters' && (
              <div className="documents-section">
                <h3 className="section-title">Letters</h3>
                <div className="documents-grid">
                  {employee.letters.map((doc) => (
                    <DocumentCard 
                      key={doc.id}
                      doc={doc}
                      onView={handleView}
                      onDownload={handleDownload}
                    />
                  ))}
                </div>
              </div>
            )}
            
            {activeTab === 'payslip' && (
              <div className="documents-section">
                <h3 className="section-title">Payslips</h3>
                <div className="documents-grid">
                  {employee.documents
                    .filter(doc => doc.type === 'Payslip')
                    .map((doc) => (
                      <DocumentCard 
                        key={doc.id}
                        doc={doc}
                        onView={handleView}
                        onDownload={handleDownload}
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        ))
      ) : searchTerm ? (
        <div className="no-results">
          No employees found matching your search
        </div>
      ) : null}
    </div>
  );
};

const DocumentCard = ({ doc, onView, onDownload }) => (
  <div className="document-card">
    <div className="document-content">
      <FaFilePdf className="document-icon" />
      <div className="document-details">
        <h4 className="document-title">{doc.name}</h4>
        <div className="document-meta">
          <span className="meta-type">{doc.type}</span>
          <span className="meta-date">{doc.date}</span>
          <span className="meta-size">{doc.size}</span>
        </div>
      </div>
    </div>
    <div className="document-actions">
      <button 
        className="action-btn view-btn"
        onClick={() => onView(doc.name)}
        title="View document"
      >
        <FaEye />
      </button>
      <button 
        className="action-btn download-btn"
        onClick={() => onDownload(doc.name)}
        title="Download document"
      >
        <FaDownload />
      </button>
    </div>
  </div>
);

export default EmployeeDetails;