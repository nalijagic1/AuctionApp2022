package com.praksa.auction.model;


import com.praksa.auction.dto.AddressInfoDto;
import com.praksa.auction.service.CountryService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "address")
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String street;
    private String city;
    private String zipCode;
    private String state;
    @ManyToOne
    @JoinColumn(name = "countryId")
    private Country country;

    public Address(AddressInfoDto addressInfoDto,CountryService countryService) {
        this.street = addressInfoDto.getAddress();
        this.city = addressInfoDto.getCity();
        this.country = countryService.findById(addressInfoDto.getCountryId());
        this.zipCode = addressInfoDto.getZipCode();
    }
}
