package com.praksa.auction.dto;

import java.util.regex.Pattern;
import static com.praksa.auction.common.Constants.*;

public class LogInDto {
    private String email;
    private String password;

    public LogInDto(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public LogInDto() {
    }

    public ErrorMessageDto validateData() {
        if (email == null) {
            return new ErrorMessageDto("email","Please enter your email address.");
        } else {
            Pattern pattern = Pattern.compile(EMAIL_REGEX);
            if (!pattern.matcher(email.toLowerCase()).matches()) {
                return new ErrorMessageDto("email","Please enter a valid email address");
            }
        }
        if (password == null) {
            return new ErrorMessageDto("password","Please enter your password.");
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
