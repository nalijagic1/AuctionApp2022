package com.praksa.auction.config.security.services;

import com.praksa.auction.model.Address;
import com.praksa.auction.model.Card;
import com.praksa.auction.model.Person;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Date;

public class UserDetailsImpl implements UserDetails {
    private long id;
    private String firstName;
    private String lastName;
    private byte[] gender;
    private Date dateOfBirth;
    private String phoneNumber;
    private String email;
    private String password;
    private String picture;
    private Address address;
    private Card card;

    public UserDetailsImpl(long id, String firstName, String lastName, byte[] gender, Date dateOfBirth, String phoneNumber, String email, String password, String picture, Address address, Card card) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.password = password;
        this.picture = picture;
        this.address = address;
        this.card = card;
    }

    public static UserDetailsImpl build(Person user) {
        return new UserDetailsImpl(user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getGender(),
                user.getDateOfBirth(),
                user.getPhoneNumber(),
                user.getEmail(),
                user.getPassword(),
                user.getPicture(),
                user.getAddress(),
                user.getCard());

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public byte[] getGender() {
        return gender;
    }

    public void setGender(byte[] gender) {
        this.gender = gender;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Card getCard() {
        return card;
    }

    public void setCard(Card card) {
        this.card = card;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}


