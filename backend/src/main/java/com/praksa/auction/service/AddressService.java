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
    @Autowired
    private final PersonService personService;

    public AddressService(AddressRepository addressRepository, CountryService countryService, PersonService personService) {
        this.addressRepository = addressRepository;
        this.countryService = countryService;
        this.personService = personService;
    }

    private Address createAddressFromRequest(AddressInfoDto addressInfoDto) {
        Address address = new Address();
        address.setStreet(addressInfoDto.getAddress());
        address.setCity(addressInfoDto.getCity());
        address.setCountry(countryService.findById(addressInfoDto.getCountryId()));
        address.setZipCode(addressInfoDto.getZipCode());
        return address;
    }

    public Address addAddressIfNotExist(AddressInfoDto address, long personId) {
        Address location = createAddressFromRequest(address);
        if (!addressRepository.existsByStreetAndCityAndCountryAndZipCode(location.getStreet(), location.getCity(), location.getCountry(), location.getZipCode())) {
            Address newAddress = addressRepository.save(location);
            personService.updateAddressToUser(newAddress.getId(), personId);
            return newAddress;
        }
        return location;
    }

    public Address getAddressFromUser(long personId) {
        return personService.getPersonById(personId).getAddress();
    }
}
