import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import emailjs from "emailjs-com";
import './slippay.css';

const PayslipMailer = () => {
  const [activeTab, setActiveTab] = useState("Payslip");

  const tableData = [
    {
      name: "John Doe",
      empNo: "EMP001",
      remarks: "On Leave",
      released: "Yes",
    },
  ];

  const generatePDFBlob = () => {
    const doc = new jsPDF();
    doc.text(`${activeTab} Report`, 14, 10);
    const tableRows = tableData.map((row) => [
      row.name,
      row.empNo,
      row.remarks,
      row.released,
    ]);
    doc.autoTable({
      head: [["Employee Name", "Employee No", "Remarks", "Payslip Released"]],
      body: tableRows,
    });
    return doc.output("blob");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text(`${activeTab} Report`, 14, 10);
    const tableRows = tableData.map((row) => [
      row.name,
      row.empNo,
      row.remarks,
      row.released,
    ]);
    doc.autoTable({
      head: [["Employee Name", "Employee No", "Remarks", "Payslip Released"]],
      body: tableRows,
    });
    doc.save(`${activeTab.toLowerCase().replace(/\s/g, "_")}_report.pdf`);
  };

  const handleSendEmail = () => {
    const pdfBlob = generatePDFBlob();

    const reader = new FileReader();
    reader.readAsDataURL(pdfBlob);
    reader.onloadend = function () {
      const base64data = reader.result.split(",")[1];

      const templateParams = {
        to_name: "John Doe",
        message: "Here is your payslip.",
        attachment: base64data,
      };

      emailjs
        .send(
          "your_service_id",    
          "your_template_id",    
          templateParams,
          "your_public_key"      
        )
        .then(
          (result) => {
            alert("Email sent successfully!");
          },
          (error) => {
            console.error(error);
            alert("Failed to send email.");
          }
        );
    };
  };

  const renderTable = () => (
    <div className="border rounded-lg shadow mt-4 overflow-x-auto">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3"><input type="checkbox" /></th>
            <th className="p-3">Employee Name</th>
            <th className="p-3">Employee No</th>
            <th className="p-3">Remarks</th>
            <th className="p-3">Payslip Released</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">No Rows To Show</td>
            </tr>
          ) : (
            tableData.map((row, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3"><input type="checkbox" /></td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.empNo}</td>
                <td className="p-3">{row.remarks}</td>
                <td className="p-3">{row.released}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payslip Mailer</h1>

      <div className="flex space-x-6 border-b mb-6">
        {["Payslip", "Settlement Payslip", "Re-Settlement Payslip"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm md:text-base font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm">
        <label className="flex items-center gap-2">
          <input type="radio" name="employeeFilter" defaultChecked /> All employees
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="employeeFilter" /> Selected employees
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="employeeFilter" /> Multiple Payslips
        </label>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <select className="border p-2 rounded-md text-sm">
          <option>Category: All</option>
        </select>
        <select className="border p-2 rounded-md text-sm">
          <option>Status: All</option>
        </select>
        <select className="border p-2 rounded-md text-sm">
          <option>Employee: All</option>
        </select>
        <select className="border p-2 rounded-md text-sm">
          <option>Employee Filter: All</option>
        </select>
        <button className="ml-auto px-4 py-2 border rounded-md bg-gray-100 hover:bg-gray-200 text-sm">
          Add Remarks
        </button>
      </div>

      {renderTable()}

      <div className="flex justify-end gap-3 mt-6">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 rounded-md border bg-white hover:bg-gray-100 text-sm"
        >
          Download As PDF
        </button>
        <button
          onClick={handleSendEmail}
          className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm"
        >
          Send Email
        </button>
      </div>
    </div>
  );
};

export default PayslipMailer;
