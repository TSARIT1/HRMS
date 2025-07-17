import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './assets/components/Mainpage';
import GenerateLetter from './assets/components/pages/Myfav/Employee/Employe/Employ/preletter';
import EmployeeQuickAdd from './assets/components/pages/Myfav/Employee/Employe/Employ/Addemployee';
import AssignManager from './assets/components/pages/Myfav/Employee/Employe/Employ/Assignmanager';
import BankDetailsForm from './assets/components/pages/Myfav/Employee/Employe/Employ/bankdetails';
import ExcelImporterApp from './assets/components/pages/Myfav/Employee/Employe/Employ/Bulkdata';
import NominationDetailsForm from './assets/components/pages/Myfav/Employee/Employe/Employ/Nominee';
import CreateForm from './assets/components/pages/Myfav/Employee/Employe/Employ/Policy';
import EmployeeSearch from './assets/components/pages/Myfav/Employee/Employe/Employ/updateemp.no';
import GenerateEmployeePassword from './assets/components/pages/Myfav/Employee/Employe/Employ/Regenerate password';
import PayslipMailer from './assets/components/pages/Myfav/Employee/Employe/Employ/slippay';
import LopFormPage from './assets/components/pages/Myfav/Employee/PAYROL/Deduct LOP';
import LopSummaryPage from './assets/components/pages/Myfav/Employee/LEAVE/lopsummary';
import EmployeeITDeclaration from './assets/components/pages/Myfav/Employee/PAYROL/Release  IT Declaration';
import SalaryStatement from './assets/components/pages/Myfav/Employee/PAYROL/QuickSalaryStatement';
import ExitSettlementForm from './assets/components/pages/Myfav/Employee/PAYROL/ExitSettlementForm';
import LeaveApproval from './assets/components/pages/Myfav/Employee/LEAVE/LeaveApproval';
import ShiftRoster from './assets/components/pages/Myfav/Employee/LEAVE/ShiftRoster';
import AttendanceStatusOverride from './assets/components/pages/Myfav/Employee/LEAVE/Attendance Muster';
import AttendanceStatus from './assets/components/pages/Myfav/Employee/LEAVE/AttendanceStatus';
import LeavePeriodFinalization from './assets/components/pages/Myfav/Employee/LEAVE/Attendance Period';
import EmployeeH from './assets/components/pages/SIDEBARS/EmployeeHeader';
import PayrollH from './assets/components/pages/SIDEBARS/PayrollHeader';
import WorkflowH from './assets/components/pages/SIDEBARS/WorkFlowHeader';
import LeaveH from './assets/components/pages/SIDEBARS/LeaveHeader';
import ReportH from './assets/components/pages/SIDEBARS/ReportHeader';
import SettingsPage from './assets/components/SettingsPage';
import ActionPopup from './assets/components/pages/popup';
import ProfileSettings from './assets/PROFILE/profilesetting';
import Profile from './assets/PROFILE/profile';
import Password from './assets/PROFILE/password';
import LoginHistory from './assets/PROFILE/login history';
import CompanyInfoForm from './assets/components/pages/Myfav/Employee/Other/CompanyInfoForm';
import System from './assets/PROFILE/systemsettings';
import LeaveHe from './assets/components/pages/SIDEBARS/LeaveHeader';
import AnalyticsHub from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/AnalyticsHub';
import Family from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/FAMILY DETAILS';
import EmployeeManager from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/FAMILY DETAILS';
import PositionHistory from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/Position History';
import Employee_Seperation from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/Seperation';
import EmployeeDocuments from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/EMP DOCUMENTS';
import EmpSal from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/EMP Bulletin';
import SalaryRevision from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/EMP Bulletin';
import Bulletin from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/EMP Bulletin';
import MassCommunication from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/EMP MassCommunication';
import PayrollSAL from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY  Salary';
import SalaryRevisionDashboard from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY SalaryRevisionDashboard';
import SalaryRevisionTable from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Salary Revision';
import IncomeTaxSummary from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Incometax';
import EmployeeTaxInfo from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Incometax';
import EmployeeLOPTracker from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Employee LOP Days';
import PAYEmployeeLOPDays from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Employee LOP Days';
import StopSalaryProcessing from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY StopSalaryProcessing';
import FinalSettlement from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY FinalSettlement';
import PayrollProcess from './assets/SIDEBAR EXTRA Forms/PAY payrool/PayrollProcess';
import ITStatement from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY ITStatement';


function App() {
  

  return (
   
  

    <Router>
      <Routes>
     


                  <Route path="/popup" element={<ActionPopup/>} />


          <Route path="/" element={<DashboardPage/>} />

          {/* Employee */}
          <Route path="/prepletter" element={<GenerateLetter/>} />
          <Route path="/addemployee" element={<EmployeeQuickAdd/>} />
          <Route path="/assignmanager" element={<AssignManager/>} />
          <Route path="/bankdetails" element={<BankDetailsForm />} />
          <Route path="/excel" element={<ExcelImporterApp />} />
          <Route path="/Nomine" element={<NominationDetailsForm/>} />
          <Route path="/policy" element={<CreateForm />} />
          <Route path="/update-emp" element={<EmployeeSearch />} />
          <Route path="/Repassword" element={<GenerateEmployeePassword/>} />
          <Route path="/spay" element={<PayslipMailer/>} />
          <Route path="/eimport" element={<ExcelImporterApp/>} />
          <Route path="/gletter" element={<GenerateLetter />} />

          {/* Payroll */}
          <Route path="/lop" element={<LopFormPage/>} />
          <Route path="/s" element={<LopSummaryPage/>} />
          <Route path="/Eit" element={<EmployeeITDeclaration />} />
          <Route path="/sstatement" element={<SalaryStatement/>} />
          <Route path="/proll" element={<ExitSettlementForm/>} />

          {/* Leave */}
          <Route path="/lapproval" element={<LeaveApproval/>} />
          <Route path="/leave" element={<LeaveApproval/>} />
          <Route path="/l1" element={<LeaveApproval />} />
          <Route path="/sroster" element={<ShiftRoster/>} />
          <Route path="/amuster" element={<AttendanceStatusOverride/>} />
          <Route path="/astatus" element={<AttendanceStatus/>} />
          <Route path="/aperiod" element={<LeavePeriodFinalization/>} />

          {/* Sidebars */}
          <Route path="/employe" element={<EmployeeH/>} />
          <Route path="/payroll" element={<PayrollH/>} />
          <Route path="/workflow" element={<WorkflowH/>} />
          <Route path="/leavehe" element={<LeaveHe/>} />
          <Route path="/report" element={<ReportH/>} />

          {/* Settings & Popups */}
          <Route path="/Sit" element={<SettingsPage />} />
          <Route path="/leavepage" element={<SettingsPage />} />

          {/* Profile */}
          <Route path="/profilesetting" element={<ProfileSettings />} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/password" element={<Password/>} />
          <Route path="/login" element={<LoginHistory/>} />
          <Route path="/security" element={<System/>} />


      </Routes>
<ITStatement/>
</Router>
  );

}

export default App;
