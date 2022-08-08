package com.praksa.auction.dto;

import java.util.regex.Pattern;

public class RegistrationDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;

    public RegistrationDto(String firstName, String lastName, String email, String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }

    public RegistrationDto() {
    }

    public String validateRegistration() {
        if (firstName == null) {
            return "Please enter your first name.";
        } else if (!Pattern.compile("^[a-zA-Z]+$").matcher(firstName).matches()) {
            return "Please enter your first name correctly";
        }
        if (lastName == null) {
            return "Please enter your last name.";
        } else if (!Pattern.compile("^[a-zA-Z]+$").matcher(lastName).matches()) {
            return "Please enter your last name correctly";
        }
        if (email == null) {
            return "Please enter your email address.";
        } else {
            Pattern pattern = Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$");
            if (!pattern.matcher(email.toLowerCase()).matches()) {
                return "Please enter a valid email address.";
            }
        }
        if (password == null) {
            return "Please enter your password.";
        } else if (Pattern.compile("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})").matcher(password).matches()) {
            return null;
        } else if (Pattern.compile("((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))").matcher(password).matches()) {
            return "Your password is medium strength";
        } else return "Your password is weak!";
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
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
