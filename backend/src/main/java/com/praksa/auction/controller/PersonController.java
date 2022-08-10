package com.praksa.auction.controller;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.config.security.services.PersonDetails;
import com.praksa.auction.dto.*;
import com.praksa.auction.model.Person;
import com.praksa.auction.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/people")
public class PersonController {
    private final PersonService personService;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    public PersonController(PersonService personService) {
        this.personService = personService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> logIn(@Valid @RequestBody LogInDto loginInfo) {
        ErrorMessageDto validation = loginInfo.validateData();
        if (validation != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType",validation.getErrorField());
            return new ResponseEntity<>(validation.getErrorMessage(),headers,HttpStatus.BAD_REQUEST);
        }
        if (!personService.existsByEmail(loginInfo.getEmail())) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType","email");
            return new ResponseEntity<>("Email address not found", headers,HttpStatus.BAD_REQUEST);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        PersonDetails userDetails = (PersonDetails) authentication.getPrincipal();
        BasicUserInfoDto basicPersonInfo = new BasicUserInfoDto(userDetails.getId(), userDetails.getFirstName(), userDetails.getLastName(), userDetails.getEmail());
        return ResponseEntity.ok(new JwtResponseDto(jwt, basicPersonInfo));
    }

    @PostMapping("/register")
    public ResponseEntity<?> createAccount(@Valid @RequestBody RegistrationDto signUpRequest) {
        ErrorMessageDto validation = signUpRequest.validateRegistration();
        if (validation != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType",validation.getErrorField());
            return new ResponseEntity<>(validation.getErrorMessage(),headers,HttpStatus.BAD_REQUEST);
        }
        if (personService.existsByEmail(signUpRequest.getEmail())) {
            HttpHeaders headers = new HttpHeaders();
            headers.add("errorType","email");
            return new ResponseEntity<>("This email address is already taken. Please try another one.", headers,HttpStatus.BAD_REQUEST);
        }
        Person p = new Person();
        p.setEmail(signUpRequest.getEmail());
        p.setFirstName(signUpRequest.getFirstName());
        p.setLastName(signUpRequest.getLastName());
        p.setPassword(encoder.encode(signUpRequest.getPassword()));
        personService.createAccount(p);
        return logIn(new LogInDto(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }


}
