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

    public Address addAddressIfNotExist(AddressInfoDto address, long personId) {
        Address location = new Address(address, countryService);
        Address userAddress;
        if (!addressRepository.existsByStreetAndCityAndCountryAndZipCode(location.getStreet(), location.getCity(), location.getCountry(), location.getZipCode())) {
            userAddress = addressRepository.save(location);
        } else {
            userAddress = addressRepository.findFirstByStreetAndCityAndAndCountryAndZipCode(location.getStreet(), location.getCity(), location.getCountry(), location.getZipCode());
        }
        personService.updateAddressToUser(userAddress.getId(), personId);
        return userAddress;
    }

    public Address getAddressFromUser(long personId) {
        return personService.getPersonById(personId).getAddress();
    }
}
