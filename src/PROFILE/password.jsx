import React, { useState } from "react";
import "./password.css";

export default function Password() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error on input change
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = () => {
    const { newPassword, confirmPassword } = formData;

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character (@$!%*?&)."
      );
      return;
    }

    console.log("Password Updated:", formData);
    alert("Password changed successfully!");
  };

  return (
    <div className="profile-card">
      <h2>Change Password</h2>

      <div className="profile-row">
        <label>Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />
      </div>

      <div className="profile-row">
        <label>New Password</label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
      </div>

      <div className="profile-row">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button onClick={handleSubmit}>Save</button>
    </div>
  );
}
