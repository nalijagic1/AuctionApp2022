package com.praksa.auction.controller;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.dto.LogInDto;
import com.praksa.auction.dto.LogInRegistationFailedDto;
import com.praksa.auction.dto.RegistrationDto;
import com.praksa.auction.model.ErrorCodeEnum;
import com.praksa.auction.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.validation.Valid;

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
        try {
            return ResponseEntity.ok(personService.logIn(loginInfo));
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity(new LogInRegistationFailedDto(ErrorCodeEnum.EMAIL_NOT_FOUND.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> createAccount(@Valid @RequestBody RegistrationDto signUpRequest) {
        try {
            return ResponseEntity.ok(personService.createAccount(signUpRequest));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity(new LogInRegistationFailedDto(ErrorCodeEnum.DUPLICATE_EMAIL.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }
}
