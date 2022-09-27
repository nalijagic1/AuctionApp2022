package com.praksa.auction.controller;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.dto.*;
import com.praksa.auction.enums.ErrorCodeEnum;
import com.praksa.auction.enums.StatusReasonsEnum;
import com.praksa.auction.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
<<<<<<< HEAD

=======
>>>>>>> main
import javax.mail.MessagingException;
import javax.validation.Valid;
import java.util.Date;
import java.util.List;

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
    public ResponseEntity<UserTableDto> getAllUsers(@RequestBody UserListRequest userListRequest) {
        return ResponseEntity.ok(personService.getAllUsers(userListRequest));
    }

    @PostMapping("/filtered")
    public ResponseEntity<UserTableDto> getFilteredUser(@RequestBody UserListRequest userListRequest) {
        return ResponseEntity.ok(personService.getFilteredUsers(userListRequest));
    }

    @PutMapping("/updateUserStatus")
    public ResponseEntity<String> updateUserStatus(@RequestParam int status, @RequestParam List<Long> personId, @RequestParam String statusReason) {
        personService.updateUserStatus(status, personId, StatusReasonsEnum.valueOf(statusReason).getStatusMessage(),true);
        return ResponseEntity.ok("Succesful update");
    }

    @GetMapping("/updatedStatusCount/{statusId}")
    public ResponseEntity<Integer> getUpdatedStatusCount(@PathVariable Integer statusId) {
        return ResponseEntity.ok(personService.getNewStatusCount(statusId));
    }

    @PutMapping("/updateViewedStatus")
    public ResponseEntity<String> updateViewedStatus(@RequestParam Integer status, @RequestParam Boolean viewedStatus){
        personService.updateViewedStatus(status,viewedStatus);
        return ResponseEntity.ok("Succesful update");
    }

    @PostMapping("/sendResetEmail")
    public ResponseEntity sendResetEmail(@RequestParam String email ){
        try {
            return ResponseEntity.ok(personService.sendResetEmail(email));
        } catch (UsernameNotFoundException | MessagingException e) {
            return new ResponseEntity(new LogInRegistationFailedDto(ErrorCodeEnum.EMAIL_NOT_FOUND.getErrorCode()), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/changePassword")
    public  ResponseEntity changePassword(@RequestBody LogInDto accountInfo){
        personService.changePassword(accountInfo);
        return ResponseEntity.ok("Succesfuly changed pssword");
    }

}
