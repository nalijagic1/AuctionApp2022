package com.praksa.auction.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String description;
    @ManyToOne
    @JoinColumn(name = "subcategoryId")
    private Subcategory subcategory;
    @ManyToOne
    @JoinColumn(name = "personId")
    private Person person;
    private Double startingPrice;
    private Date startingDate;
    private Date endingDate;
    @ManyToOne
    @JoinColumn(name = "addressId")
    private Address address;
    private Boolean shippingOption;
    private Boolean payed;
    private String phoneNumber;
}
