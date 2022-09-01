package com.praksa.auction;

import com.praksa.auction.repository.CategoryRepository;
import com.praksa.auction.service.ProductService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.Assert.assertEquals;

@SpringBootTest
public class ShopPageTest {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private ProductService productService;

    @Test
    void getSubcategories() {
        assertEquals(categoryRepository.findSubcategoriesWithCount(2).size(), 2);
    }
}
