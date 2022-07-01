package com.praksa.auction.model;


import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(name="street")
    private String street;
    @Column(name = "city")
    private String city;
    @Column(name="zipCode")
    private String zipCode;
    @Column(name = "state")
    private String state;
    @Column(name = "country")
    private String country;
    @OneToMany(mappedBy = "address")
    private Set<Product> products = new HashSet<>();
    @OneToMany(mappedBy = "address")
    private Set<Person> people = new HashSet<>();

    public Address( String street, String city, String zipCode, String state, String country) {
        this.street = street;
        this.city = city;
        this.zipCode = zipCode;
        this.state = state;
        this.country = country;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Set<Person> getPeople() {
        return people;
    }

    public void setPeople(Set<Person> people) {
        this.people = people;
    }
}
