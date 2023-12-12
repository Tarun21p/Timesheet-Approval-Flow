package com.excelr.service;

import com.excelr.entity.EmployeeTimesheet;
import com.excelr.entity.LeaveApplication;
import com.excelr.repository.EmployeeTimesheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeTimesheetServiceImpl implements EmployeeTimesheetService {

    private final EmployeeTimesheetRepository timesheetRepository;

    @Autowired
    public EmployeeTimesheetServiceImpl(EmployeeTimesheetRepository timesheetRepository) {
        this.timesheetRepository = timesheetRepository;
    }
    
    public EmployeeTimesheet submitTimesheetEntry(EmployeeTimesheet timesheet) {
        timesheet.setStatus("Pending");
        return timesheetRepository.save(timesheet);
    }

    @Override
    public EmployeeTimesheet addTimesheetEntry(EmployeeTimesheet timesheet) {
        return timesheetRepository.save(timesheet);
    }

    @Override
    public List<EmployeeTimesheet> getAllTimesheetEntries() {
        return timesheetRepository.findAll();
    }
    @Override
    public EmployeeTimesheet getAllTimesheetEntriesById(Long id) {
        return (EmployeeTimesheet) timesheetRepository.findAll();
    }


    public List<EmployeeTimesheet> getTimesheetEntriesByStatus(String status) {
        return timesheetRepository.findByStatus(status);
    }

    public void deleteTimesheetEntry(Long id) {
        timesheetRepository.deleteById(id);
    }

    @Override
    public EmployeeTimesheet updateTimesheetStatus(Long id, String status) {
        Optional<EmployeeTimesheet> optionalTimesheet = timesheetRepository.findById(id);
        if (optionalTimesheet.isPresent()) {
            EmployeeTimesheet timesheet = optionalTimesheet.get();
            timesheet.setStatus(status);

            // If the status is 'Rejected', clear the rejection reason
            if ("Rejected".equalsIgnoreCase(status)) {
                timesheet.setRejectionReason(null);
            }

            return timesheetRepository.save(timesheet);
        }

        return null;
    }

    @Override
    public EmployeeTimesheet updateTimesheetStatusWithReason(Long id, String status, String rejectionReason) {
        Optional<EmployeeTimesheet> optionalTimesheet = timesheetRepository.findById(id);

        if (optionalTimesheet.isPresent()) {
            EmployeeTimesheet timesheet = optionalTimesheet.get();
            timesheet.setStatus(status);
            timesheet.setRejectionReason(rejectionReason);

            return timesheetRepository.save(timesheet);
        }

        return null;
    }
}

