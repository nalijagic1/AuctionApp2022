package com.praksa.auction.service;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.config.security.services.PersonDetails;
import com.praksa.auction.dto.BasicUserInfoDto;
import com.praksa.auction.dto.JwtResponseDto;
import com.praksa.auction.dto.LogInDto;
import com.praksa.auction.dto.RegistrationDto;
import com.praksa.auction.model.Person;
import com.praksa.auction.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    private final PersonRepository personRepositoy;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    PasswordEncoder encoder;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepositoy = personRepository;
    }

    public Boolean existsByEmail(String email) {
        return personRepositoy.existsByEmail(email);
    }

    public JwtResponseDto createAccount(RegistrationDto signUpRequest) {
        if (personRepositoy.existsByEmail(signUpRequest.getEmail())) {
            String error = "{\"email\":\"This email address is already taken. Please try another one.\"}";
            throw new IllegalArgumentException(error);
        }
        Person p = new Person();
        p.setEmail(signUpRequest.getEmail());
        p.setFirstName(signUpRequest.getFirstName());
        p.setLastName(signUpRequest.getLastName());
        p.setPassword(encoder.encode(signUpRequest.getPassword()));
        personRepositoy.save(p);
        return logIn(new LogInDto(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }

    public Person getByEmail(String email) {
        return personRepositoy.findByEmail(email).get();
    }

    public JwtResponseDto logIn(LogInDto loginInfo) {
        if (!personRepositoy.existsByEmail(loginInfo.getEmail())) {
            String error = "{\"email\":\"Email address not found\"}";
            throw new UsernameNotFoundException(error);
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        PersonDetails userDetails = (PersonDetails) authentication.getPrincipal();
        BasicUserInfoDto basicPersonInfo = new BasicUserInfoDto(userDetails.getId(), userDetails.getFirstName(), userDetails.getLastName(), userDetails.getEmail());
        return new JwtResponseDto(jwt, basicPersonInfo);
    }


}
