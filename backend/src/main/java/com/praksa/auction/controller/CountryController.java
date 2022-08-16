package com.praksa.auction.controller;

import com.praksa.auction.model.Country;
import com.praksa.auction.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/countries")
public class CountryController {
    private final CountryService countryService;
    @Autowired
    public CountryController(CountryService countryService){
        this.countryService = countryService;
    }

    @GetMapping()
    public ResponseEntity<List<Country>> getAllConutries() {
        return ResponseEntity.ok(countryService.getAllCountries());
    }
}
