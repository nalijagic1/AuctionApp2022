package com.praksa.auction.dto;

import lombok.*;
import org.springframework.validation.annotation.Validated;

import javax.validation.Valid;
import javax.validation.constraints.*;
import static com.praksa.auction.common.Constants.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class LogInDto {
    @NotEmpty
    @Email(message = "Email should be valid")
    private String email;
    @NotEmpty
    @Pattern(regexp = PASSWORD_STRONG , message = "Must be strong")
    private String password;

   /* public ErrorMessageDto validateData() {
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
    }*/
}
