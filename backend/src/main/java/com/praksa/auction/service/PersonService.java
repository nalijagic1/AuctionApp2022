package com.praksa.auction.service;

import com.praksa.auction.model.Person;
import com.praksa.auction.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    private final PersonRepository personRepositoy;
    @Autowired
    PasswordEncoder encoder;
    @Autowired
    public PersonService(PersonRepository personRepository){
        this.personRepositoy = personRepository;
    }
    
    public Boolean existsByEmail(String email){
        return personRepositoy.existsByEmail(email);
    }

    public void createAccount(Person person) {
        personRepositoy.save(person);
    }
}
