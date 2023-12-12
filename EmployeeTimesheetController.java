package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.excelr.entity.EmployeeTimesheet;
import com.excelr.service.EmployeeTimesheetService;

import java.util.List;

@CrossOrigin  // This will connect the database with react.js
@RestController
@RequestMapping("/api/entry")
public class EmployeeTimesheetController {

    private final EmployeeTimesheetService timesheetService;

    @Autowired
    public EmployeeTimesheetController(EmployeeTimesheetService timesheetService) {
        this.timesheetService = timesheetService;
    }

    @GetMapping
    public List<EmployeeTimesheet> getAllTimesheets() {
        return timesheetService.getAllTimesheetEntries();
    }

    @GetMapping("/{id}")
    public EmployeeTimesheet getTimesheetById(@PathVariable Long id) {
        return timesheetService.getAllTimesheetEntriesById(id);
    }

    @PostMapping("/submit")
    public EmployeeTimesheet submitTimesheet(@RequestBody EmployeeTimesheet timesheet) {
        return timesheetService.submitTimesheetEntry(timesheet);
    }

    @PutMapping("/update/{id}")
    public EmployeeTimesheet updateTimesheetStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String rejectionReason // New parameter for rejection reason
    ) {
        if (status.equalsIgnoreCase("Accepted")) {
            // Update the status to 'Approved' when 'Accepted' action is received
            return timesheetService.updateTimesheetStatus(id, "Approved");
        } else if (status.equalsIgnoreCase("Rejected") && rejectionReason != null) {
            // Update the status to 'Rejected' with rejection reason
            return timesheetService.updateTimesheetStatusWithReason(id, status, rejectionReason);
        } else {
            return timesheetService.updateTimesheetStatus(id, status);
        }
    }
}