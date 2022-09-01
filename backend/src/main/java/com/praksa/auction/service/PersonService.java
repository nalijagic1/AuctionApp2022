package com.praksa.auction.service;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.config.security.services.PersonDetails;
import com.praksa.auction.dto.BasicUserInfoDto;
import com.praksa.auction.dto.JwtResponseDto;
import com.praksa.auction.dto.LogInDto;
import com.praksa.auction.dto.RegistrationDto;
import com.praksa.auction.model.Person;
import com.praksa.auction.repository.PersonRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class PersonService {
    private static final Logger logger = LoggerFactory.getLogger(PersonService.class);
    private final PersonRepository personRepositoy;
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    ProductService productService;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    PasswordEncoder encoder;
    @Value("${stripeSecretKey}")
    private String apiKey;

    @Autowired
    public PersonService(PersonRepository personRepository) {
        this.personRepositoy = personRepository;
    }

    public Boolean existsByEmail(String email) {
        return personRepositoy.existsByEmail(email);
    }

    private Person getPersonFromRegistrationRequest(RegistrationDto registrationDto) {
        Person p = new Person();
        p.setEmail(registrationDto.getEmail());
        p.setFirstName(registrationDto.getFirstName());
        p.setLastName(registrationDto.getLastName());
        p.setPassword(encoder.encode(registrationDto.getPassword()));
        return p;
    }

    public JwtResponseDto createAccount(RegistrationDto signUpRequest) {
        if (personRepositoy.existsByEmail(signUpRequest.getEmail())) {
            logger.error("This email_address={} is already in use.", signUpRequest.getEmail());
            throw new IllegalArgumentException("This email address is already taken. Please try another one.");
        }
        personRepositoy.save(getPersonFromRegistrationRequest(signUpRequest));
        return logIn(new LogInDto(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }

    public Person getByEmail(String email) {
        return personRepositoy.findByEmail(email).get();
    }

    private BasicUserInfoDto getUserInfo(PersonDetails userDetails){
        BasicUserInfoDto basicPersonInfo = new BasicUserInfoDto();
        basicPersonInfo.setEmail(userDetails.getEmail());
        basicPersonInfo.setFirstName(userDetails.getFirstName());
        basicPersonInfo.setLastName(userDetails.getLastName());
        basicPersonInfo.setId(userDetails.getId());
        basicPersonInfo.setPhoneNumber(userDetails.getPhoneNumber());
        basicPersonInfo.setSeller(productService.existBySeller(userDetails.getId()));
        return basicPersonInfo;
    }
    public JwtResponseDto logIn(LogInDto loginInfo) {
        if (!personRepositoy.existsByEmail(loginInfo.getEmail())) {
            logger.error("email_address={} not found in database", loginInfo.getEmail());
            throw new UsernameNotFoundException("Email address not found");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        PersonDetails userDetails = (PersonDetails) authentication.getPrincipal();
        BasicUserInfoDto basicPersonInfo = getUserInfo(userDetails);
        return new JwtResponseDto(jwt, basicPersonInfo);
    }

    public Person getPersonById(long id) {
        return personRepositoy.findById(id).get();
    }

    public String createCustomerId(Person person) throws StripeException {
        Stripe.apiKey = apiKey;
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("name", person.getFirstName() + " " + person.getLastName());
        customerParams.put("email", person.getEmail());
        Customer customer = Customer.create(customerParams);
        person.setCustomerId(customer.getId());
        personRepositoy.updateCustomerInfo(customer.getId(), person.getId());
        return customer.getId();
    }

    public void updateAddressToUser(long addressId, long personId) {
        personRepositoy.updateAddressInfo(addressId, personId);
    }
}
