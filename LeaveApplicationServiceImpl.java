package com.excelr.service;

import java.util.List;

import org.apache.el.stream.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.excelr.entity.LeaveApplication;
import com.excelr.repository.LeaveApplicationRepository;

@Service
public class LeaveApplicationServiceImpl implements LeaveApplicationService {

    private final LeaveApplicationRepository leaveApplicationRepository;

    @Autowired
    public LeaveApplicationServiceImpl(LeaveApplicationRepository leaveApplicationRepository) {
        this.leaveApplicationRepository = leaveApplicationRepository;
    }

    public LeaveApplication submitLeaveApplication(LeaveApplication leaveApplication) {
        leaveApplication.setStatus("Pending");
        return leaveApplicationRepository.save(leaveApplication);
    }

    public List<LeaveApplication> getAllLeaveApplications() {
        return leaveApplicationRepository.findAll();
    }

    public LeaveApplication getLeaveApplicationById(Long id) {
        return leaveApplicationRepository.findById(id).orElse(null);
    }

    @Override
    public LeaveApplication updateLeaveApplicationStatus(Long id, String status) {
        java.util.Optional<LeaveApplication> optionalLeaveApplication = leaveApplicationRepository.findById(id);

        if (optionalLeaveApplication.isPresent()) {
            LeaveApplication leaveApplication = optionalLeaveApplication.get();
            leaveApplication.setStatus(status);

            // If the status is 'Rejected', clear the rejection reason
            if ("Rejected".equalsIgnoreCase(status)) {
                leaveApplication.setRejectionReason(null);
            }

            return leaveApplicationRepository.save(leaveApplication);
        }

        return null;
    }

    @Override
    public LeaveApplication updateLeaveApplicationStatusWithReason(Long id, String status, String rejectionReason) {
        java.util.Optional<LeaveApplication> optionalLeaveApplication = leaveApplicationRepository.findById(id);

        if (optionalLeaveApplication.isPresent()) {
            LeaveApplication leaveApplication = optionalLeaveApplication.get();
            leaveApplication.setStatus(status);
            leaveApplication.setRejectionReason(rejectionReason);

            return leaveApplicationRepository.save(leaveApplication);
        }

        return null;
    }

	@Override
	public String deleteLeaveApplication(Long id) {
		// TODO Auto-generated method stub
		return null;
	}
}