import React, { useState } from 'react';
import './NominationDetailsForm.css';

const NominationDetailsForm = () => {
  const [nominationFor, setNominationFor] = useState('');
  const [familyMember, setFamilyMember] = useState('');
  const [mentalIllness, setMentalIllness] = useState(false);
  const [isMinor, setIsMinor] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      nominationFor,
      familyMember,
      mentalIllness,
      isMinor,
    };
    console.log('Submitted Data:', formData);
    // TODO: Add API integration here
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
        {/* Nomination For Dropdown */}
        <div className="form-group">
          <label htmlFor="nominationFor">Nomination For</label>
          <select
            id="nominationFor"
            value={nominationFor}
            onChange={(e) => setNominationFor(e.target.value)}
          >
            <option value="">Select</option>
            <option value="EPF">EPF</option>
            <option value="EPS">EPS</option>
            <option value="ESI">ESI</option>
            <option value="Gratuity">Gratuity</option>
          </select>
        </div>

        {/* Family Member Dropdown */}
        <div className="form-group">
          <label htmlFor="familyMember">Family Member</label>
          <select
            id="familyMember"
            value={familyMember}
            onChange={(e) => setFamilyMember(e.target.value)}
          >
            <option value="">Select</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
          </select>
        </div>

        {/* Mental Illness Checkbox */}
        <div className="form-check">
          <label htmlFor="mentalIllness">
            <input
              id="mentalIllness"
              type="checkbox"
              checked={mentalIllness}
              onChange={() => setMentalIllness(!mentalIllness)}
            />
            Mental Illness
          </label>
        </div>

        {/* Minor Checkbox */}
        <div className="form-check">
          <label htmlFor="isMinor">
            <input
              id="isMinor"
              type="checkbox"
              checked={isMinor}
              onChange={() => setIsMinor(!isMinor)}
            />
            Minor
          </label>
        </div>

        {/* Form Buttons */}
        <div className="form-buttons">
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NominationDetailsForm;
