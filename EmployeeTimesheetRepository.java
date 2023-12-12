package com.excelr.repository;

import com.excelr.entity.EmployeeTimesheet;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeTimesheetRepository extends JpaRepository<EmployeeTimesheet, Long> {

	List<EmployeeTimesheet> findByStatus(String status);
    // You can add custom queries if needed
}