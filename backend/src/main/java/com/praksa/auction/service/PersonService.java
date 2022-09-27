package com.praksa.auction.service;

import com.praksa.auction.config.security.jwt.JwtUtils;
import com.praksa.auction.config.security.services.PersonDetails;
import com.praksa.auction.dto.*;
import com.praksa.auction.enums.StatusReasonsEnum;
import com.praksa.auction.enums.UserStatusEnum;
import com.praksa.auction.model.Person;
import com.praksa.auction.repository.PersonRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class PersonService {
    private static final Logger logger = LoggerFactory.getLogger(PersonService.class);
    private final PersonRepository personRepository;
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
        this.personRepository = personRepository;
    }

    public Boolean existsByEmail(String email) {
        return personRepository.existsByEmail(email);
    }

    private Person getPersonFromRegistrationRequest(RegistrationDto registrationDto) {
        Person p = new Person();
        p.setEmail(registrationDto.getEmail());
        p.setFirstName(registrationDto.getFirstName());
        p.setLastName(registrationDto.getLastName());
        p.setPassword(encoder.encode(registrationDto.getPassword()));
        p.setFirstLogIn(new Date());
        p.setStatus(UserStatusEnum.User);
        p.setStatusUpdate(LocalDate.now());
        return p;
    }

    public JwtResponseDto createAccount(RegistrationDto signUpRequest) {
        if (personRepository.existsByEmail(signUpRequest.getEmail())) {
            logger.error("This email_address={} is already in use.", signUpRequest.getEmail());
            throw new IllegalArgumentException("This email address is already taken. Please try another one.");
        }
        personRepository.save(getPersonFromRegistrationRequest(signUpRequest));
        return logIn(new LogInDto(signUpRequest.getEmail(), signUpRequest.getPassword()));
    }

    public Person getByEmail(String email) {
        return personRepository.findByEmail(email).get();
    }

    private BasicUserInfoDto getUserInfo(PersonDetails userDetails) {
        BasicUserInfoDto basicPersonInfo = new BasicUserInfoDto();
        basicPersonInfo.setEmail(userDetails.getEmail());
        basicPersonInfo.setFirstName(userDetails.getFirstName());
        basicPersonInfo.setLastName(userDetails.getLastName());
        basicPersonInfo.setId(userDetails.getId());
        basicPersonInfo.setPhoneNumber(userDetails.getPhoneNumber());
        basicPersonInfo.setSeller(productService.existBySeller(userDetails.getId()));
        basicPersonInfo.setRole(userDetails.getStatus());
        return basicPersonInfo;
    }

    public JwtResponseDto logIn(LogInDto loginInfo) {
        if (!personRepository.existsByEmail(loginInfo.getEmail())) {
            logger.error("email_address={} not found in database", loginInfo.getEmail());
            throw new UsernameNotFoundException("Email address not found");
        }
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginInfo.getEmail(), loginInfo.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);
        PersonDetails userDetails = (PersonDetails) authentication.getPrincipal();
        BasicUserInfoDto basicPersonInfo = getUserInfo(userDetails);
        personRepository.updateLastLogIn(userDetails.getId());
        if (userDetails.getStatus().equals(UserStatusEnum.Archived)) {
            personRepository.updateStatus(1, Arrays.asList(userDetails.getId()), StatusReasonsEnum.REGULAR.getStatusMessage(),false);
        }
        return new JwtResponseDto(jwt, basicPersonInfo);
    }

    public Person getPersonById(long id) {
        return personRepository.findById(id).get();
    }

    public String createCustomerId(Person person) throws StripeException {
        Stripe.apiKey = apiKey;
        Map<String, Object> customerParams = new HashMap<String, Object>();
        customerParams.put("name", person.getFirstName() + " " + person.getLastName());
        customerParams.put("email", person.getEmail());
        Customer customer = Customer.create(customerParams);
        person.setCustomerId(customer.getId());
        personRepository.updateCustomerInfo(customer.getId(), person.getId());
        return customer.getId();
    }

    public void updateAddressToUser(long addressId, long personId) {
        personRepository.updateAddressInfo(addressId, personId);
    }

    public UserTableDto getAllUsers(UserListRequest userListRequest) {
        Sort.Order order = new Sort.Order(Sort.Direction.valueOf(userListRequest.getSort().getDirection().toString()), userListRequest.getSort().getField());
        Page<Person> users = personRepository.searchAllUsers(PageRequest.of(userListRequest.getPage(), userListRequest.getCount(), Sort.by(order)), userListRequest.getSearch());
        return new UserTableDto(users.getContent(), users.getTotalPages());
    }

    public UserTableDto getFilteredUsers(UserListRequest userListRequest) {
        Sort.Order order = new Sort.Order(Sort.Direction.valueOf(userListRequest.getSort().getDirection().toString()), userListRequest.getSort().getField());
        Page<Person> users = personRepository.searchAllFilteredUsers(PageRequest.of(userListRequest.getPage(), userListRequest.getCount(), Sort.by(order)), userListRequest.getSearch(), userListRequest.getFilters(),userListRequest.getViewed());
        return new UserTableDto(users.getContent(), users.getTotalPages());
    }


    public void updateUserStatus(int status, List<Long> personId, String statusMessage,boolean viewedStatus) {
        personRepository.updateStatus(status, personId, statusMessage,viewedStatus);
    }

    public Integer getNewStatusCount(int status) {
        return personRepository.countUpdatedUsersByStatus(status);
    }

    public List<Person> getAllUsersWithStatus(UserStatusEnum status) {
        return personRepository.findPersonByStatus(status);
    }

    public void updateViewedStatus(Integer status, Boolean viewedStatus) {
        personRepository.updateViewedStatus(status, viewedStatus);
    }
}
