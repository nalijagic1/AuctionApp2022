package com.praksa.auction.controller;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.config.security.services.UserDetailsImpl;
import com.praksa.auction.dto.JwtResponseDto;
import com.praksa.auction.dto.MessageResponseDto;
import com.praksa.auction.dto.PersonLogInDto;
import com.praksa.auction.dto.PersonRegistrationDto;
import com.praksa.auction.model.Person;
import com.praksa.auction.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
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
    public ResponseEntity<?> logIn(@Valid @RequestBody PersonLogInDto loginInfo){
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return ResponseEntity.ok(new JwtResponseDto(jwt,userDetails));
    }

    @PostMapping("/register")
    public ResponseEntity<?> createAccount(@Valid @RequestBody PersonRegistrationDto signUpRequest) {
        if (personService.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponseDto("Email is already in use!"));
        }
        Person p = new Person();
        p.setEmail(signUpRequest.getEmail());
        p.setFirstName(signUpRequest.getFirstName());
        p.setLastName(signUpRequest.getLastName());
        p.setPassword(encoder.encode(signUpRequest.getPassword()));
        personService.createAccount(p);

        return logIn(new PersonLogInDto(signUpRequest.getEmail(),signUpRequest.getPassword()));
    }



}
