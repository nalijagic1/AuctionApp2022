package com.praksa.auction.controller;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.dto.*;
import com.praksa.auction.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.*;

@RestController
@RequestMapping("/people")
@Validated
public class PersonController {
    @Autowired
    private PersonService personService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    PasswordEncoder encoder;


    @PostMapping("/login")
    public ResponseEntity<?> logIn(@Valid @RequestBody LogInDto loginInfo) {
       /* ErrorMessageDto validation = loginInfo.validateData();
        if (validation != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType",validation.getErrorField());
            return new ResponseEntity<>(validation.getErrorMessage(),headers,HttpStatus.BAD_REQUEST);
        }
        if (!personService.existsByEmail(loginInfo.getEmail())) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType","email");
            return new ResponseEntity<>("Email address not found", headers,HttpStatus.BAD_REQUEST);
        }*/
        JwtResponseDto responseDto = personService.logIn(loginInfo);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/register")
    public ResponseEntity<?> createAccount(@Valid @RequestBody RegistrationDto signUpRequest) {
        /*ErrorMessageDto validation = signUpRequest.validateRegistration();
        if (validation != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType",validation.getErrorField());
            return new ResponseEntity<>(validation.getErrorMessage(),headers,HttpStatus.BAD_REQUEST);
        }
        if (personService.existsByEmail(signUpRequest.getEmail())) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType","email");
            return new ResponseEntity<>("This email address is already taken. Please try another one.", headers,HttpStatus.BAD_REQUEST);
        }*/
        JwtResponseDto jwtResponseDto = personService.createAccount(signUpRequest);
        return ResponseEntity.ok(jwtResponseDto);
    }
}
