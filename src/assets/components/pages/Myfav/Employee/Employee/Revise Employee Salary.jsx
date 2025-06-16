// src/components/SalaryRevisionPage.js
import React, { useState, useEffect } from 'react';
import './Revise Employee Salary.css'; // Component-specific styles

const SalaryRevisionPage = () => {
  // Mock data - In a real app, you'd fetch this from an API
  const initialEmployeeData = {
    name: 'Praveen Kumar',
    employeeId: 'EMP001',
    joinDate: '12-Aug-2021',
    experience: '3.8 Years',
    designation: 'Junior Associate',
    department: 'Product Department',
    lastUpdated: '09 Mar 2022 by agith namjith',
  };

  const initialSalaryItems = [
    { id: 1, itemName: 'MONTHLY BASIC', previousSalary: 0.00, revisedSalary: 60000.00, revision: 100 },
    { id: 2, itemName: 'MONTHLY DA', previousSalary: 0.00, revisedSalary: 0.00, revision: 0 },
    { id: 3, itemName: 'MONTHLY HRA', previousSalary: 0.00, revisedSalary: 6000.00, revision: 100 },
    { id: 4, itemName: 'MONTHLY CONVEYANCE', previousSalary: 0.00, revisedSalary: 1800.00, revision: 100 },
    { id: 5, itemName: 'MONTHLY SPECIAL ALLOWANCE', previousSalary: 0.00, revisedSalary: 150.00, revision: 100 },
    { id: 6, itemName: 'MONTHLY MEDICAL ALLOWANCE', previousSalary: 0.00, revisedSalary: 1250.00, revision: 100 },
    { id: 7, itemName: 'MONTHLY CONSULTANCY FEES', previousSalary: 0.00, revisedSalary: 0.00, revision: 0 },
    { id: 8, itemName: 'ANNUAL CTC', previousSalary: 0.00, revisedSalary: 180000.00, revision: 100 },
  ];

  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [salaryItems, setSalaryItems] = useState(initialSalaryItems);
  const [effectiveFrom, setEffectiveFrom] = useState('12-Aug-2021');
  const [paidMonth, setPaidMonth] = useState('Apr 2023');
  const [employeeRemarks, setEmployeeRemarks] = useState('');
  const [notes, setNotes] = useState('');

 
  
};

export default SalaryRevisionPage;