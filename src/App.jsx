import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SettingsPage from './assets/components/SettingsPage';
import Header from './assets/components/header';
import Body from './assets/components/pages/body';
import ActionPopup from './assets/components/pages/Myfav/popup';
import GenerateLetter from './assets/components/pages/Myfav/fav/prepletter/preletter';

import GeneratePasswordPage from './assets/components/pages/Myfav/fav/export';
import EmailGenerator from './assets/components/pages/Myfav/fav/export';
import PayslipMailer from './assets/components/pages/Myfav/fav/prepletter/slippay';
import EmployeeNumberChange from './assets/components/pages/Myfav/fav/prepletter/updateemp.no';
import AddEmployee from './assets/components/pages/Myfav/fav/prepletter/updateemp.no';
import EmployeeSearch from './assets/components/pages/Myfav/fav/prepletter/updateemp.no';
import LopEntryForm from './assets/components/pages/Myfav/fav/prepletter/lop';
import LopFormPage from './assets/components/pages/Myfav/fav/prepletter/lop';
import LopSummaryPage from './assets/components/pages/Myfav/fav/prepletter/lopsummary';

function App() {
  return (
    <Router>
      <Header />

      <div style={{ marginTop: '90px' }}>
        <Body />
     
       
      </div>

      <Routes>
        <Route path="/Sit" element={<SettingsPage/>} />
        <Route path="/Header" element={<Headers/>} />
        <Route path="/Headera" element={<Header/>} />
        <Route path="/Actions" element={<ActionPopup/>} />
        <Route path="/preletter" element={<GenerateLetter/>} />
        <Route path="/leavepage" element={<SettingsPage/>} />
        <Route path="/" element={<LopFormPage/>} />
        <Route path="/summary" element={<LopSummaryPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
