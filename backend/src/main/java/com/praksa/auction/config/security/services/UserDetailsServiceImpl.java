package com.praksa.auction.config.security.services;

import com.praksa.auction.model.Person;
import com.praksa.auction.repository.PersonRepositoy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    PersonRepositoy personRepositoy;
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Person person = personRepositoy.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User with email " + email +" was not found!")
        );
        return UserDetailsImpl.build(person);
    }
}
