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
import WorkflowH from './assets/components/pages/SIDEBARS/WorkFlowHeader';
import LeaveH from './assets/components/pages/SIDEBARS/LeaveHeader';
import ReportH from './assets/components/pages/SIDEBARS/ReportHeader';
import PayslipMailer from './assets/components/pages/Myfav/Employee/Employe/Employ/slippay';
import LeaveMonitor from './assets/components/pages/Myfav/Employee/LEAVE/LeaveApproval';
import AttendanceStatusOverride from './assets/components/pages/Myfav/Employee/LEAVE/Attendance Muster';
import AttendanceStatus from './assets/components/pages/Myfav/Employee/LEAVE/AttendanceStatus';
import LeavePeriodFinalization from './assets/components/pages/Myfav/Employee/LEAVE/Attendance Period';
import EmployeeITDeclaration from './assets/components/pages/Myfav/Employee/PAYROL/Release  IT Declaration';
import SalaryStatement from './assets/components/pages/Myfav/Employee/PAYROL/QuickSalaryStatement';
import ExitSettlementForm from './assets/components/pages/Myfav/Employee/PAYROL/ExitSettlementForm';
import LeaveApproval from './assets/components/pages/Myfav/Employee/LEAVE/LeaveApproval';




function App() {
  return (
    <Router>
    
      
      
   <DashboardPage/>
   
   
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
        <Route path="/lop" element={<LopFormPage/>} />
        <Route path="/s" element={<LopSummaryPage/>} />
       <Route path="/EmployeeH" element={<EmployeeH/>} />
       <Route path="/PayrollH" element={<PayrollH/>} />
       <Route path="/EmployeeH" element={<EmployeeH/>} />
        <Route path="/WorkflowH" element={<WorkflowH/>} />
       <Route path="/LeaveH" element={<LeaveH/>} />
       <Route path="/EngageH" element={<h/>} />
       <Route path="/ReportH" element={<ReportH/>} />



         <Route path="/bank" element={<BankDetailsForm/>} />
       <Route path="/nomine" element={<NominationDetailsForm/>} />
       <Route path="/spay" element={<PayslipMailer/>} />
       <Route path="/gletter" element={<GenerateLetter/>} />
       <Route path="/eimport" element={<ExcelImporterApp/>} />
       <Route path="/policy" element={<CreateForm/>} />
       <Route path="/lapproval" element={<LeaveMonitor/>} />
       <Route path="/amuster" element={<AttendanceStatusOverride/>} />
       <Route path="/astatus" element={<AttendanceStatus/>} />
       <Route path="/aperiod" element={<LeavePeriodFinalization/>} />



       <Route path="/eit" element={<EmployeeITDeclaration/>} />
        <Route path="/aperiod" element={<LeavePeriodFinalization/>} />
        <Route path="/sstatement" element={<SalaryStatement/>} />
        <Route path="/proll" element={<ExitSettlementForm/>} />


        <Route path="/leave" element={<LeaveApproval/>} />




      </Routes>
    </Router>
  );
}

export default App;
