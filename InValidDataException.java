package com.excelr.exception;

public class InValidDataException  extends RuntimeException{

	String msg;

	public InValidDataException(String msg) {
		super();
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}
	
	
}
