import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './assets/components/pages/body';
import Header from './assets/components/header';
import SettingsPage from './assets/components/SettingsPage';
import NominationDetailsForm from './assets/components/pages/Myfav/Employee/Nominee';
import BankDetailsForm from './assets/components/pages/Myfav/Employee/bankdetails';
import GenerateLetter from './assets/components/pages/Myfav/Employee/preletter';
import LopFormPage from './assets/components/pages/Myfav/Employee/lop';
import LopSummaryPage from './assets/components/pages/Myfav/Employee/lopsummary';
import ExcelImporter from './assets/components/pages/Myfav/Employee/Bulkdata';
import EmployeeQuickAdd from './assets/components/pages/Myfav/Employee/Addemployee';



function App() {
  return (
    <Router>
      <Header/>
      <div style={{ marginTop: '90px' }}>
        <Body/>
       <EmployeeQuickAdd/>
        <ExcelImporter/>
      </div>
      <Routes>
        <Route path="/Sit" element={<SettingsPage/>} />
        <Route path="/preletter" element={<GenerateLetter/>} />
        <Route path="/leavepage" element={<SettingsPage/>} />
        <Route path="/" element={<LopFormPage/>} />
        <Route path="/summary" element={<LopSummaryPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
