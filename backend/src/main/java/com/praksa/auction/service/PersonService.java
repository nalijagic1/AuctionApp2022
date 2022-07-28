package com.praksa.auction.service;

import com.praksa.auction.repository.CategoryRepository;
import com.praksa.auction.repository.PersonRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {
    private final PersonRepositoy personRepositoy;

    @Autowired
    public PersonService(PersonRepositoy personRepositoy){
        this.personRepositoy = personRepositoy;
    }
}
