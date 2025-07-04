import React, { useState, useEffect } from "react";
import "./systemsettings.css";

function Company() {
  const [formData, setFormData] = useState({
    companyName: "TSAR IT PVT LTD",
    companyAddress: "Company Address Not Updated",
    country: "India",
    state: "Karnataka",
    industry: "IT- Software Services",
    timeZone: "(UTC+05:30) Asia/Kolkata",
    currency: "INR - Indian Rupee",
    panNo: "AAKCT8268L",
    tanNo: "VPNT03837B",
    pfNo: "PF NOT AVAILABLE",
    esiNo: "",
    linNo: "",
    gstNo: "",
    registrationNo: "",
    twitter: "",
  });

  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Logo:", logo);
    alert("Form submitted!");
  };
    <div className="header">
  <div className="logo">TSAR<span> IT</span></div>
  <div className="nav">
    <div className="nav-item">
      General
      <div className="dropdown">
        <a href="#">Company Info</a>
        <a href="#">Branches</a>
      </div>
    </div>
    <div className="nav-item">
      Employee
      <div className="dropdown">
        <a href="#">Directory</a>
        <a href="#">Roles</a>
      </div>
    </div>
    <div className="nav-item">
      Payroll
      <div className="dropdown">
        <a href="#">Pay Structure</a>
        <a href="#">Payslip</a>
      </div>
    </div>
    <div className="nav-item">
      Miscellaneous
      <div className="dropdown">
        <a href="#">Preferences</a>
        <a href="#">Themes</a>
      </div>
    </div>
  </div>
</div>

  return (

    <div className="form-container fade-in">
      <h2><i className="fas fa-building"></i> Company Information</h2>
      <form onSubmit={handleSubmit}>
         {[
          ["Company Name", "companyName", "fa-building"],
          ["Company Address", "companyAddress", "fa-location-dot"],
          ["PAN No", "panNo", "fa-id-card"],
          ["TAN No", "tanNo", "fa-id-badge"],
          ["PF No", "pfNo", "fa-user-shield"],
          ["ESI No", "esiNo", "fa-briefcase-medical"],
          ["LIN No", "linNo", "fa-barcode"],
          ["GST No", "gstNo", "fa-receipt"],
          ["Registration No", "registrationNo", "fa-clipboard-check"],
          ["Twitter Handle", "twitter", "fa-twitter"],
        ].map(([label, name, icon]) => (
          <div className="form-group" key={name}>
            <label><i className={`fas ${icon}`}></i> {label}</label>
            <input
              type="text"
              name={name}
              value={formData[name]}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* Dropdowns */}
        <div className="form-group">
          <label><i className="fas fa-globe-asia"></i> Country</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option>India</option>
            <option>United States</option>
            <option>United Kingdom</option>
            <option>Canada</option>
          </select>
        </div>

        <div className="form-group">
          <label><i className="fas fa-map-marker-alt"></i> State</label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option>Karnataka</option>
            <option>Maharashtra</option>
            <option>Delhi</option>
            <option>Tamil Nadu</option>
          </select>
        </div>

        <div className="form-group">
          <label><i className="fas fa-briefcase"></i> Industry</label>
          <select name="industry" value={formData.industry} onChange={handleChange}>
            <option>IT- Software Services</option>
            <option>Finance</option>
            <option>Healthcare</option>
            <option>Education</option>
          </select>
        </div>

        <div className="form-group">
          <label><i className="fas fa-clock"></i> Time Zone</label>
          <select name="timeZone" value={formData.timeZone} onChange={handleChange}>
            <option>(UTC+05:30) Asia/Kolkata</option>
            <option>(UTC+00:00) GMT</option>
            <option>(UTC-05:00) US/Eastern</option>
          </select>
        </div>

        <div className="form-group">
          <label><i className="fas fa-money-bill"></i> Currency</label>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option>INR - Indian Rupee</option>
            <option>USD - US Dollar</option>
            <option>GBP - British Pound</option>
            <option>EUR - Euro</option>
          </select>
        </div>

        {/* Logo upload */}
        <div className="form-group">
          <label><i className="fas fa-image"></i> Company Logo</label>
          <input type="file" accept="image/*" onChange={handleLogoChange} />
          {logoPreview && (
            <div className="logo-preview">
              <img src={logoPreview} alt="Logo Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          <i className="fas fa-save"></i> Save
        </button>
      </form>
    </div>
  );
}

export default Company;
