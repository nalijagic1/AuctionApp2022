package com.praksa.auction;

import com.praksa.auction.repository.CategoryRepository;
import com.praksa.auction.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
class AuctionApplicationTests {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductService productService;

    @Test
    void contextLoads() {
    }

    @Test
    void gettingCategory() {
        assertEquals(categoryRepository.findAll().size(), 9);
    }

    @Test
    void getFirst8Latest() {
        assertEquals(productService.getNewest(0, 8).size(), 8);
    }
}
