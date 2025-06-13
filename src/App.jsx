import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './assets/components/pages/body';
import Header from './assets/components/header';
import SettingsPage from './assets/components/SettingsPage';
import NominationDetailsForm from './assets/components/pages/Myfav/Employee/Nominee';
import BankDetailsForm from './assets/components/pages/Myfav/Employee/bankdetails';
import GenerateLetter from './assets/components/pages/Myfav/Employee/preletter';
import LopFormPage from './assets/components/pages/Myfav/Employee/Deduct LOP';
import LopSummaryPage from './assets/components/pages/Myfav/Employee/lopsummary';
import ExcelImporter from './assets/components/pages/Myfav/Employee/Bulkdata';
import EmployeeQuickAdd from './assets/components/pages/Myfav/Employee/Addemployee';
import CompanyPolicyForm from './assets/components/pages/Myfav/Employee/Policy';
import CreateForm from './assets/components/pages/Myfav/Employee/Policy';
import AssignManager from './assets/components/pages/Myfav/Employee/Assignmanager';
import ActionPopup from './assets/components/pages/Myfav/popup';
import ExitSettlement from './assets/components/pages/Myfav/Employee/payrollsettlement';



function App() {
  return (
    <Router>
      <Header/>
      <div style={{ marginTop: '90px' }}>
        <Body/>
     
      </div>
      <EmployeeQuickAdd/>
      <Routes>
        <Route path="/Actions" element={<ActionPopup/>} />

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
