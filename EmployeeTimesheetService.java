package com.excelr.service;

import com.excelr.entity.EmployeeTimesheet;

import java.util.List;
import java.util.Optional;

public interface EmployeeTimesheetService {
	
	EmployeeTimesheet submitTimesheetEntry(EmployeeTimesheet timesheet);
	List<EmployeeTimesheet> getAllTimesheetEntries();
	
    EmployeeTimesheet addTimesheetEntry(EmployeeTimesheet timesheet);

    
    // You can add more methods as needed
	EmployeeTimesheet getAllTimesheetEntriesById(Long id);

	EmployeeTimesheet updateTimesheetStatus(Long id, String status);
	EmployeeTimesheet updateTimesheetStatusWithReason(Long id, String status, String rejectionReason);
	
	


}