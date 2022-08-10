package com.praksa.auction.dto;

import java.util.regex.Pattern;
import static com.praksa.auction.Constants.*;

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
        } else if (!Pattern.compile(LETTERS_ONLY).matcher(firstName).matches()) {
            return "Please enter your first name correctly";
        }
        if (lastName == null) {
            return "Please enter your last name.";
        } else if (!Pattern.compile(LETTERS_ONLY).matcher(lastName).matches()) {
            return "Please enter your last name correctly";
        }
        if (email == null) {
            return "Please enter your email address.";
        } else {
            Pattern patternEmail = Pattern.compile(EMAIL_REGEX);
            if (!patternEmail.matcher(email.toLowerCase()).matches()) {
                return "Please enter a valid email address.";
            }
        }
        Pattern patternStrong= Pattern.compile(PASSWORD_STRONG);
        if (password == null) {
            return "Please enter your password.";
        } else if (patternStrong.matcher(password).find()) {
            return null;
        } else return "Your password is not strong enough!";
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
