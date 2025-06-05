import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './assets/components/header'; // ✅ Correct component name
import BankForm from './assets/components/pages/Myfav/fav/Employee/employeepop/bankdetails';
import SettingsPage from './assets/components/SettingsPage';
import GenerateLetter from './assets/components/pages/Myfav/fav/Employee/employeepop/preletter';
import LopFormPage from './assets/components/pages/Myfav/fav/Employee/employeepop/lop';
import LopSummaryPage from './assets/components/pages/Myfav/fav/Employee/employeepop/lopsummary';
import Body from './assets/components/pages/body';
import BankDetailsForm from './assets/components/pages/Myfav/fav/Employee/employeepop/bankdetails';
import NominationDetailsForm from './assets/components/pages/Myfav/fav/Employee/employeepop/Nominee';

function App() {
  return (
    <Router>
      <Header /> 

      <div style={{ marginTop: '90px' }}>
        <Body />
      <NominationDetailsForm/>
      </div>
<BankDetailsForm/>
      <Routes>
        <Route path="/Sit" element={<SettingsPage />} />
        <Route path="/preletter" element={<GenerateLetter />} />
        <Route path="/leavepage" element={<SettingsPage />} />
        <Route path="/" element={<LopFormPage />} />
        <Route path="/summary" element={<LopSummaryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
