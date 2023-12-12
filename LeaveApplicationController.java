package com.excelr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.excelr.entity.LeaveApplication;
import com.excelr.service.LeaveApplicationService;

import java.util.List;

@CrossOrigin  // This will connect database with react.js
@RestController
@RequestMapping("/api/leave")
public class LeaveApplicationController {

    private final LeaveApplicationService leaveApplicationService;

    @Autowired
    public LeaveApplicationController(LeaveApplicationService leaveApplicationService) {
        this.leaveApplicationService = leaveApplicationService;
    }

    @GetMapping
    public List<LeaveApplication> getAllLeaveApplications() {
        return leaveApplicationService.getAllLeaveApplications();
    }

    @GetMapping("/{id}")
    public LeaveApplication getLeaveApplicationById(@PathVariable Long id) {
        return leaveApplicationService.getLeaveApplicationById(id);
    }

    @PostMapping("/submit")
    public LeaveApplication submitLeaveApplication(@RequestBody LeaveApplication leaveApplication) {
        return leaveApplicationService.submitLeaveApplication(leaveApplication);
    }

    @PutMapping("/update/{id}")
    public LeaveApplication updateLeaveApplicationStatus(
            @PathVariable Long id,
            @RequestParam String status,
            @RequestParam(required = false) String rejectionReason // New parameter for rejection reason
    ) {
        if (status.equalsIgnoreCase("Accepted")) {
            // Update the status to 'Approved' when 'Accepted' action is received
            return leaveApplicationService.updateLeaveApplicationStatus(id, "Approved");
        } else if (status.equalsIgnoreCase("Rejected") && rejectionReason != null) {
            // Update the status to 'Rejected' with rejection reason
            return leaveApplicationService.updateLeaveApplicationStatusWithReason(id, status, rejectionReason);
        } else {
            return leaveApplicationService.updateLeaveApplicationStatus(id, status);
        }
    }
}

