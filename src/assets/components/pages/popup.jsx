import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './popup.css';
import { FcBusinessman, FcMoneyTransfer, FcCalendar } from "react-icons/fc";
import { BsBookmarkPlus } from "react-icons/bs";

const actions = [
  { title: 'Prepare Letter', category: 'Employee', icon: <FcBusinessman />, path: '/prepletter' },
  { title: 'Import Data From Excel', category: 'Employee', icon: <FcBusinessman />, path: '/excel' },
  { title: 'Regenerate Employee Password', category: 'Employee', icon: <FcBusinessman />, path: '/Repassword' },
  { title: 'Delete Employee', category: 'Employee', icon: <FcBusinessman />, path: '/deleteemp' },
  { title: 'Update Employee Data', category: 'Employee', icon: <FcBusinessman />, path: '/update-emp' },
  { title: 'Update Bank Details', category: 'Employee', icon: <FcBusinessman />, path: '/bankdetails' },
  { title: 'Add Nomination Details', category: 'Employee', icon: <FcBusinessman />, path: '/Nomine' },
  { title: 'Add Employee', category: 'Employee', icon: <FcBusinessman />, path: '/addemployee' },
  { title: 'Upload Forms / Policies', category: 'Employee', icon: <FcBusinessman />, path: '/policy' },
  { title: 'Assign Manager', category: 'Employee', icon: <FcBusinessman />, path: '/assignmanager' },

  { title: 'Deduct Loss Of Pay(LOP)', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },
  { title: 'Print / Email Payslips', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },
  { title: 'Settle Resigned Employee', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },
  { title: 'Revise Employee Salary', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },
  { title: 'Release IT Declaration Form', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },
  { title: 'Download IT Declaration For TDS', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },
  { title: 'Generate Payroll Data', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },
  { title: 'Release Payslip To Employees', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/exclude-payroll' },

  { title: 'Add Holiday', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'Grant Leave', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'Attendance Muster', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'Shift Roster', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'Attendance Period Finalization', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'Who Is In ?', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'View Employee Attandance', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'Approve Leave', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },
  { title: 'Approve Leave Cancellation', category: 'Leave', icon: <FcCalendar />, path: '/exclude-payroll' },

  { title: 'Employee Position', category: 'Other', icon: <BsBookmarkPlus />, path: '/exclude-payroll' },
  { title: 'Update Company Details', category: 'Other', icon: <BsBookmarkPlus />, path: '/exclude-payroll' },
];

const categories = ['All', 'My Favourites', 'Employee', 'Payroll', 'Other'];

export default function ActionPopup() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Filter actions based on selected category and search term
  const filtered = actions.filter((action) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'My Favourites' && favorites.includes(action.path)) ||
      action.category === selectedCategory;

    const matchesSearch = action.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Toggle favorite status for an action
  const toggleFavorite = (e, path) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((prev) =>
      prev.includes(path) ? prev.filter((f) => f !== path) : [...prev, path]
    );
  };

  // Navigate to the selected form
 const handleClick = (path) => {
  navigate(path);  // Correct usage
};


  // Update selected category based on button click
  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container fade-in">
        <button className="popup-close" onClick={() => navigate(-1)}>×</button>
        <h2 className="popup-title">Search</h2>
        <input
          type="text"
          placeholder="Search here"
          className="popup-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="popup-categories">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`popup-category ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="popup-grid">
          {filtered.map((action, index) => (
            <div
              key={index}
              className="popup-tile pop"
              onClick={() => handleClick(action.path)}
            >
              <div className="popup-icon">{action.icon}</div>
              <div className="popup-label">{action.title}</div>
              <div
                className={`popup-star ${favorites.includes(action.path) ? 'filled' : ''}`}
                onClick={(e) => toggleFavorite(e, action.path)}
              >
                {favorites.includes(action.path) ? '★' : '☆'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
