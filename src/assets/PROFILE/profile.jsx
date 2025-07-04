import React, { useState } from "react";
import "./profile.css";

const timeZones = [
  "(UTC+07:00) Asia/Bangkok",
  "(UTC+02:00) Asia/Beirut",
  "(UTC+06:00) Asia/Bishkek",
  "(UTC+08:00) Asia/Brunei",
  "(UTC+05:30) Asia/Calcutta",
];

export default function Profile() {
  const [profile, setProfile] = useState({
    Name: "Uday",
    Email: "Udaykiran@gmail.com",
    Nick_Name: "TSAR IT",
    TimeZone: "(UTC+05:30) Asia/Calcutta",
    Biography: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="profile-card">
      <h2>Profile Details</h2>

      <div className="profile-row">
        <label>Name:</label>
        <input
          type="text"
          name="Name"
          value={profile.Name}
          onChange={handleChange}
        />
      </div>

      <div className="profile-row">
        <label>Email:</label>
        <input
          type="email"
          name="Email"
          value={profile.Email}
          onChange={handleChange}
        />
      </div>

      <div className="profile-row">
        <label>Nick Name:</label>
        <input
          type="text"
          name="Nick_Name"
          value={profile.Nick_Name}
          onChange={handleChange}
        />
      </div>

      <div className="profile-row">
        <label>Time Zone:</label>
        <select
          name="TimeZone"
          value={profile.TimeZone}
          onChange={handleChange}
        >
          {timeZones.map((tz, index) => (
            <option key={index} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

      <div className="profile-row">
        <label>Biography:</label>
        <textarea
          name="Biography"
          rows={4}
          value={profile.Biography}
          onChange={handleChange}
        />
      </div>

      <button onClick={() => console.log("Profile Saved:", profile)}>
        Save
      </button>
    </div>
  );
}
