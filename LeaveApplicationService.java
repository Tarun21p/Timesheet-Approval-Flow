package com.excelr.service;

import com.excelr.entity.LeaveApplication;

import java.util.List;

public interface LeaveApplicationService {

    LeaveApplication submitLeaveApplication(LeaveApplication leaveApplication);

    List<LeaveApplication> getAllLeaveApplications();

    LeaveApplication getLeaveApplicationById(Long id);


    String deleteLeaveApplication(Long id);

    LeaveApplication updateLeaveApplicationStatus(Long id, String status);
	LeaveApplication updateLeaveApplicationStatusWithReason(Long id, String status, String rejectionReason);
}
