package com.praksa.auction.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;

import static com.praksa.auction.common.Constants.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationDto {
    @NotEmpty(message = "Please enter your first name.")
    @Pattern(regexp = LETTERS_ONLY, message = "Please enter your first name correctly")
    private String firstName;
    @NotEmpty(message = "Please enter your last name.")
    @Pattern(regexp = LETTERS_ONLY, message = "Please enter your last name correctly")
    private String lastName;
    @NotEmpty(message = "Please enter your email address")
    @Email(message = "Please enter a valid email address.")
    private String email;
    @NotEmpty(message = "Please enter your password")
    @Pattern(regexp = PASSWORD_STRONG, message = "Your password is weak.")
    private String password;
}
