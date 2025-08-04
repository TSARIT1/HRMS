import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import emailjs from "emailjs-com";
import "./slippay.css";

const PayslipMailer = () => {
  const [activeTab, setActiveTab] = useState("Payslip");

  const tableData = [
    { name: "John Doe", empNo: "EMP001", remarks: "On Leave", released: "Yes" },
  ];

  const generatePDFBlob = () => {
    const doc = new jsPDF();
    doc.text(`${activeTab} Report`, 14, 10);
    doc.autoTable({
      head: [["Employee Name", "Employee No", "Remarks", "Payslip Released"]],
      body: tableData.map(row => [row.name, row.empNo, row.remarks, row.released]),
    });
    return doc.output("blob");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${activeTab} Report`, 14, 10);
    doc.autoTable({
      head: [["Employee Name", "Employee No", "Remarks", "Payslip Released"]],
      body: tableData.map(row => [row.name, row.empNo, row.remarks, row.released]),
    });
    doc.save(`${activeTab.toLowerCase().replace(/\s/g, "_")}_report.pdf`);
  };

  const handleSendEmail = () => {
    const pdfBlob = generatePDFBlob();
    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = () => {
      const base64data = reader.result.split(",")[1];
      const templateParams = {
        to_name: "John Doe",
        message: "Here is your payslip.",
        attachment: base64data,
      };
      emailjs.send("your_service_id", "your_template_id", templateParams, "your_public_key")
        .then(() => alert("Email sent successfully!"))
        .catch(() => alert("Failed to send email."));
    };
  };

  return (
    <div className="payslip-container">
      <h1 className="main-heading">Payslip Mailer</h1>

      <div className="tab-buttons">
        {["Payslip", "Settlement Payslip", "Re-Settlement Payslip"].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "tab-btn active" : "tab-btn"}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="filter-options">
        <label><input type="radio" name="employeeFilter" defaultChecked /> All employees</label>
        <label><input type="radio" name="employeeFilter" /> Selected employees</label>
        <label><input type="radio" name="employeeFilter" /> Multiple Payslips</label>
      </div>

      <div className="dropdown-row">
        <select><option>Category: All</option></select>
        <select><option>Status: All</option></select>
        <select><option>Employee: All</option></select>
        <select><option>Employee Filter: All</option></select>
        <button className="remarks-btn">Add Remarks</button>
      </div>

      <div className="table-wrapper">
        <table className="styled-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Employee Name</th>
              <th>Employee No</th>
              <th>Remarks</th>
              <th>Payslip Released</th>
            </tr>
          </thead>
          <tbody>
            {tableData.length === 0 ? (
              <tr><td colSpan="5">No Rows To Show</td></tr>
            ) : (
              tableData.map((row, index) => (
                <tr key={index}>
                  <td><input type="checkbox" /></td>
                  <td>{row.name}</td>
                  <td>{row.empNo}</td>
                  <td>{row.remarks}</td>
                  <td>{row.released}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="action-buttons">
        <button onClick={handleDownloadPDF} className="btn download-btn">Download as PDF</button>
        <button onClick={handleSendEmail} className="btn send-btn">Send Email</button>
      </div>
    </div>
  );
};

export default PayslipMailer;
