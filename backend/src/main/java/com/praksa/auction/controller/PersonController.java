package com.praksa.auction.controller;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.dto.*;
import com.praksa.auction.model.ErrorCodeEnum;
import com.praksa.auction.model.Person;
import com.praksa.auction.service.PersonService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

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
    public ResponseEntity logIn(@Valid @RequestBody LogInDto loginInfo) {
        try {
            return ResponseEntity.ok(personService.logIn(loginInfo));
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity(new LogInRegistationFailedDto(ErrorCodeEnum.EMAIL_NOT_FOUND.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/register")
    public ResponseEntity createAccount(@Valid @RequestBody RegistrationDto signUpRequest) {
        try {
            return ResponseEntity.ok(personService.createAccount(signUpRequest));
        } catch (IllegalArgumentException e) {
            return new ResponseEntity(new LogInRegistationFailedDto(ErrorCodeEnum.DUPLICATE_EMAIL.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping()
    public ResponseEntity<UserTableDto> getAllUsers(@RequestBody UserListRequest userListRequest){
        return ResponseEntity.ok(personService.getAllUsers(userListRequest));
    }

    @PostMapping("/filtered")
    public ResponseEntity<UserTableDto> getFilteredUser(@RequestBody UserListRequest userListRequest){
        return ResponseEntity.ok(personService.getFilteredUsers(userListRequest));
    }
}
