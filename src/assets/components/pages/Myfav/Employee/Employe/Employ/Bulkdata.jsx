import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { AnimatePresence, motion } from 'framer-motion';
import './Bulkdata.css';

const mappingOptions = [
  'Employee No',
  'Contact name',
  'Date of Joining',
  'Department',
  'Designation',
  'Email',
  'Phone Number',
  'Address',
  'City',
  'State',
  'Pincode',
  'Country',
  'Gender',
  'Date of Birth',
  'Marital Status',
  'Nationality',
  'Emergency Contact',
  'Blood Group',
  'Aadhaar Number',
  'PAN Number',
];

export default function Bulkdata() {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [mappings, setMappings] = useState({});
  const [validationResult, setValidationResult] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !/\.(xls|xlsx)$/i.test(file.name)) {
      alert('Invalid file type. Please upload a .xls or .xlsx file.');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      const headers = data[0];
      const firstRow = data[1];

      const previewData = headers.map((header, idx) => ({
        field: header,
        value: firstRow?.[idx] || '',
      }));

      setExcelData(previewData);
    };
    reader.readAsBinaryString(file);
  };

  const handleNext = () => {
    if (step === 1) {
      if (!selectedOption || !selectedFile) {
        alert('Please select importer type and upload a file');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      const hasMappedFields = Object.keys(mappings).length > 0;
      if (!hasMappedFields) {
        alert('Please map at least one field.');
        return;
      }
      setValidationResult('No new master found. Please click next to see the import result.');
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleMappingChange = (field, value) => {
    setMappings((prev) => ({ ...prev, [field]: value }));
  };

  const stepVariants = {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  return (
    <div className="importer-container">
      <h2>Excel Importer</h2>

      {/* Step Indicator */}
      <div className="steps">
        <div className={step === 1 ? 'step active' : 'step'}>EXCEL IMPORTER</div>
        <div className={step === 2 ? 'step active' : 'step'}>MAPPING</div>
        <div className={step === 3 ? 'step active' : 'step'}>VALIDATE</div>
        <div className={step === 4 ? 'step active' : 'step'}>SUMMARY</div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <label>Importer Type</label>
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="">Please Select</option>
              <optgroup label="Address">
                <option value="permanent">Employee Permanent Address</option>
                <option value="contact">Employee Contact Address</option>
                <option value="present">Employee Present Address</option>
              </optgroup>
            </select>

            <label>Upload Excel File</label>
            <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} />
            {selectedFile && <p>Selected File: {selectedFile.name}</p>}

            <div className="button-group">
              <button className="btn btn-cancel" onClick={() => window.location.reload()}>
                Cancel
              </button>
              <button className="btn btn-next" onClick={handleNext}>
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <h3>Step 2: Excel Importer Mapping</h3>
            <p>Map your Excel columns to database fields. First record is shown for reference.</p>

            <table>
              <thead>
                <tr>
                  <th>Fields From Excel</th>
                  <th>Mapped To</th>
                  <th>First Record</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.field}</td>
                    <td>
                      <select
                        value={mappings[row.field] || ''}
                        onChange={(e) => handleMappingChange(row.field, e.target.value)}
                      >
                        <option value="">-- Select Field --</option>
                        {mappingOptions.map((option, i) => (
                          <option
                            key={i}
                            value={option}
                            disabled={Object.values(mappings).includes(option)}
                          >
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="button-group">
              <button className="btn btn-prev" onClick={() => setStep(1)}>← Previous</button>
              <button className="btn btn-cancel" onClick={() => window.location.reload()}>
                Cancel
              </button>
              <button className="btn btn-next" onClick={handleNext}>
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <h3>Step 3: Excel Importer Validate</h3>
            <p className="validation-result">{validationResult}</p>

            <div className="button-group">
              <button className="btn btn-prev" onClick={() => setStep(2)}>← Previous</button>
              <button className="btn btn-cancel" onClick={() => window.location.reload()}>
                Cancel
              </button>
              <button className="btn btn-next" onClick={handleNext}>
                Next →
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            variants={stepVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.4 }}
          >
            <h3>Step 4: Summary</h3>
            <p>All data has been validated and is ready for import.</p>
            <ul>
              {Object.entries(mappings).map(([key, value], i) => (
                <li key={i}><strong>{key}</strong> → {value}</li>
              ))}
            </ul>

            <div className="button-group">
              <button className="btn btn-prev" onClick={() => setStep(3)}>← Previous</button>
              <button className="btn btn-cancel" onClick={() => window.location.reload()}>
                Done
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
