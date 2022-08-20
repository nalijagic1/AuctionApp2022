package com.praksa.auction.service;

import com.praksa.auction.dto.AddressInfoDto;
import com.praksa.auction.model.Address;
import com.praksa.auction.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    @Autowired
    private AddressRepository addressRepository;
    @Autowired
    private CountryService countryService;

    public AddressService(AddressRepository addressRepository, CountryService countryService) {
        this.addressRepository = addressRepository;
        this.countryService = countryService;
    }

    private Address createAddressFromRequest(AddressInfoDto addressInfoDto) {
        Address address = new Address();
        address.setStreet(addressInfoDto.getAddress());
        address.setCity(addressInfoDto.getCity());
        address.setCountry(countryService.findById(addressInfoDto.getCountryId()));
        address.setZipCode(addressInfoDto.getZipCode());
        return address;
    }

    public Address addAddressIfNotExist(AddressInfoDto address) {
        Address location = createAddressFromRequest(address);
        if (!addressRepository.existsByStreetAndCityAndCountryAndZipCode(location.getStreet(), location.getCity(), location.getCountry(), location.getZipCode()))
            return addressRepository.save(location);
        return location;
    }
}
