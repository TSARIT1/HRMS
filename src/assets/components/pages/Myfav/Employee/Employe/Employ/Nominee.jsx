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
      isMinor
    };
    console.log('Form Data:', formData);
  };

  return (
    <div style={styles.container}>
      <h2>Nomination Details</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label>Nomination For:</label>
          <select value={nominationFor} onChange={(e) => setNominationFor(e.target.value)}>
            <option value="">Select</option>
            <option value="EPF">EPF</option>
            <option value="EPS">EPS</option>
            <option value="ESI">ESI</option>
            <option value="Gratuity">Gratuity</option>
          </select>
        </div>

        <div style={styles.field}>
          <label>Family Member:</label>
          <select value={familyMember} onChange={(e) => setFamilyMember(e.target.value)}>
            <option value="">Select</option>
            <option value="Spouse">Spouse</option>
            <option value="Child">Child</option>
            <option value="Parent">Parent</option>
            <option value="Sibling">Sibling</option>
          </select>
        </div>

        <div style={styles.checkbox}>
          <label>
            <input
              type="checkbox"
              checked={mentalIllness}
              onChange={() => setMentalIllness(!mentalIllness)}
            />
            Mental Illness
          </label>
        </div>

        <div style={styles.checkbox}>
          <label>
            <input
              type="checkbox"
              checked={isMinor}
              onChange={() => setIsMinor(!isMinor)}
            />
            Minor
          </label>
        </div>

        <div style={styles.buttons}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => window.location.reload()}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '400px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-between'
  }
};

export default NominationDetailsForm;
