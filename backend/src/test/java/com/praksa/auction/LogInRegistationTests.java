package com.praksa.auction;

import com.praksa.auction.controller.PersonController;
import com.praksa.auction.dto.RegistrationDto;
import com.praksa.auction.service.PersonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertTrue;

@SpringBootTest
public class LogInRegistationTests {
    @Autowired
    PersonController personController;
    @Autowired
    PersonService personService;

    @Test
    void addUser() {
        RegistrationDto person = new RegistrationDto("Amna", "Bejtagic", "amna@gmail.com", "amnaBej6622$");
        personController.createAccount(person);
        assertTrue(personService.existsByEmail(person.getEmail()));
    }
}
