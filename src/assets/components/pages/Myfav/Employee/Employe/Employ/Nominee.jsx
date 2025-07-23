import React, { useState } from 'react';
import './NominationDetailsForm.css';

const NominationDetailsForm = () => {
  const [nominationFor, setNominationFor] = useState('');
  const [familyMember, setFamilyMember] = useState('');
  const [mentalIllness, setMentalIllness] = useState(false);
  const [isMinor, setIsMinor] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { nominationFor, familyMember, mentalIllness, isMinor };
    console.log('Form Data:', formData);
    alert('Nomination details saved successfully!');
  };

  const handleCancel = () => {
    setNominationFor('');
    setFamilyMember('');
    setMentalIllness(false);
    setIsMinor(false);
  };

  return (
    <div className="nomination-container">
      <h2>Nomination Details</h2>
      <form onSubmit={handleSubmit} className="nomination-form">
        <div className="form-group">
          <label>Nomination For:</label>
          <select value={nominationFor} onChange={(e) => setNominationFor(e.target.value)} required>
            <option value="">Select</option>
            <option value="EPF">EPF</option>
            <option value="EPS">EPS</option>
            <option value="ESI">ESI</option>
            <option value="Gratuity">Gratuity</option>
          </select>
        </div>

        <div className="form-group">
          <label>Family Member:</label>
          <select value={familyMember} onChange={(e) => setFamilyMember(e.target.value)} required>
            <option value="">Select</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
          </select>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={mentalIllness}
              onChange={() => setMentalIllness(!mentalIllness)}
            />
            Mental Illness
          </label>
        </div>

        <div className="checkbox-group">
          <label>
            <input
              type="checkbox"
              checked={isMinor}
              onChange={() => setIsMinor(!isMinor)}
            />
            Minor
          </label>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn primary">Save</button>
          <button type="button" className="btn secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NominationDetailsForm;
