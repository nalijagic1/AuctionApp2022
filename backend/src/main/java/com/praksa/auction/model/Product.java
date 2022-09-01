package com.praksa.auction.model;


import com.praksa.auction.dto.NewProductDto;
import com.praksa.auction.service.PersonService;
import com.praksa.auction.service.SubcategoryService;
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
    private Boolean payed;
    private String phoneNumber;

    public Product(NewProductDto productDto, SubcategoryService subcategoryService, PersonService personService) {
        this.name = productDto.getProductName();
        this.description = productDto.getDescription();
        this.subcategory = subcategoryService.getSubcategoryById(productDto.getSubcategoryId());
        this.person = personService.getPersonById(productDto.getPersonId());
        this.startingPrice = productDto.getStartingPrice();
        this.startingDate = productDto.getStartingDate();
        this.endingDate = productDto.getEndingDate();
        this.address = productDto.getAddress();
        this.payed = false;
        this.phoneNumber = productDto.getPhoneNumber();
    }
}
