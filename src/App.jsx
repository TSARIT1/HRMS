import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './assets/components/pages/body';
import Header from './assets/components/header';
import SettingsPage from './assets/components/SettingsPage';

import GenerateLetter from './assets/components/pages/Myfav/Employee/preletter';
import LopFormPage from './assets/components/pages/Myfav/Employee/Deduct LOP';
import LopSummaryPage from './assets/components/pages/Myfav/Employee/lopsummary';
import EmployeeQuickAdd from './assets/components/pages/Myfav/Employee/Addemployee';
import ActionPopup from './assets/components/pages/Myfav/popup';
import ExitSettlementForm from './assets/components/pages/Myfav/Employee/Employee/ExitSettlementForm';
import SalaryRevisionPage from './assets/components/pages/Myfav/Employee/Employee/Revise Employee Salary';



function App() {
  return (
    <Router>
      <Header/>
      <div style={{ marginTop: '90px' }}>
        <Body/>
     
      </div>
<ExitSettlementForm/>
<SalaryRevisionPage/>
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
