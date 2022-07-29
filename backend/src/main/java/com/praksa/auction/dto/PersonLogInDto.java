package com.praksa.auction.dto;

public class PersonLogInDto {
    private String email;
    private String password;

    public PersonLogInDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public PersonLogInDto() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
