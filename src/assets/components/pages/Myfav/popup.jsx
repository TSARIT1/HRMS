import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './popup.css';
import { FcPlanner } from "react-icons/fc";
import { FcBusinessman } from "react-icons/fc";
import { FcPrivacy } from "react-icons/fc";
import { SlUmbrella } from "react-icons/sl";
const actions = [

  { title: 'Add Holidays', category: 'Leave', icon:<FcPlanner />, path: '/add-holidays' },
  { title: 'Prepare Letter', category: 'Employee', icon: <FcBusinessman />, path: '/preletter' },
  { title: 'Import Data From Excel', category: 'Employee', icon: '📄', path: '/import-excel' },
  { title: 'Regenerate Employee Password', category: 'Employee', icon: <FcPrivacy />, path: '/regenerate-password' },
  { title: 'Employee Separation', category: 'Employee', icon: '👤', path: '/employee-separation' },
  { title: 'Confirm Employee', category: 'Employee', icon: '✅', path: '/confirm-employee' },
  { title: 'Extend Probation Period', category: 'Employee', icon: '⏳', path: '/extend-probation' },
  { title: 'Change Employee Number', category: 'Employee', icon: '🔢', path: '/change-employee-number' },
   { title: 'Post Leave Transaction ', category: 'Leave', icon: '💰', path: '/exclude-payroll' },
    { title: 'Leave Grant', category: 'Leave', icon: '💰', path: '/exclude-payroll' },
     { title: 'Year End Process', category: 'Leave', icon: '💰', path: '/exclude-payroll' },
      { title: 'Download Leave Card', category: 'Leave', icon: '💰', path: '/exclude-payroll' },
       { title: 'Apply On Behalf', category: 'Leave', icon: '💰', path: '/exclude-payroll' },
          { title: 'Verify employee swipes', category: 'Leave', icon: '💰', path: '/exclude-payroll' },
  { title: 'Attendance Muster', category: 'Leave', icon: '💰', path: '/exclude-payroll' },
   { title: 'Manual Override', category: 'Payroll', icon: '💰', path: '/exclude-payroll' },
      { title: 'Stop Salary Processing', category: 'Payroll', icon: '💰', path: '/exclude-payroll' },
   { title: 'Deduct Loss Of Pay', category: 'Payroll', icon: '💰', path: '/exclude-payroll' },
   { title: 'Print / Email Payslips', category: 'Payroll', icon: '💰', path: '/exclude-payroll' },
   { title: 'Settle Resigned Employee', category: 'Payroll', icon: '💰', path: '/exclude-payroll' },
   { title: 'Revise Employee Salary', category: 'Payroll', icon: '💰', path: '/exclude-payroll' },
   { title: 'Process Payroll', category: 'Payroll', icon: '💰', path: '/exclude-payroll' },
   { title: 'Release IT Declaration', category: 'Payroll', icon: <SlUmbrella />, path: '/exclude-payroll' },

  { title: 'Shift Roster', category: 'Employee', icon: '❌', path: '/delete-employee' },
];

const categories = ['All', 'My Favourites', 'Employee', 'Payroll', 'Leave', 'Other'];

export default function ActionPopup() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const filtered = actions.filter((action) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'My Favourites' && favorites.includes(action.path)) ||
      action.category === selectedCategory;

    const matchesSearch = action.title.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (e, path) => {
    e.preventDefault(); 
    setFavorites((prev) =>
      prev.includes(path) ? prev.filter((f) => f !== path) : [...prev, path]
    );
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
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
              onClick={() => setSelectedCategory(cat)}
              className={`popup-category ${selectedCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="popup-grid">
          {filtered.map((action, index) => (
            <Link key={index} to={action.path} className="popup-tile">
              <div className="popup-icon">{action.icon}</div>
              <div className="popup-label">{action.title}</div>
              <div
                className={`popup-star ${favorites.includes(action.path) ? 'filled' : ''}`}
                onClick={(e) => toggleFavorite(e, action.path)}
              >
                {favorites.includes(action.path) ? '★' : '☆'}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
