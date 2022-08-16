package com.praksa.auction.dto;

import lombok.*;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Validated
public class LogInDto {
    @NotEmpty(message = "Please enter your email address")
    @Email(message = "Please enter a valid email address")
    private String email;
    @NotEmpty(message = "Please enter your password.")
    private String password;
}