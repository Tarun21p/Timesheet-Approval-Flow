package com.excelr.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.excelr.entity.LeaveApplication;

public interface LeaveApplicationRepository extends JpaRepository<LeaveApplication, Long> {
    // Custom query methods if needed
	List<LeaveApplication> findByStatus(String status);
	
}
