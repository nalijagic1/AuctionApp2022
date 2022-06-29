package com.praksa.auction.model;

import javax.persistence.*;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @ManyToOne
    @JoinColumn(name = "subcategoryId")
    private Subcategory subcategory;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;
    @Column(name = "startingPrice")
    private Double startingPrice;
    @Column(name = "startingDate")
    private Date startingDate;
    @Column(name = "endingDate")
    private Date endingDate;
    @ManyToOne
    @JoinColumn(name = "addressId")
    private Address address;
    @Column(name="shippingOption")
    private Boolean shippingOption;
    @Column(name ="phoneNumber")
    private String phoneNumber;
    @OneToMany(mappedBy = "product")
    private Set<Bid> bids = new HashSet<>();
    @OneToMany(mappedBy = "product")
    private Set<Wishlist> wishlists = new HashSet<>();

    public Product(long id, String name, String description, Subcategory subcategory, User user, Double startingPrice, Date startingDate, Date endingDate, Address address, Boolean shippingOption, String phoneNumber) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.subcategory = subcategory;
        this.user = user;
        this.startingPrice = startingPrice;
        this.startingDate = startingDate;
        this.endingDate = endingDate;
        this.address = address;
        this.shippingOption = shippingOption;
        this.phoneNumber = phoneNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Subcategory getSubcategory() {
        return subcategory;
    }

    public void setSubcategory(Subcategory subcategory) {
        this.subcategory = subcategory;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Double getStartingPrice() {
        return startingPrice;
    }

    public void setStartingPrice(Double startingPrice) {
        this.startingPrice = startingPrice;
    }

    public Date getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(Date startingDate) {
        this.startingDate = startingDate;
    }

    public Date getEndingDate() {
        return endingDate;
    }

    public void setEndingDate(Date endingDate) {
        this.endingDate = endingDate;
    }

    public Address getAddres() {
        return address;
    }

    public void setAddres(Address address) {
        this.address = address;
    }

    public Boolean getShippingOption() {
        return shippingOption;
    }

    public void setShippingOption(Boolean shippingOption) {
        this.shippingOption = shippingOption;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public Set<Bid> getBids() {
        return bids;
    }

    public void setBids(Set<Bid> bids) {
        this.bids = bids;
    }

    public Set<Wishlist> getWishlists() {
        return wishlists;
    }

    public void setWishlists(Set<Wishlist> wishlists) {
        this.wishlists = wishlists;
    }
}
