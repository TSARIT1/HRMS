import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './assets/components/pages/body';
import Header from './assets/components/header';
import SettingsPage from './assets/components/SettingsPage';

import GenerateLetter from './assets/components/pages/Myfav/Employee/preletter';
import LopFormPage from './assets/components/pages/Myfav/Employee/PAYROL/Deduct LOP';
import LopSummaryPage from './assets/components/pages/Myfav/Employee/lopsummary';
import ActionPopup from './assets/components/pages/Myfav/popup';


import ShiftRoster from './assets/components/pages/Myfav/Employee/LEAVE/ShiftRoster';
import AttendanceStatus from './assets/components/pages/Myfav/Employee/LEAVE/AttendanceStatus';

import LeaveDetailsView from './assets/components/pages/Myfav/Employee/LEAVE/LeaveApproval';



function App() {
  return (
    <Router>
      <Header/>
      <div style={{ marginTop: '90px' }}>
        <Body/>
     
      </div>
      <LeaveDetailsView/>
      <ShiftRoster/>
      <AttendanceStatus/>
       <Routes>
        <Route path="/Actions" element={<ActionPopup/>} />

        <Route path="/Sit" element={<SettingsPage/>} />
        <Route path="/preletter" element={<GenerateLetter/>} />
        <Route path="/leavepage" element={<SettingsPage/>} />
        <Route path="/a" element={<LopFormPage/>} />
        <Route path="/s" element={<LopSummaryPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
