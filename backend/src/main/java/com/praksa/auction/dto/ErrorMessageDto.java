package com.praksa.auction.dto;

public class ErrorMessageDto {
    private String errorField;
    private String errorMessage;

    public ErrorMessageDto(String errorField, String errorMessage) {
        this.errorField = errorField;
        this.errorMessage = errorMessage;
    }

    public ErrorMessageDto() {
    }

    public String getErrorField() {
        return errorField;
    }

    public void setErrorField(String errorField) {
        this.errorField = errorField;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }
}
