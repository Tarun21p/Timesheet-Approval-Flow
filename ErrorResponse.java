package com.excelr.exception;

import java.time.LocalDateTime;

public class ErrorResponse {
	
  private String errorMessage;
  private LocalDateTime localDateTime;
  private String status;
public String getErrorMessage() {
	return errorMessage;
}
public void setErrorMessage(String errorMessage) {
	this.errorMessage = errorMessage;
}
public LocalDateTime getLocalDateTime() {
	return localDateTime;
}
public void setLocalDateTime(LocalDateTime localDateTime) {
	this.localDateTime = localDateTime;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
  
  
	

}
