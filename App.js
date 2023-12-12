import React from 'react';
import {   Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import EmployeeDashboard from './components/EmployeeDashboard';
import ManagerDashboard from './components/ManagerDashboard';
import EmployeeTimesheet from './components/EmployeeTimesheet';
import EmployeeLeaveApplication  from './components/EmployeeLeaveApplication';
import HolidaysCalendar from './components/HolidaysCalendar';
import ManagerTimesheetEntries from './components/ManagerTimesheetEntries';
import LeaveApplicationEntries from './components/LeaveApplicationEntries';
import EmployeeTimesheetTable from './components/EmployeeTimesheetTable';
import EmployeeLeaveApplicationTable from './components/EmployeeLeaveTable';


const App = () => {
  return (
  
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route> 
        <Route path="/emp-dashboard" element={<EmployeeDashboard/>}></Route>
        <Route path="/emp-dashboard/ts" element={<EmployeeTimesheet/>}></Route>
        <Route path="/emp-dashboard/ts-table" element={<EmployeeTimesheetTable/>}></Route>
        <Route path="/emp-dashboard/leave" element={<EmployeeLeaveApplication/>}></Route>
        <Route path="/emp-dashboard/leave-table" element={<EmployeeLeaveApplicationTable/>}></Route>
        <Route path="/emp-dashboard/holidays" element={<HolidaysCalendar/>}></Route>

        <Route path="/ts" element={<EmployeeTimesheet/>}></Route>
        <Route path="/leave" element={<EmployeeLeaveApplication/>}></Route>

        <Route path="/man-dashboard" element={<ManagerDashboard/>}></Route>
        <Route path="/man-dashboard/timesheet-entries" element={<ManagerTimesheetEntries/>}></Route>
        <Route path="/man-dashboard/leave-entries" element={<LeaveApplicationEntries/>}></Route>
        <Route path="/man-dashboard/holidays" element={<HolidaysCalendar/>}></Route>
      </Routes>
    
  );
};

export default App;
