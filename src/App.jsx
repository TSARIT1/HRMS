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
import GenerateEmployeePassword from './assets/components/pages/Myfav/Employee/Employe/Employ/Regenerate password';
import PayslipMailer from './assets/components/pages/Myfav/Employee/LEAVE/slippay';
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
import SalaryRevisionTable from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Salary Revision';
import IncomeTaxSummary from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Incometax';
import EmployeeTaxInfo from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Incometax';
import EmployeeLOPTracker from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Employee LOP Days';
import PAYEmployeeLOPDays from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY Employee LOP Days';
import StopSalaryProcessing from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY StopSalaryProcessing';
import FinalSettlement from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY FinalSettlement';
import PayrollProcess from './assets/SIDEBAR EXTRA Forms/PAY payrool/PayrollProcess';
import ITStatement from './assets/SIDEBAR EXTRA Forms/PAY payrool/PAY ITStatement';
import EmployeeOnboarding from './assets/SIDEBAR EXTRA Forms/WORKFLOW/W EmployeeOnboarding';
import WorkflowReviewerTypes from './assets/SIDEBAR EXTRA Forms/WORKFLOW/W Workflow Reviewers Types';
import WorkflowLevels from './assets/SIDEBAR EXTRA Forms/WORKFLOW/W WorkflowLevels';
import EmployeeDetails from './assets/SIDEBAR EXTRA Forms/EMPLOYEE HEA/EMP DOCUMENTS';
import DeleteEmployee from './assets/components/pages/Myfav/Employee/Employe/Employ/DeleteEmployee';
import Bulkdata from './assets/components/pages/Myfav/Employee/Employe/Employ/Bulkdata';
import AttendanceInfo from './assets/components/pages/Myfav/Employee/LEAVE/View Employee Attendance.';
import SalaryRevisionAnalytics from './assets/SIDEBAR EXTRA Forms/PAY payrool/Salary Revision Analytics ';
import ProcessAttendance from './assets/components/pages/Myfav/Employee/LEAVE/ProcessAttendance';
import EmployeSearch from './assets/components/pages/Myfav/Employee/Employe/Employ/updateemp.no';
import EmployeeCategories from './assets/components/pages/Myfav/Employee/Other/Employee Position';


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
          <Route path="/updateemp" element={<EmployeSearch/>} />



          <Route path="/Repassword" element={<GenerateEmployeePassword/>} />
          <Route path="/spay" element={<PayslipMailer/>} />
          <Route path="/eimport" element={<ExcelImporterApp/>} />
          <Route path="/gletter" element={<GenerateLetter />} />
          <Route path="/bankdetails" element={<BankDetailsForm/>} />
          <Route path="/deleteemp" element={<DeleteEmployee/>} />
          <Route path="/slip" element={<PayslipMailer/>} />
          <Route path="/bulk" element={<Bulkdata/>} />




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
          <Route path="/leaveH" element={<LeaveHe/>} />
          <Route path="/report" element={<ReportH/>} />

          {/* Settings & Popups */}
          <Route path="/Sit" element={<SettingsPage/>} />
          <Route path="/leavepage" element={<SettingsPage/>} />
          <Route path="/EMPCategory" element={<EmployeeCategories/>} />
          {/* Profile */}
          <Route path="/profilesetting" element={<ProfileSettings/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/password" element={<Password/>} />
          <Route path="/login" element={<LoginHistory/>} />
          <Route path="/security" element={<System/>} />
          {/* Side emp*/}
          <Route path="/AH" element={<AnalyticsHub/>} />
          <Route path="/FD" element={<EmployeeManager/>} />
          <Route path="/PH" element={<PositionHistory/>} />
          <Route path="/PH" element={<PositionHistory/>} />
          <Route path="/ED" element={<EmployeeDocuments/>} />

          <Route path="/Seperation" element={<ExitSettlementForm/>} />
          <Route path="/BB" element={<Bulletin/>} />
          <Route path="/MC" element={<MassCommunication/>} />

          {/* Side PAYROLL*/}
          <Route path="/SR" element={<SalaryRevisionTable/>} />
          <Route path="/PS" element={<PayrollSAL/>} />
          <Route path="/MC" element={<MassCommunication/>} />
          <Route path="/SRD" element={<SalaryRevisionAnalytics/>} />

          <Route path="/PSR" element={<SalaryRevision/>} />
          <Route path="/ITS" element={<IncomeTaxSummary/>} />
          <Route path="/SS" element={<StopSalaryProcessing/>} />
          <Route path="/FS" element={<FinalSettlement/>} />
          <Route path="/PP" element={<PayrollProcess/>} />
          <Route path="/IT" element={<ITStatement/>} />


          <Route path="/PA" element={<ProcessAttendance/>} />


          {/* Workflow*/}

          <Route path="/W Onboard" element={<EmployeeOnboarding/>} />
          <Route path="/W leavels" element={<WorkflowLevels/>} />
          <Route path="/W reviewers" element={<WorkflowReviewerTypes/>} />

      </Routes>
    
</Router>
  );

}

export default App;
