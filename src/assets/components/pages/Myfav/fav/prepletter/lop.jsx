import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LopFormPage = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState("");
  const [lopDays, setLopDays] = useState("");
  const [remarks, setRemarks] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!employee || !lopDays) {
      alert("Fill all fields");
      return;
    }

    const [empNo, name] = employee.split(" - ");
    const entry = {
      empNo,
      name,
      joinDate: "01 Apr 2021",
      workDays: 0,
      lop: parseInt(lopDays),
      remarks,
    };

    const prevEntries = JSON.parse(localStorage.getItem("lopEntries")) || [];
    localStorage.setItem("lopEntries", JSON.stringify([...prevEntries, entry]));

    navigate("/summary");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Enter LOP Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Employee</label><br />
          <select value={employee} onChange={(e) => setEmployee(e.target.value)} style={{ width: "300px", padding: "10px" }}>
            <option value="">Select...</option>
            <option value="1007 - Praveen Kumar">1007 - Praveen Kumar</option>
            <option value="566 - Harshit Patel">566 - Harshit Patel</option>
            <option value="6266 - Aadesh Hiralal Sonar">6266 - Aadesh Hiralal Sonar</option>
          </select>
        </div>

        <div>
          <label>LOP Days</label><br />
          <input type="number" value={lopDays} onChange={(e) => setLopDays(e.target.value)} style={{ padding: "10px", width: "300px" }} />
        </div>

        <div>
          <label>Remarks</label><br />
          <textarea rows={3} value={remarks} onChange={(e) => setRemarks(e.target.value)} style={{ padding: "10px", width: "300px" }} />
        </div>

        <button type="submit" style={{ padding: "10px 20px", marginTop: "10px" }}>Save</button>
      </form>
    </div>
  );
};

export default LopFormPage;
