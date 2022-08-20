package com.praksa.auction.repository;

import com.praksa.auction.model.Address;
import com.praksa.auction.model.Country;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
    Boolean existsByStreetAndCityAndCountryAndZipCode(String street, String city, Country country, String zipCode);
}
