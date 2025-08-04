import React, { useState } from "react";
import { FaUserCircle, FaPen } from "react-icons/fa";
import './Position History.css';

const PositionHistory = () => {
  const [searchValue, setSearchValue] = useState("");
  const [cards, setCards] = useState([
    { label: "Designation", value: "Junior Associate" },
    { label: "Location", value: "Bangalore" },
    { label: "Department", value: "Product Department" }
  ]);

  const [editIndex, setEditIndex] = useState(null);
  const [newValue, setNewValue] = useState("");
  const [addMode, setAddMode] = useState(false);
  const [newCard, setNewCard] = useState({ label: "", value: "" });

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewValue(cards[index].value);
  };

  const handleSaveEdit = (index) => {
    const updatedCards = [...cards];
    updatedCards[index].value = newValue;
    setCards(updatedCards);
    setEditIndex(null);
  };

  const handleAddCard = () => {
    if (newCard.label && newCard.value) {
      setCards([...cards, { label: newCard.label, value: newCard.value }]);
      setNewCard({ label: "", value: "" });
      setAddMode(false);
    }
  };

  return (
    <div className="position-history-container">
      {/* Header */}
      <div className="position-header">
        <div className="position-header-text">
          <h2>Start searching to see specific employee details here</h2>

          <div className="employee-type">
            <span>Employee Type:</span>
            <select>
              <option>Current Employees</option>
              <option>Former Employees</option>
            </select>
          </div>

          <div>
            <label className="search-label">Search Employee</label>
            <div className="search-box">
              <FaUserCircle className="search-icon" />
              <input
                type="text"
                placeholder="Search by Emp No / Name"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              {searchValue && (
                <button className="clear-btn" onClick={handleClearSearch}>
                  &times;
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="cards-grid">
        {cards
          .filter((item) =>
            item.label.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.value.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => (
            <div key={index} className="card">
              <div className="card-header">
                <h4>{item.label}</h4>
                <button className="add-btn" onClick={() => setAddMode(true)}>
                  + Add
                </button>
              </div>

              {editIndex === index ? (
                <>
                  <input
                    type="text"
                    value={newValue}
                    onChange={(e) => setNewValue(e.target.value)}
                    className="card-edit-input"
                  />
                  <button className="save-btn" onClick={() => handleSaveEdit(index)}>
                    Save
                  </button>
                </>
              ) : (
                <>
                  <p className="card-value">{item.value}</p>
                  <button className="edit-btn" onClick={() => handleEdit(index)}>
                    <FaPen size={12} />
                  </button>
                </>
              )}

              <div className="card-date">08 Oct 2020</div>
            </div>
          ))}

        {/* Add Card Mode */}
        {addMode && (
          <div className="card add-card-form">
            <input
              type="text"
              placeholder="Enter Label"
              value={newCard.label}
              onChange={(e) => setNewCard({ ...newCard, label: e.target.value })}
            />
            <input
              type="text"
              placeholder="Enter Value"
              value={newCard.value}
              onChange={(e) => setNewCard({ ...newCard, value: e.target.value })}
            />
            <button className="save-btn" onClick={handleAddCard}>Save</button>
            <button className="cancel-btn" onClick={() => setAddMode(false)}>Cancel</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PositionHistory;
