import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import GenerateLetter from './assets/components/pages/Myfav/Employee/Employe/Employ/preletter';
import EmployeeQuickAdd from './assets/components/pages/Myfav/Employee/Employe/Employ/Addemployee';
import AssignManager from './assets/components/pages/Myfav/Employee/Employe/Employ/Assignmanager';
import BankDetailsForm from './assets/components/pages/Myfav/Employee/Employe/Employ/bankdetails';
import ExcelImporterApp from './assets/components/pages/Myfav/Employee/Employe/Employ/Bulkdata';
import NominationDetailsForm from './assets/components/pages/Myfav/Employee/Employe/Employ/Nominee';
import CreateForm from './assets/components/pages/Myfav/Employee/Employe/Employ/Policy';
import EmployeeSearch from './assets/components/pages/Myfav/Employee/Employe/Employ/updateemp.no';
import GenerateEmployeePassword from './assets/components/pages/Myfav/Employee/Employe/Employ/Regenerate password';
import ActionPopup from './assets/components/pages/popup';
import SettingsPage from './assets/components/SettingsPage';
import LopFormPage from './assets/components/pages/Myfav/Employee/PAYROL/Deduct LOP';
import LopSummaryPage from './assets/components/pages/Myfav/Employee/LEAVE/lopsummary';
import EmployeeH from './assets/components/pages/SIDEBARS/EmployeeHeader';
import DashboardPage from './assets/components/Mainpage';
import PayrollH from './assets/components/pages/SIDEBARS/PayrollHeader';




function App() {
  return (
    <Router>
    
      
      
   
   <div><PayrollH/></div>
   
       <Routes>
<Route path="/prepletter" element={<GenerateLetter/>} />
<Route path="/addemployee" element={<EmployeeQuickAdd/>}/>
<Route path="/assignmanager" element={<AssignManager/>}/>
<Route path="/bankdetails" element={<BankDetailsForm/>}/>
<Route path="/excel" element={<ExcelImporterApp/>}/>
<Route path="/Nomine" element={<NominationDetailsForm/>}/>
<Route path="/policy" element={<CreateForm/>}/>
<Route path="/update emp" element={<EmployeeSearch/>}/>
<Route path="/Repassword" element={<GenerateEmployeePassword/>} />




        <Route path="/Actionpopup" element={<ActionPopup/>} />

        <Route path="/Sit" element={<SettingsPage/>} />
        <Route path="/preletter" element={<GenerateLetter/>} />
        <Route path="/leavepage" element={<SettingsPage/>} />
        <Route path="/a" element={<LopFormPage/>} />
        <Route path="/s" element={<LopSummaryPage/>} />
       <Route path="/EmployeeH" element={<EmployeeH/>} />




      </Routes>
    </Router>
  );
}

export default App;
