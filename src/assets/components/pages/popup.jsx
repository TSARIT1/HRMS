import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './popup.css';
import { FcBusinessman, FcMoneyTransfer, FcCalendar } from 'react-icons/fc';
import { BsBookmarkPlus } from 'react-icons/bs';

const actions = [
  { title: 'Prepare Letter', category: 'Employee', icon: <FcBusinessman />, path: '/prepletter' },
  { title: 'Import Data From Excel', category: 'Employee', icon: <FcBusinessman />, path: '/excel' },
  { title: 'Regenerate Employee Password', category: 'Employee', icon: <FcBusinessman />, path: '/Repassword' },
  { title: 'Add Employee', category: 'Employee', icon: <FcBusinessman />, path: '/addemployee' },
  { title: 'Assign Manager', category: 'Employee', icon: <FcBusinessman />, path: '/assignmanager' },
  { title: 'Bank Details', category: 'Employee', icon: <FcBusinessman />, path: '/bankdetails' },
  { title: 'Add Nomination Details', category: 'Employee', icon: <FcBusinessman />, path: '/Nomine' },
  { title: 'Upload Forms / Policies', category: 'Employee', icon: <FcBusinessman />, path: '/policy' },
  { title: 'Update Employee Data', category: 'Employee', icon: <FcBusinessman />, path: '/update-emp' },
  { title: 'Deduct Loss Of Pay (LOP)', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/lop' },
  { title: 'Print / Email Payslips', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/spay' },
  { title: 'Settle Resigned Employee', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/proll' },
  { title: 'Revise Employee Salary', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/sstatement' },

  { title: 'Release IT Declaration Form', category: 'Payroll', icon: <FcMoneyTransfer />, path: '/Eit' },
  { title: 'Grant Leave', category: 'Leave', icon: <FcCalendar />, path: '/leave' },
  { title: 'Attendance Muster', category: 'Leave', icon: <FcCalendar />, path: '/amuster' },
  { title: 'Shift Roster', category: 'Leave', icon: <FcCalendar />, path: '/sroster' },
  { title: 'Attendance Period Finalization', category: 'Leave', icon: <FcCalendar />, path: '/aperiod' },
  { title: 'Approve Leave', category: 'Leave', icon: <FcCalendar />, path: '/l1' },
  { title: 'Update Company Details', category: 'Other', icon: <BsBookmarkPlus />, path: '/security' },
];

const categories = ['All', 'My Favourites', 'Employee', 'Payroll', 'Leave', 'Other'];

export default function ActionPopup({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = actions.filter((action) => {
    const matchesCategory =
      selectedCategory === 'All' ||
      (selectedCategory === 'My Favourites' && favorites.includes(action.path)) ||
      action.category === selectedCategory;

    const matchesSearch = action.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFavorite = (e, path) => {
    e.stopPropagation();
    e.preventDefault();
    setFavorites((prev) =>
      prev.includes(path) ? prev.filter((f) => f !== path) : [...prev, path]
    );
  };

  const handleClick = (path) => {
    navigate(path);
    handleClose();
  };

  const handleClose = () => {
    if (typeof onClose === 'function') {
      onClose();  // This will notify the parent to hide the popup
    }
  };

  return (
    <div
      className="popup-overlay"
      onClick={(e) => {
        if (e.target.classList.contains('popup-overlay')) {
          handleClose();
        }
      }}
    >
      <div className="popup-container" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={handleClose}>
          ×
        </button>

        <h2 className="popup-title">Quick Actions</h2>
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
            <div
              key={index}
              className="popup-tile"
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
