package com.praksa.auction.controller;

import com.praksa.auction.dto.AddressInfoDto;
import com.praksa.auction.model.Address;
import com.praksa.auction.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/addAddress/{personId}")
    public ResponseEntity<?> addAddressIfNotExist(@PathVariable long personId,@RequestBody AddressInfoDto address) {
        Address newAddress = addressService.addAddressIfNotExist(address, personId);
        return ResponseEntity.ok(newAddress);
    }

    @GetMapping()
    public ResponseEntity<Address> getAddressFromUser(@RequestParam long personId) {
        return ResponseEntity.ok(addressService.getAddressFromUser(personId));
    }
}
