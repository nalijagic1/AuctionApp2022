package com.praksa.auction;

import com.praksa.auction.controller.PersonController;
import com.praksa.auction.dto.RegistrationDto;
import com.praksa.auction.service.PersonService;
import com.praksa.auction.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

@SpringBootTest
public class SearchSuggestionTests {
    @Autowired
    ProductService productService;

    @Test
    void getSearchSuggestion() {
        String inputWord ="clok";
        String suggestion = productService.getSearchSuggestion(inputWord);
        assertEquals("clock",suggestion);
    }

    @Test
    void getSearchSuggestionNoMatchFound(){
        String inputWord ="make";
        String suggestion = productService.getSearchSuggestion(inputWord);
        assertEquals("",suggestion);
    }
}
