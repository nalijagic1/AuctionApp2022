package com.praksa.auction.controller;

import com.praksa.auction.dto.AddressInfoDto;
import com.praksa.auction.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/address")
public class AddressController {
    @Autowired
    private AddressService addressService;

    public AddressController(AddressService addressService) {
        this.addressService = addressService;
    }

    @PostMapping("/addAddress")
    public ResponseEntity<?> addAddressIfNotExist(@RequestBody AddressInfoDto address) {
        addressService.addAddressIfNotExist(address);
        return ResponseEntity.ok("");
    }
}
