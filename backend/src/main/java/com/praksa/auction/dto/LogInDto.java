package com.praksa.auction.dto;

import java.util.regex.Pattern;

public class LogInDto {
    private String email;
    private String password;

    public LogInDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LogInDto() {
    }

    public String validateData() {
        if (email == null) {
            return "Please enter your email address.";
        } else {
            Pattern pattern = Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
            if (!pattern.matcher(email.toLowerCase()).matches()) {
                return "Please enter a valid email address";
            }
        }
        if (password == null) {
            return "Please enter your password.";
        }
        return null;
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
